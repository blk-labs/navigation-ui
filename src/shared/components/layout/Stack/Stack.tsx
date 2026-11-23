import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}

const gapMap = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

/**
 * A flexible layout component for arranging child elements in a row or column with consistent spacing and alignment.
 *
 * @component
 * @example
 * // Default vertical stack with medium gap
 * <Stack>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 *
 * @example
 * // Horizontal row with centered alignment
 * <Stack direction="row" gap="lg" align="center" justify="between">
 *   <div>Left</div>
 *   <div>Right</div>
 * </Stack>
 *
 * @example
 * // Vertical stack with small gap and end alignment
 * <Stack direction="col" gap="sm" align="end">
 *   <button>Button 1</button>
 *   <button>Button 2</button>
 * </Stack>
 *
 * @param {Object} props - Component props
 * @param {"row" | "col"} [props.direction="col"] - Direction to arrange children (row for horizontal, col for vertical)
 * @param {"xs" | "sm" | "md" | "lg" | "xl"} [props.gap="md"] - Gap size between child elements
 * @param {"start" | "center" | "end" | "stretch"} [props.align] - Alignment of items along the cross axis
 * @param {"start" | "center" | "end" | "between" | "around"} [props.justify] - Justification of items along the main axis
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.HTMLAttributes<HTMLDivElement>} props - All standard HTML div attributes are supported
 * @returns {React.ReactElement} The rendered stack component
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ direction = 'col', gap = 'md', align, justify, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          'flex',
          direction === 'row' ? 'flex-row' : 'flex-col',
          gapMap[gap],
          align && alignMap[align],
          justify && justifyMap[justify],
          className,
        )}
        {...props}
      />
    );
  },
);

Stack.displayName = 'Stack';
