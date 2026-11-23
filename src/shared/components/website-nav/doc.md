# Website navigation

Library component for the BLK Labs site header. The preview page is `src/modules/pages/website-nav` at `/website-nav`. The project homepage only links here. It does not render this component.

## What it renders

- Desktop bar: logo, links, Log in, and Sign up.
- Yellow announcement, plus an optional offline bar when `offlineMessage` is set.
- Services opens a category menu or a store directory, depending on the link's `menu.kind`.
- Below 960px of container width, the links collapse behind the menu button.

The current link keeps a pill and uses `#a290f4`. Hovering another tab slides that pill over and turns the label `#c1b5f8`, while the current page stays `#836af0` until the pill returns. Idle labels are `#f5f6fa`. Leaving the bar returns the pill to the current page.

## Icons

Add Remix icons in `src/shared/utils/icon.ts`, then render them with Iconify:

```tsx
import { ICON } from '@/shared/utils/icon';
import { Icon } from '@iconify/react';

<Icon icon={ICON.ARROW_DOWN} fontSize={16} />;
```

## Usage

```tsx
import WebsiteNav from '@/shared/components/website-nav';

<WebsiteNav />;
```

Pass `items` to replace the default links. A link with `menu` becomes a dropdown. `kind: 'categories'` renders icon rows. `kind: 'directory'` renders the department bar, link columns, and optional side rail.

`activeHref` overrides the router path when you need to force the current tab. `announcement={null}` hides the yellow bar. `defaultOpenMenu` and `defaultMobileOpen` open a menu on first render, which is what the stories use.
