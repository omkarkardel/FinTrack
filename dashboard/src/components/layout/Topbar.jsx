import { Bell, Menu, MoonStar, Search, SunMedium } from 'lucide-react'
import { useFinanceStore } from '../../store/useFinanceStore'

const pageMeta = {
  dashboard: { title: 'Dashboard', subtitle: 'Welcome back, here is your finance pulse for this month.' },
  balance: { title: 'Balance', subtitle: 'Track liquidity, reserves, and cashflow movement with precision.' },
  transactions: { title: 'Transactions', subtitle: 'Search, filter, export, and manage payment activity.' },
  cards: { title: 'Cards', subtitle: 'Control your active cards, limits, and secure usage analytics.' },
  goals: { title: 'Goals', subtitle: 'Monitor savings milestones and keep each target on schedule.' },
  insights: { title: 'Insights', subtitle: 'Smart observations generated from your mock portfolio data.' },
  settings: { title: 'Settings', subtitle: 'Personalize the dashboard and role-based experience.' },
}

export default function Topbar() {
  const { activePage, globalSearch, role, setGlobalSearch, theme, toggleSidebar, toggleTheme } = useFinanceStore((state) => state)
  const meta = pageMeta[activePage] ?? pageMeta.dashboard

  return (
    <header className="mb-4 flex flex-col gap-4 lg:mb-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-3">
        <button
          onClick={toggleSidebar}
          className="glass-muted mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl lg:hidden"
        >
          <Menu className="h-5 w-5 text-strong" />
        </button>
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-[-0.02em] text-strong md:text-[2.15rem]">{meta.title}</h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-soft">{meta.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-3.5">
        <div className="relative w-full md:min-w-[360px] md:flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" />
          <input
            value={globalSearch}
            onChange={(event) => setGlobalSearch(event.target.value)}
            placeholder="Search merchants, categories, or notes"
            className="glass-muted h-12 w-full rounded-2xl pl-11 pr-4 text-sm text-strong outline-none transition focus:border-sky-400/[0.38] focus:ring-2 focus:ring-[color:var(--ring)]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 md:flex-nowrap">
          <button
            onClick={toggleTheme}
            className="glass-muted inline-flex h-12 w-12 items-center justify-center rounded-2xl text-soft transition hover:bg-white/[0.1] hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
          </button>
          <button className="glass-muted inline-flex h-12 w-12 items-center justify-center rounded-2xl text-soft transition hover:bg-white/[0.1] hover:text-white">
            <Bell className="h-5 w-5" />
          </button>
          <div className="glass-muted flex min-w-0 w-full max-w-[220px] items-center gap-3 rounded-[24px] px-3 py-2.5 md:w-auto md:max-w-none md:min-w-[180px]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-fuchsia-500 to-violet-500 text-sm font-bold text-white">
              RF
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-strong">Robert Fox</p>
              <p className="truncate text-xs text-soft">{role === 'admin' ? 'Admin' : 'Viewer'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
