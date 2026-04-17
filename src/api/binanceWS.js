import { normalizeSymbol } from "../utils/priceHelpers.js";

const buildBinanceStream = (symbols = []) =>
  symbols.map((symbol) => `${normalizeSymbol(symbol)}usdt@ticker`).join("/");

const buildBinanceSocketUrl = (symbols = []) =>
  `wss://stream.binance.com:9443/stream?streams=${buildBinanceStream(symbols)}`;

const parseBinanceMessage = (payload = {}) => {
  const ticker = payload?.data || {};

  return {
    symbol: normalizeSymbol(ticker.s),
    price: Number.parseFloat(ticker.c ?? 0), //current price
    change24h: Number.parseFloat(ticker.P ?? 0), //percent change 24
  };
};

//entry point
export const startPriceWebsocket = (symbols = [], onTicker = () => {}) => {
  if (!Array.isArray(symbols) || symbols.length === 0) {
    console.warn("لیست symbol برای Binance خالی است.");
    return null;
  }

  try {
    const socket = new WebSocket(buildBinanceSocketUrl(symbols));

    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      const { symbol, price, change24h } = parseBinanceMessage(payload);

      if (!symbol || price <= 0) {
        return;
      }
      onTicker({ symbol, price, change24h });
    };

    socket.onerror = (error) => {
      console.error("Binance message/socket error:", error);
    };

    return socket;
  } catch (error) {
    console.error("ساخت وب‌سوکت بایننس ناموفق بود.", error);
    return null;
  }
};
