import $ from "jquery";
import { exchangeStore } from "../../store/exchangeStore.js";
import {
  formatPrice,
  normalizeSymbol,
  safeParse,
} from "../../utils/priceHelpers.js";

const PRICE_UP_CLASSES = "text-green-500 dark:text-green-400";
const PRICE_DOWN_CLASSES = "text-red-500 dark:text-red-400";
const PRICE_CLASS_POOL = [
  ...PRICE_UP_CLASSES.split(" "),
  ...PRICE_DOWN_CLASSES.split(" "),
];

const createHistoryLi = (item, isUp) => {
  const colorClass = isUp ? PRICE_UP_CLASSES : PRICE_DOWN_CLASSES;

  return `
    <li class="flex justify-between text-[11px] text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-white/5 py-2 animate-in fade-in slide-in-from-top-1">
      <span>${item.time}</span>
      <span class="${colorClass} font-mono font-bold">$${formatPrice(item.price)}</span>
    </li>
  `;
};

export const updateModalLive = (symbol, newPrice) => {
  const normalizedSymbol = normalizeSymbol(symbol);
  const $overlay = $("#modal-overlay");
  const openedCoinId = $overlay.attr("data-coin-id");

  if (!$overlay.length || openedCoinId !== normalizedSymbol) {
    return;
  }

  const $priceMain = $("#modal-main-price");
  const $historyList = $("#price-history-list");

  if (!$priceMain.length || !$historyList.length) {
    return;
  }

  const oldPrice = safeParse($priceMain.text());
  const isUp = Number(newPrice) >= oldPrice;

  $priceMain.text(`$${formatPrice(newPrice)}`);
  $priceMain
    .removeClass(PRICE_CLASS_POOL.join(" "))
    .addClass(isUp ? PRICE_UP_CLASSES : PRICE_DOWN_CLASSES);

  const now = new Date().toLocaleTimeString("en-US", { hour12: false });

  $historyList.find("li.text-center").remove();
  $historyList.prepend(createHistoryLi({ time: now, price: newPrice }, isUp));

  if ($historyList.find("li").length > 15) {
    $historyList.find("li:last").remove();
  }
};

export const openTradeModal = (coin) => {
  const symbol = normalizeSymbol(coin.symbol);
  $("#modal-overlay").remove();

  const descriptions = {
    btc: "پادشاه ارزهای دیجیتال و اولین دارایی غیرمتمرکز جهان.",
    eth: "بزرگترین پلتفرم قراردادهای هوشمند و زیربنای دنیای جدید وب ۳.",
    bnb: "ارز کاربردی اکوسیستم بایننس با کاربردهای گسترده در شبکه.",
  };

  const description =
    descriptions[symbol] || "اطلاعات تکمیلی در حال به‌روزرسانی است.";

  const historyData = exchangeStore.getHistory(symbol) || [];
  const historyHtml = historyData
    .map((item, index, history) => {
      const previousPrice = history[index + 1]?.price || item.price;
      return createHistoryLi(item, item.price >= previousPrice);
    })
    .join("");

  const html = `
    <div id="modal-overlay" data-coin-id="${symbol}" class="fixed inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-[2.5rem] w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div class="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-black text-xl font-black shadow-lg">
              ${String(coin.symbol || "").toUpperCase()[0] || "?"}
            </div>
            <div>
              <h2 class="text-xl font-bold text-black dark:text-white">${coin.name}</h2>
              <p class="text-[10px] text-gray-500 font-mono tracking-widest">${String(coin.symbol || "").toUpperCase()} / USDT</p>
            </div>
          </div>
          <button id="close-modal" class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-red-500 hover:text-white text-gray-700 dark:text-gray-300 transition-all text-xl flex items-center justify-center">&times;</button>
        </div>

        <div class="flex-[3] p-5 bg-gray-50 dark:bg-black/20 border-l border-gray-200 dark:border-white/5">
          <div class="w-full h-full rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/10 flex flex-col items-center justify-center text-center p-6">
            <span class="text-4xl mb-4">📊</span>
            <h4 class="text-gray-900 dark:text-white font-bold mb-2">نمودار غیرفعال است</h4>
            <p class="text-gray-500 dark:text-gray-400 text-sm">به دلیل محدودیت‌های اعمال شده، چارت بارگذاری نمی‌شود.</p>
          </div>
        </div>

        <div class="flex-[1.5] p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          <div class="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700">
            <span class="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tighter">Last Price</span>
            <div id="modal-main-price" class="text-black dark:text-white text-4xl font-black mt-1 tracking-tighter transition-all">
              $${formatPrice(coin.price)}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button class="py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl active:scale-95 transition-all text-sm shadow-sm">BUY</button>
            <button class="py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl active:scale-95 transition-all text-sm shadow-sm">SELL</button>
          </div>

          <div class="space-y-3">
            <h4 class="text-[11px] font-bold text-yellow-600 dark:text-yellow-500 border-r-2 border-yellow-500 pr-2">Asset Info</h4>
            <p class="text-gray-600 dark:text-gray-400 text-xs leading-6 text-justify">${description}</p>
          </div>

          <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
            <h4 class="text-[10px] text-gray-500 font-bold uppercase mb-3">Live History</h4>
            <ul id="price-history-list" class="space-y-1">
              ${historyHtml || '<li class="text-center text-[10px] text-gray-500 py-4">Waiting for data...</li>'}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  $("body").append(html);
};
