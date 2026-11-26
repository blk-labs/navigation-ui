import { Icon } from '@iconify/react';
import type { ReactNode } from 'react';

export function renderIcon(icon?: ReactNode | string) {
  if (!icon) return null;
  return typeof icon === 'string' ? <Icon icon={icon} fontSize={21} /> : icon;
}
