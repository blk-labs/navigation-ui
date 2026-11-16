import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import EnterpriseNav from './EnterpriseNav';
import { offlineItems } from './content';

const meta: Meta<typeof EnterpriseNav> = {
  title: 'Components/EnterpriseNav',
  component: EnterpriseNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div className="min-h-screen bg-white">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EnterpriseNav>;

export const Default: Story = {
  args: { activeHref: '/' },
};

export const Nested: Story = {
  args: {
    activeHref: '/user-management/businesses',
    defaultOpenIds: ['user-management', 'businesses'],
  },
};

export const Collapsed: Story = {
  args: { activeHref: '/', defaultCollapsed: true },
};

export const Syncing: Story = {
  args: { activeHref: '/', syncing: true, items: offlineItems },
};

export const Offline: Story = {
  args: { activeHref: '/', items: offlineItems },
};

export const ProfileOpen: Story = {
  args: { activeHref: '/', defaultProfileOpen: true },
};
