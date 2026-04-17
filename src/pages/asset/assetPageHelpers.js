import { formatPrice } from "../../utils/priceHelpers.js";

export const getAssetDescription = (symbol) => {
  const descriptions = {
    btc: "بیت‌کوین اولین و شناخته‌شده‌ترین ارز دیجیتال بازار است و معمولاً نقش رهبر بازار را دارد.",
    eth: "اتریوم زیرساخت اصلی قراردادهای هوشمند و تعداد زیادی از پروژه‌های وب ۳ است.",
    bnb: "بی‌ان‌بی ارز بومی اکوسیستم بایننس است و در پرداخت کارمزد و سرویس‌های مختلف کاربرد دارد.",
    sol: "سولانا به خاطر سرعت بالا و کارمزد پایین شناخته می‌شود و در پروژه‌های DeFi و NFT محبوب است.",
    xrp: "ریپل بیشتر با هدف انتقال سریع ارزش و پرداخت‌های بین‌المللی شناخته می‌شود.",
    ada: "کاردانو روی توسعه مرحله‌ای و پژوهش‌محور تمرکز دارد.",
    doge: "دوج‌کوین از یک میم‌کوین شروع شد ولی به خاطر جامعه کاربری بزرگش همچنان محبوب است.",
    ton: "تون‌کوین به اکوسیستم TON مربوط است و روی سرعت و مقیاس‌پذیری تمرکز دارد.",
    trx: "ترون شبکه‌ای است که روی انتقال سریع دارایی و اپلیکیشن‌های غیرمتمرکز کار می‌کند.",
    avax: "آوالانچ برای ساخت اپلیکیشن‌های غیرمتمرکز و ساب‌نت‌ها شناخته می‌شود.",
  };

  return descriptions[symbol] || "اطلاعات تکمیلی این دارایی هنوز ثبت نشده است.";
};

export const renderAssetHistoryList = (history = []) => {
  if (!history.length) {
    return `
      <li class="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
        هنوز سابقه قیمتی ثبت نشده است.
      </li>
    `;
  }

  return history
    .slice(0, 10)
    .map((item, index, items) => {
      const previousPrice = items[index + 1]?.price ?? item.price;
      const isUp = Number(item.price) >= Number(previousPrice);

      return `
        <li class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-white/5 text-sm">
          <span class="text-gray-500 dark:text-gray-400">${item.time}</span>
          <span class="font-mono font-bold ${isUp ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}">
            $${formatPrice(item.price)}
          </span>
        </li>
      `;
    })
    .join("");
};

export const renderInfoCard = (label, value) => {
  return `
    <div class="rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4">
      <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">${label}</div>
      <div class="font-bold text-gray-900 dark:text-white">${value}</div>
    </div>
  `;
};
