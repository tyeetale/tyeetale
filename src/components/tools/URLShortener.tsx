import { useState } from 'react';

const API_URL = "https://graph-chat.thomasyee28.workers.dev/shorten";

export default function URLShortener() {
  const [input, setInput] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  async function handleShorten() {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    setError('');
    setShortUrl('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: input.trim() }),
      });
      if (!res.ok) {
        setError('Invalid URL or service unavailable.');
        return;
      }
      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch {
      setError('Failed to connect.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <h3 className="text-xs font-heading font-semibold uppercase tracking-widest text-foreground mb-3">
        URL Shortener
      </h3>
      <p className="text-muted text-xs mb-3">Shorten any URL. Stored on Cloudflare KV.</p>
      <div className="flex gap-2 mb-3">
        <input
          type="url"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com/very/long/url"
          className="flex-1 px-3 py-2 text-sm bg-surface border border-border rounded-md text-foreground placeholder-muted focus:outline-none focus:border-muted-foreground"
        />
        <button
          onClick={handleShorten}
          disabled={isLoading || !input.trim()}
          className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90 disabled:opacity-30 whitespace-nowrap"
        >
          {isLoading ? '...' : 'Shorten'}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
      {shortUrl && (
        <div className="flex items-center gap-2 p-2 bg-surface border border-border rounded-md">
          <code className="text-sm text-accent flex-1 truncate">{shortUrl}</code>
          <button
            onClick={handleCopy}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            {copied ? 'copied!' : 'copy'}
          </button>
        </div>
      )}
    </div>
  );
}
