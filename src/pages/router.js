import { mountMarketPage } from "./market/MarketPage.js";
import { mountWatchlistPage } from "./watchlist/WatchlistPage.js";
import { mountAssetPage } from "./asset/AssetPage.js";
import { mountLoginPage } from "./login/LoginPage.js";
import { mountHomePage } from "./home/HomePage.js";
import { cleanupHomeScrollFoundation } from "./home/homeScrollFoundation.js";

const DEFAULT_ROUTE = "#home";
const ASSET_ROUTE_PREFIX = "#asset/";

const normalizeHash = (hash = window.location.hash) =>
  String(hash || "")
    .trim()
    .toLowerCase();

export const getCurrentRoute = () => {
  const hash = normalizeHash();

  if (!hash || hash === "#") {
    return {
      page: "home",
      symbol: null,
    };
  }

  if (hash === "#home") {
    return {
      page: "home",
      symbol: null,
    };
  }

  if (hash === "#login") {
    return {
      page: "login",
      symbol: null,
    };
  }

  if (hash === "#market") {
    return {
      page: "market",
      symbol: null,
    };
  }

  if (hash === "#watchlist") {
    return {
      page: "watchlist",
      symbol: null,
    };
  }

  if (hash === "#asset") {
    return {
      page: "asset",
      symbol: null,
    };
  }

  if (hash.startsWith(ASSET_ROUTE_PREFIX)) {
    //                                          #asset/btc?tab=history => btc || null
    const symbol = hash.replace(ASSET_ROUTE_PREFIX, "").split("?")[0] || null;

    return {
      page: "asset",
      symbol,
    };
  }

  return {
    page: "not_found",
    symbol: null,
  };
};

export const navigateToRoute = (hash = DEFAULT_ROUTE) => {
  window.location.hash = hash;
};

export const navigateToAsset = (symbol) => {
  const normalizedSymbol = String(symbol || "")
    .trim()
    .toLowerCase();

  if (!normalizedSymbol) {
    return;
  }

  window.location.hash = `${ASSET_ROUTE_PREFIX}${normalizedSymbol}`;
};

const handleNotFoundRoute = () => {
  navigateToRoute(DEFAULT_ROUTE);
};

export const renderCurrentPage = () => {
  cleanupHomeScrollFoundation();

  const route = getCurrentRoute();

  switch (route.page) {
    case "market":
      mountMarketPage();
      break;

    case "home":
      mountHomePage();
      break;

    case "login":
      mountLoginPage();
      break;

    case "watchlist":
      mountWatchlistPage();
      break;

    case "asset":
      mountAssetPage(route.symbol);
      break;

    default:
      handleNotFoundRoute();
      break;
  }
};
