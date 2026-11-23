import type { NavRoute } from '../components/MobileNav';
import { ICON } from '../utils/icon';

export const MobileNavRoutes: NavRoute[] = [
  {
    label: 'Home',
    route: '/',
    icon: ICON.HOME,
    activeIcon: ICON.HOME_FILLED,
  },
  {
    label: 'Cards',
    route: '/cards',
    icon: ICON.CARDS,
    activeIcon: ICON.CARDS_FILLED,
  },
  {
    label: 'Send',
    route: '/send',
    icon: ICON.SEND,
    activeIcon: ICON.SEND_FILLED,
  },
  {
    label: 'Invest',
    route: '/invest',
    icon: ICON.INVEST,
    activeIcon: ICON.INVEST_FILLED,
  },
  {
    label: 'Profile',
    route: '/profile',
    icon: ICON.PROFILE,
    activeIcon: ICON.PROFILE_FILLED,
  },
  {
    label: 'Request statement',
    route: '/request-statement',
    icon: ICON.TIME,
  },
  {
    label: 'Request loan',
    route: '/request-loan',
    icon: 'griddy-icons:loan',
  },
  {
    label: 'Request card',
    route: '/request-card',
    icon: ICON.CARDS,
  },
];
