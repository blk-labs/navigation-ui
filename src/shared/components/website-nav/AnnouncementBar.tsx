import { Icon } from '@iconify/react';
import { ICON } from '@/shared/utils/icon';

interface AnnouncementBarProps {
  message?: string | null;
  offlineMessage?: string;
}

export default function AnnouncementBar({ message, offlineMessage }: AnnouncementBarProps) {
  if (!message && !offlineMessage) return null;

  return (
    <div>
      {message ? (
        <p className="bg-[#ffd47e] px-4 py-2.5 text-center text-xs text-[#30354a] @min-[960px]:text-sm">
          {message}
        </p>
      ) : null}
      {offlineMessage ? (
        <p
          role="status"
          className="flex items-center justify-center gap-2 bg-[#abb4ce] px-4 py-2.5 text-center text-xs text-[#30354a] @min-[960px]:text-sm"
        >
          <Icon icon={ICON.WIFI_OFF} fontSize={16} aria-hidden="true" />
          {offlineMessage}
        </p>
      ) : null}
    </div>
  );
}
