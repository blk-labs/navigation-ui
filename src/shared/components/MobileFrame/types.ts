import type { PropsWithChildren } from 'react';

type FRAME_SIZE = 'sm' | 'md' | 'lg' | 'xl';

export interface MobileFrameProps extends PropsWithChildren {
  size?: FRAME_SIZE;
  background?: string;
  className?: string;
}
