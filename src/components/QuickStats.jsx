import { TrendingUp, PiggyBank, Wallet, Gift } from 'lucide-react';

const cards = [
  {
    label: 'Income',
    value: '$8,450',
    delta: '+12.4%',
    icon: TrendingUp,
    color: 'from-emerald-500/10 to-emerald-500/0 text-emerald-600'
  },
  {
    label: 'Expenses',
    value: '$5,120',
    delta: '-4.2%',
    icon: Wallet,
    color: 'from-rose-500/10 to-rose-500/0 text-rose-600'
  },
  {
    label: 'Donations',
    value: '$420',
    delta: '+2.0%',
    icon: Gift,
    color: 'from-indigo-500/10 to-indigo-500/0 text-indigo-600'
  },
  {
    label: 'Investments',
    value: '$12,300',
    delta: '+6.8%',
    icon: PiggyBank,
    color: 'from-amber-500/10 to-amber-500/0 text-amber-600'
  }
];

export default function QuickStats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, delta, icon: Icon, color }) => (
        <div
          key={label}
          className="relative overflow-hidden rounded-xl border border-black/5 bg-white p-5"
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${color}`} />
          <div className="relative z-0 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
              <p className="mt-1 text-xs text-gray-500">{delta} this month</p>
            </div>
            <div className="shrink-0 rounded-lg bg-white/70 p-2 ring-1 ring-black/5">
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
