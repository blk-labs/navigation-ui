import { forwardRef, useState, useEffect, useRef, useImperativeHandle } from 'react';
import type { SelectProps, Option } from './Select.types';
import { classNames } from '../utils/classNames';
import Popover from '../Popover/Popover';

/**
 * @component
 * A dropdown select input field with optional label and error display.
 *
 * The Select component provides a form input for selecting from predefined options
 * with integrated label and error messaging. It supports all standard select
 * HTML attributes and includes disabled state styling.
 *
 * @param {Object} props - Component props extending SelectHTMLAttributes
 * @param {Option[]} props.options - Array of options to display in the dropdown.
 *   Each option must have 'value' and 'label' properties.
 * @param {string} [props.label] - Optional label text displayed above the select
 * @param {string} [props.error] - Optional error message displayed below the select in red.
 *   When provided, the select border color changes to danger color.
 * @param {boolean} [props.disabled] - If true, disables the select input and reduces opacity
 * @param {string} [props.className] - Optional CSS class name for additional styling
 * @param {any} [props...] - All standard SelectHTMLAttributes are supported
 *   (e.g., value, onChange, onFocus, defaultValue, etc.)
 *
 * @example
 * // Basic select with options
 * const options = [
 *   { value: "option1", label: "Option 1" },
 *   { value: "option2", label: "Option 2" },
 *   { value: "option3", label: "Option 3" }
 * ];
 * <Select label="Choose an option" options={options} />
 *
 * @example
 * // Select with error message
 * <Select
 *   label="Status"
 *   options={statusOptions}
 *   error="Please select a valid status"
 * />
 *
 * @example
 * // Select with onChange handler
 * <Select
 *   label="Category"
 *   options={categoryOptions}
 *   onChange={(e) => handleCategoryChange(e.target.value)}
 *   value={selectedCategory}
 * />
 *
 * @example
 * // Disabled select
 * <Select
 *   label="Read-only field"
 *   options={options}
 *   disabled
 *   value="option1"
 * />
 *
 * @returns {React.ReactElement} The rendered select component
 */
const baseClass = `p-3 w-full! cursor-pointer font-semibold text-neutral-600 rounded-md hover:bg-neutral bg-neutral-100  outline-none focus:outline-none border  text-sm  placeholder:text-neutral-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`;

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      className,
      isLoading,
      value,
      name,
      onChange,
      onBlur,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {
      if (!hiddenInputRef.current) throw new Error('Ref not found');
      return hiddenInputRef.current;
    });
    const initialOption = options.find((el) => el.value === value);
    const [selected, setSelected] = useState<string>(initialOption?.label ?? placeholder ?? '');

    const handleSelect = (el: Option, close: () => void) => {
      setSelected(el.label);

      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = el.value;
        const event = new Event('change', { bubbles: true });
        hiddenInputRef.current.dispatchEvent(event);
      }

      onChange?.(el.value, el);
      close();
    };

    useEffect(() => {
      const option = options.find((el) => el.value === value);
      if (option) {
        setSelected(option.label);
      } else if (placeholder) {
        setSelected(placeholder);
      } else if (options.length > 0) {
        setSelected(options[0].label);
      }
    }, [value, options, placeholder]);

    return (
      <Popover>
        <div className="flex flex-col items-start text-left w-full">
          {label && <label className="mb-1 text-base font-semibold text-black">{label}</label>}
          <Popover.Menu className="w-full">
            <Popover.Trigger>
              <div
                tabIndex={0}
                className={classNames(
                  baseClass,
                  'flex items-center justify-between gap-2',
                  error
                    ? 'border-danger/40 border-3!'
                    : 'border-neutral-400 focus:ring-primary-300',
                  className,
                )}
                onBlur={onBlur}
                {...props}
              >
                <span className="truncate">
                  {isLoading ? `Loading ${name ?? ''}...` : selected}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 opacity-50"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </Popover.Trigger>

            <input
              type="hidden"
              name={name}
              value={value ?? ''}
              ref={hiddenInputRef}
              onBlur={onBlur}
            />

            <Popover.Content className=" border border-neutral-100 rounded-lg card-shadow">
              {(close) => (
                <ul className="w-full flex flex-col gap-2">
                  {options.map((opt) => (
                    <li
                      key={opt.value}
                      className="px-3 py-2 w-full hover:bg-neutral-100 cursor-pointer text-neutral-950 font-semibold text-sm"
                      onClick={() => {
                        handleSelect(opt, close);
                      }}
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </Popover.Content>
          </Popover.Menu>
          {error && <span className="mt-1 text-xs text-danger">{error}</span>}
        </div>
      </Popover>
    );
  },
);

Select.displayName = 'Select';

export default Select;
