import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithHooks = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="px-4 py-2 bg-primary-500 text-white rounded-md"
      >
        Open Modal
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
        title="Modal Title"
      >
        <p>This is the modal content.</p>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWithHooks />,
};
