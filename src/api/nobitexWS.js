import * as CentrifugePkg from "centrifuge";
import { exchangeStore } from "../store/exchangeStore.js";
import { setPriceElement } from "../utils/priceHelpers.js";

/**
 * Legendary Nobitex Connection with deep logging
 */
export const startNobitexWS = (symbols, onFallback) => {
  // 1. Precise Constructor Identification (Your proven logic)
  let CentrifugeClass;
  if (typeof CentrifugePkg.Centrifuge === "function") {
    CentrifugeClass = CentrifugePkg.Centrifuge;
  } else if (
    CentrifugePkg.default &&
    typeof CentrifugePkg.default === "function"
  ) {
    CentrifugeClass = CentrifugePkg.default;
  } else if (typeof CentrifugePkg === "function") {
    CentrifugeClass = CentrifugePkg;
  } else {
    CentrifugeClass = window.Centrifuge;
  }

  // Debug Log: Check if the class is actually found
  console.log("🔍 Checking Centrifuge Class:", CentrifugeClass);

  if (!CentrifugeClass) {
    console.error(
      "❌ Critical: Centrifuge library not detected in any format!",
    );
    if (onFallback) onFallback();
    return;
  }

  try {
    // 2. Client Initialization
    const client = new CentrifugeClass(
      "wss://ws.nobitex.ir/connection/websocket",
    );

    client.on("connected", (ctx) => {
      console.log("✅ Nobitex Socket Connected!", ctx);
      exchangeStore.setActiveProvider("Nobitex");
    });

    client.on("disconnected", (ctx) => {
      console.warn("⚠️ Nobitex Disconnected:", ctx);
    });

    client.on("error", (ctx) => {
      console.error("❌ Nobitex Socket Error:", ctx);
    });

    // 3. Subscriptions Logic
    symbols.forEach((symbol) => {
      const upperSymbol = symbol.toUpperCase();
      // Using 'public:market-stats' for more frequent price updates
      const channel = `public:market-stats-${upperSymbol}USDT`;

      console.log(`📡 Attempting to subscribe to: ${channel}`);

      const sub = client.newSubscription(channel);

      sub.on("publication", (ctx) => {
        console.log(`🔔 Data received for ${upperSymbol}:`, ctx.data);

        const data = ctx.data;
        const newPrice = parseFloat(
          data.latest || data.last || data.lastTradePrice || 0,
        );
        if (newPrice > 0) {
          console.log(`🚀 Updating UI for ${upperSymbol}: ${newPrice}`);
          exchangeStore.updateCoinPrice(symbol.toLowerCase(), newPrice);
          setPriceElement(symbol.toLowerCase(), newPrice);
        } else {
          console.warn(
            `⚠️ Received data but no price found for ${upperSymbol}:`,
            data,
          );
        }
      });

      sub.on("subscribing", (ctx) =>
        console.log(`⏳ Subscribing to ${upperSymbol}...`, ctx),
      );
      sub.on("subscribed", (ctx) =>
        console.log(`✅ Subscribed to ${upperSymbol}`, ctx),
      );
      sub.on("error", (ctx) =>
        console.error(`❌ Subscription Error (${upperSymbol}):`, ctx),
      );

      sub.subscribe();
    });

    client.connect();
    return client;
  } catch (error) {
    console.error("❌ Error in startNobitexWS execution:", error);
    if (onFallback) onFallback();
  }
};
