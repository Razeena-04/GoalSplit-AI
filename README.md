# 🎯 GoalSplit AI

**GoalSplit AI** is a simple web application that helps students break big goals into structured daily micro-tasks using AI.

The app takes a big goal and transforms it into an actionable day-by-day plan based on deadline and daily available hours.

---

## 🚀 Features

✅ Simple and clean dark-theme UI  
✅ Goal → Micro-task breakdown using AI  
✅ Input fields:
- Goal description
- Deadline (number of days)
- Hours available per day

✅ Two modes:
- 🤖 **AI Mode** — Claude AI generates smart, goal-specific plans
- 🎲 **Quick Mode** — Instant plan, no API key needed

✅ AI generates structured daily tasks:
- Task title
- Small description
- Estimated time

✅ Loading spinner while AI is generating response  
✅ Basic error handling  
✅ Responsive design  

---

## 🛠️ Tech Stack

- **HTML5** — Structure
- **CSS3** — Modern Dark Theme
- **Vanilla JavaScript** — Logic & API calls
- **Claude API** (Anthropic) — AI plan generation

> ⚡ No backend needed — fully static site!

---

## 📂 Folder Structure

```
GoalSplit-AI/
│
├── index.html       # Main page
├── style.css        # Dark theme styles
├── script.js        # AI + Quick plan logic
├── vercel.json      # Vercel deployment config
└── README.md
```

---

## 🌐 Live Demo

👉 [goal-split-ai.vercel.app](https://goal-split-ai.vercel.app)

---

## ⚡ Setup & Usage

No installation needed! Just open `index.html` in your browser.

### To use AI Mode:
1. Get a free API key from [console.anthropic.com](https://console.anthropic.com)
2. Open the app
3. Click **🤖 AI Plan**
4. Paste your API key
5. Enter your goal, days, and hours
6. Click **Generate My Plan** ✅

> 🔒 Your API key is never stored — only used in your browser session.

### To use Quick Mode:
1. Click **🎲 Quick Plan**
2. Enter your goal, days, and hours
3. Click **Generate My Plan** ✅

---

## 🚀 Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended for beginners)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your **GoalSplit-AI** repo
4. Framework Preset: **Other**
5. Click **Deploy** ✅

### Method 2: Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🎯 Usage

1. Enter your big goal
2. Enter deadline (days)
3. Enter hours available per day
4. Choose AI Mode or Quick Mode
5. Click **Generate Plan**
6. AI will generate your day-by-day micro-task breakdown

---

## 🎨 UI Design

- Background: `#0f1117`
- Accent color: `#7c5cff` (Purple)
- Glass-style card layout
- Smooth animations
- Mobile responsive design

---

## ⚠️ Error Handling

Shows message if:
- Goal / days / hours fields are empty
- API key is missing (in AI mode)
- API request fails
- AI returns invalid response

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork this project and submit pull requests.

---

## 📜 License

This project is for educational purposes.

---

## 👩‍💻 Author

**Razeena**  
B.Tech Artificial Intelligence and Data Science
