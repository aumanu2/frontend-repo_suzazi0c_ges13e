import { useMemo } from 'react';

function formatCurrency(n) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);
}

export default function ChartsPanel({ items = [] }) {
  const summary = useMemo(() => {
    const base = { Income: 0, Expense: 0, Donation: 0, Investment: 0 };
    for (const it of items) {
      if (base[it.type] !== undefined) base[it.type] += it.amount;
    }
    return base;
  }, [items]);

  const total = Object.values(summary).reduce((a, b) => a + b, 0);

  const segments = Object.entries(summary).map(([label, value]) => ({
    label,
    value,
    pct: total ? (value / total) * 100 : 0,
    color:
      label === 'Income' ? '#10b981' :
      label === 'Expense' ? '#ef4444' :
      label === 'Donation' ? '#6366f1' :
      '#f59e0b'
  }));

  const barWidth = 360;

  return (
    <section className="rounded-xl border border-black/5 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
        <p className="text-sm text-gray-500">{items.length} records</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donut-like chart using SVG */}
        <div className="flex items-center justify-center">
          <svg width="220" height="220" viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="84" fill="transparent" stroke="#f3f4f6" strokeWidth="28" />
            {(() => {
              let angle = -90; // start at top
              const radius = 84;
              const circumference = 2 * Math.PI * radius;
              return segments.map((s, i) => {
                const dash = (s.pct / 100) * circumference;
                const gap = circumference - dash;
                const rot = angle;
                angle += (s.pct / 100) * 360;
                return (
                  <circle
                    key={i}
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="transparent"
                    stroke={s.color}
                    strokeWidth="28"
                    strokeDasharray={`${dash} ${gap}`}
                    transform={`rotate(${rot} 110 110)`}
                    strokeLinecap="butt"
                  />
                );
              });
            })()}
            {/* inner circle */}
            <circle cx="110" cy="110" r="60" fill="white" />
            <text x="110" y="110" textAnchor="middle" dominantBaseline="middle" className="fill-gray-900" fontSize="18" fontWeight="700">
              {formatCurrency(total)}
            </text>
          </svg>
        </div>

        {/* Stacked bar */}
        <div>
          <div className="h-8 w-full rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full flex" style={{ width: barWidth }}>
              {segments.map((s) => (
                <div key={s.label} style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
              ))}
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-3">
            {segments.map((s) => (
              <li key={s.label} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: s.color }} />
                <span className="font-medium">{s.label}</span>
                <span className="ml-auto tabular-nums text-gray-500">{formatCurrency(s.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
