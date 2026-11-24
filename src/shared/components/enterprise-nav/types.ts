export type EnterpriseBadge =
  { kind: 'count'; value: number } | { kind: 'pill'; label: string; tone: 'accent' | 'muted' };

export interface EnterpriseNavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: EnterpriseBadge;
  children?: EnterpriseNavItem[];
}

export interface EnterpriseFolder {
  id: string;
  label: string;
  href: string;
  count: number;
}

export interface EnterpriseUser {
  name: string;
  email: string;
}

export interface EnterpriseNavProps {
  brandName?: string;
  brandHref?: string;
  items?: readonly EnterpriseNavItem[];
  folders?: readonly EnterpriseFolder[];
  utility?: readonly EnterpriseNavItem[];
  user?: EnterpriseUser;
  activeHref?: string;
  syncing?: boolean;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  defaultOpenIds?: readonly string[];
  defaultProfileOpen?: boolean;
  onSignOut?: () => void;
  className?: string;
}
