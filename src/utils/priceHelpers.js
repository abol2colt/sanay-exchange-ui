// تو این فایل helper های مربوط به قیمت و DOM گذاشته میشه
export const formatPrice = (num) => {
  return Number(Math.round(num)).toLocaleString();
};

export const safeParse = (v) => {
  const n = Number(String(v).replaceAll(",", "").replaceAll("$", "").trim());
  return Number.isFinite(n) ? n : 0;
};

/*
  setPriceElement:
    - المان price را پیدا می‌کند (id بر پایه symbol)
    - مقایسه old/new از dataset انجام می‌شود
    - رنگ صحیح را اعمال می‌کند (green / red)
    - مقدار dataset.price را آپدیت می‌کند
    - innerText را با formatPrice می‌نویسد
*/
export const setPriceElement = (symbol, newPrice) => {
  const id = `price-${symbol.toLowerCase()}`;
  const el = document.getElementById(id);
  if (!el) return;

  // مقدار عددی قدیم را از data-price بخوان یا fallback به parse از متن
  const oldPrice = safeParse(el.dataset.price ?? el.innerText);

  // تنظیم متن قابل‌نمایش
  el.textContent = `$${formatPrice(newPrice)}`;

  // آپدیت color: remove both then add correct one
  el.classList.remove("text-green-400", "text-red-400");

  if (newPrice > oldPrice) {
    el.classList.add("text-green-400");
  } else if (newPrice < oldPrice) {
    el.classList.add("text-red-400");
  } else {
  }

  // store numeric price in DOM for next comparisons (source-of-truth in DOM)
  el.dataset.price = String(Number(newPrice));
};
