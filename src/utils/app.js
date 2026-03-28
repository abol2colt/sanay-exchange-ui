import { fetchTopCoins } from "../api/mockCoins.js";
import { exchangeStore } from "../store/exchangeStore.js";
import { renderCoinList } from "../components/market/CoinList.js";
import { initializeLivePrices } from "./connectionManager.js";
import { CoinRow } from "../components/market/CoinRow.js";
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (e) => {
  // ۱. آپدیت کردن وضعیت جستجو در استور
  exchangeStore.setSearchQuery(e.target.value);

  // ۲. حالا باید تابعی که لیست رو میسازه دوباره صدا بزنیم
  renderMarket();
});
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
// Function to handle searching logic
const setupSearch = () => {
  const searchInput = document.getElementById("search");

  if (searchInput) {
    // 1. Listen to every keystroke
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim();

      // 2. Update the store with the new search term
      exchangeStore.setSearchQuery(query);

      // 3. Re-render the list with filtered data
      renderMarket();
    });
  }
};

// Update your render function to use filtered coins
const renderMarket = () => {
  const coinContainer = document.getElementById("coin-container");
  if (!coinContainer) return;

  // 1. گرفتن کوین‌های فیلتر شده از استور
  const coinsToShow = exchangeStore.getFilteredCoins();

  // 2. تبدیل آرایه کوین‌ها به یک رشته طولانی از HTML
  // از تابع CoinRow که قبلاً Import کردی استفاده می‌کنیم
  const htmlContent = coinsToShow.map((coin) => CoinRow(coin)).join("");

  // 3. تزریق کل رشته به کانتینر
  coinContainer.innerHTML = htmlContent;

  // اگر لیستی پیدا نشد، یک پیام ساده نمایش بدهیم
  if (coinsToShow.length === 0) {
    coinContainer.innerHTML = `<div class="p-4 text-gray-500 text-center">ارزی با این نام پیدا نشد 🔍</div>`;
  }
};
document.addEventListener("DOMContentLoaded", initApp);
