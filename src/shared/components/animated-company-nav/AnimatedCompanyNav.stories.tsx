import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import AnimatedCompanyNav from './AnimatedCompanyNav';

const meta: Meta<typeof AnimatedCompanyNav> = {
  title: 'Components/AnimatedCompanyNav',
  component: AnimatedCompanyNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="min-h-screen bg-white">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AnimatedCompanyNav>;

export const Default: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const WithoutAnnouncement: Story = {
  args: { announcement: null },
};
