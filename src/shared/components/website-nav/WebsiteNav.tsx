import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { ICON } from '@/shared/utils/icon';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { classNames } from '../utils/classNames';
import AnnouncementBar from './AnnouncementBar';
import { defaultAnnouncement, defaultLogin, defaultNavItems, defaultSignup } from './content';
import logo from './logo.svg';
import { CategoryPanel, DesktopMenu, DirectoryPanel } from './Menus';
import type { WebsiteNavItem, WebsiteNavProps } from './types';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd47e]';

const pillTransition = { type: 'spring', stiffness: 460, damping: 36 } as const;

const tabText = {
  idle: 'text-[#f5f6fa]',
  hover: 'text-[#c1b5f8]',
  active: 'text-[#836af0]',
  current: 'text-[#a290f4]',
} as const;

function tabTextClass(
  label: string,
  active: string | null,
  pointed: string | null,
  indicated: string | null,
) {
  if (label === pointed) return tabText.hover;
  if (label === active && label === indicated) return tabText.current;
  if (label === active) return tabText.active;
  return tabText.idle;
}

function NavPill({ layoutId }: { layoutId: string }) {
  return (
    <motion.span
      layoutId={layoutId}
      initial={false}
      transition={pillTransition}
      className="pointer-events-none absolute inset-0 rounded-lg bg-[#353d57]"
    />
  );
}

function isCurrent(href: string, current: string) {
  if (!current) return false;
  if (href === '/') return current === '/';
  return current === href || current.startsWith(`${href}/`);
}

function activeItemLabel(items: readonly WebsiteNavItem[], current: string) {
  const matches = items.filter((item) => isCurrent(item.href, current));
  return matches.sort((left, right) => right.href.length - left.href.length)[0]?.label ?? null;
}

export default function WebsiteNav({
  brandName = 'BLK Labs',
  brandHref = '/',
  items = defaultNavItems,
  activeHref,
  announcement = defaultAnnouncement,
  offlineMessage,
  login = defaultLogin,
  signup = defaultSignup,
  defaultOpenMenu,
  defaultMobileOpen = false,
  className,
}: WebsiteNavProps) {
  const location = useLocation();
  const current = activeHref ?? location.pathname;
  const [openMenu, setOpenMenu] = useState<string | null>(defaultOpenMenu ?? null);
  const [mobileOpen, setMobileOpen] = useState(defaultMobileOpen);
  const [hovered, setHovered] = useState<string | null>(null);
  const desktopNavRef = useRef<HTMLElement>(null);

  const close = useCallback(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, []);

  const headerRef = useOutsideClick(close, undefined, mobileOpen || openMenu !== null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [close]);

  function desktopIsVisible() {
    return (desktopNavRef.current?.getClientRects().length ?? 0) > 0;
  }

  function revealFromPointer(item: WebsiteNavItem) {
    if (!desktopIsVisible()) return;
    setHovered(item.label);
    setOpenMenu(item.menu ? item.label : null);
  }

  const activeLabel = activeItemLabel(items, current);
  const pointedLabel = hovered ?? openMenu;
  const indicatedLabel = pointedLabel ?? activeLabel;
  const desktopMenu = items.find((item) => item.label === openMenu)?.menu ?? null;

  return (
    <header
      ref={headerRef}
      className={classNames('@container relative z-40 w-full', className)}
      onMouseLeave={() => {
        setHovered(null);
        if (desktopIsVisible()) setOpenMenu(null);
      }}
    >
      <div className="flex items-center justify-between gap-4 bg-[#30354a] px-4 py-4 @min-[960px]:grid @min-[960px]:grid-cols-[1fr_auto_1fr] @min-[960px]:px-8">
        <Link to={brandHref} className="flex w-fit items-center" onClick={close}>
          <img src={logo} alt={brandName} className="h-10 w-auto shrink-0" />
        </Link>

        <nav
          ref={desktopNavRef}
          aria-label="Primary"
          className="hidden items-center gap-1 @min-[960px]:flex"
        >
          {items.map((item) => {
            const menuOpen = openMenu === item.label;
            const indicated = item.label === indicatedLabel;
            const linkClass = classNames(
              'relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300',
              focusRing,
              tabTextClass(item.label, activeLabel, pointedLabel, indicatedLabel),
            );

            if (item.menu) {
              return (
                <button
                  key={item.label}
                  type="button"
                  className={classNames(linkClass, 'cursor-pointer')}
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  aria-current={item.label === activeLabel ? 'page' : undefined}
                  aria-controls={`website-nav-menu-${item.label}`}
                  onMouseEnter={() => {
                    revealFromPointer(item);
                  }}
                  onClick={() => {
                    setOpenMenu(menuOpen ? null : item.label);
                  }}
                >
                  {indicated ? <NavPill layoutId="website-nav-pill" /> : null}
                  <span className="relative z-10">{item.label}</span>
                  <Icon
                    icon={ICON.ARROW_DOWN}
                    fontSize={16}
                    aria-hidden="true"
                    className={classNames(
                      'relative z-10 transition-transform duration-300',
                      menuOpen && 'rotate-180',
                    )}
                  />
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                aria-current={item.label === activeLabel ? 'page' : undefined}
                className={linkClass}
                onMouseEnter={() => {
                  revealFromPointer(item);
                }}
                onClick={close}
              >
                {indicated ? <NavPill layoutId="website-nav-pill" /> : null}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center justify-end gap-2 @min-[960px]:flex">
          {login ? (
            <Link
              to={login.href}
              onClick={close}
              className={classNames(
                'rounded-xl bg-[#353d57] px-4 py-2 text-sm font-medium text-[#f5f6fa] transition-colors hover:bg-[#3d4667]',
                focusRing,
              )}
            >
              {login.label}
            </Link>
          ) : null}
          {signup ? (
            <Link
              to={signup.href}
              onClick={close}
              className={classNames(
                'rounded-xl bg-[#f5f6fa] px-4 py-2 text-sm font-semibold text-[#30354a] transition-colors hover:bg-white',
                focusRing,
              )}
            >
              {signup.label}
            </Link>
          ) : null}
        </div>

        <button
          type="button"
          className={classNames(
            'grid size-11 cursor-pointer place-items-center rounded-xl bg-[#353d57] text-[#f5f6fa] @min-[960px]:hidden',
            focusRing,
          )}
          aria-expanded={mobileOpen}
          aria-controls="website-nav-mobile"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => {
            setMobileOpen((open) => !open);
          }}
        >
          <Icon icon={ICON.MENU} fontSize={20} aria-hidden="true" />
        </button>
      </div>

      <AnnouncementBar message={announcement} offlineMessage={offlineMessage} />

      {mobileOpen ? (
        <nav
          id="website-nav-mobile"
          aria-label="Mobile"
          className="bg-[#30354a] px-3 py-4 @min-[960px]:hidden"
        >
          <ul className="space-y-1">
            {items.map((item) => {
              const menuOpen = openMenu === item.label;
              const indicated = item.label === indicatedLabel;
              const itemClass = classNames(
                'relative flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[15px] font-medium transition-colors duration-300',
                focusRing,
                tabTextClass(item.label, activeLabel, pointedLabel, indicatedLabel),
              );

              return (
                <li key={item.label}>
                  {item.menu ? (
                    <button
                      type="button"
                      className={classNames(itemClass, 'cursor-pointer')}
                      aria-expanded={menuOpen}
                      aria-current={item.label === activeLabel ? 'page' : undefined}
                      aria-controls={`website-nav-mobile-${item.label}`}
                      onClick={() => {
                        setOpenMenu(menuOpen ? null : item.label);
                      }}
                    >
                      {indicated ? <NavPill layoutId="website-nav-pill-mobile" /> : null}
                      <span className="relative z-10">{item.label}</span>
                      <Icon
                        icon={ICON.ARROW_DOWN}
                        fontSize={18}
                        aria-hidden="true"
                        className={classNames(
                          'relative z-10 transition-transform duration-300',
                          menuOpen && 'rotate-180',
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      aria-current={item.label === activeLabel ? 'page' : undefined}
                      className={itemClass}
                      onClick={close}
                    >
                      {indicated ? <NavPill layoutId="website-nav-pill-mobile" /> : null}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  )}
                  {item.menu && menuOpen ? (
                    <div id={`website-nav-mobile-${item.label}`} className="px-1 py-3">
                      {item.menu.kind === 'categories' ? (
                        <div className="rounded-2xl bg-[#353d57] p-4">
                          <CategoryPanel menu={item.menu} showLabel={false} onNavigate={close} />
                        </div>
                      ) : (
                        <DirectoryPanel menu={item.menu} onNavigate={close} />
                      )}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}

      {openMenu && desktopMenu ? (
        <div
          id={`website-nav-menu-${openMenu}`}
          className={classNames(
            'absolute inset-x-0 z-30 hidden px-4 @min-[960px]:block',
            announcement
              ? 'top-[calc(100%-2.25rem)]'
              : 'top-full mt-3',
          )}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <DesktopMenu menu={desktopMenu} onNavigate={close} />
        </div>
      ) : null}
    </header>
  );
}
