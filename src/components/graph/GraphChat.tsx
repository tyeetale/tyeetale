import { useState, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const CHAT_API_URL = "https://graph-chat.thomasyee28.workers.dev/chat";

export function GraphChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim().slice(0, 500);
    setInput("");
    setResponse("");
    setIsLoading(true);

    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        setResponse("Something went wrong. Try again.");
        setIsLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        const text = await res.text();
        setResponse(text);
        setIsLoading(false);
        return;
      }

      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setResponse(accumulated);
        if (responseRef.current) {
          responseRef.current.scrollTop = responseRef.current.scrollHeight;
        }
      }
    } catch {
      setResponse("Failed to connect. The AI service may be unavailable.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-[#333] rounded-full text-[#a3a3a3] text-sm hover:text-[#e5e5e5] hover:border-[#555] transition-colors"
      >
        <MessageCircle size={14} />
        Ask about my work
      </button>
    );
  }

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[90vw] max-w-[480px] bg-[#0a0a0a]/95 backdrop-blur-sm border border-[#333] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1a1a1a]">
        <span className="text-xs text-[#555555]">AI assistant (Llama 3.1)</span>
        <button onClick={() => setIsOpen(false)} className="text-[#555555] hover:text-[#e5e5e5] transition-colors">
          <X size={14} />
        </button>
      </div>
      {(response || isLoading) && (
        <div ref={responseRef} className="px-3 py-2 max-h-[200px] overflow-y-auto text-sm text-[#a3a3a3] leading-relaxed">
          {response || <span className="text-[#555555] animate-pulse">Thinking...</span>}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center border-t border-[#1a1a1a]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          maxLength={500}
          className="flex-1 px-3 py-2 text-sm bg-transparent text-[#e5e5e5] placeholder-[#555555] focus:outline-none"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()} className="px-3 py-2 text-[#555555] hover:text-[#e5e5e5] transition-colors disabled:opacity-30">
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
