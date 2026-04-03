import { GoalsCard } from '../components/dashboard/OverviewCards'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { formatCurrency } from '../lib/utils'
import { useFinanceStore } from '../store/useFinanceStore'

export default function GoalsPage() {
  const { dashboardMetrics } = useFinanceStore((state) => state)
  const { goals } = dashboardMetrics

  const milestones = [
    { name: 'Emergency Fund', target: 15000, achieved: 9300 },
    { name: 'Travel Vault', target: 8000, achieved: 4250 },
    { name: 'Investment Seed', target: 12000, achieved: 6760 },
  ]

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <GoalsCard goals={goals} />
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Goal Milestones</CardTitle>
              <CardDescription>Progress tracking for your key financial targets.</CardDescription>
            </div>
          </CardHeader>
          <div className="space-y-4">
            {milestones.map((item) => {
              const progress = Math.min(100, Math.round((item.achieved / item.target) * 100))
              return (
                <div key={item.name} className="rounded-[22px] border border-white/[0.08] bg-white/[0.04] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-strong">{item.name}</p>
                    <p className="text-xs text-soft">{progress}%</p>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/[0.07]">
                    <div className="h-full rounded-full bg-linear-to-r from-sky-400 to-cyan-300" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-soft">Achieved {formatCurrency(item.achieved)}</span>
                    <span className="text-soft">Target {formatCurrency(item.target)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
