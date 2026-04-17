# Crypto Exchange TODO

## Status

- [x] done
- [-] partial
- [ ] pending

---

## Product Vision

این پروژه در نهایت باید یک **Exchange-grade UI/UX** باشد:
- از 0 تا 100 تجربه‌ی یک صرافی مدرن را بسازیم
- تمام flowها، صفحه‌ها، stateها، chartها، historyها، watchlist، routing، fallback، badgeها و shell حرفه‌ای باشند
- **معامله واقعی انجام نمی‌شود**، اما تمام تجربه‌ی دیداری، تعاملی و معماری آن باید مثل یک محصول واقعی و قابل دفاع باشد
- هر feature باید هم از نظر **UX** و هم از نظر **clean code / modularity / maintainability** حرفه‌ای باشد

---

## Current Reviewed Architecture Snapshot

- [x] `exchangeStore` به store مرکزی پروژه تبدیل شده و getter / snapshot برای read path دارد
- [x] `connectionManager` orchestrator اصلی live layer است
- [x] fallback flow بین Binance → Nobitex → Fake پیاده شده
- [x] ownership اتصال فعال و cleanup پایه برای live connection اضافه شده
- [x] `MainLayout` و `ConnectionBadge` برای نمایش global provider status ساخته شده‌اند
- [x] `MarketPage`, `WatchlistPage`, `AssetPage`, `TradingModal` از هم جدا شده‌اند
- [-] هنوز برای بعضی componentهای market و style-level polish، همه‌ی فایل‌ها review نشده‌اند

---

## Phase 1 — Stabilize the Core

- [x] Rename `TreadingModal.js` to `TradingModal.js`
- [x] Update all imports that reference `TradingModal.js`
- [x] Move `connectionManager.js` from utils to services
- [x] Move `fakePriceEngine.js` from utils to services
- [x] Refactor `setCoins()` to clone incoming data safely
- [x] Add error handling for initial coin fetch in `app.js`
- [x] Add fallback logging for Binance → Nobitex → Fake flow
- [x] Make `connectionManager` return provider status cleanly
- [x] Refactor fake engine to use centralized live ticker handling
- [x] Add centralized `stopLiveConnection()` cleanup entry point
- [x] Add active live connection ownership inside `connectionManager`
- [x] Stop previous live connection before starting a new one
- [x] Stop live connection on `beforeunload`
- [x] Fix Binance import path consistency for `priceHelpers.js`
- [x] Fix Nobitex client scope so disconnect can target the real client instance
- [x] Prevent repeated fallback spam by gating Nobitex failure flow

---

## Phase 2 — Improve Component Structure

- [x] Split modal rendering and modal live update into separate functions
- [x] Create a dedicated empty-state renderer for market/watchlist empty states
- [x] Create `MainLayout.js`
- [x] Create `ConnectionBadge` as a shared UI component
- [x] Extract connection status helpers into `services/helpers`
- [x] Extract connection transitions into `services/helpers`
- [x] Extract shared selectors into `constants/selectors.js`
- [-] Expand shared selectors beyond the current minimal selector set
- [-] Standardize naming across all files and folders
- [-] Reduce direct DOM id dependency where possible
- [-] Keep rendering logic pure where possible
- [-] Review all remaining market subcomponents (`CoinRow`, `CoinList`, `EmptyState`) for purity and reuse
- [ ] Extract more shared UI primitives (base badge, section header, info/stat card wrapper, action button)
- [ ] Replace ad-hoc repeated markup blocks with reusable view helpers/components
- [ ] Review whether some page-level helper functions should move to dedicated helper files

---

## Phase 3 — Build Page Structure

- [x] Create `MarketPage.js`
- [x] Move market section rendering into `MarketPage.js`
- [x] Create `WatchlistPage.js`
- [x] Create `AssetPage.js`
- [x] Define a basic client-side page switch strategy
- [x] Add a placeholder navigation structure
- [x] Add route fallback to default page
- [x] Support `#asset/:symbol` dynamic route
- [x] Support `navigateToAsset(symbol)` flow from row click
- [x] Keep page mounting separated from route parsing logic
- [-] Review route rendering for future home-first layout support

---

## Phase 3.5 — Product Shell & Core UX

### 3.5.1 Market / Home shell
- [ ] Create a dedicated Home page / Home-first shell
- [ ] Convert current market-first entry into a home-first layout
- [ ] Define sections for hero / quick actions / provider status / watchlist preview / all coins
- [ ] Decide whether `#market` remains the default route or `#home` becomes the default route
- [ ] Add a reusable home section switch for `Watchlist / All Coins`
- [ ] Add a home quick-summary block for market status and live provider status
- [ ] Add a home preview card for selected / focused asset

### 3.5.2 Asset coverage & store capabilities
- [x] Expand mock coins to at least 10 assets
- [x] Add watchlist state and actions to `exchangeStore`
- [x] Persist watchlist in localStorage
- [x] Add `connectionStatus` state to `exchangeStore`
- [x] Add `getConnectionStatusSnapshot()` to `exchangeStore`
- [x] Add `getCoinSnapshot()` to separate read path from raw state access
- [x] Add `getAllCoinsSnapshot()` for safe list reads
- [x] Add `getHistorySnapshot()` and make history reads safer
- [-] Define and document the rule for when `getCoin()` is allowed vs when `getCoinSnapshot()` is required

### 3.5.3 Navigation & page flows
- [x] Change coin row click behavior to navigate to `AssetPage`
- [x] Build `AssetPage` with price, stats, description, history, provider info, and trade CTA
- [x] Open `TradingModal` from AssetPage trade action
- [-] Verify row-level trade CTA existence in `CoinRow.js`
- [-] Verify row-level watchlist star button existence in `CoinRow.js`
- [ ] Highlight selected coin state across list → asset flow
- [ ] Add breadcrumb / context hint when entering AssetPage from Market / Watchlist

### 3.5.4 Trading modal & asset presentation
- [x] Redesign `TradingModal` with a larger pro layout
- [x] Keep chart area as a polished placeholder with internet restriction message
- [x] Render live history inside the modal
- [x] Sync live modal price update with central ticker flow
- [x] Sync asset page live price/update state with central ticker flow
- [ ] Add richer order form microcopy and validation hints
- [ ] Add disabled / demo-state explanation for non-executing trade actions
- [ ] Add better empty / first-use guidance inside modal journal/history areas

### 3.5.5 Provider status UX
- [x] Add global provider status badge in `MainLayout`
- [x] Show active provider status in `AssetPage`
- [x] Refresh provider badge when connection status changes
- [x] Centralize connection transitions in `services/helpers/connectionTransitions.js`
- [x] Centralize connection status factories in `services/helpers/connectionStatusHelpers.js`
- [x] Centralize live ticker handling in `connectionManager`
- [x] Add active live connection ownership and cleanup flow
- [-] Decide whether `activeProvider` or `connectionStatus.provider` should become the single source of truth
- [ ] Add hero/home-level provider explanation block
- [ ] Add clearer degraded / fake-mode explanation for the user in the shell

### 3.5.6 Reusable UI blocks
- [-] Reuse `ConnectionBadge` as a shared badge pattern
- [-] Reuse asset stat/info card pattern from `AssetPage`
- [ ] Extract reusable base `StatCard` component/helper
- [ ] Extract reusable base `SectionHeader` component/helper
- [ ] Extract reusable base `TabSwitch` / segmented control component/helper
- [ ] Extract reusable base `ActionButton` variants
- [ ] Extract reusable empty-state visual block for all pages

---

## Phase 4 — UI / UX Polish & Interaction Quality

### 4.1 Market list improvements
- [ ] Add loading state for initial market load
- [ ] Add loading state for connection switching / degraded mode
- [ ] Add sort options for market list
- [ ] Add clear button for search input
- [-] Keep and polish no-result state for search
- [ ] Add sticky control bar for search/sort/filter if needed
- [ ] Add selected row visual state
- [ ] Add hover polish for rows
- [ ] Add keyboard-friendly focus styles for interactive rows/buttons

### 4.2 Watchlist improvements
- [x] Add polished empty state for watchlist
- [ ] Add watchlist section summary/count in header
- [ ] Add shortcut to return from empty watchlist to all coins
- [ ] Add watchlist filter/sort options

### 4.3 Asset page improvements
- [-] Keep current polished placeholder chart block
- [ ] Replace placeholder chart with a real internal chart based on local/live history
- [ ] Add selectable chart ranges (e.g. recent / session / custom)
- [ ] Show richer asset metadata blocks
- [ ] Add better provider/update timestamp presentation
- [ ] Add asset status strip for live/degraded/fake mode

### 4.4 Modal improvements
- [ ] Improve journal/history hierarchy and spacing
- [ ] Improve responsive layout for modal on tablet/mobile
- [ ] Add close/escape/outside-click UX verification matrix
- [ ] Add clearer input formatting/feedback in trade form
- [ ] Add disabled explanation for non-executing trade flows

### 4.5 Theme / shell polish
- [x] Add provider status badge UI polish
- [-] Improve dark mode consistency across all pages/components
- [-] Improve responsive layout for layout shell, asset page, and modal
- [ ] Audit spacing, typography, and border radius consistency across pages
- [ ] Audit iconography consistency across shell/pages/components

### 4.6 Failure / degraded UX
- [-] Show degraded state via connection badge
- [ ] Add explicit in-page error state UI for connection failures
- [ ] Add user-facing explanation when app falls back to fake data
- [ ] Add retry action UI for reconnect attempts
- [ ] Add subtle status transition animation or message update when provider changes

---

## Phase 5 — Senior-Level Clean Code / Architecture / Documentation

### 5.1 Store & state design
- [x] Move major read paths to getter/snapshot-based access
- [-] Keep `getCoin()` raw but document its intended restricted use
- [ ] Decide and document one source of truth for provider state
- [ ] Decide whether `lastUpdate` belongs only to store or also needs page-level derived helpers
- [ ] Review whether any write path should be split into dedicated action methods

### 5.2 Constants / naming / consistency
- [-] Replace repeated selectors with constants where it improves clarity
- [ ] Replace repeated provider strings with shared constants/enums
- [ ] Replace repeated route strings with route constants/helpers
- [ ] Replace repeated status messages with centralized message constants
- [ ] Rename misleading function names (example: mock-fetch naming if needed)
- [ ] Normalize naming conventions across render/mount/update helpers
- [ ] Audit file/folder naming consistency in `components`, `pages`, `services`, `helpers`

### 5.3 DOM / imperative update review
- [ ] Review every `innerHTML` usage and mark safe vs risky usage
- [ ] Review every `dataset` usage and centralize patterns if repeated
- [ ] Review every `classList` manipulation path for duplication
- [ ] Review jQuery event binding namespaces for consistency
- [ ] Reduce direct DOM id coupling where a scoped selector/helper would be cleaner

### 5.4 Function style / module boundaries
- [ ] Review where arrow functions are ideal and where named functions are clearer
- [ ] Review where methods on objects are better than external helpers
- [ ] Review whether some long render functions should be split into sub-render helpers
- [ ] Review whether connectionManager is growing enough to deserve smaller service modules
- [ ] Review whether asset/modal helper files should own more formatting/markup logic

### 5.5 Required architecture notes
- [ ] Document render flow from store → page → component → DOM
- [ ] Document live update flow from websocket/fake engine → connectionManager → store/UI
- [ ] Document route flow from hash → router → page mount
- [ ] Document watchlist flow from click → store → rerender
- [ ] Document modal/data flow from asset page → trade click → modal → live update
- [ ] Document connection ownership and fallback lifecycle
- [ ] Document raw store access vs snapshot access policy
- [ ] Create a concise architecture notes section in the repo

### 5.6 Commenting policy
- [-] Keep comments only where logic is non-obvious
- [ ] Remove temporary / noisy comments that do not add architectural value
- [ ] Prefer clear naming over explanatory comments where possible
- [ ] Add short intent comments only on lifecycle/fallback logic, not obvious UI markup

---

## Phase 6 — Exchange Experience Completion (Without Real Execution)

### 6.1 Home / dashboard experience
- [ ] Build final home page shell
- [ ] Add hero section with strong product framing
- [ ] Add quick stats cards (market overview / watchlist count / provider state / last update)
- [ ] Add watchlist preview block
- [ ] Add all-coins preview block
- [ ] Add featured / selected asset preview block

### 6.2 Charting & history experience
- [ ] Build internal chart from local/live history data
- [ ] Design chart data adapter from store history
- [ ] Add placeholder-to-real chart migration plan
- [ ] Add axis / range / tooltip design
- [ ] Add empty / insufficient-history chart fallback state
- [ ] Ensure chart updates on live ticker without full page rerender

### 6.3 Exchange-like product depth
- [ ] Add portfolio overview shell (demo only)
- [ ] Add order form validation states (demo only)
- [ ] Add order history / journal section polish
- [ ] Add market status strip (live / degraded / fake)
- [ ] Add richer asset metadata blocks
- [ ] Add notifications/toasts for provider switch, watchlist actions, and major UI actions
- [ ] Add comparison-ready market controls (sort/filter/group)

### 6.4 Demo-safe trading policy
- [ ] Keep all trade buttons non-executing but realistic
- [ ] Add clear demo explanation in modal / trade CTA zones
- [ ] Keep UX realistic without implying real execution or account handling

---

## Phase 7 — QA / Verification / Release Readiness

- [ ] Verify all imports after every rename/move
- [ ] Verify no broken route after every structural refactor
- [ ] Verify dark/light theme on all main pages and modal
- [ ] Verify Binance → Nobitex → Fake fallback visually and in store state
- [ ] Verify watchlist persistence after refresh
- [ ] Verify asset page refresh when market data changes
- [ ] Verify modal live price update while open
- [ ] Verify beforeunload cleanup and restart behavior
- [ ] Verify no repeated connection leaks after repeated init/restart tests
- [ ] Verify responsive behavior on mobile / tablet / desktop
- [ ] Create a manual regression checklist before each big phase completion

---

## Files Still Worth Reviewing for Final Sign-Off

> این فایل‌ها در بررسی فعلی همه‌شان موجود نبودند یا برای sign-off کامل لازم‌اند:

- [ ] `src/components/market/CoinRow.js`
- [ ] `src/components/market/CoinList.js`
- [ ] `src/components/market/EmptyState.js`
- [ ] `src/pages/asset/assetPageHelpers.js`
- [ ] `src/components/modal/tradeModalHelpers.js`
- [ ] `src/components/modal/tradeModalHistory.js`
- [ ] `src/assets/css/style.css`
- [ ] `src/config/coinBadgeColors.js`

---

## Senior Working Rules From Now On

### 1) Rename / move policy
- هر rename یا move باید **همان لحظه** با update تمام importها کامل شود
- هیچ rename نیمه‌کاره نباید در پروژه بماند
- بعد از هر rename باید حداقل route / modal / live layer / theme یک بار smoke-test شوند

### 2) State access policy
- render path باید تا جای ممکن از **snapshot/getter** استفاده کند
- raw state access فقط وقتی مجاز است که دلیلش روشن و مستند باشد
- هیچ page/component نباید مستقیم و بی‌قاعده `store.state.*` را بخواند
- تغییر state فقط از مسیر action/methodهای store انجام شود

### 3) Connection architecture policy
- provider fileها باید transport/data-feed باشند، نه UI orchestrator
- `connectionManager` owner اصلی lifecycle و fallback و active connection است
- هر fallback جدید باید active ownership را همان‌جا آپدیت کند
- هر stop/cleanup باید از owner واقعی عبور کند

### 4) Component policy
- componentها باید تا حد ممکن تک‌مسئولیتی باشند
- render helperها markup بسازند، نه اینکه state business logic را هم حمل کنند
- UI blockهای تکراری باید استخراج شوند، نه اینکه copy/paste شوند
- هر component جدید باید از اول با dark mode و responsive بودن سنجیده شود

### 5) Clean code policy
- naming باید دقیق‌تر از comment باشد
- comment فقط برای منطق‌های non-obvious، lifecycle و fallback پیچیده مجاز است
- string/selector/status تکراری باید به constants/helpers منتقل شوند وقتی تکرارشان واقعی شد
- هر utility/helper باید مسئولیت مشخص و محدود داشته باشد

### 6) Refactor policy
- refactor باید **مرحله‌ای، کم‌ریسک و قابل تست** باشد
- اول API جدید اضافه شود، بعد مصرف‌کننده‌ها migrate شوند، بعد نسخه قدیمی حذف شود
- هیچ refactor بزرگی بدون smoke-test مسیرهای اصلی انجام نشود

### 7) UX policy
- هر feature جدید باید هم حالت عادی داشته باشد، هم empty state، هم degraded/error state، هم loading state اگر لازم است
- هر چیزی که live است باید وضعیت provider و fallback را شفاف نگه دارد
- ظاهر polished مهم است، ولی نباید با هزینه‌ی درهم‌ریختگی معماری به دست بیاید

### 8) Product direction policy
- این پروژه فقط یک demo خام نیست؛ باید از نظر ساختار، UX، state flow و live architecture مثل یک محصول واقعی رشد کند
- معامله واقعی انجام نمی‌شود، اما تجربه‌ی کلی صرافی باید تا جای ممکن کامل، قابل دفاع و حرفه‌ای باشد
- chart، history، watchlist، routing، modal، provider status و shell همگی بخش‌های اصلی محصول‌اند، نه فرعی

### 9) Collaboration policy
- هر کسی که روی پروژه کار می‌کند باید قبل از کدنویسی بداند: این feature در کدام layer است؟ store؟ page؟ component؟ service؟ helper؟
- اگر پاسخ روشن نیست، اول معماری مشخص شود بعد کد زده شود
- هیچ تغییر UI نباید بدون درنظرگرفتن store flow، routing impact، connection impact و responsive impact merge شود

### 10) Definition of done
یک task فقط وقتی done است که:
- کدش کار کند
- importها سالم باشند
- مسیرهای وابسته‌اش نشکنند
- حالت‌های empty/error/degraded لازم بررسی شده باشند
- naming و modularity آن قابل دفاع باشد
- TODO / notes پروژه با وضعیت جدید sync شود

