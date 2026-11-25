import AnimatedPortfolioNav from '@/shared/components/animated-portfolio-nav';
import type { PortfolioNavLink } from '@/shared/components/animated-portfolio-nav';
import { defaultLinks } from '@/shared/components/animated-portfolio-nav/content';

const pagePath = '/animated-portfolio-nav';

function scopeHref(href: string) {
  if (href === '/') return pagePath;
  return `${pagePath}${href}`;
}

const libraryLinks: PortfolioNavLink[] = defaultLinks.map((link) => ({
  ...link,
  href: scopeHref(link.href),
}));

export default function AnimatedPortfolioNavPage() {
  return (
    <div className="min-h-screen bg-[#ebedf3]">
      <AnimatedPortfolioNav brandHref={pagePath} links={libraryLinks} />
    </div>
  );
}
