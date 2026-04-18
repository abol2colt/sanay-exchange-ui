import { exchangeStore } from "../../store/exchangeStore.js";
import { formatPrice, getChangeMeta } from "../../utils/priceHelpers.js";

const HOME_PREVIEW_SYMBOLS = ["btc", "eth", "sol", "ton"];

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
      class="group home-preview-card home-preview-card-premium"
      >
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
      <div class="home-surface-card p-8 text-center text-gray-400">
        داده‌ی بازار هنوز لود نشده است.
      </div>
    `;
  }

  return `
    <div class="home-preview-grid">
      ${coins.map(renderPreviewCoinCard).join("")}
    </div>
  `;
};

export const renderHomeMarketPreviewSection = () => {
  return `
    <section
      id="home-market-preview-section"
      class="home-section-shell"
    >
      <div class="home-section-container">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div class="home-section-copy">
           <h2 class="home-section-title">مرور سریع بازار</h2>
           <p class="home-section-text">
           چهار دارایی منتخب را در یک نگاه ببین، تغییراتشان را مرور کن و برای مشاهده جزئیات کامل وارد صفحه هر ارز شو.
          </p>
          </div>

          <a
            href="#market"
            class="home-cta-secondary"
          >
            مشاهده بازار 
          </a>
        </div>

        ${renderMarketPreviewGrid()}
      </div>
    </section>
  `;
};
