import { cn } from '../../lib/utils'

export function Badge({ className, tone = 'default', children }) {
  const tones = {
    default: 'bg-white/[0.08] text-strong',
    success: 'bg-emerald-500/[0.14] text-emerald-300',
    danger: 'bg-rose-500/[0.14] text-rose-300',
    info: 'bg-sky-500/[0.14] text-sky-300',
  }

  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', tones[tone], className)}>
      {children}
    </span>
  )
}
