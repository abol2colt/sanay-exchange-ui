import $ from "jquery";
import { exchangeStore } from "../../store/exchangeStore.js";
import { formatPrice, getChangeMeta } from "../../utils/priceHelpers.js";

const HOME_PREVIEW_SYMBOLS = ["btc", "eth", "sol", "ton"];
export const renderHomePage = () => {
  return `
    <section id="home-page" class="space-y-0">
      <section
        id="home-hero-section"
        class="min-h-[100svh] flex items-center justify-center px-6 py-20"
      >
        <div class="w-full max-w-7xl mx-auto">
          <div class="max-w-3xl space-y-6">
            <span class="inline-flex px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold">
              Sanay Exchange
            </span>

            <h1 class="text-5xl md:text-7xl font-black leading-tight">
              آینده معامله را
              <br />
              حرفه‌ای تجربه کن
            </h1>

            <p class="text-base md:text-lg text-gray-400 leading-8 max-w-2xl">
              خرید، رصد بازار، واچ‌لیست و بررسی دارایی‌ها در یک تجربه مدرن و سریع.
            </p>

            <div class="flex flex-wrap gap-4 pt-4">
              <a
                href="#login"
                class="px-6 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black transition-all"
              >
                Start Trading
              </a>

              <a
                href="#market"
                class="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold transition-all"
              >
                Explore Market
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="home-features-section"
        class="min-h-[100svh] flex items-center px-6 py-20"
      >
        <div class="w-full max-w-7xl mx-auto">
          <div class="space-y-4 mb-10">
            <h2 class="text-4xl md:text-5xl font-black">امنیت، اعتماد، سرعت</h2>
            <p class="text-gray-400 max-w-2xl leading-8">
              این بخش بعداً با کارت‌های feature و انیمیشن‌های اسکرول کامل می‌شود.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 min-h-[220px]">Security</div>
            <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 min-h-[220px]">Privacy</div>
            <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 min-h-[220px]">Realtime Data</div>
            <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 min-h-[220px]">Watchlist</div>
          </div>
        </div>
      </section>

      <section
      id="home-market-preview-section"
      class="min-h-[100svh] flex items-center px-6 py-20"
      >
      <div class="w-full max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div class="space-y-4">
            <h2 class="text-4xl md:text-5xl font-black">روند بازار</h2>
            <p class="text-gray-400 max-w-2xl leading-8">
              چهار دارایی منتخب را سریع بررسی کن و برای دیدن جزئیات کامل وارد صفحه هر ارز شو.
            </p>
          </div>

          <a
            href="#market"
            class="inline-flex px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold transition-all"
          >
            مشاهده بازار کامل
          </a>
        </div>

        ${renderMarketPreviewGrid()}
      </div>
     </section>

    </section>
  `;
};

const renderMiniSparkline = () => {
  return `
    <svg viewBox="0 0 100 40" class="w-full h-16 opacity-80">
      <path
        d="M0 28 C10 18, 20 14, 30 18 C40 22, 50 8, 60 12 C70 16, 80 6, 100 10"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
      />
    </svg>
  `;
};
const renderPreviewCoinCard = (coin) => {
  const changeMeta = getChangeMeta(coin.change24h || 0);

  return `
    <a
      href="#asset/${coin.symbol}"
      class="group rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/10 transition-all p-5 block"
    >
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-black">${coin.name}</h3>
          <p class="text-xs uppercase text-gray-400">${coin.symbol}</p>
        </div>

        <div class="w-10 h-10 rounded-full bg-yellow-500 text-black font-black flex items-center justify-center shadow-lg">
          ${String(coin.symbol || "").toUpperCase()[0] || "?"}
        </div>
      </div>

      <div class="mb-4">
        <div class="text-2xl font-black">$${formatPrice(coin.price)}</div>
        <div class="text-sm font-bold ${changeMeta.className}">
          ${changeMeta.markup}
        </div>
      </div>

      <div class="text-yellow-500">
        ${renderMiniSparkline()}
      </div>
    </a>
  `;
};

const renderMarketPreviewGrid = () => {
  const coins = HOME_PREVIEW_SYMBOLS.map((symbol) =>
    exchangeStore.getCoinSnapshot(symbol),
  ).filter(Boolean);

  if (!coins.length) {
    return `
      <div class="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center text-gray-400">
        داده‌ی بازار هنوز لود نشده است.
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      ${coins.map(renderPreviewCoinCard).join("")}
    </div>
  `;
};

export const mountHomePage = () => {
  $("#page-root").html(renderHomePage());
};
