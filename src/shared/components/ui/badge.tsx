import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-200 [&_svg]:size-3 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground border-2 border-primary',
        secondary:
          'bg-secondary text-secondary-foreground border-2 border-border',
        outline: 'border-2 border-primary text-primary bg-transparent',
        destructive:
          'bg-destructive text-destructive-foreground border-2 border-destructive',
        success: 'bg-success text-success-foreground border-2 border-success',
        warning: 'bg-warning text-warning-foreground border-2 border-warning',
        accent: 'bg-accent text-accent-foreground border-2 border-accent',
        ghost: 'bg-muted text-muted-foreground border-2 border-muted',
        neon: 'bg-transparent text-primary border-2 border-primary shadow-[0_0_5px_var(--primary)]',
        'neon-cyan':
          'bg-transparent text-accent border-2 border-accent shadow-[0_0_5px_var(--accent)]',
      },
      size: {
        default: 'h-6 px-2',
        sm: 'h-5 px-1.5',
        lg: 'h-7 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Badge({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }): React.JSX.Element {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
