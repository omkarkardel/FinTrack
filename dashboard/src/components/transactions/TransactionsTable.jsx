import { Edit3, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate, getTransactionSign } from '../../lib/utils'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export default function TransactionsTable({ transactions, canManage, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/[0.08]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.18em] text-soft">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Title / Merchant</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-t border-white/[0.06] transition hover:bg-white/[0.04]">
                <td className="px-4 py-3 text-xs text-soft">{formatDate(transaction.date)}</td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium leading-5 text-strong">{transaction.title}</p>
                    <p className="text-xs text-soft">{transaction.notes || 'No memo attached'}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-strong">{transaction.category}</td>
                <td className="px-4 py-3">
                  <Badge tone={transaction.type === 'income' ? 'success' : 'danger'}>{transaction.type}</Badge>
                </td>
                <td className={`px-4 py-3 text-xs font-semibold ${transaction.type === 'income' ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {getTransactionSign(transaction.type)}
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-4 py-3">
                  <Badge tone={transaction.status === 'completed' ? 'info' : 'default'}>{transaction.status}</Badge>
                </td>
                <td className="px-4 py-3 text-xs text-soft">{transaction.paymentMethod}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button variant="secondary" size="sm" onClick={() => onEdit(transaction)} disabled={!canManage} title={canManage ? 'Edit transaction' : 'Admin only'}>
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => onDelete(transaction.id)} disabled={!canManage} title={canManage ? 'Delete transaction' : 'Admin only'}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
