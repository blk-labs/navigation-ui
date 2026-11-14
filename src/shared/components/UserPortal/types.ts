export interface UserInfo {
  name: string;
  subtitle?: string;
  avatarUrl?: string;
}

export interface RoleOption {
  label: string;
  value: string;
}

export interface AgencyOption {
  label: string;
  value: string;
}

export interface UserPortalProps {
  /** User display info for the trigger and dropdown header */
  user: UserInfo;

  /** List of roles for the "Viewing As" section */
  roles: RoleOption[];

  /** Currently active role value */
  activeRole: string;

  /** Callback when a role is selected */
  onRoleChange: (role: string) => void;

  /** Callback when sign out is clicked */
  onSignOut: () => void;

  /**
   * Optional list of agencies. When provided, enables the agency switcher
   * variant with a secondary popover on the user header.
   */
  agencies?: AgencyOption[];

  /** Currently active agency value (required when agencies is provided) */
  activeAgency?: string;

  /** Callback when an agency is selected */
  onAgencyChange?: (agency: string) => void;

  /** Additional class name for the outer Menu wrapper */
  className?: string;

  /** Additional class name for the Popover.Content dropdown */
  contentClassName?: string;
}
