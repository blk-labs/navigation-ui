import { forwardRef } from 'react';
import type { TextareaProps } from './Textarea.types';
import { classNames } from '../utils/classNames';

/**
 * @component
 * A multi-line text input field with optional label and error display.
 *
 * The Textarea component provides a form input for capturing multi-line text
 * with integrated label and error messaging. It supports all standard textarea
 * HTML attributes and includes disabled state styling.
 *
 * @param {Object} props - Component props extending TextareaHTMLAttributes
 * @param {string} [props.label] - Optional label text displayed above the textarea
 * @param {string} [props.error] - Optional error message displayed below the textarea in red.
 *   When provided, the textarea border color changes to danger color.
 * @param {boolean} [props.disabled] - If true, disables the textarea input and reduces opacity
 * @param {string} [props.className] - Optional CSS class name for additional styling
 * @param {any} [props...] - All standard TextareaHTMLAttributes are supported
 *   (e.g., placeholder, rows, cols, onChange, onFocus, etc.)
 *
 * @example
 * // Basic textarea with label
 * <Textarea label="Comments" placeholder="Enter your comments here..." />
 *
 * @example
 * // Textarea with error message
 * <Textarea
 *   label="Description"
 *   error="This field is required"
 *   placeholder="Please provide a description"
 * />
 *
 * @example
 * // Disabled textarea
 * <Textarea
 *   label="Notes"
 *   disabled
 *   defaultValue="This field is disabled"
 * />
 *
 * @example
 * // With custom rows and onChange handler
 * <Textarea
 *   label="Feedback"
 *   placeholder="Share your feedback..."
 *   rows={5}
 *   onChange={(e) => handleChange(e.target.value)}
 * />
 *
 * @returns {React.ReactElement} The rendered textarea component
 */
const baseClass = `p-3 w-full font-semibold text-neutral-600 rounded-md hover:bg-neutral bg-neutral-100  outline-none focus:outline-none border  text-sm  placeholder:text-neutral-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, disabled, className, ...props }, ref) => {
    return (
      <div className="flex flex-col items-start text-left w-full">
        {label && <label className="mb-1 text-base font-semibold text-black">{label}</label>}
        <textarea
          ref={ref}
          className={classNames(
            baseClass,
            'resize-none',
            error ? 'border-danger/40 border-3!' : 'border-neutral-400 focus:ring-primary-300',
            className,
          )}
          disabled={disabled}
          {...props}
        />
        {error && <span className="mt-1 text-xs text-danger">{error}</span>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
