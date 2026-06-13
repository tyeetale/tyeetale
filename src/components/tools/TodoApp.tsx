import { useEffect, useState } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import type { Block } from '@blocknote/core';

const STORAGE_KEY = 'tyeetale-blocknote-v1';

export default function TodoApp() {
  const [initialContent, setInitialContent] = useState<Block[] | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setInitialContent(JSON.parse(stored));
      } catch {
        setInitialContent(undefined);
      }
    }
    setLoaded(true);
  }, []);

  // Don't render until we've checked localStorage
  if (!loaded) {
    return null;
  }

  return <EditorInner initialContent={initialContent} copied={copied} setCopied={setCopied} showImport={showImport} setShowImport={setShowImport} importText={importText} setImportText={setImportText} />;
}

function EditorInner({ initialContent, copied, setCopied, showImport, setShowImport, importText, setImportText }: {
  initialContent: Block[] | undefined;
  copied: boolean;
  setCopied: (v: boolean) => void;
  showImport: boolean;
  setShowImport: (v: boolean) => void;
  importText: string;
  setImportText: (v: string) => void;
}) {
  const editor = useCreateBlockNote({
    initialContent: initialContent || undefined,
  });

  // Auto-save to localStorage
  useEffect(() => {
    if (!editor) return;
    const save = () => {
      const content = editor.document;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    };
    editor.onChange(save);
  }, [editor]);

  // Export as markdown
  async function handleExport() {
    const md = await editor.blocksToMarkdownLossy(editor.document);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Import markdown
  async function handleImport() {
    if (!importText.trim()) return;
    try {
      const blocks = await editor.tryParseMarkdownToBlocks(importText);
      editor.replaceBlocks(editor.document, blocks);
      setImportText('');
      setShowImport(false);
    } catch {
      // Fallback: just insert as paragraphs
      const lines = importText.split('\n').filter(l => l.trim());
      const blocks = await editor.tryParseMarkdownToBlocks(lines.map(l => `- ${l.trim().replace(/^[-*]\s*/, '')}`).join('\n'));
      editor.replaceBlocks(editor.document, blocks);
      setImportText('');
      setShowImport(false);
    }
  }

  // Clear all
  function handleClear() {
    if (confirm('Clear all content?')) {
      editor.removeBlocks(editor.document);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-heading font-bold text-xl text-foreground">Tasks</h1>
        <div className="flex gap-2 items-center">
          <button onClick={() => setShowImport(!showImport)} className="text-xs text-muted border border-border px-2 py-1 rounded hover:text-foreground transition-colors">
            import
          </button>
          <button onClick={handleExport} className="text-xs text-muted border border-border px-2 py-1 rounded hover:text-foreground transition-colors">
            {copied ? 'copied!' : 'export'}
          </button>
        </div>
      </div>
      <p className="text-muted text-xs mb-4">
        Type / for commands. Drag blocks. Use checkboxes for tasks.
      </p>

      {/* Import panel */}
      {showImport && (
        <div className="mb-4 p-4 border border-border rounded-lg bg-surface">
          <span className="text-xs text-muted block mb-2">Paste markdown or a list:</span>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder={`- Task one\n  - Subtask A\n- Task two`}
            rows={6}
            className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground placeholder-muted focus:outline-none focus:border-muted-foreground resize-none font-mono mb-3"
          />
          <div className="flex gap-2">
            <button onClick={handleImport} className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">Import</button>
            <button onClick={() => { setShowImport(false); setImportText(''); }} className="px-3 py-1.5 text-sm text-muted border border-border rounded-md hover:text-foreground transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* BlockNote Editor */}
      <div className="bn-container border border-border rounded-lg overflow-hidden min-h-[300px] [&_.bn-editor]:min-h-[300px]">
        <BlockNoteView
          editor={editor}
          theme="dark"
        />
      </div>

      {/* Clear */}
      <div className="mt-4">
        <button onClick={handleClear} className="text-xs text-muted hover:text-red-400 transition-colors">
          clear all
        </button>
      </div>
    </div>
  );
}
