import { exchangeStore } from "../../store/exchangeStore.js";
import {
  formatPrice,
  getChangeMeta,
  normalizeSymbol,
} from "../../utils/priceHelpers.js";
import { getCoinBadgeColor } from "../../config/coinBadgeColors.js";

export const CoinRow = (coin = {}) => {
  const symbol = normalizeSymbol(coin.symbol);
  const displaySymbol = String(coin.symbol || "").toUpperCase();
  const displayName = coin.name || displaySymbol || "Unknown Coin";
  const initial = displaySymbol[0] || "?";
  const price = Number(coin.price) || 0;
  const change24h = Number(coin.change24h) || 0;
  const { className, markup } = getChangeMeta(change24h);
  const isStarred = exchangeStore.isInWatchlist(symbol);

  return `
    <div
      class="coin-row bg-white dark:bg-transparent flex items-center justify-between gap-4 p-4 hover:bg-gray-100 dark:hover:bg-white/5 transition-all cursor-pointer border-b border-gray-200 dark:border-white/5"
      data-symbol="${symbol}"
    >
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <button
          type="button"
          data-action="toggle-watchlist"
          data-symbol="${symbol}"
          data-prevent-row-click="true"
          class="w-10 h-10 shrink-0 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-all text-xl"
          title="افزودن به واچ‌لیست"
        >
          <span class="${isStarred ? "text-yellow-500" : "text-gray-400"}">
            ${isStarred ? "★" : "☆"}
          </span>
        </button>

        <div class="w-10 h-10 rounded-full ${getCoinBadgeColor(symbol)} flex items-center justify-center text-white font-bold shadow-sm shrink-0">
          ${initial}
        </div>

        <div class="min-w-0">
          <h3 class="font-bold text-gray-900 dark:text-white transition-colors truncate">
            ${displayName}
          </h3>
          <span class="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-medium">
            ${displaySymbol}
          </span>
        </div>
      </div>

      <div class="text-right shrink-0">
        <div
          id="price-${symbol}"
          data-price="${price}"
          class="text-lg font-mono font-semibold text-gray-900 dark:text-white transition-colors"
        >
          $${formatPrice(price)}
        </div>

        <div
          id="change-${symbol}"
          data-change="${change24h}"
          class="flex items-center justify-end gap-1 text-xs font-bold ${className}"
        >
          ${markup}
        </div>
      </div>
    </div>
  `;
};
