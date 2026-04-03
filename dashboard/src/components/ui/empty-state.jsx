import { Button } from './button'

export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.04] px-6 py-12 text-center">
      <p className="text-lg font-semibold text-strong">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-soft">{description}</p>
      {actionLabel && onAction ? (
        <div className="mt-5 flex justify-center">
          <Button variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
