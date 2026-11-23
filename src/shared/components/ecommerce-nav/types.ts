export interface EcommerceLink {
  label: string;
  href: string;
}

export interface EcommerceColumn {
  title: string;
  links: EcommerceLink[];
}

export interface EcommerceCategory {
  id: string;
  label: string;
  href: string;
  menu?: EcommerceColumn[];
}

export interface EcommerceCrumb {
  label: string;
  href: string;
}

export interface EcommerceNavProps {
  brandName?: string;
  brandHref?: string;
  categories?: readonly EcommerceCategory[];
  breadcrumbs?: readonly EcommerceCrumb[];
  offlineMessage?: string;
  accountHref?: string;
  helpHref?: string;
  cartHref?: string;
  onSearch?: (query: string) => void;
  defaultMenuId?: string | null;
  defaultMobileOpen?: boolean;
  activeHref?: string;
  className?: string;
}
