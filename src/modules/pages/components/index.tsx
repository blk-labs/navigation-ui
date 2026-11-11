import MobileFrame from '@/shared/components/MobileFrame/MobileFrame';
import { MobileNavBase } from '@/shared/components/MobileNav';
import { MobileNavRoutes } from '@/shared/constants';
import { useState } from 'react';

export default function Components() {
  const [active, setActive] = useState(MobileNavRoutes[0]?.route ?? '');
  return (
    <div className="bg-primary col-center min-h-screen">
      <MobileFrame size="md">
        <MobileNavBase routes={MobileNavRoutes} activeRoute={active} onNavigate={setActive} />
      </MobileFrame>
    </div>
  );
}
