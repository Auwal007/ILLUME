import { TextareaHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-border-subtle bg-surface-1/90 px-4 py-3 text-sm text-text-primary shadow-[0_10px_30px_-26px_rgba(0,0,0,0.35)] ring-offset-surface-1 placeholder:text-text-muted/70 focus-visible:outline-none focus-visible:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold/35 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
