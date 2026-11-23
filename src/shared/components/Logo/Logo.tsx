import { Link } from 'react-router-dom';
import type { LogoProps } from '.';
import { classNames } from '../utils/classNames';

export default function Logo({ className, size = 52, hasLabel }: LogoProps) {
  return (
    <Link to={'/'} className={classNames(className, 'flex-center  gap-3')}>
      <img src="/logo.png" height={size} width={size} alt="blk labs main logo" />
      {hasLabel && <span className="text-white">BLK Labs</span>}
    </Link>
  );
}
