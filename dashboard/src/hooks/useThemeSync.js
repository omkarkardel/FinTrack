import { useEffect } from 'react'
import { useFinanceStore } from '../store/useFinanceStore'

export function useThemeSync() {
  const theme = useFinanceStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])
}
