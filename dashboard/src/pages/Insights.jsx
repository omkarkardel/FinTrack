import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import InsightsPanel from '../components/insights/InsightsPanel'
import EmptyState from '../components/ui/empty-state'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useFinanceSummary } from '../hooks/useFinanceSummary'
import { formatCurrency } from '../lib/utils'
import { useFinanceStore } from '../store/useFinanceStore'

export default function InsightsPage() {
  const { dashboardMetrics, transactions } = useFinanceStore((state) => state)
  const summary = useFinanceSummary(transactions)

  const insights = useMemo(() => {
    const [highestCategory, highestAmount] = Object.entries(summary.expensesByCategory).sort((a, b) => b[1] - a[1])[0] ?? ['N/A', 0]
    const bestMonth = [...dashboardMetrics.monthlyPerformance].sort((a, b) => b.income - b.expense - (a.income - a.expense))[0]
    const savingsRate = summary.income ? `${Math.round((summary.net / summary.income) * 100)}%` : '0%'

    return [
      { label: 'Highest spending category', value: `${highestCategory} · ${formatCurrency(highestAmount)}`, description: 'Top expense bucket this month.' },
      { label: 'Income vs expense', value: `${formatCurrency(summary.income)} vs ${formatCurrency(summary.expense)}`, description: 'Current month cashflow spread.' },
      { label: 'Largest transaction', value: `${summary.largestTransaction?.title ?? 'N/A'} · ${summary.largestTransaction ? formatCurrency(summary.largestTransaction.amount) : formatCurrency(0)}`, description: 'Biggest single movement this month.' },
      { label: 'Savings rate', value: savingsRate, description: `Net retained after ${formatCurrency(summary.expense)} in expenses.` },
      { label: 'Best month financially', value: bestMonth?.month ?? 'N/A', description: 'Highest positive income-to-expense gap.' },
    ]
  }, [dashboardMetrics.monthlyPerformance, summary])

  if (!transactions.length) {
    return (
      <EmptyState
        title="No Insights Yet"
        description="Add transactions to generate category trends, savings rate, and monthly observations."
      />
    )
  }

  return (
    <div className="space-y-4">
      <InsightsPanel insights={insights} />

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Income vs Expense Trend</CardTitle>
            <CardDescription>Bar graph view of monthly cashflow to spot strong and weak months quickly.</CardDescription>
          </div>
        </CardHeader>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboardMetrics.monthlyPerformance} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(9,17,34,0.97)',
                  border: '1px solid rgba(125,211,252,0.16)',
                  borderRadius: '16px',
                  color: '#fff',
                }}
                formatter={(value) => formatCurrency(value)}
              />
              <Legend wrapperStyle={{ color: '#cbd5e1' }} />
              <Bar dataKey="income" fill="#34d399" radius={[8, 8, 0, 0]} maxBarSize={22} />
              <Bar dataKey="expense" fill="#fb7185" radius={[8, 8, 0, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Monthly Comparison</CardTitle>
            <CardDescription>Performance summary based on the mock monthly stats driving this dashboard.</CardDescription>
          </div>
        </CardHeader>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {dashboardMetrics.monthlyPerformance.map((item) => (
            <div key={item.month} className="rounded-[24px] border border-white/[0.08] bg-white/[0.04] p-4">
              <p className="text-sm font-medium text-strong">{item.month}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-soft">Income</p>
              <p className="mt-1 text-lg font-semibold text-emerald-300">{formatCurrency(item.income)}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-soft">Expense</p>
              <p className="mt-1 text-lg font-semibold text-rose-300">{formatCurrency(item.expense)}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
