import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion, stagger, useReducedMotion, type Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { ICON } from '@/shared/utils/icon';
import { classNames } from '../utils/classNames';
import logo from './logo.svg';
import {
  defaultAnnouncement,
  defaultLinks,
  defaultPrimaryAction,
  defaultSecondaryAction,
} from './content';
import type { AnimatedCompanyNavProps } from './types';

const OPEN_HEIGHT = '70vh';
const OPEN_LAYER_INTERVAL = 0.18;
const CLOSE_LAYER_INTERVAL = 0.15;
const CLOSE_WIPE_DELAY = 0.22;
const LINK_REVEAL_DELAY = 0.42;

const overlayColors = ['bg-[#8a1c04]', 'bg-[#9775ed]', 'bg-[#412d9a]'];
const baseLayerCloseDelay = CLOSE_WIPE_DELAY + overlayColors.length * CLOSE_LAYER_INTERVAL;
const wipeTransition = {
  duration: 0.36,
  ease: [0.65, 0, 0.35, 1] as const,
};
const announcementTransition = { duration: 0.22, ease: 'easeInOut' } as const;
const instantTransition = { duration: 0 };

const linkVariants = {
  hidden: {
    opacity: 0,
    y: '100%',
    transition: { duration: 0.22, ease: 'easeIn' },
  },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      opacity: { type: 'spring', mass: 1, stiffness: 100, damping: 20 },
      y: { duration: 0.28, ease: 'easeOut' },
    },
  },
} satisfies Variants;

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd47e]';

const navFont = 'font-["Helvetica_Now_Display","Helvetica_Neue",system-ui,sans-serif]';

export default function AnimatedCompanyNav({
  brandName = 'BLK Labs',
  brandHref = '/',
  links = defaultLinks,
  primaryAction = defaultPrimaryAction,
  secondaryAction = defaultSecondaryAction,
  announcement = defaultAnnouncement,
  defaultOpen = false,
  className,
}: AnimatedCompanyNavProps) {
  const [open, setOpen] = useState(defaultOpen);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => {
    setOpen(false);
  }, []);
  const toggle = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      close();
      menuButtonRef.current?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  const linkIntervals = Math.max(links.length - 1, 1);
  const menuVariants = {
    hidden: {
      transition: { delayChildren: stagger(Math.min(0.1, 0.4 / linkIntervals)) },
    },
    visible: {
      transition: {
        delayChildren: stagger(Math.min(0.14, 0.56 / linkIntervals), {
          startDelay: LINK_REVEAL_DELAY,
          from: 'last',
        }),
      },
    },
  } satisfies Variants;

  return (
    <div className={classNames('@container', className)}>
      <div className="relative isolate min-h-20 overflow-clip bg-[#3660da]">
        <div className="pointer-events-none" aria-hidden="true">
          <motion.div
            initial={false}
            animate={{ height: open ? OPEN_HEIGHT : 0 }}
            transition={
              reduceMotion
                ? instantTransition
                : { ...wipeTransition, delay: open ? 0 : baseLayerCloseDelay }
            }
            className="bg-[#f99300]"
          />
          {overlayColors.map((color, index) => (
            <motion.div
              key={color}
              initial={false}
              animate={{ scaleY: open ? 1 : 0 }}
              transition={
                reduceMotion
                  ? instantTransition
                  : {
                      ...wipeTransition,
                      delay: open
                        ? (index + 1) * OPEN_LAYER_INTERVAL
                        : CLOSE_WIPE_DELAY +
                          (overlayColors.length - 1 - index) * CLOSE_LAYER_INTERVAL,
                    }
              }
              style={{ height: OPEN_HEIGHT }}
              className={classNames('absolute inset-x-0 top-0 origin-top', color)}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 top-0 z-10 flex h-20 items-center justify-between gap-4 px-5 text-white @min-[960px]:px-8">
          <button
            ref={menuButtonRef}
            type="button"
            className={classNames(
              'inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-white',
              focusRing,
            )}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={toggle}
          >
            <Icon icon={open ? ICON.CLOSE : ICON.MENU} fontSize={24} aria-hidden="true" />
          </button>

          <Link
            to={brandHref}
            className={classNames(
              'pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              focusRing,
            )}
            aria-label={brandName}
          >
            <img src={logo} alt="" className="size-12" />
          </Link>

          <div className="flex shrink-0 items-center gap-2 @min-[960px]:gap-3">
            <Link
              to={primaryAction.href}
              className={classNames(
                'rounded-lg bg-white px-3.5 py-2 text-sm font-medium text-[#30354a] @min-[960px]:px-4',
                focusRing,
              )}
            >
              {primaryAction.label}
            </Link>
            <Link
              to={secondaryAction.href}
              className={classNames(
                'rounded-lg border border-white px-3.5 py-2 text-sm font-medium text-white @min-[960px]:px-4',
                focusRing,
              )}
            >
              {secondaryAction.label}
            </Link>
          </div>
        </div>

        <nav
          id={menuId}
          className="absolute inset-x-0 top-20 z-10 overflow-x-hidden overflow-y-auto px-6 text-white"
          style={{ height: `calc(${OPEN_HEIGHT} - 5rem)` }}
          aria-label="Primary"
          aria-hidden={!open}
          inert={!open}
        >
          <AnimatePresence>
            {open ? (
              <motion.ul
                key="menu-links"
                initial={reduceMotion ? false : 'hidden'}
                animate="visible"
                exit={reduceMotion ? undefined : 'hidden'}
                variants={menuVariants}
                className={classNames(
                  'flex min-h-full flex-col items-center justify-center gap-5.5 pt-2 pb-6 text-center text-3xl/[1.3] font-light',
                  navFont,
                )}
              >
                {links.map((link) => (
                  <motion.li key={link.href} variants={linkVariants}>
                    <Link
                      to={link.href}
                      onClick={close}
                      className={classNames('group flex flex-col items-stretch', focusRing)}
                    >
                      <span>{link.label}</span>
                      <span
                        aria-hidden="true"
                        className="mt-1 h-px w-full bg-current opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                      />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            ) : null}
          </AnimatePresence>
        </nav>
      </div>

      <AnimatePresence initial={false}>
        {!open && announcement ? (
          <motion.p
            key="announcement"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: reduceMotion
                ? instantTransition
                : { ...announcementTransition, delay: baseLayerCloseDelay + 0.24 },
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? instantTransition : announcementTransition}
            className="overflow-hidden bg-[#ffd47e] text-center text-sm text-[#30354a]"
          >
            <span className="block px-4 py-2.5">{announcement}</span>
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
