import AnimatedCompanyNav from '@/shared/components/animated-company-nav';
import type { CompanyNavLink } from '@/shared/components/animated-company-nav';
import {
  defaultLinks,
  defaultPrimaryAction,
  defaultSecondaryAction,
} from '@/shared/components/animated-company-nav/content';

const pagePath = '/animated-company-nav';

function scopeHref(href: string) {
  if (href === '/') return pagePath;
  return `${pagePath}${href}`;
}

const libraryLinks: CompanyNavLink[] = defaultLinks.map((link) => ({
  ...link,
  href: scopeHref(link.href),
}));

export default function AnimatedCompanyNavPage() {
  return (
    <div className="min-h-screen bg-white">
      <AnimatedCompanyNav
        brandHref={pagePath}
        links={libraryLinks}
        primaryAction={{ ...defaultPrimaryAction, href: scopeHref(defaultPrimaryAction.href) }}
        secondaryAction={{
          ...defaultSecondaryAction,
          href: scopeHref(defaultSecondaryAction.href),
        }}
      />
    </div>
  );
}
