import { useState } from 'react';

const API_URL = "https://graph-chat.thomasyee28.workers.dev/generate-template";

const presets = [
  'Code review assistant',
  'Customer support bot',
  'Technical writer',
  'Data analyst',
  'Product manager',
  'Custom...',
];

export default function SystemPromptGenerator() {
  const [useCase, setUseCase] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (!useCase.trim() || isLoading) return;
    setIsLoading(true);
    setOutput('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ useCase: useCase.trim() }),
      });
      const text = await res.text();
      setOutput(text);
    } catch {
      setOutput('Failed to connect to AI service.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <h3 className="text-xs font-heading font-semibold uppercase tracking-widest text-foreground mb-3">
        System Prompt Generator
      </h3>
      <p className="text-muted text-xs mb-3">Describe a use case, get a system prompt template.</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => setUseCase(preset === 'Custom...' ? '' : preset)}
            className={`text-xs px-2 py-0.5 rounded border transition-colors ${
              useCase === preset
                ? 'bg-border border-muted-foreground text-foreground'
                : 'border-border text-muted hover:text-foreground'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={useCase}
        onChange={(e) => setUseCase(e.target.value)}
        placeholder="e.g., API documentation writer for a SaaS product"
        className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-md text-foreground placeholder-muted focus:outline-none focus:border-muted-foreground mb-2"
      />
      <button
        onClick={handleGenerate}
        disabled={isLoading || !useCase.trim()}
        className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90 disabled:opacity-30 mb-3"
      >
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
      {output && (
        <div className="relative">
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 text-xs text-muted hover:text-foreground transition-colors"
          >
            {copied ? 'copied!' : 'copy'}
          </button>
          <div className="p-3 bg-surface border border-border rounded-md text-sm text-foreground whitespace-pre-wrap font-mono text-xs max-h-[300px] overflow-y-auto">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
