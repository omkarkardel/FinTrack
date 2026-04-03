import { cn } from '../../lib/utils'

const variants = {
  primary: 'bg-linear-to-r from-sky-500 via-cyan-400 to-blue-500 text-white shadow-[0_18px_40px_rgba(14,165,233,0.32)] hover:brightness-110',
  secondary: 'glass-muted text-strong hover:bg-white/10',
  ghost: 'bg-transparent text-soft hover:bg-white/[0.08] hover:text-white',
  danger: 'bg-rose-500/90 text-white hover:bg-rose-500',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  icon: 'h-11 w-11',
}

export function Button({ className, variant = 'primary', size = 'md', ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl border border-white/10 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)] disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
