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
          "inline-flex items-center justify-center font-ui font-semibold tracking-wide transition-all duration-300",
          {
            "bg-brand-black text-brand-white border border-brand-black hover:bg-brand-white hover:text-brand-black":
              variant === "primary",
            "bg-transparent text-brand-black border border-brand-black hover:bg-brand-black hover:text-brand-white":
              variant === "secondary",
            "bg-transparent border border-gray-300 text-gray-700 hover:border-brand-black hover:text-brand-black":
              variant === "outline",
            "bg-transparent text-gray-600 hover:text-brand-black hover:bg-gray-100":
              variant === "ghost",
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
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
