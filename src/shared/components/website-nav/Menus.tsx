import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import { ICON } from '@/shared/utils/icon';
import { classNames } from '../utils/classNames';
import type { CategoryItem, CategoryMenu, DirectoryMenu, NavMenu } from './types';

interface MenuActions {
  onNavigate?: () => void;
}

const itemLinkClass =
  'flex cursor-pointer items-start gap-3 rounded-2xl p-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd47e]';

function CategoryLink({ item, onNavigate }: { item: CategoryItem } & MenuActions) {
  const { pathname } = useLocation();
  const [hovered, setHovered] = useState(false);
  const active = pathname === item.href;
  const accent = hovered ? 'text-[#c1b5f8]' : 'text-[#f5f6fa]';

  return (
    <Link
      to={item.href}
      aria-current={active ? 'page' : undefined}
      onClick={onNavigate}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onFocus={() => {
        setHovered(true);
      }}
      onBlur={() => {
        setHovered(false);
      }}
      className={classNames(
        itemLinkClass,
        hovered ? 'bg-[#3d4667]' : active ? 'bg-[#4a5474]' : '',
      )}
    >
      <span
        className={classNames(
          'grid size-11 shrink-0 place-items-center rounded-xl transition-colors',
          accent,
          hovered || active ? 'bg-[#353d57]' : 'bg-[#3d4667]',
        )}
      >
        <Icon icon={item.icon ?? ICON.FILE_COPY} fontSize={20} aria-hidden="true" />
      </span>
      <span className="min-w-0 pt-0.5">
        <span className={classNames('block text-sm font-semibold transition-colors', accent)}>
          {item.title}
        </span>
        <span
          className={classNames(
            'mt-0.5 block text-xs leading-4 transition-colors',
            hovered ? 'text-[#c1b5f8]' : 'text-[#8b94ae]',
          )}
        >
          {item.description}
        </span>
      </span>
    </Link>
  );
}

export function CategoryPanel({
  menu,
  showLabel = true,
  onNavigate,
}: { menu: CategoryMenu; showLabel?: boolean } & MenuActions) {
  return (
    <div>
      {showLabel ? (
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#c5cad6]">
          {menu.label}
        </p>
      ) : null}
      <div
        className="grid gap-x-8 gap-y-6"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
      >
        {menu.columns.map((column, columnIndex) => (
          <section key={`${column.heading}-${String(columnIndex)}`}>
            <h3 className="mb-3 px-2 text-xs font-medium uppercase tracking-[0.12em] text-[#abb4ce]">
              {column.heading}
            </h3>
            <ul className="space-y-1">
              {column.items.map((item) => (
                <li key={item.href}>
                  <CategoryLink item={item} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function DirectoryPanel({ menu, onNavigate }: { menu: DirectoryMenu } & MenuActions) {
  return (
    <div className="flex flex-col gap-6 @min-[960px]:flex-row @min-[960px]:items-start">
      {menu.rail ? (
        <ul className="flex shrink-0 gap-4 px-1 @min-[960px]:w-28 @min-[960px]:flex-col @min-[960px]:gap-5 @min-[960px]:pt-4">
          {menu.rail.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                onClick={onNavigate}
                className="text-sm text-[#f5f6fa] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd47e]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-[#353d57]">
        <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 bg-white px-5 py-3">
          {menu.departments.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={onNavigate}
              className="text-xs font-semibold text-[#30354a] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30354a]"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="grid gap-6 px-5 py-6 @min-[640px]:grid-cols-2 @min-[960px]:grid-cols-5">
          {menu.groups.map((group) => (
            <section key={group.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#abb4ce]">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={onNavigate}
                      className="text-sm text-[#f5f6fa] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd47e]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DesktopMenu({ menu, onNavigate }: { menu: NavMenu } & MenuActions) {
  if (menu.kind === 'directory') {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <DirectoryPanel menu={menu} onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div
      className={classNames(
        'mx-auto w-full rounded-3xl bg-[#353d57] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-8',
        menu.columns.length > 2 ? 'max-w-6xl' : 'max-w-160',
      )}
    >
      <CategoryPanel menu={menu} showLabel onNavigate={onNavigate} />
    </div>
  );
}
