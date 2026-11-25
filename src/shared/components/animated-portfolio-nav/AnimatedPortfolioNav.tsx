import { useState } from 'react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { classNames } from '../utils/classNames';
import logo from './logo.png';
import { defaultLinks } from './content';
import type { AnimatedPortfolioNavProps, PortfolioNavLink } from './types';

const pillTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1],
} as const;

const contentTransition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] } as const;

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9cc0f4]';

function isCurrent(href: string, current: string, links: readonly PortfolioNavLink[]) {
  if (!current) return false;
  const matches = links.filter((link) => {
    if (current === link.href) return true;
    if (link.href === '/') return false;
    return current.startsWith(`${link.href}/`);
  });
  matches.sort((left, right) => right.href.length - left.href.length);
  return matches.length > 0 && matches[0].href === href;
}

function MenuItem({
  link,
  expanded,
  current,
  onHoverStart,
  onHoverEnd,
}: {
  link: PortfolioNavLink;
  expanded: boolean;
  current: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <Link
      to={link.href}
      aria-label={link.label}
      aria-current={current ? 'page' : undefined}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      className={focusRing}
    >
      <motion.span
        layout
        initial={false}
        animate={{
          width: expanded ? 'auto' : 56,
          paddingLeft: expanded ? 16 : 0,
          paddingRight: expanded ? 16 : 0,
          backgroundColor: expanded ? '#f5f6fa' : '#4b7ce6',
          borderColor: expanded ? '#f5f6fa' : '#9cc0f4',
          color: expanded ? '#4b7ce6' : '#ffffff',
        }}
        transition={pillTransition}
        className="relative flex h-14 min-w-14 items-center justify-center overflow-hidden rounded-lg border border-solid"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {expanded ? (
            <motion.span
              key="label"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={contentTransition}
              className="whitespace-nowrap text-[14px] font-normal leading-none"
            >
              {link.label}
            </motion.span>
          ) : (
            <motion.span
              key="icon"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={contentTransition}
              className="inline-flex text-white"
            >
              <Icon icon={link.icon} fontSize={24} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </Link>
  );
}

export default function AnimatedPortfolioNav({
  brandName = 'BLK Labs',
  brandHref = '/',
  links = defaultLinks,
  activeHref,
  defaultHoveredId = null,
  className,
}: AnimatedPortfolioNavProps) {
  const location = useLocation();
  const current = activeHref ?? location.pathname;
  const [hoveredId, setHoveredId] = useState<string | null>(defaultHoveredId);

  return (
    <header className={classNames('@container bg-[#3660da]', className)}>
      <div className="mx-auto flex max-w-360 items-center justify-between gap-6 px-5 py-5 @min-[960px]:px-20">
        <Link to={brandHref} className={classNames('shrink-0', focusRing)} aria-label={brandName}>
          <img src={logo} alt="" className="size-[52px] rounded-full" />
        </Link>

        <nav aria-label="Primary" className="flex items-center justify-end gap-2">
          {links.map((link) => {
            const currentPage = isCurrent(link.href, current, links);
            const expanded = hoveredId === link.id;
            return (
              <MenuItem
                key={link.id}
                link={link}
                expanded={expanded}
                current={currentPage}
                onHoverStart={() => { setHoveredId(link.id); }}
                onHoverEnd={() => { setHoveredId(null); }}
              />
            );
          })}
        </nav>
      </div>
    </header>
  );
}
