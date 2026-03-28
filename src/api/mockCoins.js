export const fetchTopCoins = async () => {
  return {
    btc: {
      name: "Bitcoin",
      symbol: "btc",
      price: 68000,
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    },

    eth: {
      name: "Ethereum",
      symbol: "eth",
      price: 3200,
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    },

    bnb: {
      name: "BNB",
      symbol: "bnb",
      price: 580,
      image: "https://assets.coingecko.com/coins/images/825/large/bnb.png",
    },
  };
};
