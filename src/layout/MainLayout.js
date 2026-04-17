import { renderConnectionBadge } from "../components/shared/ConnectionBadge.js";
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
            <span class="text-black font-black text-xl">C</span>
          </div>

            <div id="navbar-connection-badge">
              ${renderConnectionBadge()}
            </div>
 
       <div class="flex items-center gap-3">
          <a
            href="#market"
            class="px-4 py-2 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
          >
            Market
          </a>

          <a
            href="#watchlist"
            class="px-4 py-2 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
          >
            Watchlist
          </a>

          <a
            href="#asset"
           class="px-4 py-2 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
          >
            Asset
          </a>

          <button
            id="theme-toggle"
            class="p-3 rounded-2xl bg-gray-200 dark:bg-white/5 border border-transparent dark:border-white/10 hover:bg-gray-300 dark:hover:bg-white/10 transition-all"
          >
            <span class="dark:hidden">🌙</span>
            <span class="hidden dark:inline">☀️</span>
          </button>
        </div>
      </nav>

      <main id="page-root" class="max-w-7xl mx-auto p-4 md:p-8"></main>
    </div>
  `;
};
