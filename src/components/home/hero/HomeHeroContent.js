// Hero text/copy block
export const renderHomeHeroContent = () => {
  return `
    <div class="home-hero-copy">
      <span class="home-chip">
        صرافی Sanay
      </span>

      <div class="space-y-6">
        <h1 class="home-hero-title">
          نسل جدید تجربه‌ی
          <br />
          بازار کریپتو
        </h1>

        <p class="home-hero-text">
          یک تجربه مدرن، سریع و حرفه‌ای برای دنبال‌کردن قیمت‌ها، واچ‌لیست،
          صفحه دارایی و جریان‌های یک صرافی واقعی — بدون موتور واقعی معامله.
        </p>
      </div>

      <div class="flex flex-wrap gap-4 pt-2">
        <a href="#login" class="home-cta-primary">
          شروع تجربه
        </a>

        <a href="#market" class="home-cta-secondary">
          مشاهده بازار
        </a>
      </div>

      <div class="home-hero-trust-row">
        <span class="home-hero-trust-chip">داده زنده</span>
        <span class="home-hero-trust-chip">واچ‌لیست هوشمند</span>
        <span class="home-hero-trust-chip">رابط حرفه‌ای</span>
      </div>

      <div class="home-hero-metrics">
        <div class="home-hero-metric-card">
          <span class="home-hero-metric-value">10+</span>
          <span class="home-hero-metric-label">دارایی فعال</span>
        </div>

        <div class="home-hero-metric-card">
          <span class="home-hero-metric-value">LIVE</span>
          <span class="home-hero-metric-label">قیمت پویا</span>
        </div>

        <div class="home-hero-metric-card">
          <span class="home-hero-metric-value">SMART</span>
          <span class="home-hero-metric-label">جریان محصول</span>
        </div>
      </div>
    </div>
  `;
};
