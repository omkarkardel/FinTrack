import { ChevronRight, Ellipsis, TrendingDown, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCompactCurrency, formatCurrency, getInitials } from '../../lib/utils'
import { AnimatedNumber } from '../ui/animated-number'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

const MotionDiv = motion.div

const tooltipProps = {
  contentStyle: {
    background: 'rgba(9, 17, 34, 0.97)',
    border: '1px solid rgba(125, 211, 252, 0.16)',
    borderRadius: '18px',
    color: '#fff',
    boxShadow: '0 18px 40px rgba(2, 8, 23, 0.35)',
  },
  cursor: { stroke: 'rgba(148,163,184,0.18)' },
}

export function SnapshotCards({ income, expenses, net }) {
  const cards = [
    { label: 'Monthly income', value: income, color: 'from-cyan-400 to-sky-500' },
    { label: 'Monthly expenses', value: expenses, color: 'from-rose-400 to-pink-500' },
    { label: 'Net savings', value: net, color: 'from-emerald-400 to-teal-500' },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((item) => (
        <Card key={item.label} className="overflow-hidden p-0">
          <div className={`h-full bg-linear-to-br ${item.color} p-[1px]`}>
            <div className="relative h-full rounded-[27px] bg-slate-950/[0.86] p-5">
              <div className="pointer-events-none absolute inset-0 rounded-[27px] bg-linear-to-br from-white/[0.08] via-transparent to-transparent" />
              <p className="relative text-sm text-slate-300">{item.label}</p>
              <p className="relative mt-3 text-3xl font-semibold text-white">
                <AnimatedNumber value={item.value} formatter={formatCompactCurrency} />
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export function GoalsCard({ goals }) {
  const progress = Math.round((goals.achieved / goals.totalGoal) * 100)

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div>
          <CardTitle>Goals</CardTitle>
          <CardDescription>Stay on track with your long-term wealth milestones.</CardDescription>
        </div>
        <Badge tone="info">{progress}% funded</Badge>
      </CardHeader>
      <div className="grid gap-3 xl:grid-cols-[146px_minmax(0,1fr)] xl:items-center">
        <div className="h-[156px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart innerRadius="68%" outerRadius="100%" data={[{ name: 'goal', value: progress, fill: '#38bdf8' }]} startAngle={180} endAngle={0}>
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar background={{ fill: 'rgba(148,163,184,0.14)' }} clockWise dataKey="value" cornerRadius={18} />
              <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-3xl font-semibold">
                {progress}%
              </text>
              <text x="50%" y="72%" textAnchor="middle" dominantBaseline="middle" className="fill-slate-400 text-sm">
                Achieved
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          <MetricLine label="Total Goal" value={formatCurrency(goals.totalGoal)} />
          <MetricLine label="Target Achieved" value={formatCurrency(goals.achieved)} />
          <MetricLine label="This Month Target" value={formatCurrency(goals.monthTarget)} />
          <div className="rounded-[18px] bg-linear-to-br from-white/[0.08] to-white/[0.02] px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-[0.12em] text-soft">Current momentum</p>
            <p className="mt-1 text-[11px] font-medium leading-[1.15rem] text-slate-200">Outperforming last quarter by 14%.</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

function MetricLine({ label, value }) {
  return (
    <div className="flex min-w-0 flex-col gap-1 rounded-[16px] bg-white/[0.04] px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-[10px] text-soft">{label}</span>
      <span className="text-[11px] font-semibold text-strong sm:text-right">{value}</span>
    </div>
  )
}

export function QuickContactsCard({ contacts, canManage, onAdd }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Quick Transaction</CardTitle>
          <CardDescription>Recent beneficiaries ready for fast transfers.</CardDescription>
        </div>
        <Button variant="secondary" size="sm" onClick={onAdd} disabled={!canManage}>
          Add +
        </Button>
      </CardHeader>
      <div className="space-y-2.5">
        {contacts.map((contact, index) => (
          <MotionDiv
            key={contact.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between rounded-[20px] border border-white/[0.08] bg-linear-to-r from-white/[0.05] to-white/[0.03] px-3.5 py-2.5 transition hover:border-sky-400/40 hover:from-white/[0.08] hover:to-white/[0.05]"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${contact.color} text-sm font-semibold text-white`}>
                {getInitials(contact.name)}
              </div>
              <div>
                <p className="text-sm font-medium text-strong">{contact.name}</p>
                <p className="text-xs text-soft">{contact.accountId}</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-soft" />
          </MotionDiv>
        ))}
      </div>
    </Card>
  )
}

export function CostsCard({ costsBreakdown }) {
  const totalCost = costsBreakdown.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div>
          <CardTitle>Costs</CardTitle>
          <CardDescription>Elegant spend distribution across your lifestyle buckets.</CardDescription>
        </div>
        <button className="rounded-full p-2 text-soft transition hover:bg-white/10 hover:text-white">
          <Ellipsis className="h-4 w-4" />
        </button>
      </CardHeader>
      <div className="grid gap-4 lg:grid-cols-[172px_minmax(0,1fr)] lg:items-center">
        <div className="relative h-[172px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <filter id="costShadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0ea5e9" floodOpacity="0.25" />
                </filter>
              </defs>
              <Pie data={costsBreakdown} dataKey="value" innerRadius={58} outerRadius={86} paddingAngle={4} strokeWidth={0} filter="url(#costShadow)">
                {costsBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip {...tooltipProps} formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs uppercase tracking-[0.28em] text-soft">Total</span>
            <span className="mt-1 text-2xl font-semibold text-strong md:text-3xl">{formatCurrency(totalCost)}</span>
          </div>
        </div>
        <div className="space-y-3">
          {costsBreakdown.map((item) => (
            <div key={item.name}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-strong">{item.name}</span>
                </div>
                <span className="text-soft">{item.percentage}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/[0.06]">
                <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function TrendCard({ title, amount, trend, trendDirection, data, color, fill, filterLabel = 'this month' }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            <span className="text-3xl font-semibold text-strong">{amount}</span>
          </CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Badge tone={trendDirection === 'up' ? 'success' : 'danger'}>
            {trendDirection === 'up' ? <TrendingUp className="mr-1 h-3.5 w-3.5" /> : <TrendingDown className="mr-1 h-3.5 w-3.5" />}
            {trend}
          </Badge>
          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-soft">{filterLabel}</span>
        </div>
      </CardHeader>
      <div className="mt-2 h-[144px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`${title}-gradient`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={fill} stopOpacity={0.82} />
                <stop offset="70%" stopColor={fill} stopOpacity={0.18} />
                <stop offset="100%" stopColor={fill} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <Tooltip {...tooltipProps} formatter={(value) => formatCurrency(value)} />
            <Area type="monotone" dataKey="value" stroke={color} fill={`url(#${title}-gradient)`} strokeWidth={3} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export function MyCardsCard({ card }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div>
          <CardTitle>My Cards</CardTitle>
          <CardDescription>Premium credit line ready for travel, bills, and rewards.</CardDescription>
        </div>
      </CardHeader>
      <div className="relative overflow-hidden rounded-[26px] bg-linear-to-br from-fuchsia-500 via-violet-600 to-indigo-900 p-4 text-white shadow-[0_24px_60px_rgba(139,92,246,0.34)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/[0.2] blur-2xl" />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-cyan-300/[0.18] blur-xl" />
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/70">Credit Card Balance</p>
            <p className="mt-1.5 text-[1.75rem] font-semibold leading-none">{formatCurrency(card.balance)}</p>
          </div>
          <div className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80">VISA</div>
        </div>
        <p className="mb-4 text-base tracking-[0.28em] text-white/95">{card.number}</p>
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Card Holder</p>
            <p className="mt-1 font-medium">{card.holder}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Expiry</p>
            <p className="mt-1 font-medium">{card.expiry}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <span className="h-2 w-8 rounded-full bg-linear-to-r from-sky-300 to-cyan-400" />
        <span className="h-2 w-2 rounded-full bg-white/[0.25]" />
        <span className="h-2 w-2 rounded-full bg-white/[0.25]" />
      </div>
    </Card>
  )
}

export function StatisticsCard({ data }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Revenue strength comparison between 2024 and 2025.</CardDescription>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="inline-flex items-center gap-2 text-soft"><span className="h-2.5 w-2.5 rounded-full bg-sky-400" />2024</span>
          <span className="inline-flex items-center gap-2 text-soft"><span className="h-2.5 w-2.5 rounded-full bg-violet-500" />2025</span>
        </div>
      </CardHeader>
      <div className="h-[226px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <XAxis axisLine={false} tickLine={false} dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <Tooltip {...tooltipProps} />
            <Bar dataKey="y2024" fill="#38bdf8" radius={[10, 10, 4, 4]} maxBarSize={18} />
            <Bar dataKey="y2025" fill="#8b5cf6" radius={[10, 10, 4, 4]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
