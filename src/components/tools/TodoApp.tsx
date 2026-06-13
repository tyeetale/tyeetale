import { useState, useEffect, useRef } from 'react';

interface TodoNode {
  id: string;
  text: string;
  done: boolean;
  children: TodoNode[];
  collapsed?: boolean;
}

const STORAGE_KEY = 'tyeetale-todos-v3';
const AI_URL = 'https://graph-chat.thomasyee28.workers.dev/chat';

function genId() { return crypto.randomUUID(); }

export default function TodoApp() {
  const [todos, setTodos] = useState<TodoNode[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [importing, setImporting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Recursive count
  function countAll(nodes: TodoNode[]): { total: number; done: number } {
    let total = 0, done = 0;
    for (const node of nodes) {
      total++; if (node.done) done++;
      const c = countAll(node.children);
      total += c.total; done += c.done;
    }
    return { total, done };
  }

  // Tree operations
  function updateTree(nodes: TodoNode[], id: string, fn: (n: TodoNode) => TodoNode): TodoNode[] {
    return nodes.map(n => n.id === id ? fn(n) : { ...n, children: updateTree(n.children, id, fn) });
  }

  function deleteFromTree(nodes: TodoNode[], id: string): TodoNode[] {
    return nodes.filter(n => n.id !== id).map(n => ({ ...n, children: deleteFromTree(n.children, id) }));
  }

  function toggleDone(id: string) {
    function cascade(nodes: TodoNode[], targetId: string): TodoNode[] {
      return nodes.map(n => {
        if (n.id === targetId) {
          const newDone = !n.done;
          return { ...n, done: newDone, children: setAll(n.children, newDone) };
        }
        return { ...n, children: cascade(n.children, targetId) };
      });
    }
    function setAll(nodes: TodoNode[], done: boolean): TodoNode[] {
      return nodes.map(n => ({ ...n, done, children: setAll(n.children, done) }));
    }
    setTodos(cascade(todos, id));
  }

  function updateText(id: string, text: string) {
    setTodos(updateTree(todos, id, n => ({ ...n, text })));
  }

  function toggleCollapse(id: string) {
    setTodos(updateTree(todos, id, n => ({ ...n, collapsed: !n.collapsed })));
  }

  function deleteTodo(id: string) {
    setTodos(deleteFromTree(todos, id));
  }

  function addChild(parentId: string) {
    const newNode: TodoNode = { id: genId(), text: '', done: false, children: [] };
    setTodos(updateTree(todos, parentId, n => ({ ...n, children: [...n.children, newNode], collapsed: false })));
    return newNode.id;
  }

  function addTopLevel() {
    const newNode: TodoNode = { id: genId(), text: '', done: false, children: [] };
    setTodos([...todos, newNode]);
    return newNode.id;
  }

  function addAfter(nodes: TodoNode[], id: string): { nodes: TodoNode[]; newId: string | null } {
    let newId: string | null = null;
    const result: TodoNode[] = [];
    for (const node of nodes) {
      const childResult = addAfter(node.children, id);
      result.push({ ...node, children: childResult.nodes });
      if (childResult.newId) newId = childResult.newId;
      if (node.id === id && !newId) {
        const nn: TodoNode = { id: genId(), text: '', done: false, children: [] };
        result.push(nn);
        newId = nn.id;
      }
    }
    return { nodes: result, newId };
  }

  function indentNode(nodes: TodoNode[], id: string): TodoNode[] {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id && i > 0) {
        const node = nodes[i];
        const prev = nodes[i - 1];
        return [...nodes.slice(0, i - 1), { ...prev, children: [...prev.children, node], collapsed: false }, ...nodes.slice(i + 1)];
      }
      const updated = indentNode(nodes[i].children, id);
      if (updated !== nodes[i].children) {
        return nodes.map((n, idx) => idx === i ? { ...n, children: updated } : n);
      }
    }
    return nodes;
  }

  function outdentNode(nodes: TodoNode[], id: string): TodoNode[] {
    for (let i = 0; i < nodes.length; i++) {
      const childIdx = nodes[i].children.findIndex(c => c.id === id);
      if (childIdx !== -1) {
        const child = nodes[i].children[childIdx];
        const newChildren = nodes[i].children.filter(c => c.id !== id);
        return [...nodes.slice(0, i), { ...nodes[i], children: newChildren }, child, ...nodes.slice(i + 1)];
      }
      const updated = outdentNode(nodes[i].children, id);
      if (updated !== nodes[i].children) {
        return nodes.map((n, idx) => idx === i ? { ...n, children: updated } : n);
      }
    }
    return nodes;
  }

  // Parse markdown to tree
  function parseMarkdown(text: string): TodoNode[] {
    const lines = text.split('\n');
    const root: TodoNode[] = [];
    const stack: { nodes: TodoNode[]; indent: number }[] = [{ nodes: root, indent: -2 }];

    for (const line of lines) {
      if (line.trim() === '' || line.trim().startsWith('#')) continue;
      const match = line.match(/^(\s*)([-*]|\d+\.)\s*(\[[ x]\]\s*)?(.*)/);
      if (!match) {
        // Try plain indented text without bullet
        const plainMatch = line.match(/^(\s+)(.*)/);
        if (plainMatch && plainMatch[2].trim()) {
          const indent = plainMatch[1].length;
          const text = plainMatch[2].trim();
          const node: TodoNode = { id: genId(), text, done: false, children: [] };
          while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop();
          stack[stack.length - 1].nodes.push(node);
          stack.push({ nodes: node.children, indent });
        }
        continue;
      }
      const indent = match[1].length;
      const done = (match[3] || '').includes('x');
      const nodeText = match[4].trim();
      if (!nodeText) continue;

      const node: TodoNode = { id: genId(), text: nodeText, done, children: [] };
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop();
      stack[stack.length - 1].nodes.push(node);
      stack.push({ nodes: node.children, indent });
    }
    return root;
  }

  // Import with AI fallback
  async function handleImport() {
    if (!importText.trim()) return;
    setImporting(true);

    // Try local parsing first
    const parsed = parseMarkdown(importText);

    if (parsed.length > 0) {
      setTodos([...todos, ...parsed]);
      setImportText('');
      setShowImport(false);
      setImporting(false);
      return;
    }

    // AI fallback: ask the model to structure it
    try {
      const res = await fetch(AI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Convert the following text into a structured markdown checklist with proper indentation for subtasks. Use "- " for items and "  - " for sub-items. Only output the markdown list, nothing else:\n\n${importText}`
        }),
      });
      const structured = await res.text();
      const aiParsed = parseMarkdown(structured);
      if (aiParsed.length > 0) {
        setTodos([...todos, ...aiParsed]);
        setImportText('');
        setShowImport(false);
      }
    } catch {
      // If AI fails too, just add as single items line by line
      const fallback = importText.split('\n').filter(l => l.trim()).map(l => ({
        id: genId(), text: l.trim().replace(/^[-*]\s*/, ''), done: false, children: []
      }));
      setTodos([...todos, ...fallback]);
      setImportText('');
      setShowImport(false);
    } finally {
      setImporting(false);
    }
  }

  // Export
  function exportMarkdown() {
    function render(nodes: TodoNode[], depth: number): string {
      let md = '';
      for (const node of nodes) {
        const indent = '  '.repeat(depth);
        const check = node.done ? '[x]' : '[ ]';
        md += `${indent}- ${check} ${node.text}\n`;
        md += render(node.children, depth + 1);
      }
      return md;
    }
    navigator.clipboard.writeText(render(todos, 0).trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const { total, done } = countAll(todos);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-heading font-bold text-xl text-foreground">Tasks</h1>
        <div className="flex gap-2 items-center">
          {total > 0 && <span className="text-muted text-xs">{done}/{total}</span>}
          <button onClick={() => setShowImport(!showImport)} className="text-xs text-muted border border-border px-2 py-1 rounded hover:text-foreground transition-colors">
            import
          </button>
          <button onClick={exportMarkdown} className="text-xs text-muted border border-border px-2 py-1 rounded hover:text-foreground transition-colors">
            {copied ? 'copied!' : 'export'}
          </button>
        </div>
      </div>
      <p className="text-muted text-xs mb-6">
        Click to edit. Enter for new item. Tab to nest. Shift+Tab to unnest.
      </p>

      {/* Import */}
      {showImport && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-surface">
          <span className="text-xs text-muted block mb-2">Paste any list (markdown, plain text, or unstructured). AI will help parse if needed.</span>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder={`- Moss Strategy\n  - Build Swimlanes\n  - What is AI Native?\n- Onsite Strategy\n  - Stripe Integration`}
            rows={8}
            className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground placeholder-muted focus:outline-none focus:border-muted-foreground resize-none font-mono mb-3"
          />
          <div className="flex gap-2">
            <button onClick={handleImport} disabled={importing} className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90 disabled:opacity-50">
              {importing ? 'Parsing...' : 'Import'}
            </button>
            <button onClick={() => { setShowImport(false); setImportText(''); }} className="px-3 py-1.5 text-sm text-muted border border-border rounded-md hover:text-foreground transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* WYSIWYG Checklist */}
      <div className="min-h-[200px]">
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted text-sm mb-3">No tasks yet.</p>
            <button onClick={addTopLevel} className="text-xs text-muted border border-border px-3 py-1.5 rounded hover:text-foreground transition-colors">
              + add task
            </button>
          </div>
        ) : (
          <>
            <ChecklistTree
              nodes={todos}
              onToggle={toggleDone}
              onUpdate={updateText}
              onDelete={deleteTodo}
              onCollapse={toggleCollapse}
              onAddChild={addChild}
              onAddAfter={(id) => { const r = addAfter(todos, id); setTodos(r.nodes); }}
              onIndent={(id) => setTodos(indentNode(todos, id))}
              onOutdent={(id) => setTodos(outdentNode(todos, id))}
            />
            <button onClick={addTopLevel} className="text-xs text-muted hover:text-foreground transition-colors mt-3 ml-6">
              + add task
            </button>
          </>
        )}
      </div>

      {/* Clear */}
      {todos.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <button onClick={() => { if (confirm('Clear all tasks?')) setTodos([]); }} className="text-xs text-muted hover:text-red-400 transition-colors">
            clear all
          </button>
        </div>
      )}
    </div>
  );
}

// Recursive rendered checklist
interface ChecklistTreeProps {
  nodes: TodoNode[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onCollapse: (id: string) => void;
  onAddChild: (id: string) => void;
  onAddAfter: (id: string) => void;
  onIndent: (id: string) => void;
  onOutdent: (id: string) => void;
}

function ChecklistTree({ nodes, ...handlers }: ChecklistTreeProps) {
  return (
    <div className="space-y-0.5">
      {nodes.map(node => (
        <ChecklistItem key={node.id} node={node} {...handlers} />
      ))}
    </div>
  );
}

function ChecklistItem({ node, onToggle, onUpdate, onDelete, onCollapse, onAddChild, onAddAfter, onIndent, onOutdent }: ChecklistTreeProps & { node: TodoNode }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(node.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setText(node.text); }, [node.text]);
  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);

  function handleBlur() {
    setEditing(false);
    if (text !== node.text) onUpdate(node.id, text);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
      onAddAfter(node.id);
    } else if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      onIndent(node.id);
    } else if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      onOutdent(node.id);
    } else if (e.key === 'Backspace' && text === '') {
      e.preventDefault();
      onDelete(node.id);
    } else if (e.key === 'Escape') {
      setEditing(false);
      setText(node.text);
    }
  }

  const hasChildren = node.children.length > 0;
  const childDone = node.children.filter(c => c.done).length;

  return (
    <div>
      <div className="flex items-start gap-2 py-1 px-1 rounded group hover:bg-surface/50 transition-colors">
        {/* Collapse arrow */}
        <div className="w-4 pt-0.5 flex-shrink-0">
          {hasChildren && (
            <button onClick={() => onCollapse(node.id)} className="text-muted text-[0.7rem] hover:text-foreground w-4 h-4 flex items-center justify-center">
              {node.collapsed ? '\u25B8' : '\u25BE'}
            </button>
          )}
        </div>

        {/* Checkbox */}
        <input
          type="checkbox"
          checked={node.done}
          onChange={() => onToggle(node.id)}
          className="mt-1 w-4 h-4 rounded border-border accent-accent cursor-pointer flex-shrink-0"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-full text-sm bg-transparent text-foreground focus:outline-none py-0.5"
              placeholder="Task..."
            />
          ) : (
            <div
              onClick={() => setEditing(true)}
              className={`text-sm py-0.5 cursor-text min-h-[1.5rem] ${node.done ? 'line-through text-muted' : 'text-foreground'}`}
            >
              {node.text || <span className="text-muted/50 italic">click to edit</span>}
            </div>
          )}
        </div>

        {/* Meta + actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {hasChildren && <span className="text-muted text-[0.6rem]">{childDone}/{node.children.length}</span>}
          <button onClick={() => onAddChild(node.id)} className="text-muted text-xs hover:text-foreground" title="Add subtask">+</button>
          <button onClick={() => onDelete(node.id)} className="text-muted text-xs hover:text-red-400" title="Delete">&times;</button>
        </div>
      </div>

      {/* Children */}
      {hasChildren && !node.collapsed && (
        <div className="ml-6 border-l border-border/50 pl-2">
          <ChecklistTree
            nodes={node.children}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onCollapse={onCollapse}
            onAddChild={onAddChild}
            onAddAfter={onAddAfter}
            onIndent={onIndent}
            onOutdent={onOutdent}
          />
        </div>
      )}
    </div>
  );
}
