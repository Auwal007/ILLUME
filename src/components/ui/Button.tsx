import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-ui font-semibold tracking-[0.12em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1 hover:-translate-y-0.5 active:translate-y-0.5",
          {
            "bg-brand-black text-brand-white border border-brand-black/90 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.75)] hover:bg-brand-black/90 hover:shadow-[0_22px_55px_-28px_rgba(0,0,0,0.75)]":
              variant === "primary",
            "bg-surface-1 text-text-primary border border-brand-black/80 hover:bg-brand-black hover:text-brand-white":
              variant === "secondary",
            "bg-transparent border border-border-strong text-text-muted hover:border-brand-black/80 hover:text-text-primary hover:bg-brand-milk/60":
              variant === "outline",
            "bg-transparent text-text-muted hover:text-text-primary hover:bg-brand-milk/60":
              variant === "ghost",
            "px-4 py-2 text-xs": size === "sm",
            "px-6 py-3 text-sm": size === "md",
            "px-8 py-4 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
