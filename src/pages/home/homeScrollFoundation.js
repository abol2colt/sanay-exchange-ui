import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let homeScrollMatchMedia = null;

const HOME_REVEAL_SELECTORS = [
  "#home-features-section .home-section-container",
  "#home-market-preview-section .home-section-container",
];

export const cleanupHomeScrollFoundation = () => {
  if (homeScrollMatchMedia) {
    homeScrollMatchMedia.revert();
    homeScrollMatchMedia = null;
  }

  ScrollTrigger.getAll().forEach((trigger) => {
    const id = String(trigger.vars.id || "");
    if (id.startsWith("home-")) {
      trigger.kill();
    }
  });
};

export const setupHomeScrollFoundation = () => {
  cleanupHomeScrollFoundation();

  const homePage = document.getElementById("home-page");

  if (!homePage) {
    return;
  }

  homeScrollMatchMedia = gsap.matchMedia();

  homeScrollMatchMedia.add("(min-width: 1024px)", () => {
    const heroCopy = document.querySelector(".home-hero-copy");
    const heroDevice = document.querySelector(".home-hero-device");
    const floatingItems = gsap.utils.toArray(
      ".home-floating-card, .home-coin-orb",
    );

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        id: "home-hero-pin",
        trigger: "#home-hero-section",
        start: "top top",
        end: "+=45%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    if (heroCopy) {
      heroTimeline.to(
        heroCopy,
        {
          y: -36,
          autoAlpha: 0.92,
        },
        0,
      );
    }

    if (heroDevice) {
      heroTimeline.to(
        heroDevice,
        {
          y: -18,
          rotateY: -3,
          rotateX: 2,
          scale: 1.02,
        },
        0,
      );
    }

    if (floatingItems.length) {
      heroTimeline.to(
        floatingItems,
        {
          yPercent: -10,
          stagger: 0.04,
        },
        0,
      );
    }

    return () => {
      heroTimeline.kill();
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
        y: 64,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          id: `home-reveal-${index}`,
          trigger: element,
          start: "top 78%",
          once: true,
        },
      },
    );
  });

  ScrollTrigger.create({
    id: "home-soft-snap",
    trigger: "#home-page",
    start: "top top",
    end: "bottom bottom",
    snap: {
      snapTo: [0, 0.5, 1],
      duration: { min: 0.2, max: 0.6 },
      delay: 0.08,
      ease: "power1.inOut",
    },
  });

  ScrollTrigger.refresh();
};
