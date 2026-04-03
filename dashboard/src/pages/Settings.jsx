import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useFinanceStore } from '../store/useFinanceStore'

export default function SettingsPage() {
  const { role, theme, transactions, quickContacts } = useFinanceStore((state) => state)

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Workspace Settings</CardTitle>
            <CardDescription>Quick summary of your local dashboard configuration.</CardDescription>
          </div>
        </CardHeader>
        <div className="space-y-3">
          <SettingRow label="Theme mode" value={theme} />
          <SettingRow label="Role simulation" value={role} />
          <SettingRow label="Stored transactions" value={String(transactions.length)} />
          <SettingRow label="Quick beneficiaries" value={String(quickContacts.length)} />
        </div>
        <div className="mt-4 rounded-[22px] border border-white/[0.08] bg-white/[0.04] px-4 py-3">
          <p className="text-sm text-soft">Your role, theme, contacts, and transactions are persisted in localStorage.</p>
        </div>
      </Card>
    </div>
  )
}

function SettingRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-[22px] bg-white/5 px-4 py-3">
      <span className="text-sm text-soft">{label}</span>
      <span className="text-sm font-semibold capitalize text-strong">{value}</span>
    </div>
  )
}
