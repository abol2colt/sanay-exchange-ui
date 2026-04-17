export const PRICE_UP_CLASSES = "text-green-500 dark:text-green-400";
export const PRICE_DOWN_CLASSES = "text-red-500 dark:text-red-400";
export const PRICE_NEUTRAL_CLASSES = "text-gray-900 dark:text-white";

export const PRICE_CLASS_POOL = [
  ...PRICE_UP_CLASSES.split(" "),
  ...PRICE_DOWN_CLASSES.split(" "),
  ...PRICE_NEUTRAL_CLASSES.split(" "),
];

export const getCoinDescription = (symbol) => {
  const descriptions = {
    btc: "پادشاه ارزهای دیجیتال و اولین دارایی غیرمتمرکز جهان.",
    eth: "بزرگترین پلتفرم قراردادهای هوشمند و زیربنای دنیای جدید وب ۳.",
    bnb: "ارز کاربردی اکوسیستم بایننس با کاربردهای گسترده در شبکه.",
    sol: "سولانا برای سرعت بالا و کارمزد کم شناخته می‌شود.",
    xrp: "ریپل بیشتر برای انتقال سریع ارزش و پرداخت‌های بین‌المللی شناخته می‌شود.",
    ada: "کاردانو رویکردی مرحله‌ای و پژوهش‌محور در توسعه دارد.",
    doge: "دوج‌کوین با وجود شروع میم‌محور، جامعه کاربری بزرگی دارد.",
    ton: "تون‌کوین به اکوسیستم TON مربوط است و روی مقیاس‌پذیری تمرکز دارد.",
    trx: "ترون برای انتقال سریع دارایی و dAppها استفاده می‌شود.",
    avax: "آوالانچ برای ساخت برنامه‌های غیرمتمرکز و subnetها شناخته می‌شود.",
  };

  return descriptions[symbol] || "اطلاعات تکمیلی در حال به‌روزرسانی است.";
};
