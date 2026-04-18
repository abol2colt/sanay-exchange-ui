# SANAY — Master TODO & Delivery Roadmap

## Status Legend

- [x] Done
- [-] Partial
- [ ] Pending
- [!] Decision / Needs alignment

---

## Project Vision

### Build a premium exchange-like product shell called **Sanay**

- [ ] Build a complete crypto exchange experience except real trading execution
  - هدف این پروژه ساخت یک تجربه کامل و حرفه‌ای شبیه صرافی واقعی است، اما بدون اتصال به موتور واقعی معامله.
- [ ] Keep real-time market feeling, professional UI, account flows, charting, watchlist, and asset pages
  - باید حس یک محصول واقعی را با قیمت زنده، نمودار، واچ‌لیست، صفحه دارایی و جریان حساب کاربری بدهد.
- [ ] Keep architecture modular, component-first, and maintainable from day one
  - از همین حالا باید معماری پروژه تمیز، ماژولار و قابل توسعه بماند تا بعداً به بن‌بست نرسیم.

---

## Phase 0 — Timeline of What Has Already Been Built

### Application bootstrap and layout foundation

- [x] Create `app.js` bootstrap flow
  - بوت‌استرپ اصلی برنامه ساخته شده و theme، shell، route و data load را راه می‌اندازد.
- [x] Create `MainLayout.js` shell
  - شل اصلی برنامه با navbar و `#page-root` ساخته شده است.
- [x] Add global theme setup and toggle listener
  - تم روشن و تیره با `themeManager` و localStorage مدیریت می‌شود.

### Routing and page switching

- [x] Create router with hash-based navigation
  - مسیرها با hash router ساخته شده‌اند.
- [x] Add route fallback to default page
  - برای مسیرهای نامعتبر fallback تعریف شده است.
- [x] Support dynamic asset route `#asset/:symbol`
  - مسیر داینامیک برای صفحه هر ارز پیاده شده است.

### Market data and initial state

- [x] Add mock top coins loader
  - داده اولیه بازار از mockCoins بارگذاری می‌شود.
- [x] Expand mock dataset to 10 assets
  - تعداد دارایی‌های اولیه به 10 ارز رسیده است.
- [x] Hydrate coin price from saved local history when available
  - اگر history قبلی وجود داشته باشد، قیمت اولیه از آن hydrate می‌شود.

### Store and data ownership

- [x] Create central `exchangeStore`
  - استور مرکزی پروژه ساخته شده و source of truth اصلی است.
- [x] Add safe coin cloning in `setCoins()`
  - ورودی coins قبل از ورود به state کپی می‌شود.
- [x] Add `watchlistSymbols` state and actions
  - state و اکشن‌های واچ‌لیست به استور اضافه شده‌اند.
- [x] Persist watchlist in localStorage
  - واچ‌لیست در localStorage ذخیره و بازیابی می‌شود.
- [x] Persist price history in localStorage
  - history قیمت‌ها در localStorage ذخیره و بازیابی می‌شود.

### Page layer

- [x] Create `MarketPage.js`
  - صفحه مارکت ساخته شده است.
- [x] Create `WatchlistPage.js`
  - صفحه واچ‌لیست ساخته شده است.
- [x] Create `AssetPage.js`
  - صفحه جزئیات ارز ساخته شده است.

### Modal layer

- [x] Rename and stabilize `TradingModal.js`
  - مودال معامله نام‌گذاری و ساختار بهتری گرفته است.
- [x] Split modal rendering, helpers, and history rendering
  - مودال به چند فایل helper/history/render شکسته شده است.
- [x] Open trade modal from asset page CTA
  - دکمه معامله در صفحه دارایی مودال را باز می‌کند.

### Connection and fallback system

- [x] Move `connectionManager.js` into services
  - منیجر اتصال به لایه services منتقل شده است.
- [x] Move `fakePriceEngine.js` into services
  - موتور فیک هم به services منتقل شده است.
- [x] Add Binance → Nobitex → Fake fallback chain
  - زنجیره fallback بین منابع داده پیاده شده است.
- [x] Add connection status helpers and transitions
  - helperها و transitionهای وضعیت اتصال ساخته شده‌اند.
- [x] Add global connection badge in shared components
  - badge سراسری اتصال ساخته شده و در layout نمایش داده می‌شود.
- [x] Centralize live ticker handling in `connectionManager`
  - آپدیت زنده قیمت در یک handler مرکزی جمع شده است.
- [x] Add active live connection ownership inside `connectionManager`
  - مالکیت اتصال فعال به `connectionManager` منتقل شده است.
- [x] Add live connection cleanup on restart and page unload
  - cleanup اتصال زنده برای restart و unload اضافه شده است.

### UI quality baseline

- [x] Add dedicated empty state component for market/watchlist
  - empty state reusable ساخته شده است.
- [x] Extract coin badge colors into config
  - رنگ badge کوین‌ها به config منتقل شده است.
- [x] Make `CoinRow` use `coinBadgeColors`
  - row حالا از config رنگ استفاده می‌کند.
- [x] Add star/watchlist action in each coin row
  - دکمه ستاره برای واچ‌لیست داخل هر row وجود دارد.
- [x] Make coin row navigate to asset route
  - کلیک روی row کاربر را به صفحه دارایی می‌برد.

---

## Phase 1 — Core Stability and Architecture Hardening

### Store encapsulation

- [x] Add `getSearchQuery()`
  - خواندن search query از مسیر getter انجام می‌شود.
- [x] Add `getCoinSnapshot()`
  - برای read path نسخه امن‌تر از coin برمی‌گردد.
- [x] Add `getAllCoinsSnapshot()`
  - برای خواندن لیست coinها snapshot سطح اول برمی‌گردد.
- [x] Add `getHistorySnapshot()`
  - history به صورت امن‌تر برای render برمی‌گردد.
- [x] Make `getHistory()` return snapshot instead of raw array
  - مسیر عمومی history دیگر آرایه خام state را لو نمی‌دهد.
- [x] Make `getFilteredCoins()` use snapshot data
  - فیلتر مارکت روی snapshot انجام می‌شود.
- [x] Make `getWatchlistCoins()` use snapshot data
  - واچ‌لیست هم روی snapshot ساخته می‌شود.

### Read path cleanup

- [x] Replace direct search query state access in MarketPage
  - مارکت‌پیج دیگر مستقیم به `state.searchQuery` دست نمی‌زند.
- [x] Use getters for provider and last update in AssetPage
  - صفحه دارایی provider و lastUpdate را از getter می‌گیرد.
- [x] Use snapshot coin in asset render path
  - render صفحه دارایی از snapshot استفاده می‌کند.
- [x] Remove direct state coins read in fake engine
  - فیک‌انجین دیگر coins را مستقیم از state خام نمی‌گیرد.

### Live connection safety

- [x] Add `stopLiveConnection()` in `connectionManager`
  - stop مرکزی برای interval / socket / client اضافه شده است.
- [x] Stop previous live source before starting a new one
  - قبل از start جدید، منبع قبلی متوقف می‌شود.
- [x] Stop live source on browser unload
  - هنگام خروج از صفحه cleanup انجام می‌شود.

### Remaining cleanup in this phase

- [ ] Decide whether `activeProvider` should remain separate from `connectionStatus.provider`
  - باید تصمیم بگیریم provider اصلی از کجا خوانده شود تا duplication state کمتر شود.
- [ ] Add tests or debug assertions for snapshot-based read paths
  - بهتر است برای مسیرهای read ایمن، assertion یا تست داشته باشیم.

---

## Phase 2 — Component Structure and Reusability

### Shared UI building blocks

- [x] Create reusable `ConnectionBadge` component
  - badge اتصال کامپوننت مشترک شده است.
- [-] Create reusable stat card pattern
  - الگوی کارت اطلاعات در AssetPage شکل گرفته ولی هنوز shared component رسمی نشده است.
- [ ] Create reusable section heading component
  - heading سکشن‌ها هنوز پراکنده‌اند و باید کامپوننت مشترک بگیرند.
- [ ] Create reusable primary / secondary CTA button components
  - دکمه‌های اصلی و فرعی هنوز shared نشده‌اند.
- [ ] Create reusable tab or segmented control component
  - برای Home و Market و Login بعداً لازم می‌شود.
- [x] Create reusable surface/card wrappers for dark premium sections
  - wrapper مشترک برای glass / dark panels باید تعریف شود.

### DOM and selectors discipline

- [x] Create `APP_SELECTORS` constants module
  - بخشی از selectorهای سراسری جدا شده‌اند.
- [-] Expand selector constants beyond app shell and modal basics
  - هنوز همه selectorهای پرتکرار به constants منتقل نشده‌اند.
- [ ] Reduce manual string selectors inside pages and modal files
  - selectorهای خام هنوز در چند فایل زیاد هستند.

### Rendering purity

- [-] Keep page render functions pure where possible
  - بخش زیادی pure شده ولی event binding هنوز بعضی جاها کنار render است.
- [ ] Separate DOM mounting from render string generation consistently
  - باید این قرارداد در همه page/componentها یکدست شود.
- [ ] Separate view helpers from behavioral helpers in all modules
  - بعضی helperها هنوز ترکیبی از view و behavior هستند.

---

## Phase 3 — Pages, Routes, and Product Navigation

### Current routes

- [x] `#market`
  - صفحه مارکت فعال است.
- [x] `#watchlist`
  - صفحه واچ‌لیست فعال است.
- [x] `#asset/:symbol`
  - صفحه دارایی برای هر نماد فعال است.

### Next routes to add

- [x] Add `#home` as the new default route
  - صفحه اصلی جدید باید route پیش‌فرض شود.
- [x] Add `#login` route
  - صفحه لاگین باید به router اضافه شود.
- [ ] Update route fallback to point to `#home`
  - بعد از ساخت Home، fallback باید به home برود نه market.
- [x] Update navbar links to `Home / Market / Watchlist / Login`
  - نوبار نهایی باید با ساختار جدید هماهنگ شود.

### Navigation quality

- [x] Add active-nav visual state for current route
  - لینک فعال در نوبار باید مشخص باشد.
- [ ] Keep asset route hidden from navbar direct use unless needed
  - لینک مستقیم asset در نوبار احتمالاً بعداً باید حذف یا تغییر کند.
- [ ] Preserve route transitions cleanly when switching between product sections
  - جابه‌جایی بین routeها باید نرم و predictable بماند.

### Build Page Structure

- [x] Add `#home` route and mount `HomePage`
- [x] Add `#login` route and mount `LoginPage`
- [x] Change default route from `#market` to `#home`

---

## Phase 3.5 — Sanay Home / Landing Experience

### Product Shell & Core UX

- [x] Remove global connection badge from `MainLayout`
- [x] Add local connection badge to `MarketPage`
- [x] Create home page shell with 3 sections
- [x] Add home market preview shell
- [x] Add clickable preview coins linking to asset route
- [x] Split `HomePage` into section-level components
- [x] Create `HomeHeroSection`, `HomeFeaturesSection`, and `HomeMarketPreviewSection`
- [x] Move repeated home utility classes into `style.css`
- [x] Add reusable home surface / section / CTA utility classes
- [x] Add active navigation helper logic in `MainLayout`
- [x] Refresh navigation active state on route change
- [x] Fix local market badge render/import wiring

### Product direction from reference video

- [ ] Build **Sanay** as a premium dark landing experience
  - ظاهر خانه باید شبیه محصول premium و سینمایی باشد.
- [ ] Use a 3-section home structure
  - خانه دقیقاً سه سکشن اصلی خواهد داشت.
- [x] Make the home scroll section-based, not a long flat document
  - اسکرول باید section-driven و کنترل‌شده باشد.
- [x] Use soft snap behavior instead of aggressive scroll-jacking
  - اسکرول باید حرفه‌ای و نرم باشد، نه آزاردهنده.
    [-] Add GSAP + ScrollTrigger foundation for home sections
    [-] Add cleanup for home scroll triggers on route change

### Section 1 — Hero

- [x] Split hero into content and visual components
- [x] Create premium hero visual mock for Sanay
- [x] Localize hero copy and CTA text for Persian UI
- [x] Add reusable hero utility classes in style.css
- [x] Add hero trust strip and metric cards
- [x] Improve hero responsive visual behavior
- [ ] Create a cinematic hero section for Sanay
  - سکشن اول باید hero اصلی محصول باشد.
- [ ] Add brand lockup for **Sanay**
  - برند Sanay باید در hero هویت واضح داشته باشد.
- [ ] Add hero headline in Persian with premium typography
  - تیتر اصلی باید فارسی، قوی و هماهنگ با برند باشد.
- [ ] Add supporting subheadline with trust / speed / clarity angle
  - متن مکمل باید حس امنیت، سرعت و حرفه‌ای بودن بدهد.
- [ ] Add `Start Trading` primary CTA
  - CTA اصلی hero باید کاربر را به ورود به محصول یا شروع هدایت کند.
- [ ] Add `Explore Market` secondary CTA
  - CTA دوم باید کاربر را به مارکت ببرد.
- [ ] Add layered 3D-feel composition
  - ترکیب لایه‌ای برای حس سه‌بعدی لازم است.
- [ ] Add floating cards / coins / UI panels around hero focal point
  - کارت‌ها و المان‌های شناور باید اطراف مرکز توجه قرار بگیرند.
- [ ] Add subtle glow, blur, and parallax depth
  - glow و blur و اختلاف عمق باید حس premium بسازند.
- [ ] Add tiny mouse-responsive motion in hero
  - حرکت خیلی ریز وابسته به موس برای جان‌دادن به صحنه لازم است.
- [x] Add hero pin + scrub scroll animation
  - در اسکرول، hero باید کنترل‌شده و سینمایی رفتار کند.

### Section 2 — Features / Security / Trust

- [ ] Create a section focused on security, privacy, and reliability
  - سکشن دوم باید حس اعتماد محصول را بسازد.
- [ ] Add 4 premium feature cards
  - چهار کارت ویژگی اصلی در این بخش قرار بگیرد.
- [ ] Use cards for: Security / Privacy / Live Data / Watchlist or Portfolio
  - محتوای کارت‌ها بر این چهار محور باشد.
- [x] Add section reveal animation on scroll
  - ورود این سکشن باید انیمیشن کنترل‌شده داشته باشد.
- [ ] Add subtle metric strip or micro-summary above cards
  - یک نوار خلاصه‌ی کوچک بالای کارت‌ها حس محصولی بهتری می‌دهد.
- [ ] Use the same dark premium surface language as hero
  - طراحی این سکشن باید با hero یکپارچه باشد.

### Section 3 — Market Trends / Table / CTA

- [ ] Create a compact market showcase section
  - سکشن سوم باید vitrine بازار باشد، نه جایگزین market page.
- [ ] Show 4 selected coins only
  - فقط چهار کوین منتخب در هوم نمایش داده شوند.
- [ ] Add elegant mini trend line for each selected coin
  - برای هر کوین یک نمودار خطی کوچک و شیک نمایش داده شود.
- [ ] Make each selected coin clickable to `#asset/:symbol`
  - کلیک روی هر کوین باید به صفحه دارایی آن برود.
- [ ] Add CTA to open full market page
  - این بخش باید کاربر را به مارکت کامل هم ببرد.
- [ ] Animate section entry with controlled motion
  - ورود سکشن سوم هم باید انیمیشن نرم و تمیز داشته باشد.

### Home shell decisions

- [ ] Make `#home` the default first-time experience
  - تجربه اولیه کاربر باید از هوم شروع شود.
- [ ] Keep full market table in `#market` only
  - لیست کامل بازار باید فقط در market page بماند.
- [ ] Keep connection badge out of home unless intentionally added later
  - badge اتصال فعلاً مخصوص جاهایی باشد که لیست قیمت داریم، نه home.
- [ ] Keep home mostly storytelling + trust + selected market preview
  - هوم باید بیشتر محصول را معرفی کند تا این‌که شبیه dashboard کامل شود.

---

## Phase 4 — Market, Watchlist, and Asset Experience Polish

### Market page polish

- [ ] Add loading state / skeleton for market list
  - مارکت باید قبل از آماده‌شدن داده skeleton یا loading state داشته باشد.
- [ ] Add clear-search action
  - برای جستجو دکمه پاک‌کردن لازم است.
- [x] Add no-result state
  - حالت خالی برای نتیجه جستجو وجود دارد.
- [ ] Add sort options for market list
  - مرتب‌سازی بر اساس قیمت، تغییر، اسم و محبوبیت اضافه شود.
- [ ] Add selected row / active row visual state
  - row انتخاب‌شده یا hover باید polish بیشتری بگیرد.
- [ ] Add trade CTA in row if product direction confirms it
  - در صورت نیاز محصولی، دکمه معامله مستقیم داخل row اضافه شود.
- [ ] Make market page visual system match the new home design
  - UI مارکت باید در نهایت با هوم جدید یکپارچه شود.

### Watchlist polish

- [x] Add empty watchlist state
  - حالت خالی واچ‌لیست پیاده شده است.
- [ ] Add watchlist-specific actions or sorting
  - واچ‌لیست هم باید sorting یا quick actions داشته باشد.
- [ ] Add selected/watchlisted emphasis in card or row visuals
  - حالت starred باید از نظر بصری polishedتر شود.
- [ ] Consider watchlist counter in nav or header
  - نمایش تعداد موارد واچ‌لیست می‌تواند UX را بهتر کند.

### Asset page polish

- [x] Show provider, price, change, history, CTA, and description
  - صفحه دارایی اطلاعات اصلی را نشان می‌دهد.
- [ ] Make provider chip visually aligned with global design system
  - chip provider هنوز می‌تواند از نظر UI بهتر و هماهنگ‌تر شود.
- [ ] Improve last-update formatting consistency
  - فرمت زمان به‌روزرسانی باید یکدست و استاندارد شود.
- [ ] Add selected asset hero polish
  - بخش بالای صفحه دارایی باید premiumتر و compositionalتر شود.
- [ ] Add internal chart placeholder that matches future chart system
  - placeholder فعلی باید به زبان طراحی نهایی نزدیک‌تر شود.

### Shared badge and status system

- [x] Build reusable connection badge
  - badge مشترک ساخته شده است.
- [x] Refresh badge on connection transitions
  - با transitionها badge رفرش می‌شود.
- [ ] Decide final placement rules for provider status across app pages
  - باید دقیق مشخص شود badge کجاها نمایش داده شود و کجاها نه.
- [ ] Add optional inline status banner for degraded mode in market page
  - برای حالت degraded یک message inline در market هم مفید است.

### Visual consistency

- [ ] Choose final premium Persian font for Sanay
  - باید فونت نهایی برند انتخاب شود.
- [ ] Apply consistent spacing tokens and radius scale
  - spacing و radius باید سیستماتیک شوند.
- [ ] Align dark mode surfaces across layout, pages, cards, and modal
  - dark mode باید در کل محصول یک‌دست شود.
- [ ] Refine shadows, glass, blur, and highlight language
  - زبان سایه، blur و glow باید استاندارد و یکپارچه شود.

---

## Phase 5 — Authentication and Session UX

### Route and shell

- [ ] Add `#login` page
  - صفحه لاگین/ثبت‌نام باید اضافه شود.
- [ ] Decide whether login is a standalone page or split panel layout
  - باید فرم لاگین از نظر layout نهایی شود.

### Sign up first flow

- [ ] Make sign-up the default first tab
  - اولویت UI با ثبت‌نام باشد.
- [ ] Add sign-up form fields
  - فیلدهای ثبت‌نام باید تعریف شوند.
- [ ] Validate sign-up fields on client side
  - اعتبارسنجی سمت فرانت لازم است.
- [ ] Save created user in localStorage
  - کاربر ثبت‌نام‌شده فعلاً در localStorage ذخیره شود.

### Login flow

- [ ] Add login form fields
  - فرم لاگین شامل نام کاربری یا ایمیل و رمز عبور باشد.
- [ ] Validate login against localStorage users
  - بررسی ورود فعلاً با داده localStorage انجام شود.
- [ ] Add remember-me option
  - گزینه به‌خاطر سپردن ورود اضافه شود.
- [ ] Add forgot-password visual path
  - مسیر بازیابی رمز حداقل از نظر UI وجود داشته باشد.
- [ ] Add success redirect after login
  - بعد از ورود موفق باید redirect منطقی داشته باشیم.
- [ ] Persist session-like login state in localStorage
  - وضعیت ورود کاربر به صورت mock session ذخیره شود.
- [ ] Add logout action in navbar or account menu
  - خروج از حساب کاربری هم لازم است.

### Auth UX polish

- [ ] Add password visibility toggle
  - نمایش/مخفی‌کردن رمز عبور لازم است.
- [ ] Add inline validation and error messaging
  - خطاها باید داخل فرم و human-friendly نمایش داده شوند.
- [ ] Add polished empty / success / error states for auth
  - تجربه فرم باید کامل و حرفه‌ای باشد.

---

## Phase 6 — Exchange-like Data Experience (Without Real Trading)

### Chart system

- [ ] Build internal chart data model from local price history
  - باید از history داخلی برای ساخت نمودار استفاده کنیم.
- [ ] Decide chart library or custom SVG/canvas strategy
  - باید مشخص کنیم chart را با کتابخانه یا custom SVG می‌سازیم.
- [ ] Create mini trend lines for home selected coins
  - نمودارهای کوچک هوم باید ساخته شوند.
- [ ] Create full asset chart placeholder upgrade path
  - placeholder نمودار صفحه دارایی باید به chart واقعی وصل شود.
- [ ] Add chart timeframe controls (e.g. 1H / 1D / 1W / 1M)
  - بازه‌های زمانی برای نمودار لازم‌اند.
- [ ] Add chart tooltip and active point state
  - نمودار باید تعامل پایه داشته باشد.

### Exchange-like modules

- [ ] Add portfolio summary mock module
  - یک خلاصه دارایی mock برای حس صرافی واقعی لازم است.
- [ ] Add holdings / balances mock data layer
  - موجودی‌های کاربر به صورت mock ذخیره شوند.
- [ ] Add order history mock module
  - تاریخچه سفارش mock ساخته شود.
- [ ] Add favorite pairs / recent views module
  - pairs محبوب یا مشاهده‌های اخیر UX را بهتر می‌کند.
- [ ] Add notifications / market alerts mock shell
  - شل نوتیفیکیشن یا alertها هم باید در roadmap باشد.

### Trading scope rule

- [ ] Keep trade execution UI-only
  - UI معامله وجود دارد ولی اجرای واقعی سفارش انجام نمی‌شود.
- [ ] Do not connect order submission to a real backend
  - منطق معامله واقعی جزو این پروژه نیست.
- [ ] Make this rule explicit in architecture notes
  - این مرز باید در مستندات پروژه واضح بماند.

---

## Phase 7 — Clean Code, Modularization, and Senior-Level Refactor

### Naming consistency

- [ ] Standardize naming around `render*`, `mount*`, `refresh*`, `update*`
  - naming فانکشن‌ها باید در کل پروژه یک الگوی ثابت داشته باشد.
- [ ] Rename misleading APIs like `fetchTopCoins` if they are still mock-only
  - نام‌هایی که حس network واقعی می‌دهند ولی mock هستند باید بازبینی شوند.
- [ ] Standardize Persian vs English wording in visible UI labels
  - متن‌های UI باید از نظر زبان و tone یک‌دست شوند.

### State and data contracts

- [ ] Decide one source of truth for provider display
  - بین `activeProvider` و `connectionStatus.provider` باید source اصلی مشخص شود.
- [ ] Document raw access vs snapshot access rule
  - باید به‌وضوح مشخص شود کجا raw access مجاز است و کجا snapshot لازم است.
- [ ] Add safe getter policy for all read-heavy UI paths
  - مسیرهای read سنگین باید فقط از getterهای ایمن استفاده کنند.
- [ ] Review whether `getCoin()` should remain public raw access
  - باید درباره عمومی‌بودن `getCoin()` تصمیم آگاهانه بگیریم.

### DOM strategy

- [ ] Reduce direct `document.getElementById` calls where a component refresh can replace them
  - باید تصمیم بگیریم کجا imperative DOM مجاز است و کجا rerender بهتر است.
- [ ] Reduce repeated selector strings
  - selectorهای پرتکرار باید centralize شوند.
- [ ] Review `innerHTML`, `dataset`, and `classList` usage for consistency
  - استفاده از DOM APIs باید rule مشخص داشته باشد.

### Files and module boundaries

- [ ] Keep APIs responsible only for transport and parsing
  - فایل‌های API فقط باید transport و parse را بشناسند.
- [ ] Keep services responsible for orchestration and lifecycle
  - orchestration باید در services بماند.
- [ ] Keep store responsible for state shape, persistence, and safe access
  - استور باید مرجع state و persistence باقی بماند.
- [ ] Keep components focused on UI assembly and small interactions
  - کامپوننت‌ها نباید business logic سنگین بگیرند.
- [ ] Keep pages focused on page composition and page-level wiring
  - pageها باید composition و wiring سطح صفحه را نگه دارند.

### Documentation tasks

- [ ] Document render flow from store to UI
  - مسیر رندر از استور تا UI باید مستند شود.
- [ ] Document live update flow from websocket/fake engine to DOM
  - جریان آپدیت زنده باید مستند شود.
- [ ] Document router flow from hash to mounted page
  - جریان route باید مستند شود.
- [ ] Document watchlist flow from row click to store to rerender
  - جریان واچ‌لیست باید مستند شود.
- [ ] Document asset-to-modal flow
  - مسیر بازشدن مودال از صفحه دارایی باید مستند شود.
- [ ] Document active live connection ownership and cleanup
  - منطق مالکیت و cleanup اتصال باید ثبت شود.
- [ ] Create architecture notes section inside project docs
  - یک بخش رسمی برای معماری پروژه لازم است.

### Comment policy

- [ ] Remove temporary or noisy comments
  - کامنت‌های موقتی و شلوغ باید پاک شوند.
- [ ] Keep comments only for non-obvious logic
  - فقط منطق‌هایی که از اسم و ساختار معلوم نیستند باید comment داشته باشند.
- [ ] Prefer better naming over explanatory comments
  - تا جای ممکن نام‌گذاری جای کامنت را بگیرد.

---

## Library Decisions

### Animation and scroll stack

- [ ] Use Tailwind as the primary styling system
  - Tailwind پایه اصلی استایل سیستم باقی می‌ماند.
- [ ] Use GSAP + ScrollTrigger for the home scroll orchestration
  - برای اسکرول سکشن‌محور و cinematic از GSAP استفاده می‌کنیم.
- [ ] Use Motion only for micro-interactions if needed
  - Motion فقط برای micro-animation و تعامل‌های کوچک استفاده شود.
- [ ] Evaluate Lenis only if native scroll + GSAP feels insufficient
  - Lenis فقط اگر واقعاً لازم شد برای نرمی اسکرول وارد شود.
- [ ] Keep Spline as an optional later upgrade for hero-only 3D
  - Spline فعلاً اختیاری و فقط برای ارتقای hero در آینده باشد.

### Chart stack

- [ ] Decide between custom SVG lines and a lightweight chart library
  - برای نمودار باید تصمیم فنی نهایی گرفته شود.
- [ ] Prefer a solution that matches Sanay design language and remains maintainable
  - انتخاب chart باید هم زیبا باشد هم maintainable.

---

## Quality Gates Before Marking the Project "Complete"

### Product completeness

- [ ] Home is polished and visually aligned with the reference direction
  - هوم باید به کیفیت بصری مرجع نزدیک شود.
- [ ] Market page feels consistent with Home and Asset page
  - بازار باید از نظر طراحی با home و asset هماهنگ باشد.
- [ ] Asset page contains a working internal chart system or a high-quality chart fallback
  - صفحه دارایی باید از نظر chart یا نسخه واقعی داشته باشد یا placeholder بسیار حرفه‌ای.
- [ ] Login / signup flow is complete as a local-auth mock experience
  - تجربه لاگین و ثبت‌نام باید کامل و polished باشد.

### Technical completeness

- [ ] No raw state leaks in UI read paths without explicit intent
  - مسیرهای read نباید به‌صورت ناخواسته state خام بگیرند.
- [ ] No duplicate connection ownership or fallback ambiguity
  - مالکیت اتصال و fallbackها باید شفاف و یکتا باشند.
- [ ] No repeated import-name mismatches or stale file names
  - mismatchهای نام و import نباید باقی بمانند.
- [ ] TODO is fully synchronized with actual project state
  - این فایل باید همیشه با وضعیت واقعی پروژه هماهنگ بماند.

---

## Senior Working Rules for Anyone Touching This Project

### 1. Respect the layering

- Pages compose pages.
- Components render UI.
- Store owns state.
- Services own orchestration.
- API files only fetch/parse/stream data.
  - هر لایه باید فقط مسئولیت خودش را نگه دارد و وارد کار لایه دیگر نشود.

### 2. Never leak raw store state into read-heavy UI by accident

- Prefer snapshot getters in render paths.
- Use raw getters only with explicit intent.
  - در مسیرهای render و read از getterهای امن استفاده شود.

### 3. Keep live updates centralized

- Real-time updates must flow through a shared handler.
- Do not let every provider update the DOM separately.
  - آپدیت زنده باید از یک مسیر مرکزی عبور کند.

### 4. Separate transport from product behavior

- Binance / Nobitex / Fake should emit events.
- `connectionManager` should decide what to do next.
  - providerها فقط داده بدهند، تصمیم‌گیری با سرویس مرکزی باشد.

### 5. Build reusable UI intentionally

- If the same visual block appears 2+ times, consider extracting it.
- But do not extract too early without a clear pattern.
  - استخراج کامپوننت باید آگاهانه باشد، نه زودهنگام و بی‌هدف.

### 6. Keep Persian UI clean and premium

- Use one consistent Persian voice.
- Avoid random English labels unless they are product terms.
  - زبان رابط باید یک‌دست و باکلاس بماند.

### 7. Prefer composition over giant files

- Split helpers, renderers, and state logic early when a file starts mixing concerns.
  - هر وقت فایل چند مسئولیت گرفت، باید شکسته شود.

### 8. Every new feature must answer these questions first

- Which layer owns it?
- Which file should render it?
- Which file should store it?
- Does it need a shared component?
- Does it need a route?
  - قبل از کدنویسی باید مالکیت و مرز هر فیچر مشخص شود.

### 9. Animation must serve hierarchy, not noise

- Hero animation should guide attention.
- Scroll effects should support section storytelling.
- Avoid flashy motion that reduces clarity.
  - انیمیشن باید به فهم محصول کمک کند، نه این‌که شلوغی بسازد.

### 10. Do not mark tasks done unless all of these are true

- UI is present
- Behavior works
- Naming is clean
- Imports are clean
- Mobile state is acceptable
- The TODO is updated
  - تیک زدن تسک فقط وقتی مجاز است که هم UI، هم رفتار، هم تمیزی کد، هم TODO باهم به‌روز شده باشند.

---

## Immediate Next Focus

### Recommended next build order

1. Build the new `#home` route and page shell
   - اول هوم جدید را بساز.
2. Implement Section 1 hero with premium dark layout and controlled scroll animation
   - بعد hero را با انیمیشن اصلی پیاده کن.
3. Implement Section 2 feature cards and trust section
   - بعد بخش اعتماد و فیچرها.
4. Implement Section 3 selected market showcase with 4 coins + mini lines
   - بعد بخش market preview.
5. Align navbar and routing with the new product structure
   - بعد نوبار و routeها را یکپارچه کن.
6. Start login/signup mock flow
   - بعد سراغ لاگین و ثبت‌نام برو.
7. Return to market/asset polish to match the new Sanay visual system
   - بعد مارکت و asset را با طراحی جدید هماهنگ کن.
