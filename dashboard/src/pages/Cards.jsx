import { MyCardsCard } from '../components/dashboard/OverviewCards'
import EmptyState from '../components/ui/empty-state'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { formatCurrency } from '../lib/utils'
import { useFinanceStore } from '../store/useFinanceStore'

export default function CardsPage() {
  const { cards, transactions } = useFinanceStore((state) => state)
  const primaryCard = cards[0]

  if (!primaryCard) {
    return (
      <EmptyState
        title="No Cards Available"
        description="Card analytics will appear after adding at least one card profile."
      />
    )
  }

  const cardSpend = transactions.filter((item) => item.paymentMethod.toLowerCase().includes('card') && item.type === 'expense')
  const thisMonthSpend = cardSpend.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <MyCardsCard card={primaryCard} />
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Card Analytics</CardTitle>
              <CardDescription>Spending behavior and protection settings for your active cards.</CardDescription>
            </div>
          </CardHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <InsightTile label="This Month Card Spend" value={formatCurrency(thisMonthSpend)} />
            <InsightTile label="Credit Utilization" value="34%" />
            <InsightTile label="Upcoming Statement" value="Apr 18, 2026" />
            <InsightTile label="Card Security" value="3D Secure Enabled" />
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Linked Cards</CardTitle>
            <CardDescription>Manage active and virtual cards in one secure place.</CardDescription>
          </div>
        </CardHeader>
        <div className="grid gap-4 md:grid-cols-3">
          <SmallCard name="Travel Rewards" number="**** 2231" tone="from-cyan-500 to-blue-600" status="Active" />
          <SmallCard name="Virtual Spend" number="**** 8820" tone="from-violet-500 to-fuchsia-500" status="Active" />
          <SmallCard name="Backup Debit" number="**** 1914" tone="from-emerald-500 to-teal-600" status="Frozen" />
        </div>
      </Card>
    </div>
  )
}

function InsightTile({ label, value }) {
  return (
    <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-soft">{label}</p>
      <p className="mt-2 text-lg font-semibold text-strong">{value}</p>
    </div>
  )
}

function SmallCard({ name, number, tone, status }) {
  return (
    <div className={`rounded-[24px] bg-linear-to-br ${tone} p-[1px]`}>
      <div className="h-full rounded-[23px] bg-slate-950/[0.86] p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white">{name}</p>
          <span className="rounded-full bg-white/[0.14] px-2.5 py-1 text-[11px] font-medium text-white">{status}</span>
        </div>
        <p className="mt-8 text-sm tracking-[0.2em] text-white/[0.9]">{number}</p>
      </div>
    </div>
  )
}
