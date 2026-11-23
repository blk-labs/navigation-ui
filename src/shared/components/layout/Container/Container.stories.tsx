import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: () => (
    <Container>
      <div className="bg-gray-200 p-8 text-center">Container Content</div>
    </Container>
  ),
};

export const Large: Story = {
  render: () => (
    <Container size="2xl">
      <div className="bg-gray-200 p-8 text-center">2XL Container</div>
    </Container>
  ),
};
