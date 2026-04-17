import $ from "jquery";

export const renderLoginPage = () => {
  return `
    <section
      id="login-page"
      class="min-h-[calc(100svh-120px)] flex items-center justify-center px-6 py-16"
    >
      <div class="w-full max-w-md rounded-[2.5rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 shadow-xl dark:shadow-2xl">
        <div class="space-y-3 mb-8 text-center">
          <span class="inline-flex px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-500 text-sm font-bold">
            Sanay
          </span>

          <h1 class="text-3xl font-black text-gray-900 dark:text-white">
            ورود / ثبت‌نام
          </h1>

          <p class="text-sm text-gray-500 dark:text-gray-400 leading-7">
            در این فاز فقط shell صفحه ساخته می‌شود. منطق ثبت‌نام و ورود با localStorage
            در branch جدا پیاده‌سازی می‌شود.
          </p>
        </div>

        <div class="space-y-4">
          <input
            type="text"
            placeholder="نام کاربری یا ایمیل"
            class="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 px-4 py-4 text-gray-900 dark:text-white outline-none"
          />

          <input
            type="password"
            placeholder="رمز عبور"
            class="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 px-4 py-4 text-gray-900 dark:text-white outline-none"
          />

          <button
            type="button"
            class="w-full py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black transition-all"
          >
            ادامه
          </button>
        </div>
      </div>
    </section>
  `;
};

export const mountLoginPage = () => {
  $("#page-root").html(renderLoginPage());
};
