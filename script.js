const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

toggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  toggle.textContent = isDark ? "🌙" : "☀️";
});
// 🚀 REAL SUBMISSION
const form = document.getElementById("submissionForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:4000/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
        type: type.value,
        source: source.value
      })
    });

    if (res.ok) {
      alert("🌙 Submission sent into orbit!");
      form.reset();
    } else {
      alert("❌ Submission failed");
    }
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
// 🔐 LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      window.location.href =
        data.role === "admin" ? "admin.html" : "submit.html";
    } else {
      alert("❌ Invalid login");
    }
  });
}
