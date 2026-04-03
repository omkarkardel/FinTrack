import { Search } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-2xl border bg-white/5 px-4 text-sm text-strong outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-[color:var(--ring)] placeholder:text-soft',
        className,
      )}
      {...props}
    />
  )
}

export function SearchInput({ className, ...props }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" />
      <Input className="pl-11" {...props} />
    </div>
  )
}
