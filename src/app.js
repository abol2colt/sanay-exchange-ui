import $ from "jquery";
import "./assets/css/style.css";

import { initTheme, setupThemeListener } from "./utils/themeManager.js";
import { exchangeStore } from "./store/exchangeStore.js";
import { fetchTopCoins } from "./api/mockCoins.js";
import { APP_SELECTORS } from "./constants/selectors.js";
import {
  initializeLivePrices,
  stopLiveConnection,
} from "./services/connectionManager.js";

import {
  renderMainLayout,
  refreshMainNavigation,
} from "./layout/MainLayout.js";
import {
  getCurrentRoute,
  navigateToAsset,
  renderCurrentPage,
} from "./pages/router.js";
import { refreshMarketResults } from "./pages/market/MarketPage.js";

const initApp = async () => {
  initTheme();
  bootstrapAppShell();
  setupAppEvents();
  renderCurrentPage();

  const result = await loadInitialMarketData();

  renderCurrentPage();

  if (result.ok) {
    startLiveLayer();
  }
};

const setupSearchListener = () => {
  //Template Literal
  $(document)
    .off("input.appSearch", APP_SELECTORS.marketSearch)
    //                                                 Destructuring
    .on("input.appSearch", APP_SELECTORS.marketSearch, ({ target }) => {
      const query = String($(target).val() ?? ""); //btc => "btc"
      exchangeStore.setSearchQuery(query);

      const route = getCurrentRoute();

      if (route.page === "market") {
        refreshMarketResults();
      }
    });
};

const setupCoinRowNavigation = () => {
  $(document)
    .off("click.appCoinRow", ".coin-row")
    .on("click.appCoinRow", ".coin-row", (event) => {
      const $target = $(event.target);

      const isSymbolDisabled = $target.closest(
        '[data-prevent-row-click="true"]',
      ).length;
      if (isSymbolDisabled) {
        return;
      }

      const symbol = String($(event.currentTarget).attr("data-symbol") || "");

      if (!symbol) {
        return;
      }

      navigateToAsset(symbol);
    });
};

const setupWatchlistListener = () => {
  $(document)
    .off("click.appWatchlist", '[data-action="toggle-watchlist"]')
    .on("click.appWatchlist", '[data-action="toggle-watchlist"]', (event) => {
      event.preventDefault();
      event.stopPropagation(); //click!=father event

      const symbol = String($(event.currentTarget).attr("data-symbol") || "");

      if (!symbol) {
        return;
      }

      exchangeStore.toggleWatchlist(symbol);
      renderCurrentPage();
    });
};

const setupAppEvents = () => {
  setupThemeListener();
  setupSearchListener();
  setupCoinRowNavigation();
  setupWatchlistListener();

  $(window)
    .off("hashchange.app")
    .on("hashchange.app", () => {
      renderCurrentPage();
      refreshMainNavigation();
    });
  $(window)
    .off("beforeunload.appLive")
    .on("beforeunload.appLive", () => {
      stopLiveConnection();
    });
};

const bootstrapAppShell = () => {
  $(APP_SELECTORS.appRoot).html(renderMainLayout());
  refreshMainNavigation();
};

const loadInitialMarketData = async () => {
  try {
    const coins = await fetchTopCoins();

    const hydratedCoins = Object.fromEntries(
      Object.entries(coins).map(([symbol, coin]) => {
        const history = exchangeStore.getHistory(symbol);

        if (history.length > 0) {
          return [
            symbol,
            {
              ...coin,
              price: history[0].price,
            },
          ];
        }

        return [symbol, coin];
      }),
    );

    exchangeStore.setCoins(hydratedCoins);
    return { ok: true, error: null };
  } catch (error) {
    console.error("دریافت اطلاعات اولیه بازار ناموفق بود:", error);
    return { ok: false, error };
  }
};
const startLiveLayer = () => {
  const symbols = exchangeStore.getCoinSymbols();

  if (symbols.length === 0) {
    console.warn("سمبلی برای اتصال لایو وجود ندارد.");
    return null;
  }
  stopLiveConnection();
  return initializeLivePrices(symbols);
};

$(document).ready(initApp);
