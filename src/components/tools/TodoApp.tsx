import { useState, useEffect } from 'react';

interface Subtask {
  id: string;
  text: string;
  done: boolean;
}

interface Todo {
  id: string;
  text: string;
  status: 'todo' | 'in-progress' | 'done';
  subtasks: Subtask[];
  createdAt: number;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('tyeetale-todos-full');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [subtaskInput, setSubtaskInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tyeetale-todos-full', JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (!input.trim()) return;
    setTodos([...todos, {
      id: crypto.randomUUID(),
      text: input.trim(),
      status: 'todo',
      subtasks: [],
      createdAt: Date.now(),
    }]);
    setInput('');
  }

  function updateStatus(id: string, status: Todo['status']) {
    setTodos(todos.map(t => t.id === id ? { ...t, status } : t));
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter(t => t.id !== id));
    if (expandedId === id) setExpandedId(null);
  }

  function addSubtask(todoId: string) {
    if (!subtaskInput.trim()) return;
    setTodos(todos.map(t => t.id === todoId ? {
      ...t,
      subtasks: [...t.subtasks, { id: crypto.randomUUID(), text: subtaskInput.trim(), done: false }]
    } : t));
    setSubtaskInput('');
  }

  function toggleSubtask(todoId: string, subtaskId: string) {
    setTodos(todos.map(t => t.id === todoId ? {
      ...t,
      subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, done: !s.done } : s)
    } : t));
  }

  function deleteSubtask(todoId: string, subtaskId: string) {
    setTodos(todos.map(t => t.id === todoId ? {
      ...t,
      subtasks: t.subtasks.filter(s => s.id !== subtaskId)
    } : t));
  }

  function exportMarkdown() {
    const sections = {
      'todo': '## Todo\n',
      'in-progress': '## In Progress\n',
      'done': '## Done\n',
    };
    let md = '# Tasks\n\n';
    for (const [status, header] of Object.entries(sections)) {
      const items = todos.filter(t => t.status === status);
      if (items.length === 0) continue;
      md += header;
      for (const item of items) {
        const checkbox = status === 'done' ? '[x]' : '[ ]';
        md += `- ${checkbox} ${item.text}\n`;
        for (const sub of item.subtasks) {
          const subCheck = sub.done ? '[x]' : '[ ]';
          md += `  - ${subCheck} ${sub.text}\n`;
        }
      }
      md += '\n';
    }
    navigator.clipboard.writeText(md.trim());
  }

  const filtered = filter === 'all' ? todos : todos.filter(t => t.status === filter);
  const counts = {
    all: todos.length,
    todo: todos.filter(t => t.status === 'todo').length,
    'in-progress': todos.filter(t => t.status === 'in-progress').length,
    done: todos.filter(t => t.status === 'done').length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-heading font-bold text-xl text-foreground">Tasks</h1>
        <button
          onClick={exportMarkdown}
          className="text-xs text-muted border border-border px-2 py-1 rounded hover:text-foreground transition-colors"
        >
          export md
        </button>
      </div>
      <p className="text-muted text-sm mb-6">Manage tasks with subtasks. Persists locally. Export to markdown.</p>

      {/* Add task */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a task..."
          className="flex-1 px-3 py-2 text-sm bg-surface border border-border rounded-md text-foreground placeholder-muted focus:outline-none focus:border-muted-foreground"
        />
        <button onClick={addTodo} className="px-4 py-2 text-sm bg-foreground text-background rounded-md hover:opacity-90">
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['all', 'todo', 'in-progress', 'done'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
              filter === f ? 'border-muted-foreground text-foreground bg-surface' : 'border-border text-muted hover:text-foreground'
            }`}
          >
            {f === 'in-progress' ? 'in progress' : f} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {filtered.map(todo => (
          <div key={todo.id} className="border border-border rounded-lg overflow-hidden">
            <div className="flex items-center gap-3 px-3 py-2.5">
              {/* Status selector */}
              <select
                value={todo.status}
                onChange={(e) => updateStatus(todo.id, e.target.value as Todo['status'])}
                className="text-xs bg-surface border border-border rounded px-1.5 py-0.5 text-foreground focus:outline-none"
              >
                <option value="todo">todo</option>
                <option value="in-progress">in progress</option>
                <option value="done">done</option>
              </select>

              {/* Task text */}
              <span className={`flex-1 text-sm ${todo.status === 'done' ? 'line-through text-muted' : 'text-foreground'}`}>
                {todo.text}
              </span>

              {/* Subtask count */}
              {todo.subtasks.length > 0 && (
                <span className="text-muted text-xs">
                  {todo.subtasks.filter(s => s.done).length}/{todo.subtasks.length}
                </span>
              )}

              {/* Expand/collapse */}
              <button
                onClick={() => setExpandedId(expandedId === todo.id ? null : todo.id)}
                className="text-muted text-xs hover:text-foreground transition-colors"
              >
                {expandedId === todo.id ? '\u2212' : '+'}
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-muted text-xs hover:text-red-400 transition-colors"
              >
                \u00d7
              </button>
            </div>

            {/* Expanded: subtasks */}
            {expandedId === todo.id && (
              <div className="border-t border-border px-3 py-2 bg-surface/50">
                {todo.subtasks.map(sub => (
                  <div key={sub.id} className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      checked={sub.done}
                      onChange={() => toggleSubtask(todo.id, sub.id)}
                      className="rounded border-border"
                    />
                    <span className={`flex-1 text-xs ${sub.done ? 'line-through text-muted' : 'text-foreground'}`}>
                      {sub.text}
                    </span>
                    <button
                      onClick={() => deleteSubtask(todo.id, sub.id)}
                      className="text-muted text-xs hover:text-red-400"
                    >
                      \u00d7
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={subtaskInput}
                    onChange={(e) => setSubtaskInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSubtask(todo.id)}
                    placeholder="Add subtask..."
                    className="flex-1 px-2 py-1 text-xs bg-background border border-border rounded text-foreground placeholder-muted focus:outline-none"
                  />
                  <button
                    onClick={() => addSubtask(todo.id)}
                    className="text-xs text-muted hover:text-foreground transition-colors px-2"
                  >
                    add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-muted text-sm text-center py-8">
            {filter === 'all' ? 'No tasks yet. Add one above.' : `No ${filter} tasks.`}
          </p>
        )}
      </div>
    </div>
  );
}
