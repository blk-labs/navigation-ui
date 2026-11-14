import { Icon } from '@iconify/react';
import Popover from '../Popover/Popover';
import { classNames } from '../utils/classNames';
import { ICON } from '@/shared/utils/icon';
import type { AgencyOption, UserPortalProps } from './types';

export default function UserPortal({
  user,
  roles,
  activeRole,
  onRoleChange,
  onSignOut,
  agencies,
  activeAgency,
  onAgencyChange,
  className,
  contentClassName,
}: UserPortalProps) {
  const hasAgencies = !!(agencies && agencies.length > 0);
  const currentAgency = agencies?.find((a) => a.value === activeAgency);

  return (
    <Popover.Menu className={classNames('ml-auto self-stretch', className)}>
      <Popover.Trigger>
        <button className="p-3 ml-auto cursor-pointer rounded-2xl hover:bg-primary-800 transition-all ease-in duration-200 flex-between gap-3 @md:gap-20">
          <div className="flex-center gap-2">
            <figure className="size-10.5 rounded-full bg-gray-50 flex-center aspect-square relative overflow-hidden">
              {user.avatarUrl && (
                <img src={user.avatarUrl} alt={user.name} className="size-full object-cover" />
              )}
            </figure>
            <div className="hidden text-start text-gray-50 text-sm @md:block leading-4">
              <h4 className="font-bold">{user.name}</h4>
              {user.subtitle && <p className="text-gray-400">{user.subtitle}</p>}
            </div>
          </div>
          <span className="bg-primary-800 p-1 text-gray-50 rounded-lg">
            <Icon fontSize={18} icon="ri:expand-up-down-line" />
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Content
        className={classNames('mt-7! rounded-2xl! bg-white! @md:-right-15!', contentClassName)}
      >
        {(close) => (
          <aside className="flex flex-col gap-3 py-2 px-4 min-w-65">
            {/* ── User header ── */}
            <PortalHeader
              user={user}
              hasAgencies={hasAgencies}
              currentAgency={currentAgency}
              agencies={agencies}
              activeAgency={activeAgency}
              onAgencyChange={onAgencyChange}
            />

            <hr className="border-0 border-t border-t-neutral-50" />

            {/* ── Viewing As ── */}
            <div className="py-2 flex flex-col gap-3">
              <span className="tracking-wide text-xs text-neutral-250 uppercase">Viewing as</span>
              <ul className="w-full flex flex-col gap-1">
                {roles.map((el) => {
                  const isSelected = el.value === activeRole;
                  return (
                    <li
                      key={el.value}
                      onClick={() => { onRoleChange(el.value); }}
                      className={classNames(
                        'flex-between cursor-pointer px-4 py-3 rounded-lg transition-all ease-in duration-150',
                        isSelected ? 'bg-[#DEE2F4]' : 'hover:bg-neutral-50',
                      )}
                    >
                      <span
                        className={`text-sm ${isSelected ? 'text-[#5970CA]' : 'text-neutral-900'}`}
                      >
                        {el.label}
                      </span>
                      {isSelected && <Icon icon={ICON.CHECKMARK} fontSize={21} color="#475AA2" />}
                    </li>
                  );
                })}
              </ul>
            </div>

            <hr className="border-0 border-t border-t-neutral-50" />

            {/* ── Sign out ── */}
            <button
              onClick={() => {
                onSignOut();
                close();
              }}
              className="w-full text-sm text-danger cursor-pointer py-2.5 px-4 flex items-center gap-2"
            >
              <Icon icon={ICON.LOGOUT} fontSize={21} /> Sign out
            </button>
          </aside>
        )}
      </Popover.Content>
    </Popover.Menu>
  );
}

/** ── Header section with optional agency switcher ── */
function PortalHeader({
  user,
  hasAgencies,
  currentAgency,
  agencies,
  activeAgency,
  onAgencyChange,
}: {
  user: UserPortalProps['user'];
  hasAgencies: boolean;
  currentAgency?: AgencyOption;
  agencies?: UserPortalProps['agencies'];
  activeAgency?: string;
  onAgencyChange?: (agency: string) => void;
}) {
  const headerContent = (
    <div className="w-full flex items-center py-2 gap-3">
      <figure className="size-10 rounded-full bg-[#DEE2F4] flex-center aspect-square relative overflow-hidden">
        {user.avatarUrl && (
          <img src={user.avatarUrl} alt={user.name} className="size-full object-cover" />
        )}
      </figure>

      <div className="flex flex-col text-start text-sm leading-4">
        <span className="text-neutral-900 font-medium">{user.name}</span>
        {hasAgencies && currentAgency ? (
          <span className="text-[#5970CA] text-xs">{currentAgency.label}</span>
        ) : (
          user.subtitle && <span className="text-[#5970CA] text-xs">{user.subtitle}</span>
        )}
      </div>

      <span className="ml-auto text-neutral-400">
        <Icon fontSize={18} icon="ri:expand-up-down-line" />
      </span>
    </div>
  );

  if (!hasAgencies || !agencies) return headerContent;

  return (
    <Popover>
      <Popover.Menu>
        <Popover.Trigger>
          <button type="button" className="w-full cursor-pointer">
            {headerContent}
          </button>
        </Popover.Trigger>
        <Popover.Content className="rounded-2xl! bg-white! right-full! mr-3! top-0!">
          {(close) => (
            <ul className="flex flex-col py-2 px-2 min-w-50">
              {agencies.map((agency) => {
                const isSelected = agency.value === activeAgency;
                return (
                  <li
                    key={agency.value}
                    onClick={() => {
                      onAgencyChange?.(agency.value);
                      close();
                    }}
                    className={classNames(
                      'flex-between cursor-pointer px-4 py-3 rounded-lg transition-all ease-in duration-150',
                      isSelected ? 'bg-[#DEE2F4]' : 'hover:bg-neutral-50',
                    )}
                  >
                    <span className="text-sm text-neutral-900">{agency.label}</span>
                    {isSelected && <Icon icon={ICON.CHECKMARK} fontSize={21} color="#475AA2" />}
                  </li>
                );
              })}
            </ul>
          )}
        </Popover.Content>
      </Popover.Menu>
    </Popover>
  );
}
