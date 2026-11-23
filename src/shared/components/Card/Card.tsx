import { forwardRef } from 'react';
import type { CardProps } from './Card.types';
import { classNames } from '../utils/classNames';

const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames(
        'bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm p-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
