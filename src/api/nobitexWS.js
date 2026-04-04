import * as CentrifugePkg from "centrifuge";
import { exchangeStore } from "../store/exchangeStore.js";
import { updateModalLive } from "../components/ui/TreadingModal.js";
import {
  normalizeSymbol,
  setChangeElement,
  setPriceElement,
} from "../utils/priceHelpers.js";

const NOBITEX_SOCKET_URL = "wss://ws.nobitex.ir/connection/websocket";

const getCentrifugeClass = () =>
  CentrifugePkg.Centrifuge || CentrifugePkg.default || window.Centrifuge;

const buildMarketChannel = (symbol) =>
  `public:market-stats-${normalizeSymbol(symbol).toUpperCase()}USDT`;

const parseTickerPayload = (payload = {}) => ({
  newPrice: Number.parseFloat(payload.latest ?? payload.last ?? 0),
  change24h: Number.parseFloat(payload.changePercent ?? payload.dayChange ?? 0),
});
// update ui
const updateMarketRowUI = (symbol, newPrice, change24h) => {
  setPriceElement(symbol, newPrice);
  setChangeElement(symbol, change24h);
};
//symbol create subscription
const subscribeToTicker = (client, symbol) => {
  const coinKey = normalizeSymbol(symbol);
  const subscription = client.newSubscription(buildMarketChannel(coinKey));

  subscription.on("publication", ({ data = {} }) => {
    const { newPrice, change24h } = parseTickerPayload(data);

    if (newPrice <= 0) {
      return;
    }
    //update store(state)
    exchangeStore.updateCoinPrice(coinKey, newPrice, change24h);
    exchangeStore.addPriceHistory(coinKey, newPrice);
    //ui sync
    updateMarketRowUI(coinKey, newPrice, change24h);
    updateModalLive(coinKey, newPrice);
  });

  subscription.on("error", (context) => {
    console.warn(`خطا در سابسکرایب ${coinKey}:`, context);
  });

  subscription.subscribe();
  return subscription;
};
//start ws
export const startNobitexWS = (symbols = [], onFailure = () => {}) => {
  const CentrifugeClass = getCentrifugeClass();

  if (!CentrifugeClass) {
    console.error("کتابخانه Centrifuge در دسترس نیست.");
    onFailure();
    return null;
  }

  let hasConnectedOnce = false;

  try {
    const client = new CentrifugeClass(NOBITEX_SOCKET_URL);

    client.on("connected", () => {
      hasConnectedOnce = true;
      console.log("✅ نوبیتکس متصل شد!");
      exchangeStore.setActiveProvider("Nobitex");
    });

    client.on("disconnected", (context) => {
      console.warn("ارتباط نوبیتکس قطع شد.", context);

      if (!hasConnectedOnce) {
        onFailure(context);
      }
    });

    client.on("error", (context) => {
      console.error("Nobitex WS Error:", context);

      if (!hasConnectedOnce) {
        onFailure(context);
      }
    });

    symbols.forEach((symbol) => {
      subscribeToTicker(client, symbol);
    });

    client.connect();
    return client;
  } catch (error) {
    console.error("Nobitex WS Connection Error:", error);
    onFailure(error);
    return null;
  }
};
