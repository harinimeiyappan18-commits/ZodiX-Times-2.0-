const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

toggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  toggle.textContent = isDark ? "🌙" : "☀️";
});
