// key localstorage
const PRICE_HISTORY_STORAGE_KEY = "crypto_history";

const normalizeCoinKey = (symbol = "") => String(symbol).trim().toLowerCase();
// read localstorage
const getStoredPriceHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(PRICE_HISTORY_STORAGE_KEY)) || {};
  } catch (error) {
    console.warn("خواندن تاریخچه قیمت از localStorage ناموفق بود.", error);
    return {};
  }
};
//state + method = ministore
export const exchangeStore = {
  state: {
    coins: {},
    searchQuery: "",
    isLoaded: false,
    lastUpdate: null,
    activeProvider: "None",
    priceHistory: getStoredPriceHistory(),
  },

  setSearchQuery(query = "") {
    this.state.searchQuery = String(query).trim().toLowerCase();
  },

  getCoin(symbol) {
    return this.state.coins[normalizeCoinKey(symbol)] || null;
  },

  getCoinSymbols() {
    return Object.keys(this.state.coins);
  },
  // search logic
  getFilteredCoins() {
    const allCoins = Object.values(this.state.coins);

    if (!this.state.searchQuery) {
      return allCoins;
    }

    return allCoins.filter((coin) => {
      const coinName = String(coin.name || "").toLowerCase();
      const coinSymbol = String(coin.symbol || "").toLowerCase();

      return (
        coinName.includes(this.state.searchQuery) ||
        coinSymbol.includes(this.state.searchQuery)
      );
    });
  },
  // data set store
  setCoins(coinsData = {}) {
    this.state.coins = coinsData;
    this.state.isLoaded = true;
    this.state.lastUpdate = new Date();
    console.log("استور با ارزها آپدیت شد", this.state.coins);
  },
  // realtime update
  updateCoinPrice(symbol, newPrice, change24h) {
    const coinKey = normalizeCoinKey(symbol);
    const coin = this.state.coins[coinKey];

    if (!coin) {
      return null;
    }

    coin.price = Number(newPrice) || 0;

    if (change24h !== undefined) {
      coin.change24h = Number(change24h) || 0;
    }

    return coin;
  },

  setActiveProvider(providerName) {
    this.state.activeProvider = providerName;
    console.log(`🔌 منبع داده تغییر کرد به: ${providerName}`);
  },

  persistPriceHistory() {
    localStorage.setItem(
      PRICE_HISTORY_STORAGE_KEY,
      JSON.stringify(this.state.priceHistory),
    );
  },

  addPriceHistory(symbol, price) {
    const coinKey = normalizeCoinKey(symbol);

    if (!this.state.priceHistory[coinKey]) {
      this.state.priceHistory[coinKey] = [];
    }

    const history = this.state.priceHistory[coinKey];
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });

    if (history.length > 0 && history[0].price === price) {
      return;
    }

    history.unshift({ time, price });

    if (history.length > 30) {
      history.pop();
    }

    this.persistPriceHistory();
  },

  getHistory(symbol) {
    return this.state.priceHistory[normalizeCoinKey(symbol)] || [];
  },
};
