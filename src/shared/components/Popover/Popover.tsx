import React, {
  createContext,
  useContext,
  type PropsWithChildren,
  useState,
  useRef,
  useEffect,
} from 'react';
import type { DimensionType, PopoverContextType, SizeType } from './Popover.types';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';

// Create a context to be shared among children
const PopoverContext = createContext<PopoverContextType | null>(null);

// Use context
const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("Popover context was used outside it's provider");
  return context;
};

export default function Popover({
  children,

  defState,
}: { defState?: boolean } & PropsWithChildren) {
  const [isOpen, setIsOpen] = useState<boolean>(defState ?? false);
  const [position, setPosition] = useState<DimensionType>({
    x: 0,
    y: 0,
  });
  const [size, setSize] = useState<SizeType>({ width: 0, height: 0 });
  const [isNearBottom, setIsNearBottom] = useState<boolean>(false);

  return (
    <PopoverContext.Provider
      value={{
        isOpen,
        setIsOpen,
        size,
        setSize,
        position,
        setPosition,
        isNearBottom,
        setIsNearBottom,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

Popover.Menu = function Menu({
  children,
  hasHover,
  className,
}: { className?: string; hasHover?: boolean } & PropsWithChildren) {
  const { setIsOpen } = usePopover();
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  // Debugging Purpose
  // console.log(isOpen ? "Dropdown is open" : "Dropdown is closed")

  const MouseOpen = () => {
    if (hasHover) {
      setIsOpen(true);
    }
    return;
  };

  // const MouseClose = () => {
  //   if (hasHover) {
  //     setIsOpen(false);
  //   }
  //   return;
  // };

  return (
    <div
      onMouseEnter={MouseOpen}
      // onMouseLeave={MouseClose}
      ref={ref}
      className={`relative ${className ?? ''}`}
    >
      {children}
    </div>
  );
};

Popover.Trigger = function Trigger({
  noToggle,
  children,
  isLoading,
  alignTop,
}: {
  isLoading?: boolean;
  alignTop?: boolean;
  noToggle?: boolean;
} & PropsWithChildren) {
  const { setIsOpen, isOpen, setPosition, setSize, setIsNearBottom } = usePopover();
  const triggerRef = useRef<HTMLButtonElement>(null);
  //   Get dimension of child

  useEffect(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({
      x: rect.x,
      y: rect.y,
    });
    setSize({
      width: rect.width,
      height: rect.height,
    });

    if (alignTop) {
      setIsNearBottom(true);
    } else if (window.innerHeight - rect.bottom < 200) {
      setIsNearBottom(true);
    } else {
      setIsNearBottom(false);
    }
  }, [setPosition, setSize, setIsNearBottom, isOpen, alignTop]);

  // Debigging purpose
  // console.log({ rect: triggerRef.current?.getBoundingClientRect() });

  return (
    <span
      ref={triggerRef}
      onClick={() => {
        if (isLoading) {
          return null;
        } else {
          if (noToggle) {
            if (isOpen) return;
            setIsOpen(true);
          } else {
            setIsOpen(!isOpen);
          }
        }
      }}
      className="outline-0 w-fit"
    >
      {children}
    </span>
  );
};

interface PopoverContentProps {
  children: (closePopOver: () => void) => React.ReactNode;
}

Popover.Content = function Content({
  children,
  className,
}: { className?: string } & PopoverContentProps) {
  const { size, isOpen, setIsOpen, isNearBottom } = usePopover();

  if (!isOpen) return null;

  const closePopOver = () => {
    setIsOpen(false);
  };

  return (
    <ul
      style={{
        top: isNearBottom ? undefined : size.height + 12,
        bottom: isNearBottom ? size.height + 12 : undefined,
        width: 'auto',
        minWidth: size.width,
      }}
      className={`rounded-lg right-0  flex flex-col gap-5  z-30 absolute min-h-4 bg-neutral-50 text-neutral-950 shadow-lg  ${className ?? ''}`}
    >
      {children(closePopOver)}
    </ul>
  );
};
