import { exchangeStore } from "../store/exchangeStore.js";
const MIN_PRICE = 0.1;
const TICK_MS = 2000;
const MAX_PRICE_DELTA = 25;
const MAX_CHANGE_DELTA = 1.5;
//                             random 0/1 - 0.5
const randomDelta = (range) => (Math.random() - 0.5) * (range * 2);

const calculateNextPrice = (currentPrice) =>
  Math.max(MIN_PRICE, currentPrice + randomDelta(MAX_PRICE_DELTA));

const calculateNextChange = (currentChange = 0) =>
  currentChange + randomDelta(MAX_CHANGE_DELTA);

export const startFakeMarket = (onTicker = () => {}) => {
  const intervalId = setInterval(() => {
    const coins = exchangeStore.getAllCoinsSnapshot();

    coins.forEach((coin) => {
      const nextPrice = calculateNextPrice(Number(coin.price) || MIN_PRICE);
      const nextChange = calculateNextChange(Number(coin.change24h) || 0);

      onTicker({
        symbol: coin.symbol,
        price: nextPrice,
        change24h: nextChange,
      });
    });
  }, TICK_MS);

  return intervalId;
};
