import $ from "jquery";
import { exchangeStore } from "../../store/exchangeStore.js";
import { openTradeModal } from "../../components/modal/TradingModal.js";
import {
  formatPrice,
  getChangeMeta,
  normalizeSymbol,
} from "../../utils/priceHelpers.js";
import {
  getAssetDescription,
  renderAssetHistoryList,
  renderInfoCard,
} from "./assetPageHelpers.js";

export const renderAssetPage = (symbol = null) => {
  const coin = exchangeStore.getCoinSnapshot(symbol);

  if (!coin) {
    return `
      <section class="space-y-6">
        <div class="bg-white dark:bg-white/5 border border-gray-200 dark:border-transparent rounded-[2.5rem] p-8 shadow-xl dark:shadow-2xl">
          <div class="text-center py-16">
            <div class="text-5xl mb-4">⚠️</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ارز پیدا نشد
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              مسیر انتخاب‌شده معتبر نیست یا داده این ارز هنوز در مارکت لود نشده.
            </p>
          </div>
        </div>
      </section>
    `;
  }

  const coinKey = normalizeSymbol(coin.symbol);
  const displaySymbol = String(coin.symbol || "").toUpperCase();
  const displayName = coin.name || displaySymbol;
  const history = exchangeStore.getHistory(coinKey);
  const provider = exchangeStore.getActiveProvider() || "None";
  const lastUpdateValue = exchangeStore.getLastUpdate();
  const lastUpdate = lastUpdateValue
    ? lastUpdateValue.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "_";

  const changeMeta = getChangeMeta(coin.change24h || 0);

  return `
    <section data-asset-symbol="${coinKey}" class="space-y-8">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center text-black text-2xl font-black shadow-lg">
            ${displaySymbol[0] || "?"}
          </div>

          <div>
            <div class="flex items-center gap-3 flex-wrap">
              <h2 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                ${displayName}
              </h2>
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-200 uppercase">
                ${displaySymbol}
              </span>
              <span
                id="asset-provider-badge"
                class="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
              >
                ${provider}
              </span>
            </div>

            <div class="mt-3 flex items-center gap-3 flex-wrap">
              <div
                id="asset-current-price"
                class="text-3xl font-black text-gray-900 dark:text-white"
              >
                $${formatPrice(coin.price)}
              </div>
              <div
                id="asset-price-change"
                class="px-3 py-1 rounded-full text-sm font-bold ${changeMeta.className} bg-gray-100 dark:bg-white/5"
              >
                ${changeMeta.markup}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          data-action="open-asset-trade"
          data-symbol="${coinKey}"
          class="px-6 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black shadow-lg transition-all"
        >
          معامله این ارز
        </button>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-[1.6fr_0.9fr] gap-6">
        <div class="space-y-6">
          <div class="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-6 shadow-xl dark:shadow-2xl min-h-[420px] flex flex-col">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                نمودار قیمت
              </h3>
              <span class="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                Internet Restricted
              </span>
            </div>

            <div class="flex-1 rounded-[2rem] border-2 border-dashed border-gray-300 dark:border-white/10 flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-black/20">
              <div class="text-6xl mb-4">📉</div>
              <h4 class="text-xl font-black text-gray-900 dark:text-white mb-3">
                چارت فعلاً در دسترس نیست
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-7 max-w-xl">
                به دلیل محدودیت اینترنت، دریافت و نمایش چارت زنده فعلاً غیرفعال است.
                در ادامه می‌توانیم نسخه ساده داخلی برای chart history پیاده‌سازی کنیم.
              </p>
            </div>
          </div>

          <div class="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-6 shadow-xl dark:shadow-2xl">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
              توضیحات دارایی
            </h3>
            <p class="text-sm leading-8 text-gray-600 dark:text-gray-400 text-justify">
              ${getAssetDescription(coinKey)}
            </p>
          </div>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            ${renderInfoCard("آخرین به‌روزرسانی", `<span id="asset-last-update">${lastUpdate}</span>`)}
            ${renderInfoCard("منبع داده", `<span id="asset-provider-text">${provider}</span>`)}
            ${renderInfoCard("نماد", displaySymbol)}
            ${renderInfoCard("تعداد رکورد هیستوری", `<span id="asset-history-count">${String(history.length)}</span>`)}
          </div>

          <div class="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-6 shadow-xl dark:shadow-2xl">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
              تاریخچه قیمت
            </h3>
            <ul id="asset-history-list" class="space-y-1">
              ${renderAssetHistoryList(history)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
};

export const mountAssetPage = (symbol = null) => {
  $("#page-root").html(renderAssetPage(symbol));

  $(document)
    .off("click.assetTrade", '[data-action="open-asset-trade"]')
    .on("click.assetTrade", '[data-action="open-asset-trade"]', (event) => {
      event.preventDefault();

      const coinSymbol = String(
        $(event.currentTarget).attr("data-symbol") || "",
      );
      const coin = exchangeStore.getCoin(coinSymbol);

      if (!coin) {
        return;
      }

      openTradeModal(coin);
    });
};

export const updateAssetPageLive = (symbol, newPrice, change24h) => {
  const normalizedSymbol = normalizeSymbol(symbol);
  const $root = $("[data-asset-symbol]");
  const openedSymbol = String($root.attr("data-asset-symbol") || "");

  if (!$root.length || openedSymbol !== normalizedSymbol) {
    return;
  }

  $("#asset-current-price").text(`$${formatPrice(newPrice)}`);

  if (change24h !== undefined) {
    const changeMeta = getChangeMeta(change24h);
    $("#asset-price-change")
      .attr(
        "class",
        `px-3 py-1 rounded-full text-sm font-bold ${changeMeta.className} bg-gray-100 dark:bg-white/5`,
      )
      .html(changeMeta.markup);
  }

  $("#asset-last-update").text(
    new Date().toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  );

  $("#asset-provider-badge").text(exchangeStore.getActiveProvider() || "None");
  $("#asset-provider-text").text(exchangeStore.getActiveProvider() || "None");
  $("#asset-history-count").text(
    String(exchangeStore.getHistory(normalizedSymbol).length),
  );
};
