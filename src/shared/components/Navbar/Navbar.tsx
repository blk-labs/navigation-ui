import { Icon } from '@iconify/react';
import type { HeaderProps } from '.';
import Logo from '../Logo';
import { classNames } from '../utils/classNames';
import { ICON } from '@/shared/utils/icon';
import { NavLink } from 'react-router-dom';
import Popover from '../Popover/Popover';
import { UserPortal } from '../UserPortal';

export default function Navbar({
  className,
  routes,
  activeRoute,
  onNavigate,
  userPortal,
}: HeaderProps) {
  const isControlled = activeRoute !== undefined;

  return (
    <Popover>
      <div className="@container w-full">
        <header
          className={classNames(
            className,
            'w-full py-6 px-4.5 @md:px-16 @md:py-9 flex items-center gap-4 @md:gap-6 bg-primary',
          )}
        >
          <button className="size-13 bg-primary-800 cursor-pointer rounded-[14px] text-gray-50 flex-center @md:hidden!">
            <Icon icon={ICON.MENU} fontSize={20} />
          </button>
          <Logo hasLabel />

          <nav className="flex-center hidden! @md:flex! gap-8">
            {routes.map((el) =>
              isControlled ? (
                <button
                  key={el.route}
                  type="button"
                  onClick={() => onNavigate?.(el.route)}
                  className={`p-2 transition-all text-sm duration-150 ease-in hover:bg-primary-800 rounded-md cursor-pointer ${
                    activeRoute === el.route ? 'text-secondary-300 bg-primary-800' : 'text-gray-50'
                  }`}
                >
                  {el.label}
                </button>
              ) : (
                <NavLink
                  key={el.route}
                  to={el.route}
                  className={({ isActive }) =>
                    `p-2 transition-all duration-150 ease-in hover:bg-primary-800 rounded-md ${isActive ? 'text-secondary-300' : 'text-gray-50'}`
                  }
                >
                  {el.label}
                </NavLink>
              ),
            )}
          </nav>
          {userPortal && <UserPortal {...userPortal} />}
        </header>
      </div>
    </Popover>
  );
}
