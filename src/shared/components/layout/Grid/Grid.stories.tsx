import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const ThreeColumns: Story = {
  render: () => (
    <Grid cols={3}>
      <div className="bg-primary-500 p-6 text-white">1</div>
      <div className="bg-secondary-500 p-6 text-white">2</div>
      <div className="bg-success-500 p-6 text-white">3</div>
    </Grid>
  ),
};

export const FourColumnsLargeGap: Story = {
  render: () => (
    <Grid cols={4} gap="lg">
      <div className="bg-primary-500 p-6 text-white">1</div>
      <div className="bg-secondary-500 p-6 text-white">2</div>
      <div className="bg-success-500 p-6 text-white">3</div>
      <div className="bg-danger-500 p-6 text-white">4</div>
    </Grid>
  ),
};
