import type { ReactNode } from 'react';

export interface SearchboxProps {
  searchKey?: string;
  placeholder?: string;
  suffixIconFn?: IconFn;
  variant?: 'default' | 'animated';
}

interface IconFn {
  icon: ReactNode | string;
  fn: () => void;
}
