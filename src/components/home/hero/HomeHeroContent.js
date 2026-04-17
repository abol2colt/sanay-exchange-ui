export const renderHomeHeroContent = () => {
  return `
    <div class="home-hero-copy">
      <span class="home-chip">
        صرافی Sanay
      </span>

      <div class="space-y-6">
        <h1 class="home-hero-title">
          تجربه‌ای مدرن برای
          <br />
          رصد و مدیریت بازار کریپتو
        </h1>

        <p class="home-hero-text">
          Sanay یک تجربه کامل و حرفه‌ای شبیه صرافی واقعی می‌سازد؛
          از بازار و واچ‌لیست تا صفحه دارایی و چارت، با تمرکز روی سرعت، وضوح و طراحی سطح‌بالا.
        </p>
      </div>

      <div class="flex flex-wrap gap-4 pt-2">
        <a
          href="#login"
          class="home-cta-primary"
        >
          شروع تجربه
        </a>

        <a
          href="#market"
          class="home-cta-secondary"
        >
          مشاهده بازار
        </a>
      </div>

      <div class="home-hero-trust-row">
        <span class="home-hero-trust-chip">رابط مدرن</span>
        <span class="home-hero-trust-chip">داده زنده</span>
        <span class="home-hero-trust-chip">تجربه صرافی کامل</span>
      </div>

      <div class="home-hero-metrics">
        <div class="home-hero-metric-card">
          <span class="home-hero-metric-value">10+</span>
          <span class="home-hero-metric-label">دارایی فعال</span>
        </div>

        <div class="home-hero-metric-card">
          <span class="home-hero-metric-value">Live</span>
          <span class="home-hero-metric-label">منبع قیمت پویا</span>
        </div>

        <div class="home-hero-metric-card">
          <span class="home-hero-metric-value">Mock</span>
          <span class="home-hero-metric-label">معامله نمایشی</span>
        </div>
      </div>
    </div>
  `;
};
