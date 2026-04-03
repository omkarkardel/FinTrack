import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Dialog(props) {
  return <DialogPrimitive.Root {...props} />
}

export function DialogContent({ className, children, title, description }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[90] bg-slate-950/70 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-[100] w-[min(94vw,680px)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl outline-none',
          className,
        )}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <DialogPrimitive.Title className="text-xl font-semibold text-slate-100">{title}</DialogPrimitive.Title>
            {description ? (
              <DialogPrimitive.Description className="mt-1 text-sm text-slate-300">{description}</DialogPrimitive.Description>
            ) : null}
          </div>
          <DialogPrimitive.Close className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        </div>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
