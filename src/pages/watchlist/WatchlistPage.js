import $ from "jquery";
import { exchangeStore } from "../../store/exchangeStore.js";
import { renderCoinList } from "../../components/market/CoinList.js";
import { renderMarketEmptyState } from "../../components/market/EmptyState.js";

const renderWatchlistBody = () => {
  const coins = exchangeStore.getWatchlistCoins();

  if (!coins.length) {
    return renderMarketEmptyState(
      "واچ‌لیست خالی است",
      "از لیست بازار روی ستاره بزن تا ارزها اینجا نمایش داده شوند.",
    );
  }

  return `
    <div class="bg-white dark:bg-white/5 border border-gray-200 dark:border-transparent rounded-[2.5rem] overflow-hidden shadow-xl dark:shadow-2xl">
      ${renderCoinList(coins)}
    </div>
  `;
};

export const renderWatchlistPage = () => {
  return `
    <section class="space-y-6">
      <div>
        <h2 class="text-4xl font-black mb-2">واچ‌لیست</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          ارزهای ستاره‌دار اینجا نمایش داده می‌شوند.
        </p>
      </div>

      ${renderWatchlistBody()}
    </section>
  `;
};

export const mountWatchlistPage = () => {
  $("#page-root").html(renderWatchlistPage());
};
