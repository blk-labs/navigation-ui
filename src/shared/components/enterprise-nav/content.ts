import { ICON } from '@/shared/utils/icon';
import type { EnterpriseFolder, EnterpriseNavItem, EnterpriseUser } from './types';

export const defaultUser: EnterpriseUser = {
  name: 'Steven Olakunle',
  email: 'olakunle@email.com',
};

export const defaultItems: EnterpriseNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/', icon: ICON.DASHBOARD },
  { id: 'activity', label: 'Activity', href: '/activity', icon: ICON.NOTIFICATION },
  {
    id: 'user-management',
    label: 'User Management',
    href: '/user-management',
    icon: ICON.USER,
    badge: { kind: 'count', value: 4 },
    children: [
      { id: 'individuals', label: 'Individuals', href: '/user-management/individuals' },
      {
        id: 'businesses',
        label: 'Businesses',
        href: '/user-management/businesses',
        children: [
          { id: 'ngos', label: 'NGOs', href: '/user-management/businesses/ngos' },
          {
            id: 'limited-liability',
            label: 'Limited Liability',
            href: '/user-management/businesses/limited-liability',
          },
          { id: 'partnerships', label: 'Partnerships', href: '/user-management/partnerships' },
        ],
      },
    ],
  },
  {
    id: 'requests',
    label: 'Requests',
    href: '/requests',
    icon: ICON.BRANCH,
    badge: { kind: 'count', value: 4 },
  },
  {
    id: 'directory',
    label: 'Directory',
    href: '/directory',
    icon: ICON.PRINTER,
    badge: { kind: 'pill', label: 'Badge', tone: 'accent' },
  },
];

export const offlineItems: EnterpriseNavItem[] = defaultItems.map((item) =>
  item.id === 'directory'
    ? { ...item, badge: { kind: 'pill', label: 'New', tone: 'muted' } }
    : item,
);

export const defaultFolders: EnterpriseFolder[] = [
  { id: 'folder-1', label: 'Folder 1', href: '/folders/1', count: 1 },
  { id: 'folder-2', label: 'Folder 2', href: '/folders/2', count: 2 },
  { id: 'folder-3', label: 'Folder 3', href: '/folders/3', count: 3 },
];

export const defaultUtility: EnterpriseNavItem[] = [
  { id: 'settings', label: 'Settings', href: '/settings', icon: ICON.SETTINGS },
  { id: 'support', label: 'Support', href: '/support', icon: ICON.HEADPHONES },
];
