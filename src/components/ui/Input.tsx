import { InputHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-border-subtle bg-surface-1/90 px-4 py-2 text-sm text-text-primary shadow-[0_10px_30px_-26px_rgba(0,0,0,0.35)] ring-offset-surface-1 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted/70 focus-visible:outline-none focus-visible:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold/35 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
