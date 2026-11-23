import { forwardRef, useState, useCallback, useRef, useImperativeHandle, useEffect } from 'react';
import type { InputProps } from './Input.types';
import { classNames } from '../utils/classNames';
import countryCodes from '@/shared/constants/countrycodes.json';

const baseClass = `p-3 w-full font-semibold text-neutral-600 rounded-md hover:bg-neutral bg-neutral-100  outline-none focus:outline-none border  text-sm  placeholder:text-neutral-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, disabled, className, ...props }, ref) => {
    if (props.type === 'tel') {
      return <TelInput {...{ label, error, disabled, className, ...props }} ref={ref} />;
    }

    return (
      <div className="flex flex-col items-start text-left w-full">
        {label && <label className="mb-1 text-base font-semibold text-black">{label}</label>}
        <input
          ref={ref}
          className={classNames(
            baseClass,
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

Input.displayName = 'Input';

export default Input;

const TelInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, disabled, className, onChange, onBlur, name, ...props }, ref) => {
    const codes = countryCodes
      .map((el) => ({
        label: el.dial_code,
        value: el.dial_code,
        name: el.code,
      }))
      .sort((a, b) => Number(a.label.split('+')[1]) - Number(b.label.split('+')[1]));

    const [code, setCode] = useState(codes.find((c) => c.name === 'NG')?.value ?? codes[0].value);
    const [number, setNumber] = useState('');
    const innerRef = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(ref, () => {
      if (!innerRef.current) {
        throw new Error('TelInput ref is not attached');
      }
      return innerRef.current;
    });

    const formatPhoneNumber = useCallback((value: string) => {
      const digits = value.replace(/\D/g, '');
      const groups = [];
      if (digits.length > 0) groups.push(digits.substring(0, 3));
      if (digits.length > 3) groups.push(digits.substring(3, 6));
      if (digits.length > 6) groups.push(digits.substring(6, 10));
      return groups.join(' ');
    }, []);

    const handleNumberChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '');
        const formatted = formatPhoneNumber(digits);
        setNumber(formatted);
        if (onChange && innerRef.current) {
          innerRef.current.value = `${code}${digits}`;
          onChange({
            target: innerRef.current,
            type: 'change',
          } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
      },
      [code, onChange, formatPhoneNumber],
    );

    const handleCodeChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCode = e.target.value;
        setCode(newCode);
        if (onChange && innerRef.current) {
          const digits = number.replace(/\D/g, '');
          innerRef.current.value = `${newCode}${digits}`;
          onChange({
            target: innerRef.current,
            type: 'change',
          } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
      },
      [onChange, number],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur && innerRef.current) {
          onBlur({
            ...e,
            target: innerRef.current,
          });
        }
      },
      [onBlur],
    );

    // Watch for external value changes (like form reset)
    useEffect(() => {
      const form = innerRef.current?.form;
      if (!form) return;

      const handleReset = () => {
        setNumber('');
        // Reset to default country code if needed
        const defaultCode = codes.find((c) => c.name === 'NG')?.value ?? codes[0].value;
        setCode(defaultCode);
      };

      form.addEventListener('reset', handleReset);
      return () => {
        form.removeEventListener('reset', handleReset);
      };
    }, [codes]);

    return (
      <div className="flex flex-col items-start text-left w-full">
        {label && <label className="mb-1 text-base font-semibold text-black">{label}</label>}

        {/* Hidden input to hold the combined value for React Hook Form's ref */}
        <input
          type="hidden"
          name={name}
          value={`${code}${number.replace(/\D/g, '')}`}
          ref={innerRef}
        />

        <div
          className={`flex flex-row items-center px-3 w-full font-semibold text-neutral-600 rounded-md hover:bg-neutral bg-neutral-100 focus-within:border-2  border  text-sm  placeholder:text-neutral-300 transition-colors  gap-2
             ${error ? 'border-danger/40 border-3!' : disabled ? 'cursor-not-allowed opacity-50 ' : 'border-neutral-400 focus:ring-primary-300'}
            
            `}
        >
          <div className="w-fit shrink-0">
            <select
              value={code}
              onChange={handleCodeChange}
              className="w-full h-full bg-transparent outline-none cursor-pointer py-3"
            >
              {codes.map((opt) => (
                <option key={opt.name} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <input
            {...props}
            className={classNames(' outline-none focus:outline-none w-full', className)}
            disabled={disabled}
            value={number}
            onChange={handleNumberChange}
            onBlur={handleBlur}
            inputMode="numeric"
            maxLength={12}
          />
        </div>
        {error && <span className="mt-1 text-xs text-danger">{error}</span>}
      </div>
    );
  },
);

TelInput.displayName = 'TelInput';
