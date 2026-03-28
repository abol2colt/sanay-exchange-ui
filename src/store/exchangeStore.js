export const exchangeStore = {
  state: {
    coins: {},
    isLoaded: false,
    lastUpdate: null,
    activeProvider: "None",
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
