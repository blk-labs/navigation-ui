import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import { ICON } from '@/shared/utils/icon';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { classNames } from '../utils/classNames';
import { defaultFolders, defaultItems, defaultUser, defaultUtility } from './content';
import logo from '../website-nav/logo.svg';
import type {
  EnterpriseBadge,
  EnterpriseFolder,
  EnterpriseNavItem,
  EnterpriseNavProps,
} from './types';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c1b5f8]';

function findPath(items: readonly EnterpriseNavItem[], current: string): string[] | null {
  for (const item of items) {
    if (item.href === current) return [item.id];
    if (!item.children) continue;
    const nested = findPath(item.children, current);
    if (nested) return [item.id, ...nested];
  }
  return null;
}

function descendantIds(items: readonly EnterpriseNavItem[], id: string): string[] | null {
  for (const item of items) {
    if (item.id === id) {
      const ids = [item.id];
      const walk = (children?: readonly EnterpriseNavItem[]) => {
        for (const child of children ?? []) {
          ids.push(child.id);
          walk(child.children);
        }
      };
      walk(item.children);
      return ids;
    }
    if (!item.children) continue;
    const nested = descendantIds(item.children, id);
    if (nested) return nested;
  }
  return null;
}

function filterItems(items: readonly EnterpriseNavItem[], query: string): EnterpriseNavItem[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [...items];

  const matches: EnterpriseNavItem[] = [];
  for (const item of items) {
    const children = item.children ? filterItems(item.children, needle) : [];
    const self = item.label.toLowerCase().includes(needle);
    if (!self && children.length === 0) continue;
    matches.push(self ? item : { ...item, children });
  }
  return matches;
}

function BadgeView({ badge }: { badge: EnterpriseBadge }) {
  if (badge.kind === 'count') {
    return (
      <span className="grid h-4 min-w-4 place-items-center rounded-full bg-[#ef4444] px-1 text-[10px] font-semibold leading-none text-white">
        {badge.value}
      </span>
    );
  }

  return (
    <span
      className={classNames(
        'rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
        badge.tone === 'accent' ? 'bg-[#e4dcff] text-[#6f5cb0]' : 'bg-[#4a5168] text-[#d5d3e4]',
      )}
    >
      {badge.label}
    </span>
  );
}

function ProfileMenu({
  name,
  email,
  onSignOut,
  onClose,
}: {
  name: string;
  email: string;
  onSignOut?: () => void;
  onClose: () => void;
}) {
  return (
    <div className="rounded-2xl bg-white p-3 text-[#1d2130] shadow-[0_18px_50px_rgba(16,18,32,0.28)]">
      <div className="flex items-center gap-3">
        <span className="size-10 shrink-0 rounded-full bg-[#e4e7ee]" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold">{name}</span>
          <span className="mt-0.5 block text-xs text-[#8b93a7]">{email}</span>
        </span>
        <button
          type="button"
          className={classNames(
            'grid size-8 shrink-0 place-items-center rounded-lg text-[#98a0b3]',
            focusRing,
          )}
          aria-label="Close account menu"
          onClick={onClose}
        >
          <Icon icon={ICON.ARROW_UP} fontSize={18} aria-hidden="true" />
        </button>
      </div>
      <div className="my-3 h-px bg-[#eceff4]" />
      <button
        type="button"
        className={classNames(
          'flex w-full items-center gap-2 rounded-lg px-1 py-1.5 text-sm font-medium text-[#ef4444]',
          focusRing,
        )}
        onClick={() => {
          onSignOut?.();
          onClose();
        }}
      >
        <Icon icon={ICON.LOGOUT} fontSize={18} aria-hidden="true" />
        Sign out
      </button>
    </div>
  );
}

export default function EnterpriseNav({
  brandName = 'BLK Labs',
  brandHref = '/',
  items = defaultItems,
  folders = defaultFolders,
  utility = defaultUtility,
  user = defaultUser,
  activeHref,
  syncing = false,
  defaultCollapsed = false,
  collapsed: collapsedProp,
  onCollapsedChange,
  defaultOpenIds = [],
  defaultProfileOpen = false,
  onSignOut,
  className,
}: EnterpriseNavProps) {
  const location = useLocation();
  const current = activeHref ?? location.pathname;
  const searchId = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const [collapsedState, setCollapsedState] = useState(defaultCollapsed);
  const [openIds, setOpenIds] = useState<string[]>(() => [...defaultOpenIds]);
  const [query, setQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(defaultProfileOpen);
  const collapsed = collapsedProp ?? collapsedState;

  const closeProfile = useCallback(() => {
    setProfileOpen(false);
  }, []);
  const profileRef = useOutsideClick(closeProfile, undefined, profileOpen);

  const updateCollapsed = useCallback(
    (next: boolean) => {
      setCollapsedState(next);
      onCollapsedChange?.(next);
    },
    [onCollapsedChange],
  );

  const activePath = useMemo(() => {
    const folderItems: EnterpriseNavItem[] = folders.map((folder) => ({
      id: folder.id,
      label: folder.label,
      href: folder.href,
      icon: ICON.FOLDER,
    }));
    return findPath(items, current) ?? findPath(utility, current) ?? findPath(folderItems, current);
  }, [current, folders, items, utility]);

  const activeId = activePath?.at(-1) ?? null;
  const ancestorKey = activePath?.slice(0, -1).join('|') ?? '';

  useEffect(() => {
    if (!ancestorKey) return;
    setOpenIds((previous) => {
      const next = new Set(previous);
      for (const id of ancestorKey.split('|')) next.add(id);
      return [...next];
    });
  }, [ancestorKey]);

  const searching = query.trim().length > 0;
  const visibleItems = useMemo(() => filterItems(items, query), [items, query]);
  const visibleFolders = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return folders;
    return folders.filter((folder) => folder.label.toLowerCase().includes(needle));
  }, [folders, query]);
  const visibleUtility = useMemo(() => filterItems(utility, query), [query, utility]);

  function toggle(id: string) {
    setOpenIds((previous) => {
      if (!previous.includes(id)) return [...previous, id];
      const closing = new Set(descendantIds(items, id) ?? [id]);
      return previous.filter((openId) => !closing.has(openId));
    });
  }

  function openSearch() {
    updateCollapsed(false);
    requestAnimationFrame(() => {
      searchRef.current?.focus();
    });
  }

  return (
    <aside
      className={classNames(
        'sticky top-0 flex h-screen shrink-0 flex-col bg-[#30354a] text-[#e7e9f2] transition-[width] duration-300',
        collapsed ? 'w-24' : 'w-[293px]',
        className,
      )}
    >
      <div className={classNames('flex items-center pt-4', collapsed ? 'justify-center px-2' : 'justify-between gap-3 px-4')}>
        {collapsed ? null : (
          <Link to={brandHref} className="min-w-0" onClick={closeProfile}>
            <img src={logo} alt={brandName} className="h-9 w-auto" />
          </Link>
        )}
        <button
          type="button"
          className={classNames(
            'grid size-10 shrink-0 place-items-center rounded-xl bg-[#3a415c] text-[#d5d9e6]',
            focusRing,
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          onClick={() => {
            updateCollapsed(!collapsed);
          }}
        >
          <Icon
            icon={collapsed ? ICON.SIDEBAR_UNFOLD : ICON.SIDEBAR_FOLD}
            fontSize={18}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className={classNames('pt-4', collapsed ? 'px-2' : 'px-4')}>
        {collapsed ? (
          <button
            type="button"
            className={classNames(
              'grid size-10 w-full place-items-center rounded-xl bg-[#3a415c] text-[#b7bdd0]',
              focusRing,
            )}
            aria-label="Search"
            onClick={openSearch}
          >
            <Icon icon={ICON.SEARCH} fontSize={18} aria-hidden="true" />
          </button>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label htmlFor={searchId} className="sr-only">
              Search
            </label>
            <div className="flex h-[46px] items-center gap-2 rounded-xl bg-[#353d57] px-3">
              <Icon icon={ICON.SEARCH} fontSize={16} aria-hidden="true" className="shrink-0 text-[#8b93a8]" />
              <input
                ref={searchRef}
                id={searchId}
                value={query}
                placeholder="Search"
                className="h-full w-full bg-transparent text-sm text-[#f5f6fa] outline-none placeholder:text-[#8b93a8]"
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
            </div>
          </form>
        )}
      </div>

      <div className={classNames('mt-5 flex-1 overflow-y-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', collapsed ? 'px-2' : 'px-4')}>
        <Section label="Main menu" collapsed={collapsed}>
          {visibleItems.length === 0 ? (
            <Empty collapsed={collapsed} />
          ) : (
            <ItemList
              items={visibleItems}
              depth={0}
              collapsed={collapsed}
              syncing={syncing}
              searching={searching}
              openIds={openIds}
              activeId={activeId}
              onToggle={toggle}
              onExpand={() => {
                updateCollapsed(false);
              }}
            />
          )}
        </Section>

        <Section label="Folders" collapsed={collapsed} className="mt-6">
          {visibleFolders.length === 0 ? (
            <Empty collapsed={collapsed} />
          ) : (
            <ul className="space-y-0.5">
              {visibleFolders.map((folder) => (
                <li key={folder.id}>
                  <FolderRow
                    folder={folder}
                    collapsed={collapsed}
                    active={folder.id === activeId}
                  />
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>

      <div className={classNames(collapsed ? 'px-2' : 'px-3')}>
        <div className="border-t border-white/10 pt-3">
          <ItemList
            items={visibleUtility}
            depth={0}
            collapsed={collapsed}
            syncing={false}
            searching={searching}
            openIds={openIds}
            activeId={activeId}
            onToggle={toggle}
            onExpand={() => {
              updateCollapsed(false);
            }}
          />
        </div>
        <div
          ref={(node) => {
            profileRef.current = node;
          }}
          className="relative mt-3 border-t border-white/10 py-3"
        >
          {profileOpen ? (
            <div className={collapsed ? 'absolute bottom-0 left-full z-30 ml-3 w-[255px]' : 'absolute bottom-full left-0 z-30 mb-3 w-[255px]'}>
              <ProfileMenu
                name={user.name}
                email={user.email}
                onSignOut={onSignOut}
                onClose={closeProfile}
              />
            </div>
          ) : null}
          <button
            type="button"
            className={classNames(
              'flex w-full items-center gap-3 rounded-xl text-left',
              collapsed ? 'justify-center py-1' : 'px-1 py-1',
              focusRing,
            )}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            onClick={() => {
              setProfileOpen((open) => !open);
            }}
          >
            <span className="size-10 shrink-0 rounded-full bg-[#f4f6fb]" />
            {collapsed ? null : (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-white">{user.name}</span>
                  <span className="mt-0.5 block truncate text-xs text-[#9aa3b8]">{user.email}</span>
                </span>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#3a415c] text-[#c5cad6]">
                  <Icon
                    icon={profileOpen ? ICON.ARROW_UP : ICON.ARROW_DOWN}
                    fontSize={16}
                    aria-hidden="true"
                  />
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}

function Section({
  label,
  collapsed,
  className,
  children,
}: {
  label: string;
  collapsed: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={className}>
      {collapsed ? null : (
        <h2 className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b93a8]">
          {label}
        </h2>
      )}
      {children}
    </section>
  );
}

function Empty({ collapsed }: { collapsed: boolean }) {
  if (collapsed) return null;
  return <p className="px-2 py-2 text-xs text-[#8b93a8]">No matches</p>;
}

function ItemList({
  items,
  depth,
  collapsed,
  syncing,
  searching,
  openIds,
  activeId,
  onToggle,
  onExpand,
}: {
  items: readonly EnterpriseNavItem[];
  depth: number;
  collapsed: boolean;
  syncing: boolean;
  searching: boolean;
  openIds: readonly string[];
  activeId: string | null;
  onToggle: (id: string) => void;
  onExpand: () => void;
}) {
  return (
    <ul
      className={classNames(
        'space-y-0.5',
        depth === 1 && !collapsed && 'ml-3 py-1 pl-3',
        depth > 1 && !collapsed && 'ml-4 py-0.5 pl-3',
      )}
    >
      {items.map((item) => {
        const open = searching || openIds.includes(item.id);
        return (
          <li key={item.id}>
            <ItemRow
              item={item}
              depth={depth}
              collapsed={collapsed}
              syncing={syncing && depth === 0}
              active={item.id === activeId}
              open={open}
              onToggle={onToggle}
              onExpand={onExpand}
            />
            {item.children && open && !collapsed ? (
              <ItemList
                items={item.children}
                depth={depth + 1}
                collapsed={collapsed}
                syncing={false}
                searching={searching}
                openIds={openIds}
                activeId={activeId}
                onToggle={onToggle}
                onExpand={onExpand}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function ItemRow({
  item,
  depth,
  collapsed,
  syncing,
  active,
  open,
  onToggle,
  onExpand,
}: {
  item: EnterpriseNavItem;
  depth: number;
  collapsed: boolean;
  syncing: boolean;
  active: boolean;
  open: boolean;
  onToggle: (id: string) => void;
  onExpand: () => void;
}) {
  const nested = depth > 0;
  const tone = active
    ? 'text-[#a290f4]'
    : nested
      ? 'text-[#7e8cb2] hover:text-[#d2d6e5]'
      : 'text-[#d2d6e5]';
  const iconTone = active
    ? 'text-[#a290f4]'
    : open && item.children
      ? 'text-[#836af0]'
      : 'text-[#8b93a8]';
  const labelTone = active
    ? 'text-[#a290f4]'
    : open && item.children && depth === 0
      ? 'text-[#f5f6fa]'
      : tone;
  const rowClass = classNames(
    'group flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left text-sm font-medium',
    labelTone,
    depth === 0 && active && 'bg-[#3a415c]',
    depth === 0 && !active && 'hover:bg-[#353d57]',
    focusRing,
  );
  const marker = item.badge?.kind === 'count' ? (
    <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[#ef4444]" />
  ) : null;

  if (collapsed) {
    if (item.children) {
      return (
        <button
          type="button"
          title={item.label}
          aria-label={item.label}
          aria-expanded={open}
          className={classNames(
            'relative grid size-10 w-full place-items-center rounded-xl text-[#8b93a8] hover:bg-[#353d57]',
            focusRing,
          )}
          onClick={() => {
            onExpand();
            onToggle(item.id);
          }}
        >
          <Icon icon={item.icon ?? ICON.FOLDER} fontSize={18} aria-hidden="true" />
          {marker}
        </button>
      );
    }

    return (
      <Link
        to={item.href}
        title={item.label}
        aria-label={item.label}
        aria-current={active ? 'page' : undefined}
        className={classNames(
          'relative grid size-10 w-full place-items-center rounded-xl',
          active ? 'bg-[#3a415c] text-[#a290f4]' : 'text-[#8b93a8] hover:bg-[#353d57]',
          focusRing,
        )}
      >
        <Icon icon={item.icon ?? ICON.FOLDER} fontSize={18} aria-hidden="true" />
        {marker}
      </Link>
    );
  }

  const body = (
    <>
      {item.icon ? (
        <Icon icon={item.icon} fontSize={18} aria-hidden="true" className={classNames('shrink-0', iconTone)} />
      ) : null}
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.badge ? <BadgeView badge={item.badge} /> : null}
      {syncing ? (
        <Icon icon={ICON.REFRESH} fontSize={16} aria-hidden="true" className="shrink-0 animate-spin text-[#8b93a8]" />
      ) : null}
      {item.children ? (
        <Icon
          icon={open ? ICON.ARROW_DOWN : ICON.ARROW_RIGHT}
          fontSize={16}
          aria-hidden="true"
          className="shrink-0 text-[#f5f6fa]"
        />
      ) : null}
    </>
  );

  if (item.children) {
    return (
      <button
        type="button"
        className={rowClass}
        aria-expanded={open}
        onClick={() => {
          onToggle(item.id);
        }}
      >
        {body}
      </button>
    );
  }

  return (
    <Link to={item.href} aria-current={active ? 'page' : undefined} className={rowClass}>
      {body}
    </Link>
  );
}

function FolderRow({
  folder,
  collapsed,
  active,
}: {
  folder: EnterpriseFolder;
  collapsed: boolean;
  active: boolean;
}) {
  if (collapsed) {
    return (
      <Link
        to={folder.href}
        title={folder.label}
        aria-label={folder.label}
        aria-current={active ? 'page' : undefined}
        className={classNames(
          'grid size-10 w-full place-items-center rounded-xl',
          active ? 'bg-[#3a415c] text-[#a290f4]' : 'text-[#8b93a8] hover:text-[#c1b5f8]',
          focusRing,
        )}
      >
        <Icon icon={ICON.FOLDER} fontSize={18} aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Link
      to={folder.href}
      aria-current={active ? 'page' : undefined}
      className={classNames(
        'group flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium transition-colors',
        active ? 'bg-[#3a415c] text-[#a290f4]' : 'text-[#d2d6e5] hover:bg-[#353d57]',
        focusRing,
      )}
    >
      <Icon
        icon={ICON.FOLDER}
        fontSize={18}
        aria-hidden="true"
        className={classNames('shrink-0', active ? 'text-[#a290f4]' : 'text-[#8b93a8] group-hover:text-[#c1b5f8]')}
      />
      <span className="min-w-0 flex-1 truncate">{folder.label}</span>
      <span className="inline-flex items-center gap-1 rounded-full bg-[#3a415c] px-2 py-0.5 text-[11px] text-[#c5cad6]">
        <Icon icon={ICON.DASHBOARD} fontSize={12} aria-hidden="true" />
        {folder.count}
      </span>
    </Link>
  );
}
