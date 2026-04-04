import { CoinRow } from "./CoinRow.js";

export const renderCoinList = (coins = []) =>
  coins
    .map((coin) => {
      if (!coin?.name && !coin?.symbol) {
        console.warn("هشدار: داده‌ی کوین ناقص است.", coin);
      }

      return CoinRow(coin);
    })
    .join("");
