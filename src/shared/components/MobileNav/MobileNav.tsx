import { useLocation, useNavigate } from 'react-router-dom';
import MobileNavBase from './MobileNavBase';
import type { MobileNavProps } from './types';

export default function MobileNav({ routes }: MobileNavProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <MobileNavBase
      routes={routes}
      activeRoute={pathname}
      onNavigate={(route) => {
        void navigate(route);
      }}
    />
  );
}
