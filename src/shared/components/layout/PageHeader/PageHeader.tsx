import React from 'react';
import { classNames } from '../../utils/classNames';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

/**
 * A header component for displaying page title, optional description, and action buttons.
 * Responsive layout that stacks on mobile and arranges horizontally on larger screens.
 *
 * @component
 * @example
 * // Basic usage with title only
 * <PageHeader title="Dashboard" />
 *
 * @example
 * // With description
 * <PageHeader
 *   title="Products"
 *   description="Manage your product catalog"
 * />
 *
 * @example
 * // With actions
 * <PageHeader
 *   title="Projects"
 *   description="View and manage your projects"
 *   actions={<button>Create Project</button>}
 * />
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The main title text displayed in the page header
 * @param {string} [props.description] - Optional descriptive text displayed below the title
 * @param {React.ReactNode} [props.actions] - Optional ReactNode for buttons or other action controls
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.HTMLAttributes<HTMLElement>} props - All standard HTML element attributes are supported
 * @returns {React.ReactElement} The rendered page header component
 */
export function PageHeader({ title, description, actions, className, ...props }: PageHeaderProps) {
  return (
    <header
      className={classNames(
        'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
        className,
      )}
      {...props}
    >
      <div>
        <h1 className="text-3xl font-semibold text-neutral-900">{title}</h1>

        {description && <p className="mt-1 text-sm text-neutral-600">{description}</p>}
      </div>

      {actions && <div>{actions}</div>}
    </header>
  );
}
