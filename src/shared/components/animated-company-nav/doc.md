# Animated company navigation

Library component for a company-site header that expands into a centered menu. The preview page is `src/modules/pages/animated-company-nav` at `/animated-company-nav`. The project homepage only links here. It does not render this component.

## What it renders

- Closed bar: blue (`#3660da`) row with menu button, circular logo, solid and outline actions, plus the yellow announcement (`#ffd47e`).
- Open panel: the bar expands to about `70vh` and shifts to purple (`#412d9a`); the menu icon becomes close.
- Each menu row springs in with opacity `0 → 1` (`mass: 1`, `stiffness: 100`, `damping: 20`). Its underline appears on hover and keyboard focus.
- Menu labels use light `1.875rem` text with a `1.3` line height. The font stack starts with Helvetica Now Display and falls back to Helvetica Neue and the system font.

## Icons

Add Remix icons in `src/shared/utils/icon.ts`, then render them with Iconify:

```tsx
import { ICON } from '@/shared/utils/icon';
import { Icon } from '@iconify/react';

<Icon icon={ICON.CLOSE} fontSize={24} />;
```

## Usage

```tsx
import AnimatedCompanyNav from '@/shared/components/animated-company-nav';

<AnimatedCompanyNav />;
```

Pass `links`, `primaryAction`, and `secondaryAction` to replace the defaults. `announcement={null}` hides the yellow bar. `defaultOpen` opens the panel on first render, which is what the stories use.
