import * as CentrifugePkg from "centrifuge";
import { normalizeSymbol } from "../utils/priceHelpers.js";
const NOBITEX_SOCKET_URL = "wss://ws.nobitex.ir/connection/websocket";

const getCentrifugeClass = () =>
  CentrifugePkg.Centrifuge || CentrifugePkg.default || window.Centrifuge;

const buildMarketChannel = (symbol) =>
  `public:market-stats-${normalizeSymbol(symbol).toUpperCase()}USDT`;

const parseTickerPayload = (payload = {}) => ({
  newPrice: Number.parseFloat(payload.latest ?? payload.last ?? 0),
  change24h: Number.parseFloat(payload.changePercent ?? payload.dayChange ?? 0),
});

//symbol create subscription
const subscribeToTicker = (client, symbol, onTicker = () => {}) => {
  const coinKey = normalizeSymbol(symbol);
  const subscription = client.newSubscription(buildMarketChannel(coinKey));
  //data destructure from object centrifuge
  subscription.on("publication", ({ data = {} }) => {
    const { newPrice, change24h } = parseTickerPayload(data);

    if (newPrice <= 0) {
      return;
    }
    onTicker({ symbol: coinKey, price: newPrice, change24h });
  });

  subscription.on("error", (context) => {
    console.warn(`خطا در سابسکرایب ${coinKey}:`, context);
  });

  subscription.subscribe();
  return subscription;
};
//start ws
export const startNobitexWS = (
  symbols = [],
  onFailure = () => {},
  onTicker = () => {},
  onConnected = () => {},
) => {
  const CentrifugeClass = getCentrifugeClass();

  if (!CentrifugeClass) {
    console.error("کتابخانه Centrifuge در دسترس نیست.");
    onFailure("nobitex_missing_library");
    return null;
  }

  let hasConnectedOnce = false;
  let hasFailedOver = false;
  let client = null;

  const failOnce = (context) => {
    if (hasConnectedOnce || hasFailedOver) {
      return;
    }

    hasFailedOver = true;
    onFailure(context);

    if (client && typeof client.disconnect === "function") {
      client.disconnect();
    }
  };

  try {
    client = new CentrifugeClass(NOBITEX_SOCKET_URL);
    client.on("connected", () => {
      hasConnectedOnce = true;
      console.log("✅ نوبیتکس متصل شد!");
      onConnected();
    });

    client.on("disconnected", (context) => {
      console.warn("ارتباط نوبیتکس قطع شد.", context);

      if (!hasConnectedOnce) {
        failOnce(context);
      }
    });

    client.on("error", (context) => {
      console.error("ارور نوبیتکس :", context);

      if (!hasConnectedOnce) {
        failOnce(context);
      }
    });

    symbols.forEach((symbol) => {
      subscribeToTicker(client, symbol, onTicker);
    });

    client.connect();
    return client;
  } catch (error) {
    console.error("Nobitex WS Connection Error:", error);
    onFailure(error);
    return null;
  }
};
