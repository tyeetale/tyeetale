import { useState, useEffect, useRef } from 'react';

type Mode = 'focus' | 'shortBreak' | 'longBreak';

interface Settings {
  focus: number;
  shortBreak: number;
  longBreak: number;
  sessionsBeforeLong: number;
  chimeType: 'bell' | 'birds' | 'ding' | 'silent';
}

const DEFAULT_SETTINGS: Settings = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  sessionsBeforeLong: 4,
  chimeType: 'bell',
};

export default function PomodoroApp() {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    try {
      const stored = localStorage.getItem('tyeetale-pomodoro-settings');
      return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });
  const [mode, setMode] = useState<Mode>('focus');
  const [timeLeft, setTimeLeft] = useState(settings.focus * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [session, setSession] = useState(1);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('tyeetale-pomodoro-settings', JSON.stringify(settings));
  }, [settings]);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            playChime();
            handleTimerComplete();
            return 0;
          }
          if (mode === 'focus') setTotalFocusTime(t => t + 1);
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, mode]);

  function handleTimerComplete() {
    setIsRunning(false);
    if (mode === 'focus') {
      if (session >= settings.sessionsBeforeLong) {
        setMode('longBreak');
        setTimeLeft(settings.longBreak * 60);
        setSession(1);
      } else {
        setMode('shortBreak');
        setTimeLeft(settings.shortBreak * 60);
      }
    } else {
      if (mode === 'shortBreak') setSession(s => s + 1);
      setMode('focus');
      setTimeLeft(settings.focus * 60);
    }
  }

  function playChime() {
    if (settings.chimeType === 'silent') return;
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (settings.chimeType === 'bell') {
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.5);
        osc.type = 'sine';
      } else if (settings.chimeType === 'birds') {
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.setValueAtTime(1400, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(1000, ctx.currentTime + 0.2);
        osc.type = 'sine';
      } else {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.type = 'triangle';
      }

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1);
    } catch {}
  }

  function reset() {
    setIsRunning(false);
    setMode('focus');
    setSession(1);
    setTimeLeft(settings.focus * 60);
  }

  function skipToNext() {
    setIsRunning(false);
    handleTimerComplete();
  }

  function getDuration(m: Mode) {
    if (m === 'focus') return settings.focus * 60;
    if (m === 'shortBreak') return settings.shortBreak * 60;
    return settings.longBreak * 60;
  }

  const totalDuration = getDuration(mode);
  const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const modeLabel = mode === 'focus' ? 'Focus' : mode === 'shortBreak' ? 'Short Break' : 'Long Break';
  const modeColor = mode === 'focus' ? 'text-accent' : mode === 'shortBreak' ? 'text-blue-400' : 'text-purple-400';
  const progressColor = mode === 'focus' ? 'bg-accent' : mode === 'shortBreak' ? 'bg-blue-400' : 'bg-purple-400';

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-heading font-bold text-xl text-foreground mb-2">Pomodoro Timer</h1>
      <p className="text-muted text-sm mb-8">Customizable focus sessions with chimes.</p>

      {/* Mode indicator */}
      <div className="flex gap-3 mb-6">
        {(['focus', 'shortBreak', 'longBreak'] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setTimeLeft(getDuration(m)); setIsRunning(false); }}
            className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
              mode === m ? 'border-muted-foreground text-foreground bg-surface' : 'border-border text-muted hover:text-foreground'
            }`}
          >
            {m === 'focus' ? 'Focus' : m === 'shortBreak' ? 'Short Break' : 'Long Break'}
          </button>
        ))}
      </div>

      {/* Timer display */}
      <div className="relative mb-6">
        <div className={`text-6xl font-mono font-bold tabular-nums ${modeColor}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <span className="text-muted text-xs block text-center mt-2">
          Session {session} of {settings.sessionsBeforeLong} &middot; {modeLabel}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs h-1.5 rounded-full bg-border mb-8 overflow-hidden">
        <div className={`h-full rounded-full transition-all ${progressColor}`} style={{ width: `${progress}%` }} />
      </div>

      {/* Session dots */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: settings.sessionsBeforeLong }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < session ? 'bg-accent' : 'bg-border'
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-2 text-sm bg-foreground text-background rounded-md hover:opacity-90 font-medium"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={skipToNext}
          className="px-4 py-2 text-sm border border-border text-muted rounded-md hover:text-foreground transition-colors"
        >
          Skip
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 text-sm border border-border text-muted rounded-md hover:text-foreground transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-8 text-center">
        <div className="p-3 bg-surface border border-border rounded-md">
          <span className="text-muted text-[0.65rem] block">Total focus</span>
          <span className="text-foreground text-sm font-medium">{Math.floor(totalFocusTime / 60)}m</span>
        </div>
      </div>

      {/* Settings toggle */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="text-xs text-muted hover:text-foreground transition-colors mb-4"
      >
        {showSettings ? 'hide settings' : 'settings'}
      </button>

      {/* Settings panel */}
      {showSettings && (
        <div className="w-full max-w-sm p-4 bg-surface border border-border rounded-lg space-y-3">
          <SettingRow label="Focus (min)" value={settings.focus} onChange={v => setSettings({...settings, focus: v})} min={1} max={90} />
          <SettingRow label="Short break (min)" value={settings.shortBreak} onChange={v => setSettings({...settings, shortBreak: v})} min={1} max={30} />
          <SettingRow label="Long break (min)" value={settings.longBreak} onChange={v => setSettings({...settings, longBreak: v})} min={1} max={60} />
          <SettingRow label="Sessions before long" value={settings.sessionsBeforeLong} onChange={v => setSettings({...settings, sessionsBeforeLong: v})} min={2} max={8} />
          <div className="flex items-center justify-between">
            <span className="text-muted text-xs">Chime sound</span>
            <div className="flex gap-1">
              {(['bell', 'birds', 'ding', 'silent'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setSettings({...settings, chimeType: c})}
                  className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                    settings.chimeType === c ? 'border-muted-foreground text-foreground bg-background' : 'border-border text-muted'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => { setSettings(DEFAULT_SETTINGS); reset(); }}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            reset to defaults
          </button>
        </div>
      )}
    </div>
  );
}

function SettingRow({ label, value, onChange, min, max }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted text-xs">{label}</span>
      <div className="flex items-center gap-2">
        <button onClick={() => onChange(Math.max(min, value - 1))} className="w-6 h-6 rounded border border-border text-muted hover:text-foreground text-sm flex items-center justify-center">-</button>
        <span className="text-foreground text-sm w-6 text-center tabular-nums">{value}</span>
        <button onClick={() => onChange(Math.min(max, value + 1))} className="w-6 h-6 rounded border border-border text-muted hover:text-foreground text-sm flex items-center justify-center">+</button>
      </div>
    </div>
  );
}
