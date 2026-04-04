import $ from "jquery";

export const initTheme = () => {
  const saved = localStorage.getItem("theme") || "dark";
  // اعمال مستقیم روی تگ html
  if (saved === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export const toggleTheme = () => {
  const html = document.documentElement;
  const isDark = html.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  console.log("تم تغییر کرد به:", isDark ? "Dark" : "Light");
};

export const setupThemeListener = () => {
  $(document)
    .off("click", "#theme-toggle")
    .on("click", "#theme-toggle", (e) => {
      e.preventDefault();
      toggleTheme();
    });
};
