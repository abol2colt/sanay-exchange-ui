export const exchangeStore = {
  state: {
    coins: {},
    searchQuery: "",
    isLoaded: false,
    lastUpdate: null,
    activeProvider: "None",
  },

  setSearchQuery(query) {
    this.state.searchQuery = query.toLowerCase();
  },

  getFilteredCoins() {
    const allCoins = Object.values(this.state.coins);
    if (!this.state.searchQuery) return allCoins;

    return allCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(this.state.searchQuery) ||
        coin.symbol.toLowerCase().includes(this.state.searchQuery),
    );
  },

  setCoins(coinsData) {
    this.state.coins = coinsData;
    this.state.isLoaded = true;
    this.state.lastUpdate = new Date();
    console.log("استور با ارزها آپدیت شد", this.state.coins);
  },

  updateCoinPrice(symbol, newPrice) {
    const coinKey = symbol.toLowerCase();

    if (this.state.coins[coinKey]) {
      this.state.coins[coinKey].price = newPrice;
      this.state.lastUpdate = new Date();
      console.log("قیمت ها ابدیت شد ", this.state.coins.price);
    }
  },

  setActiveProvider(providerName) {
    this.state.activeProvider = providerName;
    console.log(`🔌 منبع داده تغییر کرد به: ${providerName}`);
  },
};
