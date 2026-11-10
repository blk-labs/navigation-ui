export interface NavAction {
  label: string;
  href: string;
}

export interface CategoryItem {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

export interface CategoryColumn {
  heading: string;
  items: CategoryItem[];
}

export interface CategoryMenu {
  kind: 'categories';
  label: string;
  columns: CategoryColumn[];
}

export interface DirectoryLink {
  label: string;
  href: string;
}

export interface DirectoryGroup {
  title: string;
  links: DirectoryLink[];
}

export interface DirectoryMenu {
  kind: 'directory';
  departments: DirectoryLink[];
  groups: DirectoryGroup[];
  rail?: DirectoryLink[];
}

export type NavMenu = CategoryMenu | DirectoryMenu;

export interface WebsiteNavItem {
  label: string;
  href: string;
  menu?: NavMenu;
}

export interface WebsiteNavProps {
  brandName?: string;
  brandHref?: string;
  items?: WebsiteNavItem[];
  activeHref?: string;
  announcement?: string | null;
  offlineMessage?: string;
  login?: NavAction | null;
  signup?: NavAction | null;
  defaultOpenMenu?: string;
  defaultMobileOpen?: boolean;
  className?: string;
}
