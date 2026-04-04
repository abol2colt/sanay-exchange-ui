import $ from "jquery";
import { fetchTopCoins } from "./api/mockCoins.js";
import { exchangeStore } from "./store/exchangeStore.js";
import { renderMarket } from "./components/market/MarketList.js";
import { initTheme, setupThemeListener } from "./utils/themeManager.js";
import { initializeLivePrices } from "./utils/connectionManager.js";
import { openTradeModal } from "./components/ui/TreadingModal.js";
import "./assets/css/style.css";

const setupSearchListener = () => {
  $("#search").on("input", ({ target }) => {
    const query = $(target).val();
    exchangeStore.setSearchQuery(query);
    renderMarket();
  });
};

const setupCoinRowListener = () => {
  //if update document
  $(document).on("click", ".coin-row", ({ currentTarget }) => {
    const symbol = $(currentTarget).attr("data-symbol");
    const coinData = exchangeStore.getCoin(symbol);

    if (coinData) {
      openTradeModal(coinData);
    }
  });
};

const setupModalCloseListener = () => {
  $(document).on("click", "#close-modal, #modal-overlay", ({ target }) => {
    if (target.id === "close-modal" || target.id === "modal-overlay") {
      $("#modal-overlay").remove();
    }
  });
};

const setupEventListeners = () => {
  setupThemeListener();
  setupSearchListener();
  setupCoinRowListener();
  setupModalCloseListener();
};

const initApp = async () => {
  initTheme();

  const coins = await fetchTopCoins();
  exchangeStore.setCoins(coins);
  renderMarket();
  setupEventListeners();

  initializeLivePrices(exchangeStore.getCoinSymbols());
};

$(document).ready(initApp);
