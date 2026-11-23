import type { NavRoute } from '../MobileNav';

export interface NavGroupItem extends NavRoute {
  subRoutes?: NavRoute[];
  isPinned?: boolean;
}

export interface NavGroup {
  label: string;
  routes: NavGroupItem[];
}

export interface SidebarRoutes {
  routes: NavGroup;
}

export interface SidebarProps {
  /** Optional custom navigation groups. Defaults to SIDEBAR_ROUTES */
  groups?: NavGroup[];
  /** Controlled active route for preview/demo mode. When provided, disables router NavLink. */
  activeRoute?: string;
  /** Callback triggered when a route is clicked in controlled mode. */
  onNavigate?: (route: string) => void;
  /** Additional CSS class names for the sidebar container */
  className?: string;
}
