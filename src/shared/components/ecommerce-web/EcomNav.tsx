import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Icon } from '@iconify/react';
import Logo from '../Logo';
import { classNames } from '../utils/classNames';
import Searchbox from '../Search/Searchbox';
import type { EcomNavProps, SubRoute } from './types';
import { Link } from 'react-router-dom';

const btnClass =
  'flex-center hover:bg-primary transition-all duration-200 ease-in-out gap-1 cursor-pointer py-2 rounded-xl px-1.5';

const groupSubRoutes = (subRoutes: SubRoute[]) => {
  const map = new Map<string, SubRoute[]>();
  subRoutes.forEach((s) => {
    const key = s.group ?? '';
    map.set(key, [...(map.get(key) ?? []), s]);
  });
  return [...map.entries()];
};

export default function EcomNav({ routes, activeSubRoute, onNavigate }: EcomNavProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const isControlled = activeSubRoute !== undefined;

  const activeRoute = routes.find((r) => r.label === hovered);
  const subRoutes = activeRoute?.subRoutes;
  const showPanel = !!subRoutes?.length;
  const image = previewSrc ?? subRoutes?.[0]?.image;

  const close = () => {
    setHovered(null);
    setPreviewSrc(null);
  };

  useEffect(() => {
    routes.forEach((r) =>
      r.subRoutes?.forEach((s) => {
        const img = new Image();
        img.src = s.image;
      }),
    );
  }, [routes]);

  return (
    <header className="@container relative flex flex-col w-full">
      <nav className="w-full text-sm md:px-16 text-neutral-50 md:py-7 bg-accent-600 flex-between">
        <Logo hasLabel />
        <Searchbox variant="animated" />
        <aside className="flex-center gap-6">
          <button className={btnClass}>
            Account <Icon icon="ri:user-6-fill" />
          </button>
          <button className={btnClass}>
            Help <Icon icon="ri:question-line" />
          </button>
          <button className={classNames(btnClass, 'bg-accent-500 px-2.5! py-4!')}>
            <Icon icon="ri:shopping-cart-2-fill" fontSize={20} />
            Cart
          </button>
        </aside>
      </nav>

      <div className="relative w-full bg-white" onMouseLeave={close}>
        <div className="flex-center gap-6 h-16">
          {routes.map((el) => (
            <button
              key={el.label}
              onMouseEnter={() => {
                setHovered(el.label);
                setPreviewSrc(null);
              }}
              onFocus={() => {
                setHovered(el.label);
                setPreviewSrc(null);
              }}
              className="relative py-1.5 px-4 cursor-pointer"
            >
              {hovered === el.label && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-accent-500"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
              <span
                className={classNames(
                  'relative z-10 transition-colors duration-200',
                  hovered === el.label ? 'text-white' : 'text-neutral-950',
                )}
              >
                {el.label}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {showPanel && activeRoute && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}

              className="absolute  inset-x-0 pt-5 mx-auto z-50 w-[calc(100%-8rem)]"
            >
              <div className="flex justify-between gap-10 rounded-[40px] bg-accent-500 p-14 text-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRoute.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="flex gap-16 pt-16"
                  >
                    {groupSubRoutes(subRoutes).map(([group, items]) => (
                      <div key={group} className="flex flex-col gap-3">
                        {group && <h4 className="text-[#C5D9F8] mb-2">{group}</h4>}
                        {items.map((link) => {
                          const isActive = isControlled && activeSubRoute === link.route;
                          const linkContent = (
                            <>
                              <span className="block transition-transform duration-500 ease-out group-hover:translate-y-full">
                                {link.label}
                              </span>
                              <span
                                aria-hidden
                                className={classNames(
                                  'absolute inset-0 block -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0',
                                  isActive && 'underline underline-offset-4',
                                )}
                              >
                                {link.label}
                              </span>
                            </>
                          );

                          return isControlled ? (
                            <button
                              key={link.route}
                              type="button"
                              onClick={() => {
                                onNavigate?.(link.route);

                                setHovered(null);
                              }}
                              onMouseEnter={() => {
                                setPreviewSrc(link.image);
                              }}
                              className={classNames(
                                'group relative cursor-pointer block overflow-hidden text-left text-lg leading-normal text-neutral-50',
                                isActive && 'underline underline-offset-4',
                              )}
                            >
                              {linkContent}
                            </button>
                          ) : (
                            <Link
                              key={link.route}
                              to={link.route}
                              onMouseEnter={() => {
                                setPreviewSrc(link.image);
                              }}
                              onClick={() => {
                                setHovered(null);
                              }}
                              className="group relative block overflow-hidden text-lg leading-normal text-neutral-50"
                            >
                              {linkContent}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <PreviewImage src={image} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function PreviewImage({ src }: { src?: string }) {
  return (
    <div className="relative size-56 shrink-0 overflow-hidden rounded-3xl">
      <AnimatePresence initial={false}>
        {src && (
          <motion.img
            loading="lazy"
            key={src}
            src={src}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.25, duration: 0 } }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 size-full object-cover"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
