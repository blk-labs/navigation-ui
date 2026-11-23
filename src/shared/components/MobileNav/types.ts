import type { ReactNode } from 'react';

export interface NavRoute {
  label: string;
  route: string;
  icon?: ReactNode | string;
  activeIcon?: ReactNode | string;
}

export interface BaseProps {
  routes: NavRoute[];
  activeRoute: string;
  onNavigate: (route: string) => void;
  maxVisibleRoutes?: number;
}

export interface MobileNavProps {
  routes: NavRoute[];
  maxVisibleRoutes?: number;
}
