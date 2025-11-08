import { useState } from 'react';

const categories = {
  Income: ['Salary', 'Freelance', 'Bonus', 'Other'],
  Expense: ['Rent', 'Groceries', 'Utilities', 'Transport', 'Leisure'],
  Donation: ['Charity', 'Community', 'Friends/Family'],
  Investment: ['Stocks', 'Crypto', 'Bonds', 'ETF']
};

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState('Income');
  const [category, setCategory] = useState(categories['Income'][0]);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    const entry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      type,
      category,
      amount: parseFloat(amount),
      note
    };
    onAdd?.(entry);
    setAmount('');
    setNote('');
  };

  return (
    <section className="rounded-xl border border-black/5 bg-white p-5">
      <h3 className="text-lg font-semibold text-gray-900">Add Transaction</h3>
      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-3">
        <select
          value={type}
          onChange={(e) => {
            const t = e.target.value;
            setType(t);
            setCategory(categories[t][0]);
          }}
          className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-gray-900"
        >
          {Object.keys(categories).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-gray-900"
        >
          {categories[type].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-gray-900"
          required
        />

        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-gray-900"
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 active:bg-black"
        >
          Add
        </button>
      </form>
    </section>
  );
}
