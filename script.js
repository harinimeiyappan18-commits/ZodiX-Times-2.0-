const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

toggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  toggle.textContent = isDark ? "🌙" : "☀️";
});
// 🚀 Submission Logic (Frontend MVP)
const form = document.getElementById("submissionForm");
const statusCard = document.getElementById("statusCard");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Fake submit delay ✨
    setTimeout(() => {
      form.reset();
      statusCard.classList.remove("hidden");
      statusCard.scrollIntoView({ behavior: "smooth" });
    }, 600);
  });
}
