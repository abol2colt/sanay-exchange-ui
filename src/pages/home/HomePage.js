import { gsap } from "gsap";
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

export const playHomeEntranceAnimation = () => {
  const timeline = gsap.timeline();

  timeline
    .from(".home-hero-copy", {
      opacity: 0,
      y: 38,
      duration: 0.85,
      ease: "power3.out",
    })
    .from(
      ".home-hero-visual",
      {
        opacity: 0,
        y: 46,
        scale: 0.975,
        duration: 0.95,
        ease: "power3.out",
      },
      "-=0.55",
    )
    .from(
      ".home-hero-metric-card",
      {
        opacity: 0,
        y: 26,
        stagger: 0.08,
        duration: 0.55,
        ease: "power3.out",
      },
      "-=0.45",
    )
    .from(
      "#home-features-section .home-section-container",
      {
        opacity: 0,
        y: 34,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.2",
    )
    .from(
      "#home-market-preview-section .home-section-container",
      {
        opacity: 0,
        y: 34,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.35",
    );
};
export const mountHomePage = () => {
  $("#page-root").html(renderHomePage());
  setupHomeScrollFoundation();
};
