import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = { args: { placeholder: 'Enter message' } };
export const WithLabel: Story = { args: { label: 'Message', placeholder: 'Type your message...' } };
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } };
export const Error: Story = { args: { placeholder: 'Enter comment', error: 'Required field' } };
