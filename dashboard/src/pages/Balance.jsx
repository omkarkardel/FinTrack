import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import EmptyState from '../components/ui/empty-state'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { formatCurrency } from '../lib/utils'
import { useFinanceSummary } from '../hooks/useFinanceSummary'
import { useFinanceStore } from '../store/useFinanceStore'

const chartTooltip = {
  contentStyle: {
    background: 'rgba(9, 17, 34, 0.97)',
    border: '1px solid rgba(125, 211, 252, 0.16)',
    borderRadius: '16px',
    color: '#fff',
  },
}

export default function BalancePage() {
  const { transactions } = useFinanceStore((state) => state)
  const summary = useFinanceSummary(transactions)

  if (!transactions.length) {
    return (
      <EmptyState
        title="No Balance Data"
        description="Your balance analytics will appear after adding transactions."
      />
    )
  }

  const weeklyFlow = [
    { label: 'W1', value: 5200 },
    { label: 'W2', value: 6100 },
    { label: 'W3', value: 5900 },
    { label: 'W4', value: summary.availableBalance },
  ]

  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        <MetricCard title="Available Balance" value={summary.availableBalance} tone="from-cyan-400 to-blue-500" />
        <MetricCard title="Total Income" value={summary.income} tone="from-emerald-400 to-teal-500" />
        <MetricCard title="Total Expense" value={summary.expense} tone="from-rose-400 to-pink-500" />
        <MetricCard title="Reserve Bucket" value={summary.reserveBucket} tone="from-violet-400 to-indigo-500" />
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Balance Movement</CardTitle>
            <CardDescription>Weekly net liquidity movement across this month.</CardDescription>
          </div>
        </CardHeader>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyFlow}>
              <defs>
                <linearGradient id="balance-flow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.82} />
                  <stop offset="70%" stopColor="#22d3ee" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
              <Tooltip {...chartTooltip} formatter={(value) => formatCurrency(value)} />
              <Area dataKey="value" stroke="#22d3ee" strokeWidth={3} fill="url(#balance-flow)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

function MetricCard({ title, value, tone }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className={`h-full bg-linear-to-br ${tone} p-[1px]`}>
        <div className="h-full min-w-0 rounded-[27px] bg-slate-950/[0.86] p-5">
          <p className="text-sm text-slate-300">{title}</p>
          <p className="mt-3 text-lg font-semibold leading-tight text-white md:text-xl xl:text-2xl">
            {formatCurrency(value)}
          </p>
        </div>
      </div>
    </Card>
  )
}
