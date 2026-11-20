import EcommerceNav from '@/shared/components/ecommerce-nav';
import type { EcommerceCategory, EcommerceColumn } from '@/shared/components/ecommerce-nav';
import {
  defaultAccountHref,
  defaultBreadcrumbs,
  defaultCartHref,
  defaultCategories,
  defaultHelpHref,
} from '@/shared/components/ecommerce-nav/content';

const pagePath = '/ecommerce-nav';

function scopeHref(href: string) {
  if (href === '/') return pagePath;
  return `${pagePath}${href}`;
}

function scopeColumns(columns: readonly EcommerceColumn[]): EcommerceColumn[] {
  return columns.map((column) => ({
    ...column,
    links: column.links.map((link) => ({ ...link, href: scopeHref(link.href) })),
  }));
}

const libraryCategories: EcommerceCategory[] = defaultCategories.map((category) => ({
  ...category,
  href: scopeHref(category.href),
  menu: category.menu ? scopeColumns(category.menu) : undefined,
}));

export default function EcommerceNavPage() {
  return (
    <div className="min-h-screen bg-[#ebedf3]">
      <EcommerceNav
        brandHref={pagePath}
        categories={libraryCategories}
        breadcrumbs={defaultBreadcrumbs.map((crumb) => ({ ...crumb, href: scopeHref(crumb.href) }))}
        accountHref={scopeHref(defaultAccountHref)}
        helpHref={scopeHref(defaultHelpHref)}
        cartHref={scopeHref(defaultCartHref)}
      />
    </div>
  );
}
