import $ from "jquery";
import { renderCoinList } from "./CoinList.js";
import { exchangeStore } from "../../store/exchangeStore.js";

const EMPTY_STATE_HTML = `
  <div class="p-10 text-center text-gray-500">ارزی پیدا نشد.</div>
`;

export const renderMarket = () => {
  const $container = $("#coin-container");

  if (!$container.length) {
    return;
  }

  const coins = exchangeStore.getFilteredCoins();

  if (coins.length === 0) {
    $container.html(EMPTY_STATE_HTML);
    return;
  }

  $container.html(renderCoinList(coins));
};
