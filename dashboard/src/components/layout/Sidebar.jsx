import {
  BarChart3,
  CreditCard,
  DoorClosed,
  Goal,
  LayoutDashboard,
  Lightbulb,
  ReceiptText,
  Settings,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '../../data/mockData'
import { cn } from '../../lib/utils'
import { useFinanceStore } from '../../store/useFinanceStore'
import { Button } from '../ui/button'

const MotionDiv = motion.div

const icons = {
  dashboard: LayoutDashboard,
  balance: BarChart3,
  transactions: ReceiptText,
  cards: CreditCard,
  goals: Goal,
  insights: Lightbulb,
  settings: Settings,
}

export default function Sidebar() {
  const { activePage, closeSidebar, isSidebarOpen, logout, role, setActivePage, setRole } = useFinanceStore((state) => state)

  const filteredNavItems = navItems.filter((item) => role === 'admin' || item.permission === 'viewer')

  const content = (
    <aside className="glass-panel no-scrollbar flex h-full w-full flex-col overflow-y-auto rounded-[34px] p-5 md:p-6">
      <div className="mb-9 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-300 via-sky-400 to-violet-500 text-lg font-bold text-slate-950 shadow-[0_18px_46px_rgba(56,189,248,0.36)]">
            F
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-strong">FinTrack</p>
            <p className="text-xs uppercase tracking-[0.2em] text-soft">Finance Dashboard</p>
          </div>
        </div>
        <button className="rounded-full p-2 text-soft lg:hidden" onClick={closeSidebar}>
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="space-y-2.5">
        {filteredNavItems.map((item) => {
          const Icon = icons[item.id]
          const isActive = activePage === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={cn(
                'group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-linear-to-r from-sky-500/[0.28] via-cyan-400/[0.2] to-blue-500/[0.18] text-white shadow-[0_16px_34px_rgba(14,165,233,0.24)]'
                  : 'text-soft hover:bg-white/[0.07] hover:text-strong',
              )}
            >
              <Icon className={cn('h-4 w-4 transition-transform duration-200', !isActive && 'group-hover:scale-110')} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-9 space-y-4">
        <div className="glass-muted rounded-[26px] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <label className="mb-2 block text-sm font-medium text-strong">Workspace role</label>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="h-11 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-[color:var(--ring)]"
          >
            <option className="bg-slate-900 text-slate-100" value="viewer">Viewer</option>
            <option className="bg-slate-900 text-slate-100" value="admin">Admin</option>
          </select>
          <p className="mt-2 text-xs text-soft">Viewer sees analytics only. Admin unlocks management actions.</p>
        </div>
      </div>

      <div className="mt-auto pt-9">
        <Button
          variant="secondary"
          className="w-full justify-start gap-3 rounded-2xl"
          onClick={() => {
            logout()
            closeSidebar()
          }}
        >
          <DoorClosed className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )

  return (
    <>
      <div className="hidden h-full w-[310px] shrink-0 lg:sticky lg:top-0 lg:block">{content}</div>
      <AnimatePresence>
        {isSidebarOpen ? (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/60 p-4 backdrop-blur-sm lg:hidden"
            onClick={closeSidebar}
          >
            <MotionDiv
              initial={{ x: -28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="h-full max-w-[310px]"
              onClick={(event) => event.stopPropagation()}
            >
              {content}
            </MotionDiv>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </>
  )
}
