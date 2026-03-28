import { exchangeStore } from "../store/exchangeStore.js";
import { setPriceElement } from "./priceHelpers.js";

const MIN_PRICE = 0.1;
const TICK_MS = 2000;

const randomChange = () => (Math.random() - 0.5) * 50; // -25..+25

export const startFakeMarket = () => {
  setInterval(() => {
    const coins = Object.values(exchangeStore.state.coins);
    coins.forEach((coin) => {
      const current = Number(coin.price) || MIN_PRICE;
      const next = Math.max(MIN_PRICE, current + randomChange());

      coin.price = next;

      setPriceElement(coin.symbol, next);
    });
  }, TICK_MS);
  console.log("Fake Engine Loaded");
};
