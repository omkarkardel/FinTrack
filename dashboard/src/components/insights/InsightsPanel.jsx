import { ArrowUpRight, PiggyBank, Radar, TrendingUp } from 'lucide-react'
import { formatCurrency } from '../../lib/utils'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

const icons = [TrendingUp, Radar, ArrowUpRight, PiggyBank]

export default function InsightsPanel({ insights }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((item, index) => {
          const Icon = icons[index % icons.length]
          return (
            <Card key={item.label} className="min-h-[190px]">
              <CardHeader>
                <div>
                  <CardTitle>{item.label}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] text-sky-300">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <p className="text-2xl font-semibold text-strong">{item.isCurrency ? formatCurrency(item.value) : item.value}</p>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Recommendation</CardTitle>
            <CardDescription>Small guidance based on your mock monthly performance.</CardDescription>
          </div>
        </CardHeader>
        <div className="rounded-[28px] bg-linear-to-br from-sky-500/[0.18] via-cyan-400/[0.08] to-fuchsia-500/[0.12] p-5">
          <p className="text-lg font-semibold text-strong">You spent 24% more on Food this month than last month.</p>
          <p className="mt-3 text-sm leading-6 text-soft">
            Consider moving two discretionary food purchases into your weekly transfer budget to recover roughly Rs 120 next month without touching your savings target.
          </p>
        </div>
      </Card>
    </div>
  )
}
