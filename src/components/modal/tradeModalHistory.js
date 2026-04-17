import { formatPrice } from "../../utils/priceHelpers.js";
import { PRICE_DOWN_CLASSES, PRICE_UP_CLASSES } from "./tradeModalHelpers.js";

export const createHistoryItem = (item, isUp) => {
  const colorClass = isUp ? PRICE_UP_CLASSES : PRICE_DOWN_CLASSES;

  return `
    <li class="flex justify-between text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-white/5 py-2">
      <span>${item.time}</span>
      <span class="${colorClass} font-mono font-bold">$${formatPrice(item.price)}</span>
    </li>
  `;
};

export const renderLiveHistoryList = (historyData = []) => {
  const html = historyData
    .map((item, index, history) => {
      const previousPrice = history[index + 1]?.price || item.price;
      return createHistoryItem(item, item.price >= previousPrice);
    })
    .join("");

  return (
    html ||
    '<li class="text-center text-xs text-gray-500 py-4">Waiting for data...</li>'
  );
};

export const renderTradeJournal = () => {
  return `
    <div class="space-y-3">
      <div class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-black text-green-500">BUY</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">امروز 12:20</span>
        </div>
        <p class="text-sm text-gray-700 dark:text-gray-200">خرید 0.24 BTC در قیمت 64,280$</p>
        <p class="text-xs text-green-500 mt-2">سود فعلی: +184$</p>
      </div>

      <div class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-black text-red-500">SELL</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">دیروز 17:40</span>
        </div>
        <p class="text-sm text-gray-700 dark:text-gray-200">فروش 0.10 BTC در قیمت 66,050$</p>
        <p class="text-xs text-green-500 mt-2">سود نهایی: +96$</p>
      </div>
    </div>
  `;
};
