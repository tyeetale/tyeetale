import { useState, useEffect, useRef } from 'react';

interface TodoNode {
  id: string;
  text: string;
  done: boolean;
  children: TodoNode[];
  collapsed?: boolean;
}

const STORAGE_KEY = 'tyeetale-todos-v2';

function generateId() {
  return crypto.randomUUID();
}

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Count all items recursively
  function countAll(nodes: TodoNode[]): { total: number; done: number } {
    let total = 0, done = 0;
    for (const node of nodes) {
      total++;
      if (node.done) done++;
      const child = countAll(node.children);
      total += child.total;
      done += child.done;
    }
    return { total, done };
  }

  // Toggle done state (cascades to children)
  function toggleDone(nodes: TodoNode[], id: string): TodoNode[] {
    return nodes.map(node => {
      if (node.id === id) {
        const newDone = !node.done;
        return { ...node, done: newDone, children: setAllDone(node.children, newDone) };
      }
      return { ...node, children: toggleDone(node.children, id) };
    });
  }

  function setAllDone(nodes: TodoNode[], done: boolean): TodoNode[] {
    return nodes.map(n => ({ ...n, done, children: setAllDone(n.children, done) }));
  }

  // Toggle collapse
  function toggleCollapse(nodes: TodoNode[], id: string): TodoNode[] {
    return nodes.map(node => {
      if (node.id === id) return { ...node, collapsed: !node.collapsed };
      return { ...node, children: toggleCollapse(node.children, id) };
    });
  }

  // Update text
  function updateText(nodes: TodoNode[], id: string, text: string): TodoNode[] {
    return nodes.map(node => {
      if (node.id === id) return { ...node, text };
      return { ...node, children: updateText(node.children, id, text) };
    });
  }

  // Delete node
  function deleteNode(nodes: TodoNode[], id: string): TodoNode[] {
    return nodes.filter(n => n.id !== id).map(node => ({
      ...node, children: deleteNode(node.children, id)
    }));
  }

  // Add sibling after a node
  function addAfter(nodes: TodoNode[], id: string): TodoNode[] {
    const result: TodoNode[] = [];
    for (const node of nodes) {
      result.push({ ...node, children: addAfter(node.children, id) });
      if (node.id === id) {
        const newNode = { id: generateId(), text: '', done: false, children: [] };
        result.push(newNode);
        // Focus the new node after render
        setTimeout(() => setEditingId(newNode.id), 0);
      }
    }
    return result;
  }

  // Indent: make node a child of the previous sibling
  function indentNode(nodes: TodoNode[], id: string): TodoNode[] {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id && i > 0) {
        const node = nodes[i];
        const prev = nodes[i - 1];
        const newNodes = [...nodes.slice(0, i), { ...prev, children: [...prev.children, node] }, ...nodes.slice(i + 1)];
        return newNodes;
      }
      const updatedChildren = indentNode(nodes[i].children, id);
      if (updatedChildren !== nodes[i].children) {
        return nodes.map((n, idx) => idx === i ? { ...n, children: updatedChildren } : n);
      }
    }
    return nodes;
  }

  // Outdent: move node up to parent's level
  function outdentNode(nodes: TodoNode[], id: string): TodoNode[] {
    for (let i = 0; i < nodes.length; i++) {
      const childIdx = nodes[i].children.findIndex(c => c.id === id);
      if (childIdx !== -1) {
        const child = nodes[i].children[childIdx];
        const newParentChildren = nodes[i].children.filter(c => c.id !== id);
        const newParent = { ...nodes[i], children: newParentChildren };
        return [...nodes.slice(0, i), newParent, child, ...nodes.slice(i + 1)];
      }
      const updatedChildren = outdentNode(nodes[i].children, id);
      if (updatedChildren !== nodes[i].children) {
        return nodes.map((n, idx) => idx === i ? { ...n, children: updatedChildren } : n);
      }
    }
    return nodes;
  }

  // Add new top-level item
  function addTopLevel() {
    const newNode = { id: generateId(), text: '', done: false, children: [] };
    setTodos([...todos, newNode]);
    setTimeout(() => setEditingId(newNode.id), 0);
  }

  // Import markdown
  function importMarkdown() {
    if (!importText.trim()) return;
    const lines = importText.split('\n');
    const root: TodoNode[] = [];
    const stack: { nodes: TodoNode[]; indent: number }[] = [{ nodes: root, indent: -1 }];

    for (const line of lines) {
      if (line.trim() === '' || line.trim().startsWith('#')) continue;

      const match = line.match(/^(\s*)([-*]|\d+\.)\s*(\[[ x]\]\s*)?(.*)/);
      if (!match) continue;

      const indent = match[1].length;
      const doneMatch = match[3] || '';
      const done = doneMatch.includes('x');
      const text = match[4].trim();

      if (!text) continue;

      const node: TodoNode = { id: generateId(), text, done, children: [] };

      // Find the right parent based on indent level
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }

      stack[stack.length - 1].nodes.push(node);
      stack.push({ nodes: node.children, indent });
    }

    setTodos([...todos, ...root]);
    setImportText('');
    setShowImport(false);
  }

  // Export markdown
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
    const md = `# Tasks\n\n${render(todos, 0)}`;
    navigator.clipboard.writeText(md.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const { total, done } = countAll(todos);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-heading font-bold text-xl text-foreground">Tasks</h1>
        <div className="flex gap-2 items-center">
          {total > 0 && (
            <span className="text-muted text-xs">{done}/{total}</span>
          )}
          <button
            onClick={() => setShowImport(!showImport)}
            className="text-xs text-muted border border-border px-2 py-1 rounded hover:text-foreground transition-colors"
          >
            import
          </button>
          <button
            onClick={exportMarkdown}
            className="text-xs text-muted border border-border px-2 py-1 rounded hover:text-foreground transition-colors"
          >
            {copied ? 'copied!' : 'export md'}
          </button>
        </div>
      </div>
      <p className="text-muted text-sm mb-4">
        Nested tasks with checkboxes. Tab to indent, Shift+Tab to outdent, Enter for new item.
      </p>

      {/* Import panel */}
      {showImport && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-surface">
          <span className="text-xs text-muted block mb-2">Paste a markdown list:</span>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder={`- Task one\n  - Subtask A\n  - Subtask B\n- Task two`}
            rows={8}
            className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground placeholder-muted focus:outline-none focus:border-muted-foreground resize-none font-mono mb-3"
          />
          <div className="flex gap-2">
            <button onClick={importMarkdown} className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">
              Import
            </button>
            <button onClick={() => { setShowImport(false); setImportText(''); }} className="px-3 py-1.5 text-sm text-muted border border-border rounded-md hover:text-foreground transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Task tree */}
      <div className="mb-4">
        <TodoTree
          nodes={todos}
          depth={0}
          editingId={editingId}
          onToggle={(id) => setTodos(toggleDone(todos, id))}
          onCollapse={(id) => setTodos(toggleCollapse(todos, id))}
          onUpdateText={(id, text) => setTodos(updateText(todos, id, text))}
          onDelete={(id) => { setTodos(deleteNode(todos, id)); setEditingId(null); }}
          onAddAfter={(id) => setTodos(addAfter(todos, id))}
          onIndent={(id) => setTodos(indentNode(todos, id))}
          onOutdent={(id) => setTodos(outdentNode(todos, id))}
          onStartEdit={(id) => setEditingId(id)}
          onStopEdit={() => setEditingId(null)}
        />
      </div>

      {/* Add button */}
      <button
        onClick={addTopLevel}
        className="text-xs text-muted hover:text-foreground transition-colors"
      >
        + add task
      </button>

      {/* Clear all */}
      {todos.length > 0 && (
        <button
          onClick={() => { if (confirm('Clear all tasks?')) setTodos([]); }}
          className="text-xs text-muted hover:text-red-400 transition-colors ml-4"
        >
          clear all
        </button>
      )}
    </div>
  );
}

interface TodoTreeProps {
  nodes: TodoNode[];
  depth: number;
  editingId: string | null;
  onToggle: (id: string) => void;
  onCollapse: (id: string) => void;
  onUpdateText: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onAddAfter: (id: string) => void;
  onIndent: (id: string) => void;
  onOutdent: (id: string) => void;
  onStartEdit: (id: string) => void;
  onStopEdit: () => void;
}

function TodoTree({ nodes, depth, editingId, onToggle, onCollapse, onUpdateText, onDelete, onAddAfter, onIndent, onOutdent, onStartEdit, onStopEdit }: TodoTreeProps) {
  return (
    <div style={{ paddingLeft: depth > 0 ? 20 : 0 }}>
      {nodes.map(node => (
        <TodoItem
          key={node.id}
          node={node}
          depth={depth}
          editingId={editingId}
          onToggle={onToggle}
          onCollapse={onCollapse}
          onUpdateText={onUpdateText}
          onDelete={onDelete}
          onAddAfter={onAddAfter}
          onIndent={onIndent}
          onOutdent={onOutdent}
          onStartEdit={onStartEdit}
          onStopEdit={onStopEdit}
        />
      ))}
    </div>
  );
}

interface TodoItemProps {
  node: TodoNode;
  depth: number;
  editingId: string | null;
  onToggle: (id: string) => void;
  onCollapse: (id: string) => void;
  onUpdateText: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onAddAfter: (id: string) => void;
  onIndent: (id: string) => void;
  onOutdent: (id: string) => void;
  onStartEdit: (id: string) => void;
  onStopEdit: () => void;
}

function TodoItem({ node, depth, editingId, onToggle, onCollapse, onUpdateText, onDelete, onAddAfter, onIndent, onOutdent, onStartEdit, onStopEdit }: TodoItemProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isEditing = editingId === node.id;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onStopEdit();
      onAddAfter(node.id);
    } else if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      onIndent(node.id);
    } else if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      onOutdent(node.id);
    } else if (e.key === 'Backspace' && node.text === '') {
      e.preventDefault();
      onDelete(node.id);
    } else if (e.key === 'Escape') {
      onStopEdit();
    }
  }

  const hasChildren = node.children.length > 0;
  const childCount = node.children.length;
  const childDone = node.children.filter(c => c.done).length;

  return (
    <div>
      <div className="flex items-center gap-1.5 py-0.5 group">
        {/* Collapse toggle */}
        {hasChildren ? (
          <button
            onClick={() => onCollapse(node.id)}
            className="w-4 h-4 flex items-center justify-center text-muted text-xs hover:text-foreground"
          >
            {node.collapsed ? '\u25B8' : '\u25BE'}
          </button>
        ) : (
          <span className="w-4" />
        )}

        {/* Checkbox */}
        <input
          type="checkbox"
          checked={node.done}
          onChange={() => onToggle(node.id)}
          className="w-3.5 h-3.5 rounded border-border accent-accent cursor-pointer"
        />

        {/* Text */}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={node.text}
            onChange={(e) => onUpdateText(node.id, e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={onStopEdit}
            className="flex-1 text-sm bg-transparent text-foreground focus:outline-none border-b border-border py-0.5"
            placeholder="Task..."
          />
        ) : (
          <span
            onClick={() => onStartEdit(node.id)}
            className={`flex-1 text-sm cursor-text py-0.5 ${node.done ? 'line-through text-muted' : 'text-foreground'}`}
          >
            {node.text || <span className="text-muted italic">empty</span>}
          </span>
        )}

        {/* Child count */}
        {hasChildren && !isEditing && (
          <span className="text-muted text-[0.6rem]">{childDone}/{childCount}</span>
        )}

        {/* Delete */}
        <button
          onClick={() => onDelete(node.id)}
          className="opacity-0 group-hover:opacity-100 text-muted text-xs hover:text-red-400 transition-all w-4"
        >
          &times;
        </button>
      </div>

      {/* Children */}
      {hasChildren && !node.collapsed && (
        <TodoTree
          nodes={node.children}
          depth={depth + 1}
          editingId={editingId}
          onToggle={onToggle}
          onCollapse={onCollapse}
          onUpdateText={onUpdateText}
          onDelete={onDelete}
          onAddAfter={onAddAfter}
          onIndent={onIndent}
          onOutdent={onOutdent}
          onStartEdit={onStartEdit}
          onStopEdit={onStopEdit}
        />
      )}
    </div>
  );
}
