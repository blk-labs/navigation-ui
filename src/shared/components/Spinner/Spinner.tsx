import { forwardRef } from 'react';
import type { SpinnerProps } from './Spinner.types';
import { classNames } from '../utils/classNames';

const sizeMap: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-10 h-10',
};

const colorMap: Record<NonNullable<SpinnerProps['color']>, string> = {
  primary: 'border-primary-500',
  secondary: 'border-secondary-500',
  success: 'border-success-500',
  danger: 'border-danger-500',
  neutral: 'border-neutral-500',
};

/**
 * @component
 * An animated loading indicator component for displaying pending operations.
 *
 * The Spinner component renders as a rotating circular element with customizable
 * size and color. It's typically used to indicate that a process is in progress.
 *
 * @param {Object} props - Component props
 * @param {"sm" | "md" | "lg"} [props.size="md"] - The size of the spinner.
 *   - "sm": Small (w-4 h-4)
 *   - "md": Medium (w-6 h-6) - default
 *   - "lg": Large (w-10 h-10)
 * @param {"primary" | "secondary" | "success" | "danger" | "neutral"} [props.color="primary"] -
 *   The color variant of the spinner border. Default is "primary".
 * @param {string} [props.className] - Optional CSS class name for additional styling
 *
 * @example
 * // Basic usage with default medium size and primary color
 * <Spinner />
 *
 * @example
 * // Different sizes
 * <Spinner size="sm" />
 * <Spinner size="md" />
 * <Spinner size="lg" />
 *
 * @example
 * // With different colors
 * <Spinner size="md" color="success" />
 * <Spinner size="lg" color="danger" />
 *
 * @example
 * // With custom className
 * <Spinner size="md" color="primary" className="mx-auto" />
 *
 * @returns {React.ReactElement} The rendered spinner component
 */
const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', color = 'primary', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          'border-4 border-t-transparent border-solid rounded-full animate-spin',
          sizeMap[size],
          colorMap[color],
          className,
        )}
        {...props}
      />
    );
  },
);

Spinner.displayName = 'Spinner';

export default Spinner;
