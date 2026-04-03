import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import { Input } from '../ui/input'

const initialForm = {
  title: '',
  amount: '',
  date: '',
  category: 'Food',
  type: 'expense',
  paymentMethod: 'Credit Card',
  status: 'completed',
  notes: '',
}

const categories = ['Salary', 'Food', 'House', 'Car', 'Pets', 'Study', 'Lifestyle', 'Software', 'Freelance', 'Investments', 'Side Hustle']
const paymentMethods = ['Credit Card', 'Debit Card', 'Bank Transfer', 'Auto Debit', 'Mobile Wallet', 'Wire', 'Brokerage', 'Card Refund']

export default function TransactionModal({ open, onOpenChange, onSave, transaction }) {
  const [form, setForm] = useState(() =>
    transaction
      ? {
          title: transaction.title,
          amount: String(transaction.amount),
          date: transaction.date,
          category: transaction.category,
          type: transaction.type,
          paymentMethod: transaction.paymentMethod,
          status: transaction.status,
          notes: transaction.notes,
        }
      : { ...initialForm, date: new Date().toISOString().slice(0, 10) },
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.title.trim() || !form.amount || !form.date) {
      toast.error('Please complete the required transaction fields.')
      return
    }

    if (Number(form.amount) <= 0) {
      toast.error('Transaction amount must be greater than zero.')
      return
    }

    onSave({
      ...form,
      title: form.title.trim(),
      amount: Number(form.amount),
      notes: form.notes.trim(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={transaction ? 'Edit transaction' : 'Add transaction'} description="Capture cashflow activity with clean validation and persistent local storage.">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <Input
                value={form.title}
                onChange={(event) => setForm((state) => ({ ...state, title: event.target.value }))}
                placeholder="Merchant or title"
                className="border-white/20 bg-slate-900/70 text-slate-100 placeholder:text-slate-400"
              />
            </Field>
            <Field label="Amount">
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={(event) => setForm((state) => ({ ...state, amount: event.target.value }))}
                placeholder="0.00"
                className="border-white/20 bg-slate-900/70 text-slate-100 placeholder:text-slate-400"
              />
            </Field>
            <Field label="Date">
              <Input
                type="date"
                value={form.date}
                onChange={(event) => setForm((state) => ({ ...state, date: event.target.value }))}
                className="border-white/20 bg-slate-900/70 text-slate-100"
              />
            </Field>
            <Field label="Category">
              <select value={form.category} onChange={(event) => setForm((state) => ({ ...state, category: event.target.value }))} className="h-11 w-full rounded-2xl border border-white/20 bg-slate-900/70 px-4 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-[color:var(--ring)]">
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-white text-slate-900">
                    {category}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Transaction type">
              <select value={form.type} onChange={(event) => setForm((state) => ({ ...state, type: event.target.value }))} className="h-11 w-full rounded-2xl border border-white/20 bg-slate-900/70 px-4 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-[color:var(--ring)]">
                <option value="income" className="bg-white text-slate-900">Income</option>
                <option value="expense" className="bg-white text-slate-900">Expense</option>
              </select>
            </Field>
            <Field label="Payment method">
              <select value={form.paymentMethod} onChange={(event) => setForm((state) => ({ ...state, paymentMethod: event.target.value }))} className="h-11 w-full rounded-2xl border border-white/20 bg-slate-900/70 px-4 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-[color:var(--ring)]">
                {paymentMethods.map((method) => (
                  <option key={method} value={method} className="bg-white text-slate-900">
                    {method}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Notes">
            <textarea
              value={form.notes}
              onChange={(event) => setForm((state) => ({ ...state, notes: event.target.value }))}
              placeholder="Optional memo"
              className="min-h-28 w-full rounded-2xl border border-white/20 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-[color:var(--ring)] placeholder:text-slate-400"
            />
          </Field>
          <div className="mt-2 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{transaction ? 'Save changes' : 'Save transaction'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-100">{label}</span>
      {children}
    </label>
  )
}
