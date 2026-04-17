import $ from "jquery";

const getCurrentNavHash = () => {
  const hash = String(window.location.hash || "")
    .trim()
    .toLowerCase();

  if (!hash || hash === "#") {
    return "#home";
  }

  if (hash.startsWith("#asset/")) {
    return null;
  }

  return hash;
};

const getNavLinkClasses = (route) => {
  const currentHash = getCurrentNavHash();
  const isActive = currentHash === route;

  const baseClasses = "px-4 py-2 rounded-xl text-sm font-bold transition-all";

  const activeClasses = "bg-yellow-500 text-black shadow-lg";

  const idleClasses =
    "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10";

  return `${baseClasses} ${isActive ? activeClasses : idleClasses}`;
};

export const renderMainLayout = () => {
  return `
    <div class="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#0b0e11] dark:text-white transition-colors duration-500">
      <nav
        class="sticky top-0 z-50 bg-white/80 dark:bg-white/5 backdrop-blur-lg border-b border-gray-200 dark:border-white/5 px-6 py-4 flex justify-between items-center"
      >
      <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg"
          >
            <span class="text-black font-black text-xl">S</span>
          </div>

       <div class="flex items-center gap-3">
          <a
            href="#home"
            data-nav-route="#home"
           class="${getNavLinkClasses("#home")}"
          >
            home
          </a>

          <a
            href="#market"
            data-nav-route="#market"
            class="${getNavLinkClasses("#market")}"
            >
            Market
          </a>

          <a
            href="#watchlist"
            data-nav-route="#watchlist"
            class="${getNavLinkClasses("#watchlist")}"
            >
            Watchlist
          </a>

          <a
            href="#login"
            data-nav-route="#login"
           class="${getNavLinkClasses("#login")}"
          >
            login
          </a>

          <button
            id="theme-toggle"
            class="p-3 rounded-2xl bg-gray-200 dark:bg-white/5 border border-transparent dark:border-white/10 hover:bg-gray-300 dark:hover:bg-white/10 transition-all"
          >
            <span class="dark:hidden">🌙</span>
            <span class="hidden dark:inline">☀️</span>
          </button>
        </div>
      </div>
      </nav>

      <main id="page-root" class="max-w-7xl mx-auto p-4 md:p-8"></main>
    </div>
  `;
};

export const refreshMainNavigation = () => {
  const routes = ["#home", "#market", "#watchlist", "#login"];

  routes.forEach((route) => {
    const $link = $(`[data-nav-route="${route}"]`);

    if (!$link.length) {
      return;
    }

    $link.attr("class", getNavLinkClasses(route));
  });
};
