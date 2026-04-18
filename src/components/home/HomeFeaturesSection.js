// Features / trust section
const FEATURES = [
  {
    eyebrow: "Security",
    title: "امنیت چندلایه",
    text: "مسیرهای اصلی محصول با تمرکز بر ساختار تمیز، وضعیت‌های اتصال روشن و کنترل بهتر state طراحی شده‌اند.",
  },
  {
    eyebrow: "Realtime",
    title: "داده زنده و fallback",
    text: "بین Binance، Nobitex و Fake fallback داریم تا تجربه بازار حتی هنگام خطا هم از کار نیفتد.",
  },
  {
    eyebrow: "Watchlist",
    title: "رصد سریع بازار",
    text: "کاربر می‌تواند ارزهای مهم را جدا کند و سریع‌تر به دارایی‌های مهم خودش برسد.",
  },
  {
    eyebrow: "Asset Flow",
    title: "جریان دارایی شفاف",
    text: "از لیست بازار تا صفحه هر دارایی و بازشدن مودال معامله، مسیرها شفاف و قابل‌فهم نگه داشته شده‌اند.",
  },
];

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

        <div class="home-preview-grid">
          ${FEATURES.map(renderFeatureCard).join("")}
        </div>
      </div>
    </section>
  `;
};
