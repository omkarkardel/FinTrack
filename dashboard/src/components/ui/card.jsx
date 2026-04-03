import { cn } from '../../lib/utils'

export function Card({ className, children }) {
  return <section className={cn('premium-card glass-panel rounded-[28px] p-5 md:p-6', className)}>{children}</section>
}

export function CardHeader({ className, children }) {
  return <div className={cn('mb-6 flex items-start justify-between gap-4', className)}>{children}</div>
}

export function CardTitle({ className, children }) {
  return <h3 className={cn('text-base font-semibold tracking-tight text-strong md:text-lg', className)}>{children}</h3>
}

export function CardDescription({ className, children }) {
  return <p className={cn('mt-1 text-sm leading-6 text-soft', className)}>{children}</p>
}
