export const renderHomeHeroSection = () => {
  return `
    <section
      id="home-hero-section"
      class="home-section-shell justify-center"
    >
      <div class="home-section-container">
        <div class="max-w-3xl space-y-6">
          <span class="home-chip">
            Sanay Exchange
          </span>

          <h1 class="text-5xl md:text-7xl font-black leading-tight">
            آینده معامله را
            <br />
            حرفه‌ای تجربه کن
          </h1>

          <p class="text-base md:text-lg text-gray-400 leading-8 max-w-2xl">
            خرید، رصد بازار، واچ‌لیست و بررسی دارایی‌ها در یک تجربه مدرن و سریع.
          </p>

          <div class="flex flex-wrap gap-4 pt-4">
            <a
              href="#login"
              class="home-cta-secondary"
            >
              Start Trading
            </a>

            <a
              href="#market"
              class="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold transition-all"
            >
              Explore Market
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
};
