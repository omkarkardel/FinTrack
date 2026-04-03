import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  contactSuggestions,
  costsBreakdown,
  defaultContacts,
  defaultTransactions,
  financeCard,
  goals,
  monthlyPerformance,
  recentActivity,
  statistics,
} from '../data/mockData'

const initialFilters = {
  search: '',
  category: 'all',
  type: 'all',
  sort: 'latest',
}

const viewerAllowedPages = new Set(['dashboard', 'transactions'])

function resolvePageAccess(page, role) {
  if (role === 'viewer' && !viewerAllowedPages.has(page)) {
    return 'dashboard'
  }
  return page
}

function createTransactionId() {
  try {
    if (globalThis.crypto?.randomUUID) {
      return globalThis.crypto.randomUUID()
    }
  } catch {
    // Fallback handled below.
  }

  return `txn-${Date.now()}-${Math.floor(Math.random() * 100000)}`
}

function mergeTransactions(defaultTransactions = [], persistedTransactions = []) {
  if (!Array.isArray(persistedTransactions) || persistedTransactions.length === 0) {
    return defaultTransactions
  }

  const persistedIds = new Set(persistedTransactions.map((transaction) => transaction.id))
  const missingDefaults = defaultTransactions.filter((transaction) => !persistedIds.has(transaction.id))

  return [...persistedTransactions, ...missingDefaults]
}

const initialState = {
  activePage: 'dashboard',
  theme: 'dark',
  role: 'admin',
  isSidebarOpen: false,
  globalSearch: '',
  transactions: defaultTransactions,
  quickContacts: defaultContacts,
  cards: [financeCard],
  dashboardMetrics: {
    goals,
    costsBreakdown,
    statistics,
    monthlyPerformance,
    recentActivity,
  },
  transactionFilters: initialFilters,
}

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setRole: (role) =>
        set((state) => ({
          role,
          activePage: resolvePageAccess(state.activePage, role),
        })),
      setActivePage: (activePage) => set((state) => ({ activePage: resolvePageAccess(activePage, state.role), isSidebarOpen: false })),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      closeSidebar: () => set({ isSidebarOpen: false }),
      setGlobalSearch: (globalSearch) => set({ globalSearch }),
      setTransactionFilters: (filters) =>
        set((state) => ({
          transactionFilters: {
            ...state.transactionFilters,
            ...filters,
          },
        })),
      resetTransactionFilters: () => set({ transactionFilters: initialFilters }),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [{ ...transaction, id: createTransactionId() }, ...state.transactions],
        })),
      updateTransaction: (transactionId, updates) =>
        set((state) => ({
          transactions: state.transactions.map((transaction) =>
            transaction.id === transactionId ? { ...transaction, ...updates } : transaction,
          ),
        })),
      deleteTransaction: (transactionId) =>
        set((state) => {
          if (state.role !== 'admin') return state
          return {
            transactions: state.transactions.filter((transaction) => transaction.id !== transactionId),
          }
        }),
      addQuickContact: () => {
        const existingIds = new Set(get().quickContacts.map((contact) => contact.id))
        const nextContact = contactSuggestions.find((contact) => !existingIds.has(contact.id))
        if (!nextContact) return false
        set((state) => ({ quickContacts: [...state.quickContacts, nextContact] }))
        return true
      },
      logout: () => set({ activePage: 'dashboard', isSidebarOpen: false }),
    }),
    {
      name: 'fintrack-pro-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activePage: state.activePage,
        theme: state.theme,
        role: state.role,
        transactions: state.transactions,
        quickContacts: state.quickContacts,
        transactionFilters: state.transactionFilters,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        transactions: mergeTransactions(currentState.transactions, persistedState?.transactions),
        activePage: resolvePageAccess(
          persistedState?.activePage ?? currentState.activePage,
          persistedState?.role ?? currentState.role,
        ),
        dashboardMetrics: currentState.dashboardMetrics,
        cards: currentState.cards,
      }),
    },
  ),
)
