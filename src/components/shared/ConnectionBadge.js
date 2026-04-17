import $ from "jquery";
import { exchangeStore } from "../../store/exchangeStore.js";

const getConnectionBadgeTone = (phase) => {
  switch (phase) {
    case "live":
      return {
        wrapper:
          "border-green-200 bg-green-50 text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-300",
        dot: "bg-green-500",
        pulse: "",
        liveChip: "bg-green-500 text-black",
      };

    case "connecting":
      return {
        wrapper:
          "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-500/20 dark:bg-yellow-500/10 dark:text-yellow-300",
        dot: "bg-yellow-400",
        pulse: "animate-pulse",
        liveChip: "bg-yellow-400 text-black",
      };

    case "degraded":
      return {
        wrapper:
          "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300",
        dot: "bg-red-500",
        pulse: "",
        liveChip: "bg-red-500 text-white",
      };

    default:
      return {
        wrapper:
          "border-gray-200 bg-gray-50 text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300",
        dot: "bg-gray-400",
        pulse: "",
        liveChip: "bg-gray-300 text-black dark:bg-white/20 dark:text-white",
      };
  }
};

const getProviderLabel = (provider) => {
  if (!provider || provider === "None") {
    return "No Socket";
  }

  return provider;
};

export const renderConnectionBadge = () => {
  const { phase, provider, isLive } =
    exchangeStore.getConnectionStatusSnapshot();
  const tone = getConnectionBadgeTone(phase);
  const label = getProviderLabel(provider);

  return `
    <div class="relative">
      ${
        isLive
          ? `
            <span class="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[9px] font-black tracking-[0.18em] ${tone.liveChip}">
              LIVE
            </span>
          `
          : ""
      }

      <div class="flex items-center gap-2 rounded-2xl border px-3 py-2 min-w-[120px] justify-center ${tone.wrapper}">
        <span class="inline-flex h-2.5 w-2.5 rounded-full ${tone.dot} ${tone.pulse}"></span>
        <span class="text-xs font-black tracking-wide uppercase">
          ${label}
        </span>
      </div>
    </div>
  `;
};

export const refreshConnectionBadge = () => {
  const $badge = $("#navbar-connection-badge");

  if (!$badge.length) {
    return;
  }

  $badge.html(renderConnectionBadge());
};
