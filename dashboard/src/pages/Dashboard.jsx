import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { CostsCard, GoalsCard, MyCardsCard, QuickContactsCard, SnapshotCards, StatisticsCard, TrendCard } from '../components/dashboard/OverviewCards'
import EmptyState from '../components/ui/empty-state'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useFinanceSummary } from '../hooks/useFinanceSummary'
import { formatCurrency } from '../lib/utils'
import { useFinanceStore } from '../store/useFinanceStore'

const MotionDiv = motion.div

export default function DashboardPage() {
  const { addQuickContact, cards, dashboardMetrics, quickContacts, role, transactions } = useFinanceStore((state) => state)
  const summary = useFinanceSummary(transactions)

  const hasTransactions = useMemo(() => transactions.length > 0, [transactions.length])

  if (!hasTransactions) {
    return (
      <EmptyState
        title="No Dashboard Data Yet"
        description="Add your first transaction to unlock dashboard cards, statistics, and smart insights."
      />
    )
  }

  return (
    <div className="space-y-3.5 md:space-y-4">
      <SectionMotion delay={0}>
        <SnapshotCards income={summary.income} expenses={summary.expense} net={summary.net} />
      </SectionMotion>

      <SectionMotion delay={0.04} className="grid gap-3.5 lg:grid-cols-2">
        <GoalsCard goals={dashboardMetrics.goals} />
        <QuickContactsCard
          contacts={quickContacts}
          canManage={role === 'admin'}
          onAdd={() => {
            const added = addQuickContact()
            toast[added ? 'success' : 'info'](added ? 'Beneficiary added to quick transfer list.' : 'All mock beneficiaries are already added.')
          }}
        />
      </SectionMotion>

      <SectionMotion delay={0.08} className="grid gap-3.5 lg:grid-cols-2">
        <MyCardsCard card={cards[0]} />
        <TrendCard title="Income" amount={formatCurrency(summary.income)} trend="+6%" trendDirection="up" data={[
          { name: 'W1', value: 5200 },
          { name: 'W2', value: 6100 },
          { name: 'W3', value: 5900 },
          { name: 'W4', value: 8627 },
        ]} color="#38bdf8" fill="#38bdf8" />
      </SectionMotion>

      <SectionMotion delay={0.1} className="grid gap-3.5 lg:grid-cols-2">
        <CostsCard costsBreakdown={dashboardMetrics.costsBreakdown} />
        <TrendCard title="Expenses" amount={formatCurrency(summary.expense)} trend="-22%" trendDirection="down" data={[
          { name: 'W1', value: 1450 },
          { name: 'W2', value: 1680 },
          { name: 'W3', value: 1910 },
          { name: 'W4', value: summary.expense },
        ]} color="#fb7185" fill="#ec4899" />
      </SectionMotion>

      <SectionMotion delay={0.12} className="grid gap-3.5 lg:grid-cols-2 2xl:grid-cols-[1.28fr_0.72fr]">
        <StatisticsCard data={dashboardMetrics.statistics} />
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Pulse updates from your banking workspace.</CardDescription>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {dashboardMetrics.recentActivity.map((item, index) => (
              <MotionDiv
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: index * 0.05 }}
                className="rounded-[22px] border border-white/[0.08] bg-linear-to-br from-white/[0.07] to-white/[0.03] p-3.5 transition hover:border-sky-300/[0.26]"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-strong">{item.title}</p>
                  <span className="text-xs text-soft">{item.time}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-soft">{item.description}</p>
              </MotionDiv>
            ))}
          </div>
        </Card>
      </SectionMotion>
    </div>
  )
}

function SectionMotion({ children, delay, className }) {
  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionDiv>
  )
}
