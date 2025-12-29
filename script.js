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
// 🛡️ Admin Review Actions
document.querySelectorAll(".admin-card").forEach(card => {
  const status = card.querySelector(".admin-status");

  card.querySelector(".approve").addEventListener("click", () => {
    status.textContent = "⭐ Approved";
    status.style.color = "#4caf50";
  });

  card.querySelector(".edit").addEventListener("click", () => {
    status.textContent = "💫 Needs Edits";
    status.style.color = "#ff9800";
  });

  card.querySelector(".reject").addEventListener("click", () => {
    status.textContent = "❌ Rejected";
    status.style.color = "#e53935";
  });
});
