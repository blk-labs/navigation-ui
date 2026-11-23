import type { MobileFrameProps } from './types';

type Size = NonNullable<MobileFrameProps['size']>;

const SIZES: Record<Size, { width: string; height: string }> = {
  sm: { width: '320px', height: '568px' },
  md: { width: '375px', height: '720px' },
  lg: { width: '390px', height: '844px' },
  xl: { width: '430px', height: '932px' },
};

export default function MobileFrame({
  size = 'md',
  background = 'white',
  children,
  className,
}: MobileFrameProps) {
  const { width, height } = SIZES[size];

  return (
    <div
      style={{
        width,
        height,
        background,
        borderRadius: '32px',
        // border: '8px solid #111',
        // boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
      }}
      className={`p-6 relative flex flex-col ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
