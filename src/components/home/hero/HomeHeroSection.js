import { renderHomeHeroContent } from "./hero/HomeHeroContent.js";
import { renderHomeHeroVisual } from "./hero/HomeHeroVisual.js";

export const renderHomeHeroSection = () => {
  return `
    <section
      id="home-hero-section"
      class="home-section-shell home-hero-section"
    >
      <div class="home-section-container">
        <div class="home-hero-grid">
          ${renderHomeHeroContent()}
          ${renderHomeHeroVisual()}
        </div>
      </div>
    </section>
  `;
};
