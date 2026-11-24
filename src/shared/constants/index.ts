import type { NavRoute } from '../components/MobileNav';
import type { SidebarRoutes } from '../components/Sidebar';
import { ICON } from '../utils/icon';

export const MobileNavRoutes: NavRoute[] = [
  {
    label: 'Home',
    route: '/',
    icon: ICON.HOME,
    activeIcon: ICON.HOME_FILLED,
  },
  {
    label: 'Cards',
    route: '/cards',
    icon: ICON.CARDS,
    activeIcon: ICON.CARDS_FILLED,
  },
  {
    label: 'Send',
    route: '/send',
    icon: ICON.SEND,
    activeIcon: ICON.SEND_FILLED,
  },
  {
    label: 'Invest',
    route: '/invest',
    icon: ICON.INVEST,
    activeIcon: ICON.INVEST_FILLED,
  },
  {
    label: 'Profile',
    route: '/profile',
    icon: ICON.PROFILE,
    activeIcon: ICON.PROFILE_FILLED,
  },
  {
    label: 'Request statement',
    route: '/request-statement',
    icon: ICON.TIME,
  },
  {
    label: 'Request loan',
    route: '/request-loan',
    icon: 'griddy-icons:loan',
  },
  {
    label: 'Request card',
    route: '/request-card',
    icon: ICON.CARDS,
  },
];

export const GOV_PORTAL_ROUTES: NavRoute[] = [
  {
    label: 'Home',
    route: '#',
  },
  {
    label: 'Requests',
    route: '#requests',
  },
  {
    label: 'Account',
    route: '#account',
  },
  {
    label: 'Support',
    route: '#support',
  },
  {
    label: 'Licensing',
    route: '#licensing',
  },
];

type NavGroup = SidebarRoutes['routes'];

export const SIDEBAR_ROUTES: NavGroup[] = [
  {
    label: 'Pinned',
    routes: [
      { label: 'Dashboard', route: '/dashboard', isPinned: true },
      { label: 'Activity', route: '/activity', isPinned: true },
    ],
  },
  {
    label: 'Recently viewed',
    routes: [
      { label: 'Invoices', route: '/invoices' },
      { label: 'Team roles', route: '/team-roles' },
    ],
  },
  {
    label: 'Modules',
    routes: [
      { label: 'Browse all modules', route: '/modules' },
      {
        label: 'Account management',
        route: '/account-management',
        subRoutes: [
          { label: 'User Accounts', route: '/account-management/user-accounts' },
          { label: 'Business Accounts', route: '/account-management/business-accounts' },
          { label: 'Account Officers', route: '/account-management/account-officers' },
          { label: 'Offices', route: '/account-management/offices' },
          { label: 'Human Resources', route: '/account-management/human-resources' },
          { label: 'Compliance', route: '/account-management/compliance' },
          { label: 'AML & PEP Audits', route: '/account-management/aml-pep-audits' },
          { label: 'Documentation', route: '/account-management/documentation' },
        ],
      },
      {
        label: 'Transactions',
        route: '/transactions',
        subRoutes: [
          { label: 'All Transactions', route: '/transactions/all' },
          { label: 'Pending Transactions', route: '/transactions/pending', alertCount: 4 },
          {
            label: 'Failed Transactions',
            route: '/transactions/failed',
            alertCount: 12,
            alertVariant: 'danger',
          },
          { label: 'Reversals', route: '/transactions/reversals' },
          { label: 'Settlements', route: '/transactions/settlements' },
          { label: 'Reconciliation', route: '/transactions/reconciliation' },
          { label: 'Documentation', route: '/transactions/documentation' },
        ],
      },
      {
        label: 'Disputes',
        route: '/disputes',
        subRoutes: [
          {
            label: 'Open Disputes',
            route: '/disputes/open',
            alertCount: 3,
            alertVariant: 'danger',
          },
          { label: 'Resolved Disputes', route: '/disputes/resolved' },
          { label: 'Chargebacks', route: '/disputes/chargebacks', alertCount: 1 },
          { label: 'Escalations', route: '/disputes/escalations' },
          { label: 'Evidence Submissions', route: '/disputes/evidence' },
          { label: 'Documentation', route: '/disputes/documentation' },
        ],
      },
      {
        label: 'Legal',
        route: '/legal',
        subRoutes: [
          { label: 'Contracts', route: '/legal/contracts' },
          { label: 'Cases', route: '/legal/cases' },
          { label: 'Policies', route: '/legal/policies' },
          { label: 'Regulatory Filings', route: '/legal/regulatory-filings' },
          { label: 'Legal Notices', route: '/legal/notices' },
          { label: 'Documentation', route: '/legal/documentation' },
        ],
      },
      {
        label: 'Assignments',
        route: '/assignments',
        subRoutes: [
          { label: 'My Assignments', route: '/assignments/mine' },
          { label: 'Team Assignments', route: '/assignments/team' },
          { label: 'Unassigned', route: '/assignments/unassigned' },
          { label: 'Workload', route: '/assignments/workload' },
          { label: 'Assignment Rules', route: '/assignments/rules' },
          { label: 'Documentation', route: '/assignments/documentation' },
        ],
      },
      {
        label: 'Operations',
        route: '/operations',
        subRoutes: [
          { label: 'Task Queue', route: '/operations/task-queue' },
          { label: 'Workflows', route: '/operations/workflows' },
          { label: 'Service Requests', route: '/operations/service-requests' },
          { label: 'Incidents', route: '/operations/incidents' },
          { label: 'Reports', route: '/operations/reports' },
          { label: 'Documentation', route: '/operations/documentation' },
        ],
      },
      {
        label: 'Finance',
        route: '/finance',
        subRoutes: [
          { label: 'Invoices', route: '/finance/invoices' },
          { label: 'Payouts', route: '/finance/payouts' },
          { label: 'Fees & Pricing', route: '/finance/fees-pricing' },
          { label: 'Ledger', route: '/finance/ledger' },
          { label: 'Budgets', route: '/finance/budgets' },
          { label: 'Financial Reports', route: '/finance/reports' },
          { label: 'Documentation', route: '/finance/documentation' },
        ],
      },
      {
        label: 'Boards',
        route: '/boards',
        subRoutes: [
          { label: 'All Boards', route: '/boards/all' },
          { label: 'My Boards', route: '/boards/mine' },
          { label: 'Shared Boards', route: '/boards/shared' },
          { label: 'Templates', route: '/boards/templates' },
          { label: 'Archived', route: '/boards/archived' },
          { label: 'Documentation', route: '/boards/documentation' },
        ],
      },
    ],
  },
];
