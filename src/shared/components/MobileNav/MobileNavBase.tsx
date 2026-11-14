import { Icon } from '@iconify/react';
import { useState, type ReactNode } from 'react';
import type { BaseProps } from './types';
import { ICON } from '@/shared/utils/icon';
import { AnimatePresence, motion } from 'motion/react';

function renderIcon(icon?: ReactNode | string) {
  if (!icon) return null;
  return typeof icon === 'string' ? <Icon icon={icon} fontSize={21} /> : icon;
}

export default function MobileNavBase({
  routes,
  activeRoute,
  onNavigate,
  maxVisibleRoutes = 5,
}: BaseProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  const max = Math.max(1, maxVisibleRoutes);
  const visible = routes.slice(0, max);
  const overflow = routes.slice(max);
  const hasOverflow = overflow.length > 0;
  const overflowActive = overflow.some((r) => r.route === activeRoute);
  return (
    <nav className="w-full relative mt-auto grid grid-cols-5 gap-1 p-2 rounded-2xl bg-primary">
      {visible.map((r) => {
        const active = r.route === activeRoute;
        return (
          <button
            key={r.route}
            type="button"
            aria-current={active ? 'page' : undefined}
            onClick={() => {
              onNavigate(r.route);
              setMoreOpen(false);
            }}
            className={`col-center rounded-lg cursor-pointer transition-all ease-in duration-150  size-15 text-[10px] gap-px ${
              active
                ? ' bg-primary-800 text-secondary-200 ring ring-primary-700 font-bold'
                : 'text-primary-500 border-none'
            }`}
          >
            {renderIcon(active ? (r.activeIcon ?? r.icon) : r.icon)}
            <span className="max-w-[80%] truncate">{r.label}</span>
          </button>
        );
      })}

      {hasOverflow && (
        <div className="absolute right-0 bottom-full mb-12 flex flex-col items-end gap-2">
          <AnimatePresence>
            {moreOpen &&
              overflow.map((r, i) => {
                const active = r.route === activeRoute;
                return (
                  <motion.button
                    key={r.route}
                    type="button"
                    onClick={() => {
                      onNavigate(r.route);
                      setMoreOpen(false);
                    }}
                    style={{ transformOrigin: 'bottom right' }}
                    initial={{ opacity: 0, y: 24, scale: 0.85 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 420,
                        damping: 28,
                        delay: (overflow.length - 1 - i) * 0.05, // nearest the toggle first
                      },
                    }}
                    exit={{
                      opacity: 0,
                      y: 24,
                      scale: 0.85,
                      transition: { duration: 0.12, delay: i * 0.03 }, // farthest leaves first
                    }}
                    className={`flex items-center gap-2 p-5 rounded-full bg-secondary text-gray-50 cursor-pointer text-sm ${
                      active ? 'font-medium' : ''
                    }`}
                  >
                    <span>{r.label}</span>
                    {renderIcon(active ? (r.activeIcon ?? r.icon) : r.icon)}
                  </motion.button>
                );
              })}
          </AnimatePresence>

          <button
            type="button"
            aria-label={moreOpen ? 'Close menu' : 'More navigation'}
            aria-expanded={moreOpen}
            onClick={() => {
              setMoreOpen((o) => !o);
            }}
            className={`flex-center size-15 rounded-full bg-secondary text-gray-50 cursor-pointer ${
              overflowActive && !moreOpen ? 'ring-2 ring-secondary-200' : ''
            }`}
          >
            <Icon
              icon={ICON.PLUS}
              fontSize={27}

              className={`transition-all ease-in duration-100 ${moreOpen ? 'rotate-45' : ''}`}
            />
          </button>
        </div>
      )}
    </nav>
  );
}
