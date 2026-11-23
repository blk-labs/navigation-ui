import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: 'Enter text' } };
export const WithLabel: Story = { args: { label: 'Username', placeholder: 'Enter username' } };
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } };
export const Error: Story = { args: { placeholder: 'Enter email', error: 'Invalid email' } };
