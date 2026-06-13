import { useState } from 'react';

export default function ValuationCalc() {
  const [preMoney, setPreMoney] = useState('');
  const [investment, setInvestment] = useState('');

  const preMoneyNum = parseFloat(preMoney) || 0;
  const investmentNum = parseFloat(investment) || 0;
  const postMoney = preMoneyNum + investmentNum;
  const ownership = postMoney > 0 ? (investmentNum / postMoney) * 100 : 0;
  const founderOwnership = 100 - ownership;

  return (
    <div>
      <h3 className="text-xs font-heading font-semibold uppercase tracking-widest text-foreground mb-3">
        Valuation Calculator
      </h3>
      <p className="text-muted text-xs mb-3">Pre-money, post-money, and dilution math.</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-muted text-xs block mb-1">Pre-money valuation</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
            <input
              type="number"
              value={preMoney}
              onChange={(e) => setPreMoney(e.target.value)}
              placeholder="5,000,000"
              className="w-full pl-7 pr-3 py-2 text-sm bg-surface border border-border rounded-md text-foreground placeholder-muted focus:outline-none focus:border-muted-foreground"
            />
          </div>
        </div>
        <div>
          <label className="text-muted text-xs block mb-1">Investment amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              placeholder="1,000,000"
              className="w-full pl-7 pr-3 py-2 text-sm bg-surface border border-border rounded-md text-foreground placeholder-muted focus:outline-none focus:border-muted-foreground"
            />
          </div>
        </div>
      </div>
      {(preMoneyNum > 0 || investmentNum > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <ResultBox label="Post-money" value={`$${postMoney.toLocaleString()}`} />
          <ResultBox label="Investor gets" value={`${ownership.toFixed(1)}%`} />
          <ResultBox label="Founders keep" value={`${founderOwnership.toFixed(1)}%`} />
          <ResultBox label="Price per 1%" value={`$${postMoney > 0 ? (postMoney / 100).toLocaleString() : '0'}`} />
        </div>
      )}
    </div>
  );
}

function ResultBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2 bg-surface border border-border rounded-md text-center">
      <span className="text-muted text-[0.65rem] block">{label}</span>
      <span className="text-foreground text-sm font-medium">{value}</span>
    </div>
  );
}
