export interface CompanyNavLink {
  label: string;
  href: string;
}

export interface CompanyNavAction {
  label: string;
  href: string;
}

export interface AnimatedCompanyNavProps {
  brandName?: string;
  brandHref?: string;
  links?: readonly CompanyNavLink[];
  primaryAction?: CompanyNavAction;
  secondaryAction?: CompanyNavAction;
  announcement?: string | null;
  defaultOpen?: boolean;
  className?: string;
}
