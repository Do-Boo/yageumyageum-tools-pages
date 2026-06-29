# 야금야금 업무 도구 Design System

## 1. Product Feel

야금야금 업무 도구는 직장인이 반복 업무를 빠르게 처리하는 실용형 웹 유틸리티다. 화면은 장식보다 기능 탐색이 먼저 보여야 하며, 앱 본체의 만화적/뉴브루탈리즘 감각을 웹에서도 유지한다.

## 2. Color Tokens

- `ink`: `#191f28` for primary text, thick borders, and hard shadows.
- `muted`: `#6b7684` for secondary copy.
- `bg`: `#f2f4f6` for page background.
- `surface`: `#ffffff` for cards and ad containers.
- `yellow`: `#ffd158` for brand header and accent CTAs.
- `blue`: `#3182f6` for primary actions.
- `border-soft`: `#d1d6db` for dashed ad outlines.
- `line-soft`: `#e5e8eb` for content dividers.

## 3. Typography

- Font stack: `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif`.
- Headings use 900 weight, tight line-height, and `letter-spacing: 0`.
- Body and helper text use 700-800 weight so Korean labels remain crisp.
- UI labels and badges use 11-13px with 900 weight.

## 4. Spacing

- Base spacing unit is 4px.
- Content pages use a max width near 1120px with 20-40px viewport gutters.
- Cards use 18-22px padding on content pages and 16-20px inside compact ad modules.
- Vertical ad spacing uses 24-28px so ads separate sections without dominating the page.

## 5. Components

- `n-card`: white surface, 2.5px `ink` border, 4px hard shadow, 16-20px radius.
- `n-btn`: high-contrast action button with the same border and shadow system.
- `ad-slot`: page-level ad container. It may render an AdSense `<ins>` or a neutral placeholder before approval.
- `side-ad`: desktop-only fixed side placement visible only on wide screens.

## 6. Motion

- Motion is brief and tactile. Use transform/opacity only.
- Active button states may translate by the shadow offset to create a pressed effect.

## 7. Constraints

- Do not use emoji as UI icons.
- Do not introduce a new palette or soft gradient decoration.
- Ads must always be clearly labeled as advertising and must not resemble app rewards.
- If AdSense values are missing, show a harmless placeholder instead of broken third-party script output.
