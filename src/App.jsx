import { useState, useMemo } from 'react';
import Hero3D from './components/Hero3D';
import QuickStats from './components/QuickStats';
import TransactionForm from './components/TransactionForm';
import ChartsPanel from './components/ChartsPanel';

export default function App() {
  const [items, setItems] = useState([]);

  const handleAdd = (entry) => setItems((prev) => [entry, ...prev]);

  const totals = useMemo(() => {
    const t = { Income: 0, Expense: 0, Donation: 0, Investment: 0 };
    for (const i of items) t[i.type] += i.amount;
    return t;
  }, [items]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Hero3D />

        <QuickStats key={`k-${items.length}`} totals={totals} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TransactionForm onAdd={handleAdd} />
            <ChartsPanel items={items} />
          </div>

          <aside className="rounded-xl border border-black/5 bg-white p-5">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <ul className="mt-4 space-y-3">
              {items.slice(0, 8).map((it) => (
                <li key={it.id} className="flex items-center justify-between text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium">{it.category}</span>
                    <span className="text-gray-500">{new Date(it.date).toLocaleString()}</span>
                  </div>
                  <span className={`${it.type === 'Expense' ? 'text-rose-600' : it.type === 'Donation' ? 'text-indigo-600' : it.type === 'Investment' ? 'text-amber-600' : 'text-emerald-600'} font-semibold tabular-nums`}>${it.amount.toFixed(2)}</span>
                </li>
              ))}
              {items.length === 0 && (
                <li className="text-gray-500 text-sm">No transactions yet. Add your first one above.</li>
              )}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
