import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let homeScrollMatchMedia = null;
let lenisInstance = null;
let lenisRafId = null;

const HOME_REVEAL_SELECTORS = [
  "#home-features-section .home-section-container",
  "#home-market-preview-section .home-section-container",
];

export const cleanupHomeScrollFoundation = () => {
  if (homeScrollMatchMedia) {
    homeScrollMatchMedia.revert();
    homeScrollMatchMedia = null;
  }

  if (lenisRafId) {
    cancelAnimationFrame(lenisRafId);
    lenisRafId = null;
  }

  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }

  ScrollTrigger.getAll().forEach((trigger) => {
    const id = String(trigger.vars.id || "");

    if (id.startsWith("home-")) {
      trigger.kill();
    }
  });
};

const setupDesktopLenis = () => {
  if (window.innerWidth < 1024) {
    return () => {};
  }

  lenisInstance = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1,
  });

  lenisInstance.on("scroll", ScrollTrigger.update);

  const raf = (time) => {
    if (!lenisInstance) {
      return;
    }

    lenisInstance.raf(time);
    lenisRafId = requestAnimationFrame(raf);
  };

  lenisRafId = requestAnimationFrame(raf);

  return () => {
    if (lenisRafId) {
      cancelAnimationFrame(lenisRafId);
      lenisRafId = null;
    }

    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }
  };
};

export const setupHomeScrollFoundation = () => {
  cleanupHomeScrollFoundation();

  const homePage = document.getElementById("home-page");

  if (!homePage) {
    return;
  }

  homeScrollMatchMedia = gsap.matchMedia();

  homeScrollMatchMedia.add("(min-width: 1024px)", () => {
    const destroyLenis = setupDesktopLenis();

    const heroDevice = document.querySelector(".home-hero-device");
    const floatingItems = gsap.utils.toArray(
      ".home-floating-card, .home-coin-orb",
    );

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        id: "home-hero-flow",
        trigger: "#home-hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 0.7,
      },
    });

    if (heroDevice) {
      heroTimeline.to(
        heroDevice,
        {
          y: -16,
          rotateY: -2,
          rotateX: 2,
          scale: 1.01,
        },
        0,
      );
    }

    if (floatingItems.length) {
      heroTimeline.to(
        floatingItems,
        {
          yPercent: -6,
          stagger: 0.04,
        },
        0,
      );
    }

    return () => {
      heroTimeline.kill();
      destroyLenis();
    };
  });

  HOME_REVEAL_SELECTORS.forEach((selector, index) => {
    const element = document.querySelector(selector);

    if (!element) {
      return;
    }

    gsap.fromTo(
      element,
      {
        y: 52,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          id: `home-reveal-${index}`,
          trigger: element,
          start: "top 84%",
          once: true,
        },
      },
    );
  });

  ScrollTrigger.refresh();
};
