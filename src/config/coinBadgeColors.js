export const COIN_BADGE_COLORS = {
  btc: "bg-orange-500",
  eth: "bg-blue-500",
  bnb: "bg-yellow-500",
  sol: "bg-purple-500",
  xrp: "bg-sky-500",
  ada: "bg-indigo-600",
  doge: "bg-yellow-600",
  ton: "bg-cyan-500",
  trx: "bg-red-500",
  avax: "bg-rose-500",
};

export const getCoinBadgeColor = (symbol) => {
  return COIN_BADGE_COLORS[symbol] || "bg-gray-600";
};
