import type { NavRoute } from '../MobileNav';

export interface SidebarUser {
  name: string;
  email?: string;
  avatarUrl?: string;
  onSignOut?: () => void;
}

export interface SubRouteItem extends NavRoute {
  /** Optional alert or notification count to display as a badge */
  alertCount?: number | string;
  /** Badge color variant: 'default' (neutral/brand) or 'danger' */
  alertVariant?: 'default' | 'danger';
}

export interface NavGroupItem extends NavRoute {
  subRoutes?: SubRouteItem[];
  isPinned?: boolean;
  alertCount?: number | string;
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
  /** User account information and action callbacks for the bottom profile footer */
  user?: SidebarUser;
  /** Additional CSS class names for the sidebar container */
  className?: string;
}
