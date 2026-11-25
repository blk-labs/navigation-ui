import { ICON } from '@/shared/utils/icon';
import type { PortfolioNavLink } from './types';

export const defaultLinks: PortfolioNavLink[] = [
  { id: 'home', label: 'Home', href: '/', icon: ICON.HOME_LINE },
  { id: 'about', label: 'About', href: '/about', icon: ICON.INFO },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio', icon: ICON.DASHBOARD_LINE },
  { id: 'blog', label: 'Blog', href: '/blog', icon: ICON.NEWSPAPER },
];
