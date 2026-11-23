import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import { ICON } from '@/shared/utils/icon';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { classNames } from '../utils/classNames';
import logo from '../website-nav/logo.svg';
import { defaultAccountHref, defaultCartHref, defaultCategories, defaultHelpHref } from './content';
import type { EcommerceCategory, EcommerceColumn, EcommerceNavProps } from './types';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c1b5f8]';

function categoryFromPath(categories: readonly EcommerceCategory[], pathname: string) {
  let match: EcommerceCategory | null = null;
  for (const category of categories) {
    const hits = pathname === category.href || pathname.startsWith(`${category.href}/`);
    if (!hits) continue;
    if (!match || category.href.length > match.href.length) match = category;
  }
  return match ? match.id : null;
}

function SearchField({ onSearch }: { onSearch?: (query: string) => void }) {
  const inputId = useId();
  const [query, setQuery] = useState('');
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <form
      className={classNames(
        'flex h-12 items-center rounded-full bg-[#3a4260] pr-1.5 pl-4',
        focused ? 'ring-1 ring-[#f5f6fa]' : hovered && 'ring-1 ring-[#9aa3b8]',
      )}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch?.(query);
      }}
    >
      <label htmlFor={inputId} className="sr-only">
        Search
      </label>
      <Icon icon={ICON.SEARCH} fontSize={18} aria-hidden="true" className="shrink-0 text-[#c5cad6]" />
      <input
        id={inputId}
        value={query}
        placeholder="Search"
        className="h-full w-full bg-transparent px-3 text-sm text-[#f5f6fa] outline-none placeholder:text-[#9aa3b8]"
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <button
        type="submit"
        className={classNames(
          'inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#f5f6fa] px-4 py-2 text-sm font-medium text-[#2e3348]',
          focusRing,
        )}
      >
        <Icon icon={ICON.SEARCH} fontSize={14} aria-hidden="true" />
        Search
      </button>
    </form>
  );
}

function MenuColumns({
  columns,
  stacked,
  onNavigate,
}: {
  columns: readonly EcommerceColumn[];
  stacked?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className={stacked ? 'space-y-7' : 'grid grid-cols-5 gap-8'}>
      {columns.map((column) => (
        <div key={column.title}>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#9aa6c3]">
            {column.title}
          </p>
          <ul className="mt-4 space-y-3">
            {column.links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={classNames(
                    'text-sm font-medium text-[#f5f6fa] hover:text-[#c1b5f8]',
                    focusRing,
                  )}
                  onClick={onNavigate}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function EcommerceNav({
  brandName = 'BLK Labs',
  brandHref = '/',
  categories = defaultCategories,
  breadcrumbs,
  offlineMessage,
  accountHref = defaultAccountHref,
  helpHref = defaultHelpHref,
  cartHref = defaultCartHref,
  onSearch,
  defaultMenuId = null,
  defaultMobileOpen = false,
  activeHref,
  className,
}: EcommerceNavProps) {
  const location = useLocation();
  const pathname = activeHref ?? location.pathname;
  const routeId = categoryFromPath(categories, pathname);
  const [pinnedId, setPinnedId] = useState<string | null>(defaultMenuId);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(defaultMobileOpen);
  const shownId = pinnedId ?? hoveredId;
  const openCategory = categories.find((category) => category.id === shownId && category.menu);
  const mobileCategory =
    categories.find((category) => category.id === pinnedId && category.menu) ??
    categories.find((category) => category.menu);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const [menuOffset, setMenuOffset] = useState(0);

  const closeMenus = useCallback(() => {
    setPinnedId(null);
    setHoveredId(null);
    setMobileOpen(false);
  }, []);
  const rootRef = useOutsideClick(closeMenus, undefined, pinnedId !== null || mobileOpen);

  useLayoutEffect(() => {
    if (!openCategory?.menu) {
      setMenuOffset(0);
      return;
    }
    const node = menuPanelRef.current;
    if (!node) return;
    const update = () => {
      setMenuOffset(Math.ceil(node.getBoundingClientRect().height + 12));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [openCategory]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeMenus();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [closeMenus]);

  function indicated(category: EcommerceCategory) {
    return category.id === shownId || (shownId === null && category.id === routeId);
  }

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
      }}
      className={classNames('@container bg-[#ebedf3]', className)}
      onMouseLeave={(event) => {
        const desktop = event.currentTarget.querySelector('[data-ecommerce-desktop]');
        if (desktop instanceof HTMLElement && desktop.getClientRects().length > 0) {
          setHoveredId(null);
        }
      }}
    >
      <div className="bg-[#30354a] text-[#f5f6fa]">
        <div
          data-ecommerce-desktop=""
          className="mx-auto hidden h-[88px] max-w-360 items-center gap-8 px-8 @min-[960px]:flex"
        >
          <Link to={brandHref} className="shrink-0" aria-label={brandName}>
            <img src={logo} alt="" className="h-10 w-auto" />
          </Link>
          <div className="mx-auto w-full max-w-xl">
            <SearchField onSearch={onSearch} />
          </div>
          <div className="flex shrink-0 items-center gap-5 text-sm">
            <Link to={accountHref} className={classNames('inline-flex items-center gap-2', focusRing)}>
              Account
              <Icon icon={ICON.ACCOUNT} fontSize={16} aria-hidden="true" />
            </Link>
            <Link to={helpHref} className={classNames('inline-flex items-center gap-2', focusRing)}>
              Help
              <Icon icon={ICON.HELP} fontSize={16} aria-hidden="true" />
            </Link>
            <Link
              to={cartHref}
              aria-label="Cart"
              className={classNames(
                'flex px-2.5 py-4 gap-2  rounded-[14px] bg-[#3a4260]',
                focusRing,
              )}
            >
              <Icon icon={ICON.CART} fontSize={20} aria-hidden="true" />
              Cart
            </Link>
          </div>
        </div>

        <div className="px-4 pt-4 pb-4 @min-[960px]:hidden">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className={classNames('grid size-11 place-items-center rounded-xl bg-[#3a4260]', focusRing)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((open) => {
                  const next = !open;
                  setPinnedId(next ? (mobileCategory?.id ?? null) : null);
                  return next;
                });
              }}
            >
              <Icon icon={ICON.MENU} fontSize={20} aria-hidden="true" />
            </button>
            <Link to={brandHref} aria-label={brandName}>
              <img src={logo} alt="" className="h-10 w-auto" />
            </Link>
            <Link
              to={cartHref}
              aria-label="Cart"
              className={classNames(
                'grid size-11 place-items-center rounded-xl bg-[#3a4260]',
                focusRing,
              )}
            >
              <Icon icon={ICON.CART} fontSize={20} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4">
            <SearchField onSearch={onSearch} />
          </div>
        </div>

        {offlineMessage ? (
          <div className="flex items-center justify-center gap-2 bg-[#dfe4f4] px-4 py-2.5 text-sm text-[#5c657a]">
            <Icon icon={ICON.WIFI_OFF} fontSize={16} aria-hidden="true" />
            <p>{offlineMessage}</p>
          </div>
        ) : null}
      </div>

      <div className="relative border-b border-[#eceff5]">
        <nav aria-label="Categories" className="mx-auto max-w-360">
          <ul className="flex gap-8 overflow-x-auto bg-white px-4 py-4 [scrollbar-width:none] @min-[960px]:justify-center @min-[960px]:px-8 [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const current = indicated(category);
              return (
                <li key={category.id} className="shrink-0 ">
                  {category.menu ? (
                    <button
                      type="button"
                      className={classNames('relative pb-1 text-sm text-[#2e3348]', focusRing)}
                      aria-expanded={category.id === shownId}
                      onMouseEnter={() => {
                        setHoveredId(category.id);
                      }}
                      onClick={() => {
                        const next = pinnedId === category.id ? null : category.id;
                        setPinnedId(next);
                        setMobileOpen(next !== null);
                      }}
                    >
                      {category.label}
                      {current ? (
                        <span className="absolute inset-x-0 -bottom-4 h-1 rounded-tl-2xl rounded-tr-2xl bg-[#836af0]" />
                      ) : null}
                    </button>
                  ) : (
                    <Link
                      to={category.href}
                      aria-current={category.id === routeId ? 'page' : undefined}
                      className={classNames('relative block pb-1 text-sm text-[#2e3348]', focusRing)}
                      onMouseEnter={() => {
                        setHoveredId(null);
                      }}
                      onClick={() => {
                        setPinnedId(null);
                        setMobileOpen(false);
                      }}
                    >
                      {category.label}
                      {current ? (
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#836af0]" />
                      ) : null}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {openCategory?.menu ? (
          <div className="absolute inset-x-0 top-full z-20 hidden px-6 pt-0 @min-[960px]:block">
            <div
              ref={menuPanelRef}
              className="mx-auto max-w-330 rounded-3xl border-8 border-[#30354a] bg-[#353d57] px-8 py-8 shadow-[0_18px_40px_rgba(16,18,32,0.18)]"
            >
              <MenuColumns columns={openCategory.menu} onNavigate={closeMenus} />
            </div>
          </div>
        ) : null}
      </div>

      {mobileOpen && mobileCategory?.menu ? (
        <div className="bg-white px-4 py-4 @min-[960px]:hidden">
          <div className="rounded-3xl border-8 border-[#30354a] bg-[#353d57] px-6 py-6">
            <MenuColumns columns={mobileCategory.menu} stacked onNavigate={closeMenus} />
          </div>
        </div>
      ) : null}

      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav
          aria-label="Breadcrumb"
          className="relative z-10 bg-white max-w-115 px-6 py-4 rounded-[8px] mt-2 transition-transform duration-200"
          style={menuOffset > 0 ? { transform: `translateY(${String(menuOffset)}px)` } : undefined}
        >
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => {
              const current = index === breadcrumbs.length - 1;
              return (
                <li key={`${crumb.href}-${String(index)}`} className="flex items-center gap-2">
                  {index > 0 ? (
                    <Icon
                      icon={ICON.ARROW_RIGHT}
                      fontSize={14}
                      aria-hidden="true"
                      className="text-[#8fb5f0]"
                    />
                  ) : null}
                  {current ? (
                    <span aria-current="page" className="text-[#c0c7da]">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.href}
                      className={classNames('text-[#8fb5f0] hover:text-[#6a9cec]', focusRing)}
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}
    </div>
  );
}
