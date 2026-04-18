const FEATURES = [
  {
    eyebrow: "Security",
    title: "امنیت چندلایه",
    text: "ساختار محصول طوری چیده شده که جریان‌ها شفاف، stateها کنترل‌شده و وضعیت اتصال همیشه قابل‌فهم بماند.",
  },
  {
    eyebrow: "Realtime",
    title: "داده زنده و fallback",
    text: "بین Binance، Nobitex و Fake fallback داریم تا تجربه بازار حتی هنگام قطعی یا خطا هم متوقف نشود.",
  },
  {
    eyebrow: "Watchlist",
    title: "رصد سریع دارایی‌ها",
    text: "کاربر می‌تواند ارزهای مهم را جدا کند و خیلی سریع‌تر روی market flow و asset flow خودش تمرکز کند.",
  },
  {
    eyebrow: "Asset Flow",
    title: "جریان شفاف محصول",
    text: "از لیست بازار تا صفحه دارایی و بازشدن مودال، مسیرها ساده، روشن و قابل‌ردیابی نگه داشته شده‌اند.",
  },
];

const FEATURE_SUMMARY_ITEMS = ["اتصال پایدار", "State امن", "Flow شفاف"];

const renderFeatureSummaryStrip = () => {
  return `
    <div class="home-feature-summary-strip">
      ${FEATURE_SUMMARY_ITEMS.map(
        (item) => `<span class="home-feature-summary-chip">${item}</span>`,
      ).join("")}
    </div>
  `;
};
const renderFeatureCard = ({ eyebrow, title, text }) => {
  return `
    <article class="home-feature-card home-feature-card-premium">
      <span class="home-feature-eyebrow">${eyebrow}</span>
      <h3 class="home-feature-title">${title}</h3>
      <p class="home-feature-text">${text}</p>
    </article>
  `;
};

export const renderHomeFeaturesSection = () => {
  return `
    <section id="home-features-section" class="home-section-shell">
      <div class="home-section-container">
        <div class="home-section-copy">
          <h2 class="home-section-title">امنیت، اعتماد، سرعت</h2>
          <p class="home-section-text">
            Sanay فقط ظاهر یک صرافی را نمی‌سازد؛ تجربه‌ای می‌سازد که از نظر ساختار،
            وضوح و جریان محصول حس حرفه‌ای‌تری بدهد.
          </p>
        </div>
        ${renderFeatureSummaryStrip()} 
        <div class="home-preview-grid">
          ${FEATURES.map(renderFeatureCard).join("")}
        </div>
      </div>
    </section>
  `;
};
