import $ from "jquery";
import { exchangeStore } from "../../store/exchangeStore.js";
import {
  formatPrice,
  normalizeSymbol,
  safeParse,
} from "../../utils/priceHelpers.js";
import {
  getCoinDescription,
  PRICE_CLASS_POOL,
  PRICE_DOWN_CLASSES,
  PRICE_NEUTRAL_CLASSES,
  PRICE_UP_CLASSES,
} from "./tradeModalHelpers.js";
import {
  createHistoryItem,
  renderLiveHistoryList,
  renderTradeJournal,
} from "./tradeModalHistory.js";

const MODAL_NS = ".tradeModal";

const renderTradeForm = (coin) => {
  const symbol = String(coin.symbol || "").toUpperCase();

  return `
    <div class="space-y-4">
      <div class="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5">
        <span class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Last Price</span>
        <div id="modal-main-price" class="text-gray-900 dark:text-white text-4xl font-black mt-2 tracking-tight">
          $${formatPrice(coin.price)}
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button type="button" class="py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all">
          BUY
        </button>
        <button type="button" class="py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all">
          SELL
        </button>
      </div>

      <div class="space-y-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5">
        <label class="block">
          <span class="text-xs text-gray-500 dark:text-gray-400 font-bold">قیمت</span>
          <input
            id="trade-price-input"
            type="number"
            step="any"
            value="${Number(coin.price) || 0}"
            class="mt-2 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 px-4 py-3 text-gray-900 dark:text-white outline-none"
          />
        </label>

        <label class="block">
          <span class="text-xs text-gray-500 dark:text-gray-400 font-bold">مقدار (${symbol})</span>
          <input
            id="trade-amount-input"
            type="number"
            step="any"
            placeholder="مثلاً 0.25"
            class="mt-2 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 px-4 py-3 text-gray-900 dark:text-white outline-none"
          />
        </label>

        <div class="rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 p-4 flex items-center justify-between">
          <span class="text-sm text-gray-500 dark:text-gray-400">ارزش تقریبی سفارش</span>
          <strong id="trade-total-value" class="text-lg text-gray-900 dark:text-white">$0.00</strong>
        </div>

        <button
          type="button"
          id="trade-submit-button"
          class="w-full py-4 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-black transition-all"
        >
          ثبت سفارش
        </button>
      </div>
    </div>
  `;
};

export const renderTradingModal = (coin) => {
  const symbol = normalizeSymbol(coin.symbol);
  const historyData = exchangeStore.getHistory(symbol) || [];

  return `
    <div id="modal-overlay" data-coin-id="${symbol}" class="fixed inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-[2.5rem] w-full max-w-7xl h-[88vh] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div class="h-full grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr]">
          <div class="p-6 border-l border-gray-200 dark:border-white/5 flex flex-col gap-5 min-h-0">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-black text-xl font-black shadow-lg">
                  ${String(coin.symbol || "").toUpperCase()[0] || "?"}
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-black dark:text-white">${coin.name}</h2>
                  <p class="text-[11px] text-gray-500 font-mono tracking-widest">${String(coin.symbol || "").toUpperCase()} / USDT</p>
                </div>
              </div>

              <button
                id="close-modal"
                class="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-red-500 hover:text-white text-gray-700 dark:text-gray-300 transition-all text-xl flex items-center justify-center"
              >
                &times;
              </button>
            </div>

            <div class="rounded-[2rem] border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 p-5 h-[42%] min-h-[260px]">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-gray-900 dark:text-white">نمای کلی بازار</h3>
                <span class="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                  اینترنت محدود است
                </span>
              </div>

              <div class="w-full h-[calc(100%-2rem)] rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/10 flex flex-col items-center justify-center text-center p-6">
                <span class="text-4xl mb-4">📊</span>
                <h4 class="text-gray-900 dark:text-white font-bold mb-2">چارت فعلاً در دسترس نیست</h4>
                <p class="text-gray-500 dark:text-gray-400 text-sm">
                  به دلیل محدودیت‌های اعمال شده، چارت بارگذاری نمی‌شود.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1 min-h-0">
              <div class="rounded-[2rem] border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5 min-h-0 overflow-y-auto">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-bold text-gray-900 dark:text-white">Live History</h4>
                  <span class="text-xs text-gray-500 dark:text-gray-400">آخرین تغییرات</span>
                </div>
                <ul id="price-history-list" class="space-y-1">
                  ${renderLiveHistoryList(historyData)}
                </ul>
              </div>

              <div class="rounded-[2rem] border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5 min-h-0 overflow-y-auto">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-bold text-gray-900 dark:text-white">تاریخچه معاملات</h4>
                  <span class="text-xs text-gray-500 dark:text-gray-400">نمونه نمایشی</span>
                </div>
                ${renderTradeJournal()}
              </div>
            </div>
          </div>

          <div class="p-6 bg-gray-50 dark:bg-[#0f172a] flex flex-col gap-5 min-h-0 overflow-y-auto">
            ${renderTradeForm(coin)}

            <div class="rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-5">
              <h4 class="text-[11px] font-bold text-yellow-600 dark:text-yellow-500 border-r-2 border-yellow-500 pr-2 mb-3">
                Asset Info
              </h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-7 text-justify">
                ${getCoinDescription(symbol)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

const syncTradeTotal = () => {
  const price = Number($("#trade-price-input").val()) || 0;
  const amount = Number($("#trade-amount-input").val()) || 0;
  const total = price * amount;

  $("#trade-total-value").text(`$${formatPrice(total)}`);
};

const closeTradeModal = () => {
  $("#modal-overlay").remove();
  $(document).off(MODAL_NS);
};

const bindTradingModalEvents = () => {
  $(document)
    .off(`click${MODAL_NS}`, "#close-modal")
    .on(`click${MODAL_NS}`, "#close-modal", (event) => {
      event.preventDefault();
      closeTradeModal();
    });

  $(document)
    .off(`click${MODAL_NS}`, "#modal-overlay")
    .on(`click${MODAL_NS}`, "#modal-overlay", (event) => {
      if (event.target === event.currentTarget) {
        closeTradeModal();
      }
    });

  $(document)
    .off(`input${MODAL_NS}`, "#trade-price-input, #trade-amount-input")
    .on(`input${MODAL_NS}`, "#trade-price-input, #trade-amount-input", () => {
      syncTradeTotal();
    });
};

export const openTradeModal = (coin) => {
  closeTradeModal();
  $("body").append(renderTradingModal(coin));
  bindTradingModalEvents();
  syncTradeTotal();
};

export const updateTradingModalLive = (symbol, newPrice) => {
  const normalizedSymbol = normalizeSymbol(symbol);
  const $overlay = $("#modal-overlay");
  const openedCoinId = $overlay.attr("data-coin-id");

  if (!$overlay.length || openedCoinId !== normalizedSymbol) {
    return;
  }

  const $priceMain = $("#modal-main-price");
  const $historyList = $("#price-history-list");
  const $priceInput = $("#trade-price-input");

  if (!$priceMain.length || !$historyList.length) {
    return;
  }

  const oldPrice = safeParse($priceMain.text());
  const isUp = Number(newPrice) >= oldPrice;
  const isdown = Number(newPrice) < oldPrice;

  $priceMain.text(`$${formatPrice(newPrice)}`);
  $priceMain
    .removeClass(PRICE_CLASS_POOL.join(" "))
    .addClass(
      isUp
        ? PRICE_UP_CLASSES
        : isdown
          ? PRICE_DOWN_CLASSES
          : PRICE_NEUTRAL_CLASSES,
    );

  if ($priceInput.length) {
    const currentValue = Number($priceInput.val()) || 0;
    if (!currentValue || currentValue === oldPrice) {
      $priceInput.val(Number(newPrice) || 0);
    }
  }

  const now = new Date().toLocaleTimeString("en-US", { hour12: false });

  $historyList.find("li.text-center").remove();
  $historyList.prepend(createHistoryItem({ time: now, price: newPrice }, isUp));

  if ($historyList.find("li").length > 15) {
    $historyList.find("li:last").remove();
  }

  syncTradeTotal();
};
