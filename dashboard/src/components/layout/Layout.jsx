import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useThemeSync } from '../../hooks/useThemeSync'

export default function Layout({ children }) {
  useThemeSync()

  return (
    <div className="bg-app h-screen overflow-hidden p-2 md:p-4">
      <div className="mx-auto flex h-full max-w-[1640px] gap-4 lg:gap-5">
        <Sidebar />
        <main className="glass-panel flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-[34px] px-4 py-4 md:px-6 md:py-6 xl:px-7 xl:py-7">
          <Topbar />
          <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            <div className="pb-2">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
