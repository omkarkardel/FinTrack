import { useMemo } from 'react'

export function useFinanceSummary(transactions) {
  return useMemo(() => {
    const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
    const expense = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
    const net = income - expense

    const expensesByCategory = transactions
      .filter((item) => item.type === 'expense')
      .reduce((accumulator, transaction) => {
        accumulator[transaction.category] = (accumulator[transaction.category] ?? 0) + transaction.amount
        return accumulator
      }, {})

    const largestTransaction = [...transactions].sort((a, b) => b.amount - a.amount)[0] ?? null

    return {
      income,
      expense,
      net,
      availableBalance: net,
      reserveBucket: net * 0.35,
      expensesByCategory,
      largestTransaction,
    }
  }, [transactions])
}
