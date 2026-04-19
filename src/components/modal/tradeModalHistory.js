import { formatPrice } from "../../utils/priceHelpers.js";
import { PRICE_DOWN_CLASSES, PRICE_UP_CLASSES } from "./tradeModalHelpers.js";

export const createHistoryItem = (item, isUp) => {
  const colorClass = isUp ? PRICE_UP_CLASSES : PRICE_DOWN_CLASSES;

  return `
    <li class="flex items-center justify-between py-3 border-b border-white/5 text-sm last:border-b-0">
      <span class="text-gray-400">${item.time}</span>
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
    '<li class="text-center text-sm text-gray-500 py-6">هنوز داده زنده‌ای ثبت نشده است.</li>'
  );
};

export const renderTradeJournal = () => {
  return `
    <div class="space-y-3">
      <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-black text-green-400">خرید</span>
          <span class="text-xs text-gray-400">امروز 12:20</span>
        </div>
        <p class="text-sm text-gray-200">خرید 0.24 BTC در قیمت 64,280$</p>
        <p class="text-xs text-green-400 mt-2">سود فعلی: +184$</p>
      </div>

      <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-black text-red-400">فروش</span>
          <span class="text-xs text-gray-400">دیروز 17:40</span>
        </div>
        <p class="text-sm text-gray-200">فروش 0.10 BTC در قیمت 66,050$</p>
        <p class="text-xs text-green-400 mt-2">سود نهایی: +96$</p>
      </div>
    </div>
  `;
};
