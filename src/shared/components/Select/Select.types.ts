import type { HTMLAttributes } from 'react';

export interface Option {
  value: string;
  label: string;
  name?: string;
}

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: Option[];
  label?: string;
  error?: string;
  isLoading?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string, option: Option) => void;
  placeholder?: string;
}
