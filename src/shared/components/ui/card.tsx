import * as React from 'react';

import { cn } from '../../lib/utils';

function Card({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & {
  variant?: 'default' | 'neon' | 'pixel' | 'terminal';
}): React.JSX.Element {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(
        'group/card relative flex flex-col transition-all duration-200',
        {
          'bg-card border-2 border-border shadow-[4px_4px_0_0_var(--border)] hover:shadow-[6px_6px_0_0_var(--border)]':
            variant === 'default',
          'bg-card border-2 border-primary shadow-[0_0_10px_var(--primary)] hover:shadow-[0_0_20px_var(--primary)]':
            variant === 'neon',
          'bg-card border-4 border-primary shadow-[8px_8px_0_0_var(--accent)]':
            variant === 'pixel',
          'bg-background border-2 border-success font-mono shadow-[0_0_10px_var(--success)]':
            variant === 'terminal',
        },
        className
      )}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'flex flex-col gap-1.5 p-4 border-b-2 border-border',
        className
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  ...props
}: React.ComponentProps<'h3'>): React.JSX.Element {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        'text-sm font-bold uppercase tracking-widest text-primary',
        className
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<'p'>): React.JSX.Element {
  return (
    <p
      data-slot="card-description"
      className={cn(
        'text-xs text-muted-foreground uppercase tracking-wide',
        className
      )}
      {...props}
    />
  );
}

function CardAction({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-action"
      className={cn('ml-auto flex items-center gap-2', className)}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div data-slot="card-content" className={cn('p-4', className)} {...props} />
  );
}

function CardFooter({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center gap-4 p-4 border-t-2 border-border mt-auto',
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
