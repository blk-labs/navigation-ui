import type { CompanyNavAction, CompanyNavLink } from './types';

export const defaultAnnouncement = 'Lorem ipsum dolor sit amet consectetur adipiscing 🥳';

export const defaultLinks: CompanyNavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export const defaultPrimaryAction: CompanyNavAction = {
  label: 'Button',
  href: '/primary',
};

export const defaultSecondaryAction: CompanyNavAction = {
  label: 'Button',
  href: '/secondary',
};
