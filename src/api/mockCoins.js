export const fetchTopCoins = async () => {
  // const coins = localStorage.getItem("crypto_history");
  // const safecoins = coins.json.parse
  // if (safecoins.length >= 1) {
  //   return { coins };
  // } else {
  return {
    btc: {
      name: "Bitcoin",
      symbol: "btc",
      price: 68000,
      change24h: 2.45,
      image: "https://static.nobitex.ir/c/icons/coins/btc.png",
    },

    eth: {
      name: "Ethereum",
      symbol: "eth",
      price: 3200,
      change24h: 1.92,
      image: "https://static.nobitex.ir/c/icons/coins/eth.png",
    },

    bnb: {
      name: "BNB",
      symbol: "bnb",
      price: 580,
      change24h: 0.84,
      image: "https://static.nobitex.ir/c/icons/coins/bnb.png",
    },

    sol: {
      name: "Solana",
      symbol: "sol",
      price: 145,
      change24h: 3.61,
      image: "https://static.nobitex.ir/c/icons/coins/sol.png",
    },

    xrp: {
      name: "Ripple",
      symbol: "xrp",
      price: 0.62,
      change24h: -1.12,
      image: "https://static.nobitex.ir/c/icons/coins/xrp.png",
    },

    ada: {
      name: "Cardano",
      symbol: "ada",
      price: 0.71,
      change24h: 0.43,
      image: "https://static.nobitex.ir/c/icons/coins/ada.png",
    },

    doge: {
      name: "Dogecoin",
      symbol: "doge",
      price: 0.18,
      change24h: 4.11,
      image: "https://static.nobitex.ir/c/icons/coins/doge.png",
    },

    ton: {
      name: "Toncoin",
      symbol: "ton",
      price: 5.84,
      change24h: -0.58,
      image: "https://static.nobitex.ir/c/icons/coins/ton.png",
    },

    trx: {
      name: "TRON",
      symbol: "trx",
      price: 0.14,
      change24h: 1.06,
      image: "https://static.nobitex.ir/c/icons/coins/trx.png",
    },

    avax: {
      name: "Avalanche",
      symbol: "avax",
      price: 36.2,
      change24h: 2.74,
      image: "https://static.nobitex.ir/c/icons/coins/avax.png",
    },
  };
};
