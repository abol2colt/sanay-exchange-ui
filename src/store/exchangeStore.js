import { DEFAULT_CONNECTION_STATUS } from "../services/helpers/connectionStatusHelpers.js";
const PRICE_HISTORY_STORAGE_KEY = "crypto_history";
const WATCHLIST_STORAGE_KEY = "crypto_watchlist";
const normalizeCoinKey = (symbol = "") => String(symbol).trim().toLowerCase();

const getStoredPriceHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(PRICE_HISTORY_STORAGE_KEY)) || {};
  } catch (error) {
    console.warn("خواندن تاریخچه قیمت از localStorage ناموفق بود.", error);
    return {};
  }
};

const getStoredWatchlist = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY));
    return Array.isArray(parsed) ? parsed.map(normalizeCoinKey) : [];
  } catch (error) {
    console.warn("خواندن واچ‌لیست از localStorage ناموفق بود.", error);
    return [];
  }
};

const cloneCoinsData = (coinsData = {}) => {
  return Object.fromEntries(
    // obj =>  array
    Object.entries(coinsData).map(([key, value]) => [key, { ...value }]),
  );
};

const cloneCoin = (coin = null) => {
  return coin ? { ...coin } : null;
};

export const exchangeStore = {
  state: {
    coins: {},
    searchQuery: "",
    isLoaded: false,
    lastUpdate: null,
    activeProvider: "None",
    priceHistory: getStoredPriceHistory(),
    watchlistSymbols: getStoredWatchlist(),
    connectionStatus: { ...DEFAULT_CONNECTION_STATUS },
  },

  setConnectionStatus(nextStatus = {}) {
    this.state.connectionStatus = {
      ...DEFAULT_CONNECTION_STATUS,
      ...nextStatus,
    };
  },

  getConnectionStatusSnapshot() {
    return { ...this.state.connectionStatus };
  },

  setSearchQuery(query = "") {
    this.state.searchQuery = String(query).toLowerCase();
  },

  getSearchQuery() {
    return this.state.searchQuery;
  },

  getHistorySnapshot(symbol) {
    const key = normalizeCoinKey(symbol);
    return (this.state.priceHistory[key] || []).map((item) => ({ ...item }));
  },
  getLastUpdate() {
    return this.state.lastUpdate ? new Date(this.state.lastUpdate) : null;
  },

  getAllCoinsSnapshot() {
    return Object.values(this.state.coins).map(cloneCoin);
  },

  getCoinSnapshot(symbol) {
    return cloneCoin(this.getCoin(symbol));
  },

  getActiveProvider() {
    return this.state.activeProvider;
  },

  getCoin(symbol) {
    return this.state.coins[normalizeCoinKey(symbol)] || null;
  },

  getCoinSymbols() {
    return Object.keys(this.state.coins);
  },

  getFilteredCoins() {
    const allCoins = this.getAllCoinsSnapshot();
    const query = String(this.state.searchQuery || "").trim();

    if (!query) {
      return allCoins;
    }

    return allCoins.filter((coin) => {
      const coinName = String(coin.name || "").toLowerCase();
      const coinSymbol = String(coin.symbol || "").toLowerCase();

      return coinName.includes(query) || coinSymbol.includes(query);
    });
  },

  setCoins(coinsData = {}) {
    this.state.coins = cloneCoinsData(coinsData);
    this.state.isLoaded = true;
    this.state.lastUpdate = new Date();
    console.log("استور با ارزها آپدیت شد", this.state.coins);
  },

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
    //updated price return
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
    return this.getHistorySnapshot(symbol);
  },

  persistWatchlist() {
    localStorage.setItem(
      WATCHLIST_STORAGE_KEY,
      JSON.stringify(this.state.watchlistSymbols),
    );
  },

  isInWatchlist(symbol) {
    return this.state.watchlistSymbols.includes(normalizeCoinKey(symbol));
  },

  toggleWatchlist(symbol) {
    const coinKey = normalizeCoinKey(symbol);

    if (!coinKey) {
      return false;
    }

    const currentIndex = this.state.watchlistSymbols.indexOf(coinKey);

    if (currentIndex === -1) {
      this.state.watchlistSymbols.push(coinKey);
      this.persistWatchlist();
      return true;
    }

    this.state.watchlistSymbols.splice(currentIndex, 1);
    this.persistWatchlist();
    return false;
  },

  getWatchlistCoins() {
    return this.state.watchlistSymbols
      .map((symbol) => this.getCoinSnapshot(symbol))
      .filter(Boolean);
  },
};
