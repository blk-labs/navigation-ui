# Ecommerce navigation

Library component for the BLK Labs store header. The preview page is `src/modules/pages/ecommerce-nav` at `/ecommerce-nav`. The project homepage only links here. It does not render this component.

## What it renders

- Desktop bar: logo, search, Account, Help, and Cart, then the category row.
- Each category opens its five-column menu. The open category keeps a `#836af0` underline.
- `breadcrumbs` draws the trail under the categories.
- `offlineMessage` draws the reconnect bar between the dark bar and the categories.
- Below 960px the bar becomes the hamburger, logo, cart, and search. The menu stacks into one column.

The layout follows the component width, not the browser window.

## Icons

Add Remix icons in `src/shared/utils/icon.ts`, then render them with Iconify:

```tsx
import { ICON } from '@/shared/utils/icon';
import { Icon } from '@iconify/react';

<Icon icon={ICON.CART} fontSize={18} />;
```

## Usage

```tsx
import EcommerceNav from '@/shared/components/ecommerce-nav';

<EcommerceNav />;
```

Pass `categories` to replace the store departments. Every default category includes a `menu`. Pass `breadcrumbs` and `offlineMessage` for those variants.
