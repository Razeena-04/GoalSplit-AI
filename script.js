/* ─────────────────────────────────────────────
   GoalSplit AI - script.js
   Supports: AI mode (Claude API) + Quick mode (random)
───────────────────────────────────────────── */

let currentMode = "ai";

function setMode(mode) {
  currentMode = mode;
  document.getElementById("modeAI").classList.toggle("active", mode === "ai");
  document.getElementById("modeRandom").classList.toggle("active", mode === "random");
  document.getElementById("apiKeyGroup").style.display = mode === "ai" ? "block" : "none";
}

function showError(msg) {
  const el = document.getElementById("errorMsg");
  el.textContent = msg;
}

function clearError() {
  document.getElementById("errorMsg").textContent = "";
}

function setLoading(on) {
  document.getElementById("loadingOverlay").classList.toggle("visible", on);
  document.getElementById("generateBtn").disabled = on;
  document.getElementById("formSection").style.opacity = on ? "0.5" : "1";
}

async function generatePlan() {
  clearError();

  const goal = document.getElementById("goal").value.trim();
  const days = parseInt(document.getElementById("days").value);
  const hours = parseFloat(document.getElementById("hours").value);

  if (!goal) return showError("Please enter your goal.");
  if (!days || days < 1) return showError("Please enter a valid number of days.");
  if (!hours || hours < 0.5) return showError("Please enter valid hours per day.");

  if (currentMode === "ai") {
    const apiKey = document.getElementById("apiKey").value.trim();
    if (!apiKey) return showError("Please enter your Claude API key.");
    await generateWithAI(goal, days, hours, apiKey);
  } else {
    generateWithRandom(goal, days, hours);
  }
}

/* ── AI Mode ─────────────────────────────── */
async function generateWithAI(goal, days, hours, apiKey) {
  setLoading(true);

  const prompt = `You are a productivity coach. Create a ${days}-day learning/action plan for this goal: "${goal}"
The user can dedicate ${hours} hours per day.

Return ONLY valid JSON — no markdown, no explanation. Format:
[
  {
    "day": 1,
    "focus": "Short focus theme for the day",
    "tasks": [
      {
        "title": "Task title",
        "description": "Brief description of what to do",
        "estimated_time": "X hours"
      }
    ]
  }
]

Rules:
- Each day should have 2-4 tasks
- Tasks should total to approximately ${hours} hours
- Make the plan progressive and realistic
- Be specific to the goal: "${goal}"
- Return ONLY the JSON array, nothing else`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content[0].text.trim();

    let plan;
    try {
      // Strip markdown fences if present
      const clean = text.replace(/```json|```/g, "").trim();
      plan = JSON.parse(clean);
    } catch {
      throw new Error("AI returned invalid JSON. Please try again.");
    }

    setLoading(false);
    renderPlan(plan, goal, days, "ai");

  } catch (err) {
    setLoading(false);
    showError("❌ " + err.message);
  }
}

/* ── Quick/Random Mode ───────────────────── */
function generateWithRandom(goal, days, hours) {
  const actions = [
    { title: "Research & Overview", desc: "Study the fundamentals and get a broad understanding of the topic." },
    { title: "Watch Tutorial Videos", desc: "Follow video guides and take structured notes on key concepts." },
    { title: "Hands-on Practice", desc: "Apply what you learned through practical exercises." },
    { title: "Build a Mini Project", desc: "Create a small project to reinforce your understanding." },
    { title: "Review & Revise", desc: "Go back through your notes and identify weak areas." },
    { title: "Solve Practice Problems", desc: "Work through exercises to test your knowledge." },
    { title: "Read Documentation", desc: "Deep dive into official docs and reference materials." },
    { title: "Join Community & Ask Questions", desc: "Engage with others learning the same topic online." },
    { title: "Test & Debug", desc: "Identify issues in your work and improve your approach." },
    { title: "Apply Knowledge", desc: "Use what you've learned in a real-world context." }
  ];

  const plan = [];
  for (let day = 1; day <= days; day++) {
    const taskCount = Math.floor(Math.random() * 3) + 2; // 2–4 tasks
    const tasks = [];
    const shuffled = [...actions].sort(() => Math.random() - 0.5).slice(0, taskCount);

    shuffled.forEach(a => {
      tasks.push({
        title: a.title,
        description: `${a.desc} Focus: "${goal}"`,
        estimated_time: `${(hours / taskCount).toFixed(1)} hrs`
      });
    });

    plan.push({ day, focus: `Day ${day} Focus`, tasks });
  }

  renderPlan(plan, goal, days, "random");
}

/* ── Render Plan ─────────────────────────── */
function renderPlan(plan, goal, days, mode) {
  document.getElementById("formSection").style.display = "none";
  document.getElementById("resultsSection").classList.add("visible");

  document.getElementById("resultsHeader").innerHTML = `
    <h2>Your ${days}-Day Plan</h2>
    <p>Goal: <strong>${escapeHtml(goal)}</strong> &nbsp;·&nbsp; ${mode === "ai" ? "🤖 AI Generated" : "🎲 Quick Plan"}</p>
  `;

  const grid = document.getElementById("planGrid");
  grid.innerHTML = "";

  plan.forEach((day, i) => {
    const card = document.createElement("div");
    card.className = "day-card";
    card.style.animationDelay = `${i * 0.05}s`;

    const tasksHtml = day.tasks.map(t => `
      <div class="task-item">
        <div class="task-title">${escapeHtml(t.title)}</div>
        <div class="task-desc">${escapeHtml(t.description)}</div>
        <div class="task-time">⏱ ${escapeHtml(t.estimated_time)}</div>
      </div>
    `).join("");

    card.innerHTML = `
      <div class="day-header">DAY ${day.day}${day.focus ? ` — ${escapeHtml(day.focus)}` : ""}</div>
      ${tasksHtml}
    `;
    grid.appendChild(card);
  });
}

function resetForm() {
  document.getElementById("formSection").style.display = "block";
  document.getElementById("formSection").style.opacity = "1";
  document.getElementById("resultsSection").classList.remove("visible");
  document.getElementById("goal").value = "";
  document.getElementById("days").value = "";
  document.getElementById("hours").value = "";
  clearError();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Init
setMode("ai");
