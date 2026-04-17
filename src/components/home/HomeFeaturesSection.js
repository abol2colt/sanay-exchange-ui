export const renderHomeFeaturesSection = () => {
  return `
    <section
      id="home-features-section"
      class="home-section-shell"
    >
      <div class="home-section-container">
        <div class="home-section-copy">
          <h2 class="home-section-title">امنیت، اعتماد، سرعت</h2>
          <p class="home-section-text">
            این بخش بعداً با کارت‌های feature و انیمیشن‌های اسکرول کامل می‌شود.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div class="home-feature-card">
            Security
          </div>
          <div class="home-feature-card">
            Privacy
          </div>
          <div class="home-feature-card">
            Realtime Data
          </div>
          <div class="home-feature-card">
            Watchlist
          </div>
        </div>
      </div>
    </section>
  `;
};
