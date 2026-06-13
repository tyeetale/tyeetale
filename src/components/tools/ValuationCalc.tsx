import { useState } from 'react';

export default function ValuationCalc() {
  const [rounds, setRounds] = useState([{ preMoney: '', investment: '' }]);

  function addRound() {
    setRounds([...rounds, { preMoney: '', investment: '' }]);
  }

  function updateRound(index: number, field: 'preMoney' | 'investment', value: string) {
    const updated = [...rounds];
    updated[index] = { ...updated[index], [field]: value };
    setRounds(updated);
  }

  function removeRound(index: number) {
    if (rounds.length <= 1) return;
    setRounds(rounds.filter((_, i) => i !== index));
  }

  // Calculate cumulative dilution
  let founderOwnership = 100;
  const roundResults = rounds.map((round, i) => {
    const pre = parseFloat(round.preMoney) || 0;
    const inv = parseFloat(round.investment) || 0;
    const post = pre + inv;
    const investorPct = post > 0 ? (inv / post) * 100 : 0;
    // Founder gets diluted by this round's investor percentage
    const founderBefore = founderOwnership;
    founderOwnership = founderOwnership * (1 - investorPct / 100);
    return {
      round: i + 1,
      preMoney: pre,
      investment: inv,
      postMoney: post,
      investorPct,
      founderBefore,
      founderAfter: founderOwnership,
      dilution: founderBefore - founderOwnership,
    };
  });

  const totalRaised = rounds.reduce((sum, r) => sum + (parseFloat(r.investment) || 0), 0);
  const totalDilution = 100 - founderOwnership;

  return (
    <div>
      <h3 className="text-xs font-heading font-semibold uppercase tracking-widest text-foreground mb-3">
        Valuation & Dilution Calculator
      </h3>
      <p className="text-muted text-xs mb-4">Model funding rounds, dilution, and ownership distribution.</p>
      
      {rounds.map((round, i) => (
        <div key={i} className="mb-4 p-3 bg-surface border border-border rounded-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-foreground text-xs font-medium">Round {i + 1}</span>
            {rounds.length > 1 && (
              <button onClick={() => removeRound(i)} className="text-muted text-xs hover:text-foreground">remove</button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-muted text-[0.65rem] block mb-0.5">Pre-money ($)</label>
              <input
                type="number"
                value={round.preMoney}
                onChange={(e) => updateRound(i, 'preMoney', e.target.value)}
                placeholder="5000000"
                className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground placeholder-muted focus:outline-none focus:border-muted-foreground"
              />
            </div>
            <div>
              <label className="text-muted text-[0.65rem] block mb-0.5">Investment ($)</label>
              <input
                type="number"
                value={round.investment}
                onChange={(e) => updateRound(i, 'investment', e.target.value)}
                placeholder="1000000"
                className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground placeholder-muted focus:outline-none focus:border-muted-foreground"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addRound}
        className="text-xs text-muted border border-border px-2 py-1 rounded hover:text-foreground transition-colors mb-4"
      >
        + add round
      </button>

      {/* Results */}
      {totalRaised > 0 && (
        <div className="space-y-3">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 bg-surface border border-border rounded text-center">
              <span className="text-muted text-[0.6rem] block">Total raised</span>
              <span className="text-foreground text-sm font-medium">${totalRaised.toLocaleString()}</span>
            </div>
            <div className="p-2 bg-surface border border-border rounded text-center">
              <span className="text-muted text-[0.6rem] block">Founder owns</span>
              <span className="text-foreground text-sm font-medium">{founderOwnership.toFixed(1)}%</span>
            </div>
            <div className="p-2 bg-surface border border-border rounded text-center">
              <span className="text-muted text-[0.6rem] block">Total dilution</span>
              <span className="text-foreground text-sm font-medium">{totalDilution.toFixed(1)}%</span>
            </div>
          </div>

          {/* Distribution table */}
          <div>
            <span className="text-muted text-[0.65rem] uppercase tracking-wider block mb-2">Cap Table</span>
            <div className="border border-border rounded overflow-hidden">
              <div className="grid grid-cols-4 gap-0 text-[0.65rem] text-muted bg-surface px-2 py-1 border-b border-border">
                <span>Round</span>
                <span>Investor %</span>
                <span>Dilution</span>
                <span>Founder after</span>
              </div>
              {roundResults.filter(r => r.investment > 0).map((r) => (
                <div key={r.round} className="grid grid-cols-4 gap-0 text-xs text-foreground px-2 py-1.5 border-b border-border last:border-0">
                  <span>R{r.round}</span>
                  <span>{r.investorPct.toFixed(1)}%</span>
                  <span className="text-red-400">-{r.dilution.toFixed(1)}%</span>
                  <span>{r.founderAfter.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual bar */}
          <div>
            <span className="text-muted text-[0.65rem] uppercase tracking-wider block mb-1">Ownership</span>
            <div className="h-4 rounded-full overflow-hidden flex bg-border">
              <div
                className="bg-accent transition-all"
                style={{ width: `${founderOwnership}%` }}
                title={`Founders: ${founderOwnership.toFixed(1)}%`}
              />
              <div
                className="bg-muted-foreground transition-all"
                style={{ width: `${totalDilution}%` }}
                title={`Investors: ${totalDilution.toFixed(1)}%`}
              />
            </div>
            <div className="flex justify-between text-[0.6rem] text-muted mt-1">
              <span>Founders {founderOwnership.toFixed(1)}%</span>
              <span>Investors {totalDilution.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
