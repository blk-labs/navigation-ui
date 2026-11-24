import EnterpriseNav from '@/shared/components/enterprise-nav';
import type { EnterpriseNavItem } from '@/shared/components/enterprise-nav';
import {
  defaultFolders,
  defaultItems,
  defaultUtility,
} from '@/shared/components/enterprise-nav/content';

const pagePath = '/enterprise-nav';

function scopeHref(href: string) {
  if (href === '/') return pagePath;
  return `${pagePath}${href}`;
}

function scopeItems(items: readonly EnterpriseNavItem[]): EnterpriseNavItem[] {
  return items.map((item) => ({
    ...item,
    href: scopeHref(item.href),
    children: item.children ? scopeItems(item.children) : undefined,
  }));
}

const libraryItems = scopeItems(defaultItems);
const libraryFolders = defaultFolders.map((folder) => ({
  ...folder,
  href: scopeHref(folder.href),
}));
const libraryUtility = scopeItems(defaultUtility);

export default function EnterpriseNavPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <EnterpriseNav
        brandHref={pagePath}
        items={libraryItems}
        folders={libraryFolders}
        utility={libraryUtility}
      />
    </div>
  );
}
