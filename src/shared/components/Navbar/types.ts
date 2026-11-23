import type { NavRoute } from '../MobileNav';
import type { UserPortalProps } from '../UserPortal';

export interface HeaderProps {
  routes: NavRoute[];
  className?: string;
  /** Controlled active route for demo/preview mode. When set, disables router-based NavLink. */
  activeRoute?: string;
  /** Callback when a route is clicked in controlled mode. */
  onNavigate?: (route: string) => void;
  /** Props forwarded to the UserPortal component. */
  userPortal?: UserPortalProps;
}
