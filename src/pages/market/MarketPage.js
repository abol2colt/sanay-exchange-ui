import $ from "jquery";
import { exchangeStore } from "../../store/exchangeStore.js";
import { renderCoinList } from "../../components/market/CoinList.js";
import { renderMarketEmptyState } from "../../components/market/EmptyState.js";
import { renderConnectionBadge } from "../../components/shared/ConnectionBadge.js";

const renderMarketHeader = () => {
  return `
    <section class="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
      <div class="space-y-4">
        <div>
          <h2 class="text-4xl font-black mb-2">بازار ارزها</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            قیمت‌های لحظه‌ای و جستجوی سریع بین ارزها
          </p>
        </div>

        <div id="market-connection-badge" class="inline-flex">
          ${renderConnectionBadge()}
        </div>
      </div>

      <div class="relative w-full md:w-96">
        <input
          id="market-search"
          type="text"
          placeholder="جستجو..."
          value="${exchangeStore.getSearchQuery() || ""}"
          class="w-full p-4 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl focus:outline-none focus:border-yellow-500 transition-all text-gray-900 dark:text-white"
        />
      </div>
    </section>
  `;
};
const renderMarketResultsContent = () => {
  const coins = exchangeStore.getFilteredCoins();

  if (!coins.length) {
    return renderMarketEmptyState();
  }

  return `
    <div class="bg-white dark:bg-white/5 border border-gray-200 dark:border-transparent rounded-[2.5rem] overflow-hidden shadow-xl dark:shadow-2xl">
      ${renderCoinList(coins)}
    </div>
  `;
};

const renderMarketBody = () => {
  return `
    <div id="market-results">
      ${renderMarketResultsContent()}
    </div>
  `;
};

export const refreshMarketResults = () => {
  const $results = $("#market-results");

  if (!$results.length) {
    return;
  }

  $results.html(renderMarketResultsContent());
};

export const renderMarketPage = () => {
  return `
    ${renderMarketHeader()}
    ${renderMarketBody()}
  `;
};

export const mountMarketPage = () => {
  $("#page-root").html(renderMarketPage());
};
