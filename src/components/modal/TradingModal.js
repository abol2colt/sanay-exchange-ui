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
      <div class="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold tracking-[0.16em] text-gray-400">قیمت لحظه‌ای</span>
          <span class="text-[11px] px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400">نمایشی</span>
        </div>

        <div
          id="modal-main-price"
          class="text-white text-4xl md:text-5xl font-black tracking-tight"
        >
          $${formatPrice(coin.price)}
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button
          type="button"
          class="py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-black transition-all"
        >
          خرید
        </button>

        <button
          type="button"
          class="py-4 rounded-2xl border border-white/10 bg-red-500/10 hover:bg-red-500/20 text-red-300 font-black transition-all"
        >
          فروش
        </button>
      </div>

      <div class="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-5">
        <label class="block">
          <span class="text-xs text-gray-400 font-bold">قیمت</span>
          <input
            id="trade-price-input"
            type="number"
            step="any"
            value="${Number(coin.price) || 0}"
            class="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none"
          />
        </label>

        <label class="block">
          <span class="text-xs text-gray-400 font-bold">مقدار (${symbol})</span>
          <input
            id="trade-amount-input"
            type="number"
            step="any"
            placeholder="مثلاً 0.25"
            class="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none"
          />
        </label>

        <div class="rounded-2xl border border-white/10 bg-black/20 p-4 flex items-center justify-between">
          <span class="text-sm text-gray-400">ارزش تقریبی سفارش</span>
          <strong id="trade-total-value" class="text-lg text-white">$0.00</strong>
        </div>

        <button
          type="button"
          id="trade-submit-button"
          class="w-full py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black transition-all shadow-lg"
        >
          ثبت سفارش نمایشی
        </button>

        <p class="text-xs leading-6 text-gray-500">
          این بخش فقط برای شبیه‌سازی تجربه صرافی است و هیچ سفارش واقعی ثبت نمی‌شود.
        </p>
      </div>
    </div>
  `;
};

export const renderTradingModal = (coin) => {
  const symbol = normalizeSymbol(coin.symbol);
  const historyData = exchangeStore.getHistory(symbol) || [];

  return `
    <div
      id="modal-overlay"
      data-coin-id="${symbol}"
      class="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div class="w-full max-w-7xl h-[88vh] overflow-hidden rounded-[2.75rem] border border-white/10 bg-[#070b14] text-white shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
        <div class="h-full grid grid-cols-1 xl:grid-cols-[0.92fr_1.08fr]">
          <div class="p-6 xl:p-7 border-l border-white/5 bg-[#0b1020] overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-yellow-500 flex items-center justify-center text-black text-2xl font-black shadow-lg">
                  ${String(coin.symbol || "").toUpperCase()[0] || "?"}
                </div>

                <div>
                  <h2 class="text-3xl font-black">${coin.name}</h2>
                  <p class="text-xs font-mono tracking-[0.18em] text-gray-400">
                    ${String(coin.symbol || "").toUpperCase()} / USDT
                  </p>
                </div>
              </div>

              <button
                id="close-modal"
                class="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 transition-all text-xl flex items-center justify-center"
              >
                &times;
              </button>
            </div>

            ${renderTradeForm(coin)}

            <div class="mt-5 rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <h4 class="text-[11px] font-bold text-yellow-400 border-r-2 border-yellow-500 pr-2 mb-3">
                درباره دارایی
              </h4>

              <p class="text-gray-400 text-sm leading-7 text-justify">
                ${getCoinDescription(symbol)}
              </p>
            </div>
          </div>

          <div class="p-6 xl:p-7 bg-[#09111f] flex flex-col gap-5 min-h-0 overflow-y-auto">
            <div class="rounded-[2rem] border border-white/10 bg-white/5 p-5 min-h-[280px]">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-white">نمای کلی بازار</h3>
                <span class="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-300">
                  اینترنت محدود است
                </span>
              </div>

              <div class="w-full h-[calc(100%-2rem)] rounded-[1.75rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-6 bg-black/20">
                <span class="text-4xl mb-4">📊</span>
                <h4 class="text-white font-black mb-2">چارت فعلاً در دسترس نیست</h4>
                <p class="text-gray-400 text-sm leading-7 max-w-xl">
                  فعلاً برای این دارایی چارت زنده بارگذاری نمی‌شود. در مرحله بعد نسخه داخلی و هماهنگ با
                  تاریخچه قیمت پیاده‌سازی خواهد شد.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1 min-h-0">
              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-5 min-h-0 overflow-y-auto">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-bold text-white">تغییرات زنده</h4>
                  <span class="text-xs text-gray-400">آخرین قیمت‌ها</span>
                </div>
                <ul id="price-history-list" class="space-y-1">
                  ${renderLiveHistoryList(historyData)}
                </ul>
              </div>

              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-5 min-h-0 overflow-y-auto">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-bold text-white">تاریخچه معاملات</h4>
                  <span class="text-xs text-gray-400">نمونه نمایشی</span>
                </div>
                ${renderTradeJournal()}
              </div>
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
  const isDown = Number(newPrice) < oldPrice;

  $priceMain.text(`$${formatPrice(newPrice)}`);
  $priceMain
    .removeClass(PRICE_CLASS_POOL.join(" "))
    .addClass(
      isUp
        ? PRICE_UP_CLASSES
        : isDown
          ? PRICE_DOWN_CLASSES
          : PRICE_NEUTRAL_CLASSES,
    );

  if ($priceInput.length) {
    const currentValue = Number($priceInput.val()) || 0;
    if (!currentValue || currentValue === oldPrice) {
      $priceInput.val(Number(newPrice) || 0);
    }
  }

  const now = new Date().toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  $historyList.find("li.text-center").remove();
  $historyList.prepend(createHistoryItem({ time: now, price: newPrice }, isUp));

  if ($historyList.find("li").length > 15) {
    $historyList.find("li:last").remove();
  }

  syncTradeTotal();
};
