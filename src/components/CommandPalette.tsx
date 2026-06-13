import { useState, useEffect, useRef, useCallback } from 'react';

interface Command {
  id: string;
  label: string;
  description?: string;
  action: () => void;
  category: string;
}

const commands: Command[] = [
  // Navigation
  { id: 'home', label: 'Home', description: 'Go to homepage', action: () => window.location.href = '/', category: 'Navigate' },
  { id: 'about', label: 'About', description: 'Principles and interests', action: () => window.location.href = '/about', category: 'Navigate' },
  { id: 'projects', label: 'Projects', description: 'View all projects', action: () => window.location.href = '/projects', category: 'Navigate' },
  { id: 'notes', label: 'Notes', description: 'Thoughts and writing', action: () => window.location.href = '/notes', category: 'Navigate' },
  { id: 'tools', label: 'Tools', description: 'Interactive widgets', action: () => window.location.href = '/tools', category: 'Navigate' },
  { id: 'graph', label: 'Graph', description: 'Knowledge graph', action: () => window.location.href = '/graph', category: 'Navigate' },
  { id: 'colophon', label: 'Colophon', description: 'How this site is built', action: () => window.location.href = '/colophon', category: 'Navigate' },
  // Projects
  { id: 'tildenn', label: 'Tildenn', description: 'AI travel planner', action: () => window.location.href = '/projects/tildenn', category: 'Projects' },
  { id: 'coopsight', label: 'Coopsight', description: 'Startup ecosystem matchmaker', action: () => window.location.href = '/projects/coopsight', category: 'Projects' },
  { id: 'metaphor3d', label: 'Metaphor3D', description: 'AI 3D generated assets', action: () => window.location.href = '/projects/metaphor3d', category: 'Projects' },
  { id: 'fibes', label: 'Fibes', description: 'UGC influencer platform', action: () => window.location.href = '/projects/fibes', category: 'Projects' },
  // External
  { id: 'github', label: 'GitHub', description: 'github.com/tyeetale', action: () => window.open('https://github.com/tyeetale', '_blank'), category: 'Links' },
  { id: 'x', label: 'X / Twitter', description: 'x.com/tyeetale', action: () => window.open('https://x.com/tyeetale', '_blank'), category: 'Links' },
  { id: 'linkedin', label: 'LinkedIn', description: 'linkedin.com/in/tyeetyee', action: () => window.open('https://linkedin.com/in/tyeetyee', '_blank'), category: 'Links' },
  // Actions
  { id: 'theme-light', label: 'Light Mode', description: 'Switch to light theme', action: () => { localStorage.setItem('theme', 'light'); document.documentElement.classList.remove('dark'); document.documentElement.classList.add('light'); }, category: 'Theme' },
  { id: 'theme-dark', label: 'Dark Mode', description: 'Switch to dark theme', action: () => { localStorage.setItem('theme', 'dark'); document.documentElement.classList.remove('light'); document.documentElement.classList.add('dark'); }, category: 'Theme' },
  { id: 'theme-system', label: 'System Theme', description: 'Follow system preference', action: () => { localStorage.setItem('theme', 'system'); const resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; document.documentElement.classList.remove('light', 'dark'); document.documentElement.classList.add(resolved); }, category: 'Theme' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    (cmd.description || '').toLowerCase().includes(query.toLowerCase())
  );

  // Group by category
  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      filtered[selectedIndex].action();
      setIsOpen(false);
    }
  }, [filtered, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  let flatIndex = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Palette */}
      <div className="relative w-[90vw] max-w-[520px] bg-[#0a0a0a] border border-[#333] rounded-xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center px-4 border-b border-[#1a1a1a]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or jump to..."
            className="flex-1 px-3 py-3 text-sm bg-transparent text-[#e5e5e5] placeholder-[#555] focus:outline-none"
          />
          <kbd className="text-[0.65rem] px-1.5 py-0.5 rounded bg-[#1a1a1a] border border-[#333] text-[#555]">esc</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[320px] overflow-y-auto py-2">
          {Object.entries(grouped).map(([category, cmds]) => (
            <div key={category}>
              <div className="px-4 py-1">
                <span className="text-[0.65rem] uppercase tracking-wider text-[#555]">{category}</span>
              </div>
              {cmds.map((cmd) => {
                const thisIndex = flatIndex++;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => { cmd.action(); setIsOpen(false); }}
                    className={`w-full px-4 py-2 flex items-center justify-between text-left transition-colors ${
                      thisIndex === selectedIndex ? 'bg-[#1a1a1a]' : 'hover:bg-[#1a1a1a]/50'
                    }`}
                  >
                    <div>
                      <span className="text-sm text-[#e5e5e5]">{cmd.label}</span>
                      {cmd.description && (
                        <span className="text-xs text-[#555] ml-2">{cmd.description}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center text-[#555] text-sm">
              No results found.
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-[#1a1a1a] flex items-center gap-3 text-[0.65rem] text-[#555]">
          <span><kbd className="px-1 py-0.5 rounded bg-[#1a1a1a] border border-[#333]">&#8593;&#8595;</kbd> navigate</span>
          <span><kbd className="px-1 py-0.5 rounded bg-[#1a1a1a] border border-[#333]">&#8629;</kbd> select</span>
          <span><kbd className="px-1 py-0.5 rounded bg-[#1a1a1a] border border-[#333]">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
