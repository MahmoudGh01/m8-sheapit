import * as React from 'react';

import { cn } from '../../lib/utils';

type InputProps = React.ComponentProps<'input'> & {
  variant?: 'default' | 'terminal' | 'neon';
};

function Input({
  className,
  type,
  variant = 'default',
  ...props
}: InputProps): React.JSX.Element {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(
        'flex h-10 w-full px-3 py-2 text-xs uppercase tracking-wide transition-all duration-200 outline-none placeholder:text-muted-foreground/70 placeholder:uppercase disabled:cursor-not-allowed disabled:opacity-50 font-mono',
        {
          'bg-input border-2 border-border focus:border-primary focus:shadow-[0_0_10px_var(--primary)]':
            variant === 'default',
          'bg-background border-2 border-success text-success focus:shadow-[0_0_10px_var(--success)]':
            variant === 'terminal',
          'bg-transparent border-2 border-primary text-primary focus:shadow-[0_0_15px_var(--primary),inset_0_0_10px_var(--primary)]':
            variant === 'neon',
        },
        className
      )}
      {...props}
    />
  );
}

export { Input };
export type { InputProps };
