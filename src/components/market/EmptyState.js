export const renderMarketEmptyState = (
  title = "ارزی پیدا نشد",
  description = "عبارت جستجو را تغییر بده یا بعداً دوباره امتحان کن.",
) => {
  return `
    <div class="bg-white dark:bg-white/5 border border-gray-200 dark:border-transparent rounded-[2.5rem] p-10 shadow-xl dark:shadow-2xl">
      <div class="text-center py-12">
        <div class="text-5xl mb-4">🔎</div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          ${title}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          ${description}
        </p>
      </div>
    </div>
  `;
};
