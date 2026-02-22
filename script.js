const goalForm = document.getElementById("goalForm");
const loadingOverlay = document.getElementById("loadingOverlay");
const resultsSection = document.getElementById("resultsSection");
const planGrid = document.getElementById("planGrid");
const resultsHeader = document.getElementById("resultsHeader");
const resetBtn = document.getElementById("resetBtn");
const errorMsg = document.getElementById("errorMsg");

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.add("visible");
}

function clearError() {
  errorMsg.textContent = "";
  errorMsg.classList.remove("visible");
}

goalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError();

  const goal = document.getElementById("goal").value.trim();
  const days = document.getElementById("days").value;
  const hours = document.getElementById("hours").value;

  if (!goal || !days || !hours) {
    return showError("All fields are required.");
  }

  loadingOverlay.classList.add("visible");

  try {
    const res = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal, days, hours }),
    });

    const data = await res.json();

    loadingOverlay.classList.remove("visible");

    if (!res.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    renderPlan(data.plan, goal, days);
  } catch (err) {
    loadingOverlay.classList.remove("visible");
    showError(err.message);
  }
});

function renderPlan(plan, goal, days) {
  resultsSection.classList.add("visible");
  planGrid.innerHTML = "";

  resultsHeader.innerHTML = `
    <h2>Your ${days}-Day Plan</h2>
    <p style="color:#aaa;">Goal: ${goal}</p>
  `;

  plan.forEach((day) => {
    const card = document.createElement("div");
    card.className = "day-card";

    card.innerHTML = `
      <div class="day-header">
        <span class="day-badge">Day ${day.day}</span>
      </div>
      ${day.tasks
        .map(
          (task) => `
        <div class="task-item">
          <div class="task-title">${task.title}</div>
          <div class="task-desc">${task.description}</div>
          <div class="task-time">${task.estimated_time}</div>
        </div>
      `
        )
        .join("")}
    `;

    planGrid.appendChild(card);
  });
}

resetBtn.addEventListener("click", () => {
  resultsSection.classList.remove("visible");
  goalForm.reset();
  window.scrollTo({ top: 0, behavior: "smooth" });
});