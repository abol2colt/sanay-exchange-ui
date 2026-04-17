import { exchangeStore } from "../../store/exchangeStore.js";
import { refreshConnectionBadge } from "../../components/shared/ConnectionBadge.js";
import {
  getConnectingStatus,
  getLiveStatus,
  getDegradedStatus,
} from "./connectionStatusHelpers.js";

const applyConnectionStatus = (status, { syncActiveProvider = false } = {}) => {
  exchangeStore.setConnectionStatus(status);

  if (syncActiveProvider) {
    exchangeStore.setActiveProvider(status.provider);
  }
  refreshConnectionBadge("#market-connection-badge");
};

export const setEmptySymbolsState = () => {
  applyConnectionStatus(
    getDegradedStatus(
      "None",
      "سمبلی برای دریافت قیمت زنده وجود ندارد.",
      "empty_symbols",
    ),
  );
};

export const setBinanceConnectingState = () => {
  applyConnectionStatus(
    getConnectingStatus("Binance", "در حال اتصال به بایننس...", null),
  );
};

export const setNobitexConnectingState = () => {
  applyConnectionStatus(
    getConnectingStatus(
      "Nobitex",
      "اتصال به بایننس برقرار نشد؛ در حال اتصال به نوبیتکس...",
      "binance_timeout",
    ),
  );
};

export const setBinanceLiveState = () => {
  applyConnectionStatus(
    getLiveStatus("Binance", "اتصال زنده به بایننس برقرار شد."),
    { syncActiveProvider: true },
  );
};

export const setNobitexLiveState = () => {
  applyConnectionStatus(
    getLiveStatus("Nobitex", "اتصال زنده به نوبیتکس برقرار شد."),
    { syncActiveProvider: true },
  );
};

export const setFakeDegradedState = (reason = "unknown_failure") => {
  applyConnectionStatus(
    getDegradedStatus(
      "Fake",
      "اتصال به بایننس و نوبیتکس برقرار نشد؛ داده‌ها نمایشی هستند.",
      reason,
    ),
    { syncActiveProvider: true },
  );
};
