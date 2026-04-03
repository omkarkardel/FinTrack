import { useMemo, useState } from 'react'
import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown, Download, Plus } from 'lucide-react'
import { toast } from 'sonner'
import TransactionModal from '../components/transactions/TransactionModal'
import TransactionsTable from '../components/transactions/TransactionsTable'
import { Button } from '../components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { SearchInput } from '../components/ui/input'
import { downloadCsv } from '../lib/utils'
import { useFinanceStore } from '../store/useFinanceStore'

const categories = ['all', 'Salary', 'Food', 'House', 'Car']
const sorters = {
  latest: (a, b) => new Date(b.date) - new Date(a.date),
  oldest: (a, b) => new Date(a.date) - new Date(b.date),
  'highest amount': (a, b) => b.amount - a.amount,
  'lowest amount': (a, b) => a.amount - b.amount,
}

export default function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const {
    addTransaction,
    deleteTransaction,
    globalSearch,
    role,
    resetTransactionFilters,
    setGlobalSearch,
    setTransactionFilters,
    transactionFilters,
    transactions,
    updateTransaction,
  } = useFinanceStore((state) => state)

  const filteredTransactions = useMemo(() => {
    const combinedSearch = `${transactionFilters.search} ${globalSearch}`.trim().toLowerCase()
    return [...transactions]
      .filter((transaction) => {
        const matchesSearch =
          !combinedSearch ||
          [transaction.title, transaction.category, transaction.paymentMethod, transaction.notes]
            .join(' ')
            .toLowerCase()
            .includes(combinedSearch)
        const matchesCategory = transactionFilters.category === 'all' || transaction.category === transactionFilters.category
        const matchesType = transactionFilters.type === 'all' || transaction.type === transactionFilters.type
        return matchesSearch && matchesCategory && matchesType
      })
      .sort(sorters[transactionFilters.sort] ?? sorters.latest)
  }, [globalSearch, transactionFilters, transactions])

  const canManage = role === 'admin'
  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category === 'all' ? 'All categories' : category,
  }))
  const typeOptions = [
    { value: 'all', label: 'All types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ]
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'highest amount', label: 'Highest amount' },
    { value: 'lowest amount', label: 'Lowest amount' },
  ]

  const handleSaveTransaction = (transaction) => {
    try {
      if (editingTransaction) {
        updateTransaction(editingTransaction.id, transaction)
        toast.success('Transaction updated successfully.')
      } else {
        addTransaction(transaction)
        toast.success('Transaction added successfully.')
        resetTransactionFilters()
        setGlobalSearch('')
      }
    } catch {
      toast.error('Unable to save transaction. Please try again.')
      return
    }

    setEditingTransaction(null)
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>{filteredTransactions.length} records found</CardDescription>
          </div>
          <div className="flex w-full items-center justify-end gap-3 lg:w-auto">
            <Button
              onClick={() => {
                if (!canManage) {
                  toast.error('Only Admin can add transactions. Switch role to Admin.')
                  return
                }
                setEditingTransaction(null)
                setIsModalOpen(true)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add transaction
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                downloadCsv('transactions.csv', [
                  ['Date', 'Title', 'Category', 'Type', 'Amount', 'Status', 'Payment Method', 'Notes'],
                  ...filteredTransactions.map((item) => [
                    item.date,
                    item.title,
                    item.category,
                    item.type,
                    item.amount,
                    item.status,
                    item.paymentMethod,
                    item.notes,
                  ]),
                ])
                toast.success('Transactions exported to CSV.')
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <SearchInput value={transactionFilters.search} onChange={(event) => setTransactionFilters({ search: event.target.value })} placeholder="Search transactions" />
          <SelectField
            value={transactionFilters.category}
            onValueChange={(value) => setTransactionFilters({ category: value })}
            options={categoryOptions}
          />
          <SelectField
            value={transactionFilters.type}
            onValueChange={(value) => setTransactionFilters({ type: value })}
            options={typeOptions}
          />
          <SelectField
            value={transactionFilters.sort}
            onValueChange={(value) => setTransactionFilters({ sort: value })}
            options={sortOptions}
          />
        </div>

        <div className="mt-5">
          {filteredTransactions.length ? (
            <TransactionsTable
              transactions={filteredTransactions}
              canManage={canManage}
              onEdit={(transaction) => {
                setEditingTransaction(transaction)
                setIsModalOpen(true)
              }}
              onDelete={(transactionId) => {
                if (!canManage) {
                  toast.error('Only Admin can delete transactions. Switch role to Admin.')
                  return
                }

                const shouldDelete = window.confirm('Delete this transaction? This action cannot be undone.')
                if (!shouldDelete) return

                deleteTransaction(transactionId)
                toast.success('Transaction deleted.')
              }}
            />
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.04] px-6 py-12 text-center">
              <p className="text-lg font-semibold text-strong">No transactions found</p>
              <p className="mt-2 text-sm text-soft">Adjust your search and filters to uncover matching results.</p>
            </div>
          )}
        </div>
      </Card>

      {isModalOpen ? (
        <TransactionModal
          key={editingTransaction?.id ?? 'new-transaction'}
          open={isModalOpen}
          onOpenChange={(nextOpen) => {
            setIsModalOpen(nextOpen)
            if (!nextOpen) setEditingTransaction(null)
          }}
          transaction={editingTransaction}
          onSave={handleSaveTransaction}
        />
      ) : null}
    </div>
  )
}

function SelectField({ value, onValueChange, options }) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        value={value}
        className="glass-muted inline-flex h-11 w-full items-center justify-between rounded-2xl border border-white/10 px-4 text-sm text-strong outline-none transition data-[state=open]:ring-2 data-[state=open]:ring-[color:var(--ring)]"
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="h-4 w-4 text-soft" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          side="bottom"
          avoidCollisions={false}
          sideOffset={8}
          className="z-[120] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex h-9 cursor-pointer select-none items-center rounded-xl px-3 text-sm text-slate-100 outline-none data-[highlighted]:bg-sky-500/20"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2 inline-flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-cyan-300" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
