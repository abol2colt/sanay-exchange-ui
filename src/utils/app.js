import { fetchTopCoins } from "../api/mockCoins.js";
import { exchangeStore } from "../store/exchangeStore.js";
import { renderCoinList } from "../components/market/CoinList.js";
import { initializeLivePrices } from "./connectionManager.js";

const initApp = async () => {
  // ۱. گرفتن دیتای اولیه (فیک یا واقعی)
  const coins = await fetchTopCoins();
  exchangeStore.setCoins(coins);

  // ۲. رندر کردن UI
  const container = document.getElementById("coin-container");
  container.innerHTML = renderCoinList();
  if (!container) {
    console.error("coin-container not found");
    return;
  }

  // ۳. استخراج نمادها (btc, eth, bnb)
  const symbols = Object.keys(coins);

  // ۴. روشن کردن موتور هوشمند وب‌سوکت
  initializeLivePrices(symbols);
};

document.addEventListener("DOMContentLoaded", initApp);
