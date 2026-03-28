import { exchangeStore } from "../store/exchangeStore.js";
export const startPriceWebsocket = (symbols) => {
  //(example = btcusdt/ethusdt)
  const streams = symbols.map((s) => `${s.toLowerCase()}usdt@ticker`).join("/");

  const url = `wss://data-stream.binance.vision/stream?streams=${streams}`;
  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("Binance WebSocket Connected");
  };

  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    const ticker = msg.data;

    const rawSymbol = ticker.s.replace("USDT", "").toLowerCase();
    const newPrice = parseFloat(ticker.c);

    exchangeStore.updateCoinPrice(rawSymbol, newPrice);
    updatePriceDOM(rawSymbol, newPrice);
    console.log("price update", rawSymbol, newPrice);
  };
  const updatePriceDOM = (symbol, price) => {
    const el = document.getElementById(`price-${symbol}`);

    if (!el) return;

    el.innerText = `$${price.toLocaleString()}`;
  };
  return socket;
};
