import { exchangeStore } from "../../store/exchangeStore.js";
import { CoinRow } from "./CoinRow.js";

export const renderCoinList = () => {
  const coins = Object.values(exchangeStore.state.coins);
  return coins
    .map((coin) => {
      if (!coin.name) console.warn("هشدار: این کوین اسم ندارد!", coin);
      return CoinRow(coin);
    })
    .join("");
};
