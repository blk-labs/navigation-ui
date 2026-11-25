export interface PortfolioNavLink {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface AnimatedPortfolioNavProps {
  brandName?: string;
  brandHref?: string;
  links?: readonly PortfolioNavLink[];
  activeHref?: string;
  defaultHoveredId?: string | null;
  className?: string;
}
