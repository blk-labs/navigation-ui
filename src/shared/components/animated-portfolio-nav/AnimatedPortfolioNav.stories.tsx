import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import AnimatedPortfolioNav from './AnimatedPortfolioNav';

const meta: Meta<typeof AnimatedPortfolioNav> = {
  title: 'Components/AnimatedPortfolioNav',
  component: AnimatedPortfolioNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div className="min-h-screen bg-[#ebedf3]">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AnimatedPortfolioNav>;

export const Default: Story = {};

export const HoveredPortfolio: Story = {
  args: { defaultHoveredId: 'portfolio' },
};

export const AboutPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/about']}>
        <div className="min-h-screen bg-[#ebedf3]">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};
