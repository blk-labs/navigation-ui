import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: '', label: 'Choose an option' },
  { value: 'one', label: 'Option One' },
  { value: 'two', label: 'Option Two' },
];

export const Default: Story = { args: { options } };
export const WithLabel: Story = { args: { label: 'Select Option', options } };
export const Disabled: Story = { args: { options } };
export const Error: Story = { args: { options, error: 'Selection required' } };
