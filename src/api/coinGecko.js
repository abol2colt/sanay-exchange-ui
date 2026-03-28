export const fetchTopCoins = async () => {
  const response = await fetch("https://apiv2.nobitex.ir/v3/orderbook/BTCIRT");
  const data = await response.json();
  return data.reduce((acc, coin) => {
    acc[coin.id] = {
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      image: coin.image,
    };
    console.log(acc);
    return acc;
  }, {});
};
