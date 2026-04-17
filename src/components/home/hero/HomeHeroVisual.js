export const renderHomeHeroVisual = () => {
  return `
    <div class="home-hero-visual">
      <div class="home-hero-glow home-hero-glow-one"></div>
      <div class="home-hero-glow home-hero-glow-two"></div>

      <div class="home-hero-device">
        <div class="home-hero-device-top">
          <span class="home-hero-device-chip">SANAY</span>
          <span class="home-hero-device-status">رابط زنده</span>
        </div>

        <div class="home-hero-device-body">
          <div class="home-hero-chart-card">
            <div class="home-hero-chart-header">
              <span>نبض بازار</span>
              <span>BTC / ETH / SOL</span>
            </div>

            <div class="home-hero-chart-line">
              <span class="home-hero-line home-hero-line-one"></span>
              <span class="home-hero-line home-hero-line-two"></span>
              <span class="home-hero-line home-hero-line-three"></span>
            </div>
          </div>

          <div class="home-hero-order-card">
            <div class="home-hero-order-row">
              <span>قدرت خرید</span>
              <strong>$24,580</strong>
            </div>

            <div class="home-hero-order-row">
              <span>دیده بان</span>
              <strong>BTC / TON</strong>
            </div>

            <div class="home-hero-order-row">
              <span>حالت</span>
              <strong>نمایشی زنده</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="home-floating-card home-floating-card-left">
        <span class="home-floating-label">امنیت</span>
        <strong class="home-floating-value">چندلایه</strong>
      </div>

      <div class="home-floating-card home-floating-card-right">
        <span class="home-floating-label">داده</span>
        <strong class="home-floating-value">پشتیبان‌دار</strong>
      </div>

      <div class="home-coin-orb home-coin-orb-btc">BTC</div>
      <div class="home-coin-orb home-coin-orb-eth">ETH</div>
      <div class="home-coin-orb home-coin-orb-sol">SOL</div>
    </div>
  `;
};
//3D-feel ==> glow، floating card device mock
