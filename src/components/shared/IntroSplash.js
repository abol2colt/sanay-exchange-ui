import $ from "jquery";
import introLogo from "../../assets/images/LOGOSANAYEX.png";

const INTRO_ROOT_ID = "intro-splash";

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

export const mountIntroSplash = () => {
  if (document.getElementById(INTRO_ROOT_ID)) {
    return;
  }

  $("body").append(`
    <div id="${INTRO_ROOT_ID}" class="intro-splash">
      <div class="intro-splash-bg"></div>
      <div
        class="intro-splash-logo"
        style="background-image: url('${introLogo}')"
      ></div>
    </div>
  `);
};

export const playIntroSplashSequence = async () => {
  const $splash = $("#intro-splash");

  if (!$splash.length) {
    return;
  }

  await wait(120);

  $splash.addClass("is-logo-visible");
  await wait(2000);

  $splash.removeClass("is-logo-visible").addClass("is-logo-hidden");
  await wait(700);
};

export const revealAppFromIntro = async () => {
  const $splash = $("#intro-splash");

  if (!$splash.length) {
    return;
  }

  $splash.addClass("is-app-reveal");
  await wait(850);
  $splash.remove();
};
