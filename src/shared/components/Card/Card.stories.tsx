import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <p>This is a card</p>,
  },
};

export const WithCustomContent: Story = {
  args: {
    children: (
      <div>
        <h3 className="font-bold text-lg">Title</h3>
        <p className="text-sm text-neutral-700">Description inside card</p>
      </div>
    ),
  },
};
