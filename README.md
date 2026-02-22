## 🎯 GoalSplit AI

**GoalSplit AI** is a simple full-stack web application that helps students break big goals into structured daily micro-tasks using AI.

The app takes a big goal and transforms it into an actionable day-by-day plan based on deadline and daily available hours.

---

## 🚀 Features

✅ Simple and clean dark-theme UI
✅ Goal → Micro-task breakdown using AI
✅ Input fields:

* Goal description
* Deadline (number of days)
* Hours available per day

✅ AI generates structured daily tasks:

* Task title
* Small description
* Estimated time

✅ Loading spinner while AI is generating response
✅ Environment variable support for API key
✅ Basic error handling
✅ Responsive design

---

## 🛠️ Tech Stack

* Python — Flask Backend
* HTML5
* CSS3 (Modern Dark Theme)
* Vanilla JavaScript
* OpenAI API Integration

---

## 📂 Folder Structure

```
GoalSplit-AI/
│
├── app.py
├── requirements.txt
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── .env
```

---

## ⚡ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/GoalSplit-AI.git
cd GoalSplit-AI
```

---

### 2. Create virtual environment (Recommended)

```bash
python -m venv venv
```

Activate virtual environment:

* Windows:

```bash
venv\Scripts\activate
```

* Linux / Mac:

```bash
source venv/bin/activate
```

---

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Setup Environment Variables

Create a `.env` file in the project root:

```
OPENAI_API_KEY=your_openai_api_key_here
```

---

### 5. Run the Application

```bash
python app.py
```

Then open:

```
http://127.0.0.1:5000
```

---

## 🎯 Usage

1. Enter your big goal
2. Enter deadline (days)
3. Enter hours available per day
4. Click **Generate Plan**
5. AI will generate micro-tasks breakdown

---

## 🎨 UI Design

* Background: `#111827`
* Centered glass-style card layout
* Smooth button hover animations
* Mobile responsive design

---

## ⚠️ Error Handling

* Shows message if:

  * API key is missing
  * Backend request fails
  * AI response error occurs

---

## 🔑 Environment Variables

| Variable       | Description         |
| -------------- | ------------------- |
| OPENAI_API_KEY | Your OpenAI API key |

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this project and submit pull requests.

---

## 📜 License

This project is for educational purposes.



