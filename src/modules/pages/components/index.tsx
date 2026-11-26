import MobileFrame from '@/shared/components/MobileFrame/MobileFrame';
import { MobileNavBase } from '@/shared/components/MobileNav';
import { Navbar } from '@/shared/components/Navbar';
import { Container } from '@/shared/components/layout';
import { GOV_PORTAL_ROUTES, MobileNavRoutes, SIDEBAR_ROUTES, navRoutes } from '@/shared/constants';
import type { UserPortalProps } from '@/shared/components/UserPortal';
import { useState } from 'react';
import Sidebar from '@/shared/components/Sidebar';
import EcomNav from '@/shared/components/ecommerce-web/EcomNav';

const DEMO_ROLES: UserPortalProps['roles'] = [
  { label: 'Business rep', value: 'business_rep' },
  { label: 'Citizen', value: 'citizen' },
];

const DEMO_AGENCIES: UserPortalProps['agencies'] = [
  { label: 'Agency 1', value: 'agency_1' },
  { label: 'Agency 2', value: 'agency_2' },
];

export default function Components() {
  const [active, setActive] = useState(MobileNavRoutes[0]?.route ?? '');
  const [activeNavRoute, setActiveNavRoute] = useState(GOV_PORTAL_ROUTES[0]?.route ?? '');
  const [activeSidebarRoute, setActiveSidebarRoute] = useState(
    SIDEBAR_ROUTES[0]?.routes[0]?.route ?? '/dashboard',
  );
  const [activeEcomSubRoute, setActiveEcomSubRoute] = useState('');

  // UserPortal state
  const [role, setRole] = useState(DEMO_ROLES[0].value);
  const [agency, setAgency] = useState(DEMO_AGENCIES?.[0].value);

  /** Base variant — no agency switcher */
  const basePortal: UserPortalProps = {
    user: { name: 'Steven Olakunle', subtitle: 'Business rep' },
    roles: DEMO_ROLES,
    activeRole: role,
    onRoleChange: setRole,
    onSignOut: () => {
      console.log('sign out');
    },
  };

  /** Agency variant — with agency switcher */
  const agencyPortal: UserPortalProps = {
    ...basePortal,
    user: { name: 'Steven Olakunle' },
    agencies: DEMO_AGENCIES,
    activeAgency: agency,
    onAgencyChange: setAgency,
  };

  /** Sidebar user configuration */
  const sidebarUser = {
    name: 'Steven Olakunle',
    email: 'admin@mail.com',
    roles: DEMO_ROLES,
    activeRole: role,
    onRoleChange: setRole,
    onSignOut: () => {
      console.log('sign out');
    },
  };

  return (
    <div className="bg-primary p-5 col-center min-h-screen">
      <section className="w-full px-6 flex flex-col gap-15 items-center">
        <div className="flex w-full items-center flex-col gap-6">
          <div>
            <h2 className="text-gray-50 text-2xl font-medium">Mobile Navigation</h2>
          </div>
          <MobileFrame size="md">
            <MobileNavBase routes={MobileNavRoutes} activeRoute={active} onNavigate={setActive} />
          </MobileFrame>
        </div>

        {/* ── Base variant (no agencies) ── */}
        <div className="flex w-full items-center flex-col gap-6">
          <div>
            <h2 className="text-gray-50 text-2xl font-medium">Government Portal</h2>
          </div>
          <Container className="bg-neutral-200! h-max p-6  w-full">
            <Navbar
              routes={GOV_PORTAL_ROUTES}
              activeRoute={activeNavRoute}
              onNavigate={setActiveNavRoute}
              userPortal={basePortal}
            />
          </Container>

          <div className="flex w-full items-center flex-col gap-6">
            <div>
              <h2 className="text-gray-50 text-2xl font-medium">Government Portal (Mobile)</h2>
            </div>
            <Container className="bg-neutral-200 p-6 ">
              <MobileFrame className="p-0!" size="md">
                <Navbar
                  routes={GOV_PORTAL_ROUTES}
                  activeRoute={activeNavRoute}
                  onNavigate={setActiveNavRoute}
                  userPortal={basePortal}
                />
              </MobileFrame>
            </Container>
          </div>
        </div>

        {/* ── Agency variant ── */}
        <div className="flex w-full items-center flex-col gap-6">
          <div>
            <h2 className="text-gray-50 text-2xl font-medium">Government Portal (With Agencies)</h2>
          </div>
          <Container className="bg-neutral-200! h-max p-6  w-full">
            <Navbar
              routes={GOV_PORTAL_ROUTES}
              activeRoute={activeNavRoute}
              onNavigate={setActiveNavRoute}
              userPortal={agencyPortal}
            />
          </Container>
        </div>

        {/* Large SASS Platform */}
        <div className="flex w-full items-center flex-col gap-6">
          <div>
            <h2 className="text-gray-50 text-2xl font-medium">Large SASS Platform</h2>
          </div>
          <Container className="bg-neutral-200! h-max p-6  w-full">
            <Sidebar
              activeRoute={activeSidebarRoute}
              onNavigate={setActiveSidebarRoute}
              user={sidebarUser}
            />
          </Container>
        </div>
        <div className="flex w-full h-[90vh] items-center flex-col gap-6">
          <div>
            <h2 className="text-gray-50 text-2xl font-medium">Animated Ecommerce Nav</h2>
          </div>
          <Container className="bg-neutral-200! h-max p-6  w-full">
            <EcomNav
              routes={navRoutes}
              activeSubRoute={activeEcomSubRoute}
              onNavigate={setActiveEcomSubRoute}
            />
          </Container>
        </div>
      </section>
    </div>
  );
}
