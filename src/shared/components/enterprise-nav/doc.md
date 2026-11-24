# Enterprise navigation

Library component for the BLK Labs enterprise sidebar. The preview page is `src/modules/pages/enterprise-nav` at `/enterprise-nav`. The project homepage only links here. It does not render this component.

## What it renders

- Expanded sidebar: logo, collapse control, search, main menu, folders, settings, support, and the signed-in account.
- Collapsed rail: icons only. A count badge becomes a red dot. Search expands the sidebar again.
- User Management opens in two steps. The first click shows Individuals and Businesses. Clicking Businesses shows NGOs, Limited Liability, and Partnerships. Clicking User Management again closes the group. Nested labels are `#7e8cb2`, and each open level has a `#836af0` vertical line.
- The current route highlights in `#a290f4`. Hover fills a top-level row with `#353d57`.
- `syncing` shows a spinning refresh icon on each top-level item.
- The account control opens a profile card with Sign out.

## Icons

Add Remix icons in `src/shared/utils/icon.ts`, then render them with Iconify:

```tsx
import { ICON } from '@/shared/utils/icon';
import { Icon } from '@iconify/react';

<Icon icon={ICON.DASHBOARD} fontSize={18} />;
```

## Usage

```tsx
import EnterpriseNav from '@/shared/components/enterprise-nav';

<EnterpriseNav />;
```

Pass `items`, `folders`, and `utility` to replace the default links. A count badge is `{ kind: 'count', value: 4 }`. A pill is `{ kind: 'pill', label: 'Badge', tone: 'accent' }` or `tone: 'muted'` for the New badge.

`activeHref` overrides the router path. `defaultCollapsed`, `defaultOpenIds`, and `defaultProfileOpen` set the first render, which is what the stories use.
