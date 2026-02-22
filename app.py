"""
GoalSplit AI - FREE Version (Vercel Ready)
"""

import random
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()

    goal = data.get("goal", "").strip()
    days = data.get("days")
    hours = data.get("hours")

    if not goal or not days or not hours:
        return jsonify({"error": "All fields are required."}), 400

    try:
        days = int(days)
        hours = float(hours)
    except:
        return jsonify({"error": "Invalid number format."}), 400

    plan = []

    focus_actions = [
        "Research key concepts",
        "Watch tutorial videos",
        "Practice hands-on exercises",
        "Build a small mini project",
        "Review and revise concepts",
        "Solve practical problems",
        "Improve weak areas",
        "Apply knowledge in real scenario"
    ]

    for day in range(1, days + 1):
        daily_tasks = []

        task_count = random.randint(2, 4)
        for _ in range(task_count):
            action = random.choice(focus_actions)
            daily_tasks.append({
                "title": action,
                "description": f"Work on '{goal}' by focusing on: {action.lower()}. Stay consistent and focused.",
                "estimated_time": f"{round(hours / task_count, 1)} hours"
            })

        plan.append({
            "day": day,
            "tasks": daily_tasks
        })

    return jsonify({"success": True, "plan": plan})


if __name__ == "__main__":
    app.run(debug=True)