import { startPriceWebsocket as startBinance } from "../api/binanceWS.js";
import { startNobitexWS as startNobitex } from "../api/nobitexWS.js";
import { startFakeMarket } from "./fakePriceEngine.js";
import { exchangeStore } from "../store/exchangeStore.js";
import { updateTradingModalLive } from "../components/modal/TradingModal.js";
import { setChangeElement, setPriceElement } from "../utils/priceHelpers.js";
import { updateAssetPageLive } from "../pages/asset/AssetPage.js";
import {
  setEmptySymbolsState,
  setBinanceConnectingState,
  setNobitexConnectingState,
  setBinanceLiveState,
  setNobitexLiveState,
  setFakeDegradedState,
} from "./helpers/connectionTransitions.js";

const BINANCE_TIMEOUT_MS = 5000;
let activeLiveStatus = null;

const isSocketOpen = (socket) => socket && socket.readyState === WebSocket.OPEN;

const buildStatus = (provider, connection, fallbackReason = null) => {
  return {
    provider,
    connection,
    fallbackReason,
  };
};
// helpers
const handleLiveTicker = ({ symbol, price, change24h }) => {
  if (!symbol || price <= 0) {
    return;
  }

  exchangeStore.updateCoinPrice(symbol, price, change24h);
  exchangeStore.addPriceHistory(symbol, price);
  setPriceElement(symbol, price);
  setChangeElement(symbol, change24h);
  updateTradingModalLive(symbol, price);
  updateAssetPageLive(symbol, price, change24h);
};

const setActiveLiveStatus = (status) => {
  activeLiveStatus = status;
  return status;
};

const startFallbackToFake = (reason) => {
  console.warn("نوبیتکس هم در دسترس نیست. سوییچ به موتور فیک...", reason);
  setFakeDegradedState(reason);
  const intervalId = startFakeMarket(handleLiveTicker);
  return setActiveLiveStatus(buildStatus("Fake", intervalId, reason));
};

const startFallbackToNobitex = (symbols, socket) => {
  console.warn("⏳ بایننس وصل نشد. سوییچ به نوبیتکس...");
  setNobitexConnectingState();
  if (socket && socket.readyState !== WebSocket.CLOSED) {
    socket.close();
  }

  const nobitexClient = startNobitex(
    symbols,
    startFallbackToFake,
    handleLiveTicker,
    setNobitexLiveState,
  );

  if (!nobitexClient) {
    return startFallbackToFake("nobitex_init_failed");
  }

  return setActiveLiveStatus(
    buildStatus("Nobitex", nobitexClient, "binance_timeout"),
  );
};

//entry point
export const initializeLivePrices = (symbols = []) => {
  if (!Array.isArray(symbols) || symbols.length === 0) {
    setEmptySymbolsState();
    return setActiveLiveStatus(buildStatus("None", null, "empty_symbols"));
  }
  console.log("در حال تلاش برای اتصال به بایننس...");
  setBinanceConnectingState();
  const binanceSocket = startBinance(symbols, handleLiveTicker);

  if (!binanceSocket) {
    return startFallbackToNobitex(symbols, null);
  }

  const timeoutId = setTimeout(() => {
    if (!isSocketOpen(binanceSocket)) {
      startFallbackToNobitex(symbols, binanceSocket);
    }
  }, BINANCE_TIMEOUT_MS);

  binanceSocket.onopen = () => {
    clearTimeout(timeoutId);
    console.log("✅ Binance WebSocket Connected");
    setBinanceLiveState();
  };

  binanceSocket.onerror = (error) => {
    console.error("Binance WebSocket Error:", error);
  };

  binanceSocket.onclose = (event) => {
    console.warn("Binance WebSocket Closed:", event);
    //TODO add feature reconnect logic
  };

  return setActiveLiveStatus(buildStatus("Binance", binanceSocket, null));
};
export const stopLiveConnection = (liveStatus = activeLiveStatus) => {
  const connection = liveStatus?.connection;

  if (!connection) {
    return;
  }

  if (typeof connection === "number") {
    clearInterval(connection);
  } else if (typeof connection.close === "function") {
    connection.close();
  } else if (typeof connection.disconnect === "function") {
    connection.disconnect();
  }

  if (liveStatus === activeLiveStatus) {
    activeLiveStatus = null;
  }
};
//control flow
//handling socket/fallback
//handling timeout/fallback
