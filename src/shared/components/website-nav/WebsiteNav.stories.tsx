import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import WebsiteNav from './WebsiteNav';
import {
  defaultNavItems,
  defaultOfflineMessage,
  storeDirectoryMenu,
  wideCategoryMenu,
} from './content';

const meta: Meta<typeof WebsiteNav> = {
  title: 'Components/WebsiteNav',
  component: WebsiteNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { activeHref: '' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="min-h-screen bg-black">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WebsiteNav>;

function PhoneFrame({ children }: { children: ReactNode }) {
  return <div className="mx-auto min-h-screen w-97.5 bg-[#30354a]">{children}</div>;
}

export const Default: Story = {};

export const Active: Story = {
  args: { activeHref: '/' },
};

export const ServicesMenu: Story = {
  args: { defaultOpenMenu: 'Services' },
};

export const Offline: Story = {
  args: { offlineMessage: defaultOfflineMessage },
};

export const WideCategories: Story = {
  args: {
    defaultOpenMenu: 'Services',
    items: defaultNavItems.map((item) =>
      item.label === 'Services' ? { ...item, menu: wideCategoryMenu } : item,
    ),
  },
};

export const Directory: Story = {
  args: {
    defaultOpenMenu: 'Services',
    items: defaultNavItems.map((item) =>
      item.label === 'Services' ? { ...item, menu: storeDirectoryMenu } : item,
    ),
  },
};

export const MobileClosed: Story = {
  decorators: [
    (Story) => (
      <PhoneFrame>
        <Story />
      </PhoneFrame>
    ),
  ],
};

export const MobileOpen: Story = {
  args: { defaultMobileOpen: true },
  decorators: [
    (Story) => (
      <PhoneFrame>
        <Story />
      </PhoneFrame>
    ),
  ],
};

export const MobileServices: Story = {
  args: { defaultMobileOpen: true, defaultOpenMenu: 'Services' },
  decorators: [
    (Story) => (
      <PhoneFrame>
        <Story />
      </PhoneFrame>
    ),
  ],
};
