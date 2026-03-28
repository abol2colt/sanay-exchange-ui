import { CoinList } from "../components/market/CoinList.js";
import { Card } from "../components/ui/Card.js";

export const MarketPage = () => {
  return Card(`
    <h2 class="text-xl font-bold mb-4">
      Market
    </h2>

    ${CoinList()}
  `);
};
