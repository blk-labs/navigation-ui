export interface SubRoute {
  label: string;
  route: string;
  image: string;
  group?: string;
}

export interface EcomNavRoute {
  label: string;
  subRoutes?: SubRoute[];
}

export interface EcomNavProps {
  routes: EcomNavRoute[];
  /**
   * Controlled active subroute for display/preview mode.
   * When defined, subroute links render as buttons and navigation
   * is handled via `onNavigate` instead of React Router `<Link>`.
   */
  activeSubRoute?: string;
  /** Called with the subroute's `route` string when clicked in controlled mode. */
  onNavigate?: (route: string) => void;
}
