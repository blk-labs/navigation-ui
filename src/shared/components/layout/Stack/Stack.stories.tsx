import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Stack>;

export const Column: Story = {
  render: () => (
    <Stack>
      <div className="bg-primary-500 p-4 text-white">Item 1</div>
      <div className="bg-secondary-500 p-4 text-white">Item 2</div>
      <div className="bg-success-500 p-4 text-white">Item 3</div>
    </Stack>
  ),
};

export const Row: Story = {
  render: () => (
    <Stack direction="row" gap="lg">
      <div className="bg-primary-500 p-4 text-white">Item 1</div>
      <div className="bg-secondary-500 p-4 text-white">Item 2</div>
      <div className="bg-success-500 p-4 text-white">Item 3</div>
    </Stack>
  ),
};
