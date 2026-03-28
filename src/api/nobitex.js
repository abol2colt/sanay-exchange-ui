export const fetchNobitexPrice = async (symbol) => {
  const res = await fetch(`https://apiv2.nobitex.ir/v3/orderbook/${symbol}`);
  const data = await res.json();

  return {
    symbol: symbol,
    price: data.lastTradePrice,
  };
};
