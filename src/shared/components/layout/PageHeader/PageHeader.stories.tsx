import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import Button from '../../Button/Button';

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  render: () => <PageHeader title="Dashboard" description="Manage your projects and analytics" />,
};

export const WithActions: Story = {
  render: () => (
    <PageHeader
      title="Users"
      description="View and manage registered users"
      actions={<Button>New User</Button>}
    />
  ),
};
