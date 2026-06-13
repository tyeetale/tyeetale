import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import PromptImprover from './PromptImprover';
import SystemPromptGenerator from './SystemPromptGenerator';
import ValuationCalc from './ValuationCalc';

export default function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
      {/* Productivity */}
      <div className="sm:col-span-2">
        <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground">
          Productivity
        </h2>
      </div>
      <BentoCard className="sm:col-span-2"><LiveClock /></BentoCard>
      <BentoCard className="sm:col-span-2"><PomodoroTimer /></BentoCard>

      {/* Developer */}
      <div className="sm:col-span-2 mt-6">
        <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground">
          Developer
        </h2>
      </div>
      <BentoCard className="sm:col-span-2"><JsonFormatter /></BentoCard>
      <BentoCard className="sm:col-span-2"><RegexTester /></BentoCard>
      <BentoCard><UuidGenerator /></BentoCard>
      <BentoCard><TimestampConverter /></BentoCard>
      <BentoCard className="sm:col-span-2"><CronExpressionBuilder /></BentoCard>
      <BentoCard className="sm:col-span-2"><HttpStatusCodeReference /></BentoCard>

      {/* Writing */}
      <div className="sm:col-span-2 mt-6">
        <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground">
          Writing
        </h2>
      </div>
      <BentoCard><WordCounter /></BentoCard>
      <BentoCard><TokenCounter /></BentoCard>

      {/* Finance */}
      <div className="sm:col-span-2 mt-6">
        <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground">
          Finance
        </h2>
      </div>
      <BentoCard className="sm:col-span-2"><ValuationCalc /></BentoCard>

      {/* AI Tools */}
      <div className="sm:col-span-2 mt-6">
        <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground">
          AI Tools
        </h2>
      </div>
      <BentoCard className="sm:col-span-2"><PromptImprover /></BentoCard>
      <BentoCard className="sm:col-span-2"><SystemPromptGenerator /></BentoCard>

      {/* Resources */}
      <div className="sm:col-span-2 mt-6">
        <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground">
          Resources
        </h2>
      </div>
      <BentoCard className="sm:col-span-2">
        <div>
          <h3 className="text-xs font-heading font-semibold uppercase tracking-widest text-foreground mb-3">
            Curated Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <ResourceLink title="Anthropic Cookbook" href="https://github.com/anthropics/anthropic-cookbook" description="Prompt engineering patterns" />
            <ResourceLink title="OpenAI Cookbook" href="https://github.com/openai/openai-cookbook" description="API usage examples" />
            <ResourceLink title="Awesome MCP Servers" href="https://github.com/punkpeye/awesome-mcp-servers" description="Community MCP servers" />
            <ResourceLink title="LangChain" href="https://github.com/langchain-ai/langchain" description="LLM orchestration framework" />
            <ResourceLink title="Vercel AI SDK" href="https://github.com/vercel/ai" description="Streaming AI UI toolkit" />
            <ResourceLink title="Cloudflare Skills" href="https://github.com/cloudflare/skills" description="AI agent skills" />
            <ResourceLink title="Prompt Engineering Guide" href="https://github.com/dair-ai/Prompt-Engineering-Guide" description="Comprehensive prompt guide" />
            <ResourceLink title="AI Agent Frameworks" href="https://github.com/e2b-dev/awesome-ai-agents" description="Curated agent repos" />
          </div>
        </div>
      </BentoCard>
    </div>
  );
}

function BentoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-border rounded-xl p-4 bg-surface/50 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function ResourceLink({ title, href, description }: { title: string; href: string; description: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col p-2 rounded border border-border hover:border-muted-foreground transition-colors"
    >
      <span className="text-foreground text-xs font-medium">{title}</span>
      <span className="text-muted text-[0.7rem]">{description}</span>
    </a>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-xs text-muted uppercase tracking-widest">Local time</span>
        <div className="font-heading text-3xl sm:text-4xl text-foreground font-bold tracking-tight tabular-nums">
          {hours}:{minutes}
          <span className="text-muted text-2xl sm:text-3xl">:{seconds}</span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs text-muted">
          {time.toLocaleDateString("en-US", { weekday: "long" })}
        </span>
        <div className="text-sm text-muted-foreground">
          {time.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </div>
      </div>
    </div>
  );
}

/* =============================================
   UTILITY TOOLS
   ============================================= */

function PomodoroTimer() {
  const [mode, setMode] = useState<"work" | "break">("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const playBeep = useCallback(() => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      osc.type = "sine";
      gain.gain.value = 0.3;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Audio not supported
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, playBeep]);

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(mode === "work" ? 25 * 60 : 5 * 60);
  };

  const toggleMode = () => {
    const newMode = mode === "work" ? "break" : "work";
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === "work" ? 25 * 60 : 5 * 60);
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const secs = (timeLeft % 60).toString().padStart(2, "0");
  const totalTime = mode === "work" ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1">
        <span className="text-xs text-muted uppercase tracking-widest">
          Pomodoro — {mode === "work" ? "Work" : "Break"}
        </span>
        <div className="font-heading text-4xl text-foreground font-bold tracking-tight tabular-nums mt-1">
          {mins}:{secs}
        </div>
        <div className="w-full bg-border rounded-full h-1.5 mt-2">
          <div
            className="h-1.5 rounded-full transition-all duration-1000"
            style={{
              width: `${progress}%`,
              backgroundColor: mode === "work" ? "hsl(0, 70%, 60%)" : "hsl(140, 70%, 50%)",
            }}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          className="px-3 py-1.5 text-sm border border-border rounded-md text-foreground hover:bg-surface"
        >
          Reset
        </button>
        <button
          onClick={toggleMode}
          className="px-3 py-1.5 text-sm border border-border rounded-md text-foreground hover:bg-surface"
        >
          {mode === "work" ? "Break" : "Work"}
        </button>
      </div>
    </div>
  );
}

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const highlightJson = (json: string) => {
    return json.replace(
      /("(?:\\.|[^"\\])*")\s*:/g,
      '<span class="text-blue-400">$1</span>:'
    ).replace(
      /:\s*("(?:\\.|[^"\\])*")/g,
      ': <span class="text-green-400">$1</span>'
    ).replace(
      /:\s*(\d+\.?\d*)/g,
      ': <span class="text-yellow-400">$1</span>'
    ).replace(
      /:\s*(true|false|null)/g,
      ': <span class="text-purple-400">$1</span>'
    );
  };

  return (
    <div>
      <span className="text-xs text-muted uppercase tracking-widest">JSON Formatter</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-[160px] bg-surface border border-border rounded-md text-foreground text-sm px-3 py-2 focus:outline-none focus:border-muted-foreground font-mono resize-none"
          />
          <button
            onClick={format}
            className="mt-2 px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90"
          >
            Format
          </button>
        </div>
        <div>
          {error && (
            <div className="text-red-400 text-sm mb-2 font-mono">{error}</div>
          )}
          {output && (
            <pre
              className="w-full h-[160px] overflow-auto bg-surface border border-border rounded-md text-sm px-3 py-2 font-mono"
              dangerouslySetInnerHTML={{ __html: highlightJson(output) }}
            />
          )}
          {!output && !error && (
            <div className="w-full h-[160px] bg-surface border border-border rounded-md text-muted text-sm px-3 py-2 flex items-center justify-center">
              Formatted output appears here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const { highlighted, matchCount, groups } = useMemo(() => {
    if (!pattern || !testString) {
      return { highlighted: testString, matchCount: 0, groups: [] as string[][] };
    }
    try {
      const regex = new RegExp(pattern, flags);
      let count = 0;
      const allGroups: string[][] = [];
      const parts: string[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      // Reset regex for iteration
      const iterRegex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      while ((match = iterRegex.exec(testString)) !== null) {
        count++;
        if (match.index > lastIndex) {
          parts.push(escapeHtml(testString.slice(lastIndex, match.index)));
        }
        parts.push(`<mark class="bg-yellow-300/40 text-foreground rounded px-0.5">${escapeHtml(match[0])}</mark>`);
        if (match.length > 1) {
          allGroups.push(match.slice(1));
        }
        lastIndex = match.index + match[0].length;
        if (match[0].length === 0) {
          iterRegex.lastIndex++;
        }
      }
      if (lastIndex < testString.length) {
        parts.push(escapeHtml(testString.slice(lastIndex)));
      }
      return { highlighted: parts.join(""), matchCount: count, groups: allGroups };
    } catch {
      return { highlighted: escapeHtml(testString), matchCount: 0, groups: [] as string[][] };
    }
  }, [pattern, flags, testString]);

  let regexError = "";
  try {
    if (pattern) new RegExp(pattern, flags);
  } catch (e) {
    regexError = e instanceof Error ? e.message : "Invalid regex";
  }

  return (
    <div>
      <span className="text-xs text-muted uppercase tracking-widest">Regex Tester</span>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Pattern (e.g. \d+)"
          className="flex-1 bg-surface border border-border rounded-md text-foreground text-sm px-3 py-2 focus:outline-none focus:border-muted-foreground font-mono"
        />
        <input
          type="text"
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          placeholder="Flags"
          className="w-16 bg-surface border border-border rounded-md text-foreground text-sm px-3 py-2 focus:outline-none focus:border-muted-foreground font-mono"
        />
      </div>
      {regexError && <div className="text-red-400 text-xs mt-1 font-mono">{regexError}</div>}
      <textarea
        value={testString}
        onChange={(e) => setTestString(e.target.value)}
        placeholder="Test string..."
        className="w-full mt-2 h-[80px] bg-surface border border-border rounded-md text-foreground text-sm px-3 py-2 focus:outline-none focus:border-muted-foreground font-mono resize-none"
      />
      {testString && (
        <div className="mt-2">
          <div
            className="bg-surface border border-border rounded-md text-sm px-3 py-2 font-mono whitespace-pre-wrap break-all"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
          <div className="flex gap-4 mt-2 text-xs text-muted">
            <span>{matchCount} match{matchCount !== 1 ? "es" : ""}</span>
            {groups.length > 0 && (
              <span>Groups: {groups.map((g, i) => `[${i + 1}]: ${g.join(", ")}`).join(" | ")}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const uuid = crypto.randomUUID();
    setUuids((prev) => [uuid, ...prev].slice(0, 5));
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (uuids.length > 0) {
      navigator.clipboard.writeText(uuids[0]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div>
      <span className="text-xs text-muted uppercase tracking-widest">UUID Generator</span>
      <div className="flex gap-2 mt-2">
        <button
          onClick={generate}
          className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90"
        >
          Generate
        </button>
        <button
          onClick={copyToClipboard}
          disabled={uuids.length === 0}
          className="px-3 py-1.5 text-sm border border-border rounded-md text-foreground hover:bg-surface disabled:opacity-40"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="mt-3 space-y-1">
        {uuids.map((uuid, i) => (
          <div
            key={uuid}
            className={`font-mono text-xs ${i === 0 ? "text-foreground" : "text-muted"}`}
          >
            {uuid}
          </div>
        ))}
        {uuids.length === 0 && (
          <div className="text-xs text-muted">Click Generate to create a UUID v4</div>
        )}
      </div>
    </div>
  );
}

function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0) : 0;
    const readingTime = Math.ceil(words / 200);
    return { words, chars, sentences, readingTime };
  }, [text]);

  return (
    <div>
      <span className="text-xs text-muted uppercase tracking-widest">Word Counter</span>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste text..."
        className="w-full mt-2 h-[80px] bg-surface border border-border rounded-md text-foreground text-sm px-3 py-2 focus:outline-none focus:border-muted-foreground resize-none"
      />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="text-xs">
          <span className="text-muted">Words:</span>{" "}
          <span className="text-foreground font-mono">{stats.words}</span>
        </div>
        <div className="text-xs">
          <span className="text-muted">Chars:</span>{" "}
          <span className="text-foreground font-mono">{stats.chars}</span>
        </div>
        <div className="text-xs">
          <span className="text-muted">Sentences:</span>{" "}
          <span className="text-foreground font-mono">{stats.sentences}</span>
        </div>
        <div className="text-xs">
          <span className="text-muted">Reading:</span>{" "}
          <span className="text-foreground font-mono">~{stats.readingTime} min</span>
        </div>
      </div>
    </div>
  );
}

function TokenCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    // Rough heuristic: ~1.3 tokens per word for English
    const estimatedTokens = Math.ceil(words * 1.3);
    // GPT-4: ~$30/1M input, ~$60/1M output (approx)
    const gpt4Cost = (estimatedTokens / 1_000_000) * 30;
    // Claude Opus: ~$15/1M input, ~$75/1M output (approx)
    const claudeCost = (estimatedTokens / 1_000_000) * 15;
    return { words, estimatedTokens, gpt4Cost, claudeCost };
  }, [text]);

  return (
    <div>
      <span className="text-xs text-muted uppercase tracking-widest">Token Counter</span>
      <span className="text-[10px] text-muted ml-2">(estimate)</span>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text to estimate tokens..."
        className="w-full mt-2 h-[80px] bg-surface border border-border rounded-md text-foreground text-sm px-3 py-2 focus:outline-none focus:border-muted-foreground resize-none"
      />
      <div className="mt-2 space-y-1">
        <div className="text-xs">
          <span className="text-muted">Est. tokens:</span>{" "}
          <span className="text-foreground font-mono">{stats.estimatedTokens}</span>
        </div>
        <div className="text-xs">
          <span className="text-muted">GPT-4 input:</span>{" "}
          <span className="text-foreground font-mono">~${stats.gpt4Cost.toFixed(6)}</span>
        </div>
        <div className="text-xs">
          <span className="text-muted">Claude input:</span>{" "}
          <span className="text-foreground font-mono">~${stats.claudeCost.toFixed(6)}</span>
        </div>
        <div className="text-[10px] text-muted mt-1">
          Estimate based on ~1.3 tokens/word. Actual count varies by model tokenizer.
        </div>
      </div>
    </div>
  );
}

function TimestampConverter() {
  const [input, setInput] = useState("");
  const [unit, setUnit] = useState<"s" | "ms">("s");
  const [dateInput, setDateInput] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const parsed = useMemo(() => {
    if (!input.trim()) return null;
    const num = Number(input.trim());
    if (isNaN(num)) return null;
    const ms = unit === "s" ? num * 1000 : num;
    const date = new Date(ms);
    if (isNaN(date.getTime())) return null;

    const diff = now - ms;
    let relative = "";
    const absDiff = Math.abs(diff);
    if (absDiff < 60000) relative = "just now";
    else if (absDiff < 3600000) relative = `${Math.floor(absDiff / 60000)} min ${diff > 0 ? "ago" : "from now"}`;
    else if (absDiff < 86400000) relative = `${Math.floor(absDiff / 3600000)} hr ${diff > 0 ? "ago" : "from now"}`;
    else relative = `${Math.floor(absDiff / 86400000)} day${Math.floor(absDiff / 86400000) > 1 ? "s" : ""} ${diff > 0 ? "ago" : "from now"}`;

    return {
      iso: date.toISOString(),
      local: date.toLocaleString(),
      relative,
    };
  }, [input, unit, now]);

  const dateToTimestamp = useMemo(() => {
    if (!dateInput.trim()) return null;
    const date = new Date(dateInput.trim());
    if (isNaN(date.getTime())) return null;
    return {
      seconds: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
    };
  }, [dateInput]);

  return (
    <div>
      <span className="text-xs text-muted uppercase tracking-widest">Timestamp Converter</span>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Unix timestamp"
          className="flex-1 bg-surface border border-border rounded-md text-foreground text-sm px-3 py-2 focus:outline-none focus:border-muted-foreground font-mono"
        />
        <button
          onClick={() => setUnit(unit === "s" ? "ms" : "s")}
          className="px-3 py-1.5 text-sm border border-border rounded-md text-foreground hover:bg-surface font-mono"
        >
          {unit}
        </button>
      </div>
      {parsed && (
        <div className="mt-2 space-y-1 text-xs">
          <div><span className="text-muted">ISO:</span> <span className="text-foreground font-mono">{parsed.iso}</span></div>
          <div><span className="text-muted">Local:</span> <span className="text-foreground font-mono">{parsed.local}</span></div>
          <div><span className="text-muted">Relative:</span> <span className="text-foreground font-mono">{parsed.relative}</span></div>
        </div>
      )}
      <div className="mt-3 pt-3 border-t border-border">
        <input
          type="text"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          placeholder="Date string (e.g. 2024-01-15T10:30:00Z)"
          className="w-full bg-surface border border-border rounded-md text-foreground text-sm px-3 py-2 focus:outline-none focus:border-muted-foreground font-mono"
        />
        {dateToTimestamp && (
          <div className="mt-2 space-y-1 text-xs">
            <div><span className="text-muted">Seconds:</span> <span className="text-foreground font-mono">{dateToTimestamp.seconds}</span></div>
            <div><span className="text-muted">Milliseconds:</span> <span className="text-foreground font-mono">{dateToTimestamp.milliseconds}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

function CronExpressionBuilder() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");

  const expression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const description = useMemo(() => {
    const parts: string[] = [];

    if (minute === "*" && hour === "*" && dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
      return "Every minute";
    }

    if (minute !== "*" && hour !== "*") {
      const h = parseInt(hour);
      const m = parseInt(minute);
      if (!isNaN(h) && !isNaN(m)) {
        const period = h >= 12 ? "PM" : "AM";
        const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
        parts.push(`At ${displayHour}:${m.toString().padStart(2, "0")} ${period}`);
      } else {
        parts.push(`At minute ${minute} of hour ${hour}`);
      }
    } else if (minute !== "*") {
      if (minute.startsWith("*/")) {
        parts.push(`Every ${minute.slice(2)} minutes`);
      } else {
        parts.push(`At minute ${minute}`);
      }
    } else if (hour !== "*") {
      if (hour.startsWith("*/")) {
        parts.push(`Every ${hour.slice(2)} hours`);
      } else {
        parts.push(`At hour ${hour}`);
      }
    }

    if (dayOfWeek !== "*") {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const d = parseInt(dayOfWeek);
      if (!isNaN(d) && d >= 0 && d <= 6) {
        parts.push(`on ${days[d]}`);
      } else {
        parts.push(`on day-of-week ${dayOfWeek}`);
      }
    }

    if (dayOfMonth !== "*") {
      parts.push(`on day ${dayOfMonth} of the month`);
    }

    if (month !== "*") {
      const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const m = parseInt(month);
      if (!isNaN(m) && m >= 1 && m <= 12) {
        parts.push(`in ${months[m]}`);
      } else {
        parts.push(`in month ${month}`);
      }
    }

    return parts.length > 0 ? parts.join(" ") : "Every minute";
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const applyPreset = (preset: string) => {
    switch (preset) {
      case "every-minute":
        setMinute("*"); setHour("*"); setDayOfMonth("*"); setMonth("*"); setDayOfWeek("*");
        break;
      case "every-hour":
        setMinute("0"); setHour("*"); setDayOfMonth("*"); setMonth("*"); setDayOfWeek("*");
        break;
      case "daily-midnight":
        setMinute("0"); setHour("0"); setDayOfMonth("*"); setMonth("*"); setDayOfWeek("*");
        break;
      case "weekly-mon-9am":
        setMinute("0"); setHour("9"); setDayOfMonth("*"); setMonth("*"); setDayOfWeek("1");
        break;
    }
  };

  const inputClass = "w-full bg-surface border border-border rounded-md text-foreground text-sm px-2 py-1.5 focus:outline-none focus:border-muted-foreground font-mono text-center";

  return (
    <div>
      <span className="text-xs text-muted uppercase tracking-widest">Cron Expression Builder</span>
      <div className="mt-3 grid grid-cols-5 gap-2">
        <div>
          <label className="text-[10px] text-muted block text-center mb-1">Minute</label>
          <input type="text" value={minute} onChange={(e) => setMinute(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="text-[10px] text-muted block text-center mb-1">Hour</label>
          <input type="text" value={hour} onChange={(e) => setHour(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="text-[10px] text-muted block text-center mb-1">Day (M)</label>
          <input type="text" value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="text-[10px] text-muted block text-center mb-1">Month</label>
          <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="text-[10px] text-muted block text-center mb-1">Day (W)</label>
          <input type="text" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} className={inputClass} />
        </div>
      </div>
      <div className="mt-3 bg-surface border border-border rounded-md px-3 py-2">
        <div className="font-mono text-sm text-foreground">{expression}</div>
        <div className="text-xs text-muted mt-1">{description}</div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <button onClick={() => applyPreset("every-minute")} className="px-2 py-1 text-[10px] border border-border rounded text-muted hover:text-foreground hover:bg-surface">Every minute</button>
        <button onClick={() => applyPreset("every-hour")} className="px-2 py-1 text-[10px] border border-border rounded text-muted hover:text-foreground hover:bg-surface">Every hour</button>
        <button onClick={() => applyPreset("daily-midnight")} className="px-2 py-1 text-[10px] border border-border rounded text-muted hover:text-foreground hover:bg-surface">Daily midnight</button>
        <button onClick={() => applyPreset("weekly-mon-9am")} className="px-2 py-1 text-[10px] border border-border rounded text-muted hover:text-foreground hover:bg-surface">Mon 9 AM</button>
      </div>
    </div>
  );
}

function HttpStatusCodeReference() {
  const [search, setSearch] = useState("");

  const codes = [
    { code: 200, name: "OK", desc: "Request succeeded" },
    { code: 201, name: "Created", desc: "Resource created successfully" },
    { code: 204, name: "No Content", desc: "Success with no response body" },
    { code: 301, name: "Moved Permanently", desc: "Resource permanently moved to new URL" },
    { code: 302, name: "Found", desc: "Resource temporarily at different URL" },
    { code: 304, name: "Not Modified", desc: "Resource unchanged since last request" },
    { code: 400, name: "Bad Request", desc: "Server cannot process malformed request" },
    { code: 401, name: "Unauthorized", desc: "Authentication required" },
    { code: 403, name: "Forbidden", desc: "Server refuses to authorize request" },
    { code: 404, name: "Not Found", desc: "Resource does not exist" },
    { code: 405, name: "Method Not Allowed", desc: "HTTP method not supported for resource" },
    { code: 408, name: "Request Timeout", desc: "Server timed out waiting for request" },
    { code: 409, name: "Conflict", desc: "Request conflicts with current server state" },
    { code: 429, name: "Too Many Requests", desc: "Rate limit exceeded" },
    { code: 500, name: "Internal Server Error", desc: "Unexpected server-side error" },
    { code: 502, name: "Bad Gateway", desc: "Invalid response from upstream server" },
    { code: 503, name: "Service Unavailable", desc: "Server temporarily unavailable" },
    { code: 504, name: "Gateway Timeout", desc: "Upstream server timed out" },
  ];

  const filtered = codes.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.code.toString().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q)
    );
  });

  const getStatusColor = (code: number) => {
    if (code < 300) return "text-green-400";
    if (code < 400) return "text-blue-400";
    if (code < 500) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div>
      <span className="text-xs text-muted uppercase tracking-widest">HTTP Status Codes</span>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search codes..."
        className="w-full mt-2 bg-surface border border-border rounded-md text-foreground text-sm px-3 py-2 focus:outline-none focus:border-muted-foreground"
      />
      <div className="mt-2 max-h-[240px] overflow-y-auto space-y-1">
        {filtered.map((c) => (
          <div key={c.code} className="flex items-baseline gap-2 py-1 border-b border-border/50 last:border-0">
            <span className={`font-mono text-sm font-bold ${getStatusColor(c.code)}`}>{c.code}</span>
            <span className="text-sm text-foreground">{c.name}</span>
            <span className="text-xs text-muted ml-auto hidden sm:inline">{c.desc}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-xs text-muted py-2">No matching status codes</div>
        )}
      </div>
    </div>
  );
}
