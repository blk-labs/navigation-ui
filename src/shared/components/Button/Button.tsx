import { forwardRef } from 'react';
import type { ButtonProps, ButtonVariant } from './Button.types';
import Spinner from '../Spinner/Spinner';
import { classNames } from '../utils/classNames';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-neutral hover:bg-primary-500 focus:primary-300 focus:border-primary-500 active:bg-primary-600 active:text-neutral-400',
  secondary:
    'bg-secondary text-secondary-900 hover:bg-secondary-300 focus:border-secondary-500 focus:secondary-200 focus:border-secondary-700 active:bg-secondary-500 active:text-neutral-700',
  outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50',
  ghost: 'bg-transparent text-primary-500 hover:bg-primary-50',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', loading = false, disabled, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          'p-3 rounded-lg cursor-pointer font-semibold flex focus:border-2 items-center justify-center gap-2 transition-colors  disabled:cursor-not-allowed',
          variantClasses[variant],
          className,
        )}
        disabled={disabled ?? loading}
        {...props}
      >
        {loading && <Spinner size="sm" />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
