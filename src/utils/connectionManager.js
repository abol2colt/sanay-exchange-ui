import { startPriceWebsocket as startBinance } from "../api/binanceWS.js";
import { startNobitexWS as startNobitex } from "../api/nobitexWS.js";
import { startFakeMarket } from "./fakePriceEngine.js";

export const initializeLivePrices = (symbols) => {
  console.log("در حال تلاش برای اتصال به بایننس...");

  const binanceSocket = startBinance(symbols);

  // 5s timer connect to websocket 1 binance - 2 nobitex -3 fake data
  const timeoutId = setTimeout(() => {
    if (binanceSocket.readyState !== WebSocket.OPEN) {
      console.warn("⏳ بایننس وصل نشد (تایم‌اوت). سوییچ به نوبیتکس...");
      binanceSocket.close();

      startNobitex(symbols, () => {
        console.warn("نوبیتکس هم در دسترس نیست. سوییچ به موتور فیک...");
        startFakeMarket();
      });
    }
  }, 5000);

  binanceSocket.onopen = () => {
    clearTimeout(timeoutId);
    console.log("✅ Binance WebSocket Connected");
  };
};
