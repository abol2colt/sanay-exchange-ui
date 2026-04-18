import $ from "jquery";
import { renderHomeHeroSection } from "../../components/home/HomeHeroSection.js";
import { renderHomeFeaturesSection } from "../../components/home/HomeFeaturesSection.js";
import { renderHomeMarketPreviewSection } from "../../components/home/HomeMarketPreviewSection.js";
import { setupHomeScrollFoundation } from "./homeScrollFoundation.js";

export const renderHomePage = () => {
  return `
    <section id="home-page" class="space-y-0">
      ${renderHomeHeroSection()}
      ${renderHomeFeaturesSection()}
      ${renderHomeMarketPreviewSection()}
    </section>
  `;
};

export const mountHomePage = () => {
  $("#page-root").html(renderHomePage());
  setupHomeScrollFoundation();
};
