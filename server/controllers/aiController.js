const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateProductivityTips = async (req, res) => {
  try {
    const { tasks } = req.body;

    if (!tasks || tasks.length === 0) {
      return res.json({
        suggestion: "Add your first task to get productivity suggestions.",
      });
    }

    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
      (task) => task.status === "Pending"
    ).length;

    const suggestions = [];

    if (pendingTasks > completedTasks) {
      suggestions.push(
        "You have more pending tasks than completed tasks. Start with the easiest pending task first."
      );
    }

    if (tasks.length >= 5) {
      suggestions.push(
        "Group similar tasks together and complete them in batches."
      );
    }

    if (completedTasks > 0) {
      suggestions.push(
        "Good progress! Continue with your next high-priority task."
      );
    }

    res.json({
      suggestion: suggestions
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n"),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const chatWithAI = async (req, res) => {
  try {
    const { prompt, tasks } = req.body;

    const taskSummary =
      tasks?.length > 0
        ? tasks
            .map(
              (task) =>
                `Title: ${task.title}, Status: ${task.status}, Priority: ${task.priority}`
            )
            .join("\n")
        : "No tasks available";

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI productivity assistant inside a task management app. Give short and practical answers.",
        },
        {
          role: "user",
          content: `Tasks:\n${taskSummary}\n\nQuestion:\n${prompt}`,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "AI response failed",
    });
  }
};

module.exports = {
  generateProductivityTips,
  chatWithAI,
};