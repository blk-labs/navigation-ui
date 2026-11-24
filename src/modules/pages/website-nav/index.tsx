import WebsiteNav from '@/shared/components/website-nav';
import type { NavMenu, WebsiteNavItem } from '@/shared/components/website-nav';
import {
  defaultLogin,
  defaultNavItems,
  defaultSignup,
} from '@/shared/components/website-nav/content';

const pagePath = '/website-nav';

function scopeHref(href: string) {
  if (href === '/') return pagePath;
  return `${pagePath}${href}`;
}

function scopeMenu(menu: NavMenu): NavMenu {
  if (menu.kind === 'categories') {
    return {
      ...menu,
      columns: menu.columns.map((column) => ({
        ...column,
        items: column.items.map((item) => ({ ...item, href: scopeHref(item.href) })),
      })),
    };
  }

  return {
    ...menu,
    departments: menu.departments.map((link) => ({ ...link, href: scopeHref(link.href) })),
    groups: menu.groups.map((group) => ({
      ...group,
      links: group.links.map((link) => ({ ...link, href: scopeHref(link.href) })),
    })),
    rail: menu.rail?.map((link) => ({ ...link, href: scopeHref(link.href) })),
  };
}

const libraryItems: WebsiteNavItem[] = defaultNavItems.map((item) => ({
  ...item,
  href: scopeHref(item.href),
  menu: item.menu ? scopeMenu(item.menu) : undefined,
}));

export default function WebsiteNavPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebsiteNav
        items={libraryItems}
        brandHref={pagePath}
        login={{ ...defaultLogin, href: scopeHref(defaultLogin.href) }}
        signup={{ ...defaultSignup, href: scopeHref(defaultSignup.href) }}
      />
    </div>
  );
}
