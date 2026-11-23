import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const sizeMap: Record<NonNullable<ContainerProps['size']>, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'w-full',
};

/**
 * A responsive container component that limits content width with responsive padding.
 * Provides a centered, max-width wrapper for page content.
 *
 * @component
 * @example
 * // Default size (xl)
 * <Container>
 *   <p>Content here</p>
 * </Container>
 *
 * @example
 * // With custom size
 * <Container size="md">
 *   <p>Narrower content</p>
 * </Container>
 *
 * @param {Object} props - Component props
 * @param {"sm" | "md" | "lg" | "xl" | "2xl" | "full"} [props.size="xl"] - The maximum width size of the container
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.HTMLAttributes<HTMLDivElement>} props - All standard HTML div attributes are supported
 * @returns {React.ReactElement} The rendered container component
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'xl', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('mx-auto px-4 sm:px-6 lg:px-8', sizeMap[size], className)}
        {...props}
      />
    );
  },
);

Container.displayName = 'Container';
