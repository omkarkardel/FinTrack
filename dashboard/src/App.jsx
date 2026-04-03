import Layout from './components/layout/Layout'
import DashboardPage from './pages/Dashboard'
import BalancePage from './pages/Balance'
import TransactionsPage from './pages/Transactions'
import CardsPage from './pages/Cards'
import GoalsPage from './pages/Goals'
import InsightsPage from './pages/Insights'
import SettingsPage from './pages/Settings'
import PageTransition from './components/ui/page-transition'
import { useFinanceStore } from './store/useFinanceStore'

function App() {
  const activePage = useFinanceStore((state) => state.activePage)

  const pageMap = {
    dashboard: <DashboardPage />,
    balance: <BalancePage />,
    transactions: <TransactionsPage />,
    cards: <CardsPage />,
    goals: <GoalsPage />,
    insights: <InsightsPage />,
    settings: <SettingsPage />,
  }

  return (
    <Layout>
      <PageTransition pageKey={activePage}>{pageMap[activePage] ?? <DashboardPage />}</PageTransition>
    </Layout>
  )
}

export default App
