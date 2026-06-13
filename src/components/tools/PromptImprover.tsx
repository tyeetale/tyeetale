import { useState } from 'react';

const API_URL = "https://graph-chat.thomasyee28.workers.dev/improve-prompt";

export default function PromptImprover() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleImprove() {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    setOutput('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input.trim() }),
      });
      const text = await res.text();
      setOutput(text);
    } catch {
      setOutput('Failed to connect to AI service.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h3 className="text-xs font-heading font-semibold uppercase tracking-widest text-foreground mb-3">
        Prompt Improver
      </h3>
      <p className="text-muted text-xs mb-3">Paste a prompt, get a better version.</p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your prompt..."
        rows={3}
        className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-md text-foreground placeholder-muted focus:outline-none focus:border-muted-foreground resize-none mb-2"
      />
      <button
        onClick={handleImprove}
        disabled={isLoading || !input.trim()}
        className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90 disabled:opacity-30 mb-3"
      >
        {isLoading ? 'Improving...' : 'Improve'}
      </button>
      {output && (
        <div className="p-3 bg-surface border border-border rounded-md text-sm text-foreground whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
}
