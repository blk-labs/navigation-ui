import { forwardRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { ModalProps } from './Modal.types';
import { classNames } from '../utils/classNames';
import { Icon } from '@iconify/react';

let openModalCount = 0;
let lockedScrollY = 0;
let originalBodyStyles: Partial<CSSStyleDeclaration> | null = null;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 16,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
} as const;

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, children, className, custom }, ref) => {
    useEffect(() => {
      if (!isOpen) return;

      const { body } = document;

      if (openModalCount === 0) {
        lockedScrollY = window.scrollY;
        originalBodyStyles = {
          overflow: body.style.overflow,
          position: body.style.position,
          top: body.style.top,
          left: body.style.left,
          right: body.style.right,
          width: body.style.width,
        };

        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${String(lockedScrollY)}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';
      }

      openModalCount += 1;

      return () => {
        openModalCount -= 1;

        if (openModalCount === 0 && originalBodyStyles) {
          body.style.overflow = originalBodyStyles.overflow ?? '';
          body.style.position = originalBodyStyles.position ?? '';
          body.style.top = originalBodyStyles.top ?? '';
          body.style.left = originalBodyStyles.left ?? '';
          body.style.right = originalBodyStyles.right ?? '';
          body.style.width = originalBodyStyles.width ?? '';

          window.scrollTo(0, lockedScrollY);
          originalBodyStyles = null;
        }
      };
    }, [isOpen]);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            className={classNames(
              'fixed inset-0 z-50 flex items-center justify-center px-4',
              custom ? 'bg-[#1a1a1d]/58 backdrop-blur-[10px]' : 'bg-black/70 backdrop-blur-md',
            )}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {custom ? (
              <motion.div
                className="w-full"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {children}
              </motion.div>
            ) : (
              <motion.div
                className={classNames(
                  'bg-white relative  shadow-lg max-w-md w-full p-6',
                  className,
                )}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
                {children}
                <button
                  type="button"
                  onClick={() => onClose?.()}
                  className="absolute top-3 right-3 text-black cursor-pointer"
                >
                  <Icon icon="mdi:close" fontSize={24} />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
