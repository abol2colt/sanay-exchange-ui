import {
  formatPrice,
  getChangeMeta,
  normalizeSymbol,
} from "../../utils/priceHelpers.js";

const COIN_BADGE_COLORS = {
  btc: "bg-orange-500",
  eth: "bg-blue-500",
  bnb: "bg-yellow-500",
  sol: "bg-purple-500",
  ada: "bg-blue-700",
  doge: "bg-yellow-600",
};

const getCoinBadgeColor = (symbol) =>
  COIN_BADGE_COLORS[symbol] || "bg-gray-600";

export const CoinRow = (coin = {}) => {
  const symbol = normalizeSymbol(coin.symbol);
  const displaySymbol = String(coin.symbol || "").toUpperCase();
  const displayName = coin.name || displaySymbol || "Unknown Coin";
  const initial = displaySymbol[0] || "?";
  const price = Number(coin.price) || 0;
  const change24h = Number(coin.change24h) || 0;
  const { className, markup } = getChangeMeta(change24h);

  return `
    <div class="coin-row bg-white dark:bg-transparent flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-white/5 transition-all cursor-pointer border-b border-gray-200 dark:border-white/5" data-symbol="${symbol}">
      <div class="flex items-center gap-4 flex-1">
        <div class="w-10 h-10 rounded-full ${getCoinBadgeColor(symbol)} flex items-center justify-center text-white font-bold shadow-sm">
          ${initial}
        </div>

        <div>
          <h3 class="font-bold text-gray-900 dark:text-white transition-colors">${displayName}</h3>
          <span class="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-medium">${displaySymbol}</span>
        </div>
      </div>

      <div class="text-right">
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
