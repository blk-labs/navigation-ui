import type { Dispatch, SetStateAction } from 'react';

export interface DimensionType {
  x: number;
  y: number;
}
export interface SizeType {
  width: number;
  height: number;
}

export interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  position: DimensionType;
  setPosition: Dispatch<SetStateAction<DimensionType>>;
  size: SizeType;
  setSize: Dispatch<SetStateAction<SizeType>>;
  isNearBottom: boolean;
  setIsNearBottom: Dispatch<SetStateAction<boolean>>;
}
