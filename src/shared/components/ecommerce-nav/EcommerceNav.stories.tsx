import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import EcommerceNav from './EcommerceNav';
import { defaultBreadcrumbs, defaultOfflineMessage } from './content';

const meta: Meta<typeof EcommerceNav> = {
  title: 'Components/EcommerceNav',
  component: EcommerceNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/fashion']}>
        <div className="min-h-screen bg-white">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EcommerceNav>;

function PhoneFrame({ children }: { children: ReactNode }) {
  return <div className="mx-auto min-h-screen w-97.5 bg-white">{children}</div>;
}

export const Default: Story = {};

export const MegaMenu: Story = {
  args: { defaultMenuId: 'fashion' },
};

export const Breadcrumbs: Story = {
  args: { breadcrumbs: defaultBreadcrumbs },
};

export const Offline: Story = {
  args: { offlineMessage: defaultOfflineMessage },
};

export const Mobile: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <PhoneFrame>
          <Story />
        </PhoneFrame>
      </MemoryRouter>
    ),
  ],
};

export const MobileMenu: Story = {
  args: { defaultMobileOpen: true, defaultMenuId: 'fashion' },
  decorators: Mobile.decorators,
};

export const MobileOffline: Story = {
  args: { offlineMessage: defaultOfflineMessage },
  decorators: Mobile.decorators,
};
