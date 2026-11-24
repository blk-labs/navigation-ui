import { AnimatePresence } from 'motion/react';
import Logo from '../Logo';
import Searchbox from '../Search/Searchbox';
import { Icon } from '@iconify/react';
import { SIDEBAR_ROUTES } from '@/shared/constants';
import { ICON } from '@/shared/utils/icon';
import { renderIcon } from '../common/RenderIcon';
import { NavLink } from 'react-router-dom';
import { classNames } from '../utils/classNames';
import type { NavGroupItem, SidebarProps } from './types';

export default function Sidebar({
  groups = SIDEBAR_ROUTES,
  activeRoute,
  onNavigate,
  className,
}: SidebarProps) {
  const isControlled = activeRoute !== undefined;

  const getLinkClass = (isActive: boolean) =>
    classNames(
      'flex px-4 rounded-lg py-3 items-center gap-3 w-full transition-all duration-150 ease-in cursor-pointer text-left',
      isActive
        ? 'bg-primary-800 text-neutral-50 font-medium'
        : 'text-neutral-300 hover:bg-primary-800/50 hover:text-neutral-50',
    );

  const renderContent = (link: NavGroupItem, isActive: boolean, isRecentViewed?: boolean) => {
    const icon = link.icon ? renderIcon(link.icon) : ICON.DASHBOARD;
    const hasSubroute = Boolean(link.subRoutes && link.subRoutes.length > 0);

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
    <AnimatePresence>
      <section className={classNames('w-full relative h-screen', className)}>
        <nav className="w-74 flex flex-col py-5 px-4 shrink-0 z-80 gap-6 h-full rounded-r-3xl relative bg-primary">
          <div className="flex-between shrink-0">
            <Logo hasLabel />
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
                      const isActive = isControlled && activeRoute === link.route;
                      const isRecentViewed = el.label.toLowerCase().includes('recently');

                      {
                        console.log(el.label, isRecentViewed);
                      }
                      return (
                        <li key={link.route}>
                          {isControlled ? (
                            <button
                              type="button"
                              onClick={() => onNavigate?.(link.route)}
                              className={getLinkClass(isActive)}
                            >
                              {renderContent(link, isActive)}
                            </button>
                          ) : (
                            <NavLink
                              to={link.route}
                              className={({ isActive: navActive }) => getLinkClass(navActive)}
                            >
                              {({ isActive: navActive }) =>
                                renderContent(link, navActive, isRecentViewed)
                              }
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

          <div
            aria-label="user-account"
            className="border-t shrink-0 relative p-4 pt-6 flex-between mt-auto border-t-primary-800"
          >
            <div className="flex items-center gap-2 max-w-[80%] relative ">
              <figure className="rounded-full shrink-0 size-10.5 bg-white"></figure>
              <div className="truncate">
                <h4 className="text-neutral-50 text-sm font-bold">Steven Olakunle</h4>
                <p className="text-primary-400 text-sm">admin@mail.com</p>
              </div>
            </div>
            <button className="bg-primary-800 shrink-0 cursor-pointer flex-center text-neutral-50 size-9 rounded-lg">
              <Icon fontSize={18} icon="ri:expand-up-down-line" />
            </button>
          </div>
        </nav>
        <aside className="w-79 z-70 absolute top-0 left-69 h-full bg-neutral-950"></aside>
      </section>
    </AnimatePresence>
  );
}
