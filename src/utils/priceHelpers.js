const PRICE_UP_CLASSES = "text-green-600 dark:text-green-400";
const PRICE_DOWN_CLASSES = "text-red-600 dark:text-red-400";
const PRICE_NEUTRAL_CLASSES = "text-gray-900 dark:text-white";
const CHANGE_UP_CLASSES = "text-green-600 dark:text-green-400";
const CHANGE_DOWN_CLASSES = "text-red-600 dark:text-red-400";

const PRICE_CLASS_POOL = [
  ...PRICE_UP_CLASSES.split(" "),
  ...PRICE_DOWN_CLASSES.split(" "),
  ...PRICE_NEUTRAL_CLASSES.split(" "),
];

const CHANGE_CLASS_POOL = [
  ...CHANGE_UP_CLASSES.split(" "),
  ...CHANGE_DOWN_CLASSES.split(" "),
];

export const normalizeSymbol = (symbol = "") =>
  String(symbol).trim().toLowerCase();

export const formatPrice = (value = 0) =>
  Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });

export const formatPercentage = (value = 0) =>
  `${Math.abs(Number(value) || 0).toFixed(2)}%`;

export const safeParse = (value) => {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  const parsed = Number(
    String(value).replaceAll(",", "").replaceAll("$", "").trim(),
  );

  return Number.isFinite(parsed) ? parsed : 0;
};

export const getChangeMeta = (change24h = 0) => {
  const value = Number(change24h) || 0;
  const isUp = value >= 0;

  return {
    value,
    isUp,
    arrow: isUp ? "▲" : "▼",
    className: isUp ? CHANGE_UP_CLASSES : CHANGE_DOWN_CLASSES,
    markup: `
      <span>${isUp ? "▲" : "▼"}</span>
      <span dir="ltr">${formatPercentage(value)}</span>
    `,
  };
};

export const setPriceElement = (symbol, newPrice) => {
  const normalizedSymbol = normalizeSymbol(symbol);
  const element = document.getElementById(`price-${normalizedSymbol}`);

  if (!element) {
    return;
  }

  const nextPrice = Number(newPrice) || 0;
  const oldPrice = safeParse(element.dataset.price ?? element.textContent);

  element.textContent = `$${formatPrice(nextPrice)}`;
  element.classList.remove(...PRICE_CLASS_POOL);

  if (nextPrice > oldPrice) {
    element.classList.add(...PRICE_UP_CLASSES.split(" "));
  } else if (nextPrice < oldPrice) {
    element.classList.add(...PRICE_DOWN_CLASSES.split(" "));
  } else {
    element.classList.add(...PRICE_NEUTRAL_CLASSES.split(" "));
  }

  element.dataset.price = String(nextPrice);
};

export const setChangeElement = (symbol, change24h) => {
  const normalizedSymbol = normalizeSymbol(symbol);
  const element = document.getElementById(`change-${normalizedSymbol}`);

  if (!element) {
    return;
  }

  const { className, markup, value } = getChangeMeta(change24h);

  element.innerHTML = markup;
  element.classList.remove(...CHANGE_CLASS_POOL);
  element.classList.add(...className.split(" "));
  element.dataset.change = String(value);
};
