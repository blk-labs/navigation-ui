# Animated portfolio navigation

Library component for a portfolio-site header with boxy icon pills that expand into text labels. The preview page is `src/modules/pages/animated-portfolio-nav` at `/animated-portfolio-nav`. The project homepage only links here. It does not render this component.

## What it renders

- Blue bar (`#3660da`) with the circular BLK mark on the left.
- Four menu pills on the right: Home, About, Portfolio, Blog.
- Default: `56×56` icon tiles (`#4b7ce6` fill, `#9cc0f4` border, white Remix icons).
- Hover / keyboard focus: the pill eases wider, changes to `#f5f6fa`, and the 14px label slides up as the icon slides out.
- The current page is exposed with `aria-current` but remains an icon tile until hovered or focused.

## Icons

Add Remix icons in `src/shared/utils/icon.ts`, then render them with Iconify:

```tsx
import { ICON } from '@/shared/utils/icon';
import { Icon } from '@iconify/react';

<Icon icon={ICON.HOME_LINE} fontSize={24} />;
```

## Usage

```tsx
import AnimatedPortfolioNav from '@/shared/components/animated-portfolio-nav';

<AnimatedPortfolioNav />;
```

Pass `links` to replace the defaults. `activeHref` overrides the router path. `defaultHoveredId` expands a pill on first render for stories.
