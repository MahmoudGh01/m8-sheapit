import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'group/button relative inline-flex shrink-0 items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-0.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/80 shadow-[4px_4px_0_0_var(--accent)] hover:shadow-[2px_2px_0_0_var(--accent)] active:shadow-none',
        secondary:
          'bg-secondary text-secondary-foreground border-2 border-border hover:bg-secondary/80 shadow-[4px_4px_0_0_var(--border)] hover:shadow-[2px_2px_0_0_var(--border)] active:shadow-none',
        outline:
          'border-2 border-primary bg-transparent text-primary hover:bg-primary/10 shadow-[4px_4px_0_0_var(--primary)] hover:shadow-[2px_2px_0_0_var(--primary)] active:shadow-none',
        ghost:
          'text-muted-foreground hover:text-primary hover:bg-primary/10 border-2 border-transparent hover:border-primary/50',
        destructive:
          'bg-destructive text-destructive-foreground border-2 border-destructive hover:bg-destructive/80 shadow-[4px_4px_0_0_var(--warning)] hover:shadow-[2px_2px_0_0_var(--warning)] active:shadow-none',
        success:
          'bg-success text-success-foreground border-2 border-success hover:bg-success/80 shadow-[4px_4px_0_0_var(--accent)] hover:shadow-[2px_2px_0_0_var(--accent)] active:shadow-none',
        accent:
          'bg-accent text-accent-foreground border-2 border-accent hover:bg-accent/80 shadow-[4px_4px_0_0_var(--primary)] hover:shadow-[2px_2px_0_0_var(--primary)] active:shadow-none',
        link: 'text-primary underline-offset-4 hover:underline p-0 h-auto border-none shadow-none',
        neon: 'bg-transparent text-primary border-2 border-primary hover:bg-primary/20 shadow-[0_0_10px_var(--primary),inset_0_0_10px_var(--primary)] hover:shadow-[0_0_20px_var(--primary),inset_0_0_20px_var(--primary)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 px-2.5 text-[10px]',
        sm: 'h-9 px-3',
        lg: 'h-12 px-6',
        xl: 'h-14 px-8',
        icon: 'size-10',
        'icon-xs': 'size-7',
        'icon-sm': 'size-9',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }): React.JSX.Element {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
