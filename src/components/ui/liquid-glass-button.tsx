import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-[var(--fg)] text-[var(--bg)] hover:brightness-110',
        outline: 'border border-[var(--glass-stroke)] bg-[var(--glass-control)] text-[var(--fg)]',
        ghost: 'text-[var(--fg)] hover:bg-[var(--glass-control)]',
        link: 'text-[var(--accent)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'min-h-11 px-6 py-3',
        sm: 'min-h-10 px-5 py-2.5 text-xs',
        lg: 'min-h-12 px-7 py-3',
        xl: 'min-h-[3.35rem] px-8 py-3.5',
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

const liquidButtonVariants = cva(
  'liquid-glass-button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'liquid-glass-button--default',
        outline: 'liquid-glass-button--outline',
      },
      size: {
        default: 'min-h-11 px-6 py-3',
        sm: 'min-h-10 px-5 py-2.5 text-xs',
        lg: 'min-h-12 px-7 py-3',
        xl: 'min-h-[3.35rem] px-8 py-3.5',
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean
}

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        data-slot="liquid-button"
        data-liquid-glass
        className={cn(liquidButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
LiquidButton.displayName = 'LiquidButton'

export { Button, buttonVariants, LiquidButton, liquidButtonVariants }
