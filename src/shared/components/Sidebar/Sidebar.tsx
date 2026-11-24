import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Logo from '../Logo';
import Searchbox from '../Search/Searchbox';
import { Icon } from '@iconify/react';
import { SIDEBAR_ROUTES } from '@/shared/constants';
import { ICON } from '@/shared/utils/icon';
import { renderIcon } from '../common/RenderIcon';
import { NavLink } from 'react-router-dom';
import { classNames } from '../utils/classNames';
import type { NavGroupItem, SidebarProps, SidebarUser } from './types';
import Popover from '../Popover/Popover';

export default function Sidebar({
  groups = SIDEBAR_ROUTES,
  activeRoute,
  onNavigate,
  user,
  className,
}: SidebarProps) {
  const isControlled = activeRoute !== undefined;

  // The link whose sub routes are currently shown in the aside
  const [hoveredLink, setHoveredLink] = useState<NavGroupItem | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Small delay so moving the cursor from the nav to the aside doesn't flicker it closed
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setHoveredLink(null);
    }, 120);
  };

  const handleLinkEnter = (link: NavGroupItem) => {
    cancelClose();
    const hasSubroute = Boolean(link.subRoutes?.length);
    setHoveredLink(hasSubroute ? link : null);
  };

  const getLinkClass = (isActive: boolean) =>
    classNames(
      'flex px-4 rounded-lg py-3 items-center gap-3 w-full transition-all duration-150 ease-in cursor-pointer text-left',
      isActive
        ? 'bg-primary-800 text-neutral-50 font-medium'
        : 'text-neutral-300 hover:bg-primary-800/50 hover:text-neutral-50',
    );

  const checkIsActive = (link: NavGroupItem, currentRoute?: string) => {
    if (!currentRoute) return false;
    if (currentRoute === link.route) return true;
    if (link.subRoutes?.some((sub) => sub.route === currentRoute)) {
      return true;
    }
    if (link.route !== '/' && currentRoute.startsWith(link.route + '/')) {
      return true;
    }
    return false;
  };

  const renderContent = (link: NavGroupItem, isActive: boolean, isRecentViewed?: boolean) => {
    const icon = link.icon ? renderIcon(link.icon) : ICON.DASHBOARD;
    const hasSubroute = Boolean(link.subRoutes?.length);

    return (
      <>
        <Icon
          icon={isRecentViewed ? ICON.RECENT : (icon as string)}
          className={isActive ? 'text-secondary-300' : 'text-primary-500'}
          fontSize={18}
        />
        <span className="truncate text-sm">{link.label}</span>
        {link.isPinned ? (
          <Icon
            icon="ri:pushpin-fill"
            className={classNames('ml-auto', isActive ? 'text-neutral-50' : 'text-neutral-400')}
            fontSize={18}
          />
        ) : hasSubroute ? (
          <Icon
            icon="ri:arrow-right-s-line"
            className={classNames('ml-auto', isActive ? 'text-neutral-50' : 'text-neutral-400')}
            fontSize={18}
          />
        ) : null}
      </>
    );
  };

  return (
    <section className={classNames('w-full relative h-screen', className)}>
      <nav
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        className="w-74 flex flex-col py-5 px-4 shrink-0 z-80 gap-8 h-full rounded-r-3xl relative bg-primary"
      >
        <div className="flex-between shrink-0">
          <Logo hasLabel />
          <button className="flex-center cursor-pointer bg-primary-800 rounded-[14px] text-neutral-50 size-10">
            <Icon icon={'ri:fullscreen-exit-line'} fontSize={18} />
          </button>
        </div>

        <div className="shrink-0">
          <Searchbox />
        </div>

        <ul className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-6 pr-1">
          {groups.map((el) => {
            return (
              <li key={el.label} className="flex flex-col gap-3">
                <span className="uppercase text-sm px-4 text-neutral-400">{el.label}</span>
                <ul className="flex flex-col gap-1">
                  {el.routes.map((link) => {
                    const isActive = isControlled && checkIsActive(link, activeRoute);
                    const isRecentViewed = el.label.toLowerCase().includes('recently');

                    return (
                      <li
                        key={link.route}
                        onMouseEnter={() => {
                          handleLinkEnter(link);
                        }}
                      >
                        {isControlled ? (
                          <button
                            type="button"
                            onClick={() => onNavigate?.(link.route)}
                            className={getLinkClass(isActive)}
                          >
                            {renderContent(link, isActive, isRecentViewed)}
                          </button>
                        ) : (
                          <NavLink
                            to={link.route}
                            className={({ isActive: navActive }) => {
                              const active =
                                navActive ||
                                (typeof window !== 'undefined' &&
                                  checkIsActive(link, window.location.pathname));
                              return getLinkClass(active);
                            }}
                          >
                            {({ isActive: navActive }) => {
                              const active =
                                navActive ||
                                (typeof window !== 'undefined' &&
                                  checkIsActive(link, window.location.pathname));
                              return renderContent(link, active, isRecentViewed);
                            }}
                          </NavLink>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>

        {user && <SidebarAccount user={user} />}
      </nav>

      {/* Sub route bar: slides out from behind the nav (left -> right) */}
      <AnimatePresence>
        {hoveredLink && (
          <motion.aside
            id="sub-route-bar"
            key="sub-route-bar"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            initial={{
              x: '-100%',
              opacity: 0,
              borderTopRightRadius: '24px',
              borderBottomRightRadius: '24px',
            }}
            animate={{
              x: 0,
              opacity: 1,
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
            }}
            exit={{
              x: '-100%',
              opacity: 0,
              borderTopRightRadius: '24px',
              borderBottomRightRadius: '24px',
            }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            className="w-79 z-70 absolute top-0 left-69 h-full bg-neutral-950 pl-10 pr-4 pt-20 py-5 flex flex-col gap-4"
          >
            <h3 className="uppercase text-sm px-4 pt-2 text-neutral-400">{hoveredLink.label}</h3>

            <ul className="flex flex-col gap-1 overflow-y-auto">
              {hoveredLink.subRoutes?.map((sub) => {
                const isActive = isControlled && activeRoute === sub.route;

                const renderSubContent = () => (
                  <>
                    <span className="truncate text-sm">{sub.label}</span>
                    {sub.alertCount !== undefined && (
                      <span
                        className={classNames(
                          ' text-xs size-5 flex-center rounded-full shrink-0 transition-colors',
                          sub.alertVariant === 'danger'
                            ? 'bg-[#CF3333] text-gray-50'
                            : isActive
                              ? 'bg-secondary-300 text-primary-900'
                              : 'bg-primary-800 text-neutral-300',
                        )}
                      >
                        {sub.alertCount}
                      </span>
                    )}
                  </>
                );

                return (
                  <li key={sub.route}>
                    {isControlled ? (
                      <button
                        type="button"
                        onClick={() => onNavigate?.(sub.route)}
                        className={getLinkClass(isActive)}
                      >
                        {renderSubContent()}
                      </button>
                    ) : (
                      <NavLink
                        to={sub.route}
                        className={({ isActive: navActive }) => getLinkClass(navActive)}
                      >
                        {renderSubContent()}
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}

function SidebarAccount({ user }: { user: SidebarUser }) {
  return (
    <div
      aria-label="user-account"
      className="border-t shrink-0 relative p-4 pt-6 flex-between mt-auto border-t-primary-800"
    >
      <div className="flex items-center gap-2 max-w-[80%] relative">
        <figure className="rounded-full shrink-0 size-10.5 bg-[#DEE2F4] flex-center aspect-square relative overflow-hidden">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="size-full object-cover" />
          ) : (
            <span className="text-primary font-bold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </figure>
        <div className="truncate">
          <h4 className="text-neutral-50 text-sm font-bold truncate">{user.name}</h4>
          {user.email && <p className="text-primary-400 text-sm truncate">{user.email}</p>}
        </div>
      </div>

      <Popover>
        <Popover.Menu>
          <Popover.Trigger>
            <button
              type="button"
              aria-label="Open user menu"
              className="bg-primary-800 shrink-0 cursor-pointer flex-center text-neutral-50 size-9 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Icon fontSize={18} icon="ri:expand-up-down-line" />
            </button>
          </Popover.Trigger>

          <Popover.Content className="rounded-2xl! bg-white! bottom-full! mb-3! right-0! min-w-65! shadow-xl!">
            {(close) => (
              <aside className="flex flex-col gap-3 py-2 px-4 w-full">
                <div className="w-full flex items-center py-2 gap-3">
                  <figure className="size-10 rounded-full bg-[#DEE2F4] flex-center aspect-square relative overflow-hidden shrink-0">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <span className="text-primary font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </figure>

                  <div className="flex flex-col text-start text-sm leading-4 truncate">
                    <span className="text-neutral-900 font-medium truncate">{user.name}</span>
                    {user.email && (
                      <span className="text-neutral-400 text-xs truncate">{user.email}</span>
                    )}
                  </div>
                </div>

                {user.onSignOut && (
                  <>
                    <hr className="border-0 border-t border-t-neutral-100" />
                    <button
                      type="button"
                      onClick={() => {
                        user.onSignOut?.();
                        close();
                      }}
                      className="w-full text-sm text-danger cursor-pointer py-2 px-2 flex items-center gap-2 hover:bg-neutral-50 rounded-lg transition-colors text-left"
                    >
                      <Icon icon={ICON.LOGOUT} fontSize={20} /> Sign out
                    </button>
                  </>
                )}
              </aside>
            )}
          </Popover.Content>
        </Popover.Menu>
      </Popover>
    </div>
  );
}
