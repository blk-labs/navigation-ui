import { ICON } from '@/shared/utils/icon';
import type { CategoryItem, CategoryMenu, DirectoryMenu, NavAction, WebsiteNavItem } from './types';

export const defaultAnnouncement = 'Lorem ipsum dolor sit amet consectetur adipiscing 🎉';

export const defaultOfflineMessage = "You're currently offline, please reconnect.";

export const defaultLogin: NavAction = { label: 'Log in', href: '/login' };

export const defaultSignup: NavAction = { label: 'Sign up', href: '/signup' };

const description = 'Lorem ipsum dolor sit amet consectetur adipiscing';

function categoryItems(title: string, hrefBase: string, count = 3): CategoryItem[] {
  return Array.from({ length: count }, (_, index) => ({
    title,
    description,
    href: `${hrefBase}-${String(index + 1)}`,
    icon: ICON.FILE_COPY,
  }));
}

export const servicesMenu: CategoryMenu = {
  kind: 'categories',
  label: 'Services',
  columns: [
    {
      heading: 'Project categories',
      items: categoryItems('Innovative Service', '/services/innovative-service'),
    },
    {
      heading: 'Project categories',
      items: categoryItems('Innovative Category', '/services/innovative-category'),
    },
  ],
};

export const wideCategoryMenu: CategoryMenu = {
  kind: 'categories',
  label: 'Services',
  columns: Array.from({ length: 5 }, (_, index) => ({
    heading: 'Project categories',
    items: categoryItems('Innovative Category', `/services/category-column-${String(index + 1)}`),
  })),
};

const departments = [
  'Official Store',
  'Electronics',
  'Fashion',
  'Home',
  'Supermarket',
  'Gadgets',
  'Kitchen',
  'Office',
];

export const storeDirectoryMenu: DirectoryMenu = {
  kind: 'directory',
  departments: departments.map((label) => ({
    label,
    href: `/store/${label.toLowerCase().replace(/\s+/g, '-')}`,
  })),
  groups: [
    {
      title: 'Incoming high on',
      links: [
        { label: 'Dresses', href: '/store/dresses' },
        { label: 'Maternity', href: '/store/maternity' },
        { label: 'Traditional', href: '/store/traditional' },
      ],
    },
    {
      title: 'Mens fashion',
      links: [
        { label: 'Makeup', href: '/store/makeup' },
        { label: 'Shoes', href: '/store/shoes' },
        { label: 'T-Shirts', href: '/store/t-shirts' },
      ],
    },
    {
      title: 'Kids fashion',
      links: [
        { label: 'Bags', href: '/store/bags' },
        { label: 'Dior Fashion', href: '/store/dior-fashion' },
        { label: 'Innovative Category', href: '/store/innovative-category' },
      ],
    },
    {
      title: 'Accessories',
      links: [
        { label: 'Nike', href: '/store/nike' },
        { label: 'Bata', href: '/store/bata' },
        { label: 'Jewelries', href: '/store/jewelries' },
      ],
    },
    {
      title: 'Top brands',
      links: [
        { label: 'NIKE', href: '/store/brand-nike' },
        { label: 'ADIDAS', href: '/store/adidas' },
        { label: 'Non-Balance', href: '/store/non-balance' },
      ],
    },
  ],
  rail: [
    { label: 'Fashion', href: '/store/fashion' },
    { label: 'Jewelry', href: '/store/jewelry' },
    { label: 'Footwear', href: '/store/footwear' },
  ],
};

export const defaultNavItems: WebsiteNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', menu: servicesMenu },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];
