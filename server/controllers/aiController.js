const OpenAI = require("openai");

const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing in .env file");
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

const generateProductivityTips = async (req, res) => {
  try {
    const { tasks } = req.body;

    if (!tasks || tasks.length === 0) {
      return res.json({
        suggestion: "Add your first task to get productivity suggestions.",
      });
    }

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;
    const pendingTasks = tasks.filter(
      (task) => task.status === "Pending"
    ).length;

    let suggestions = [];

    if (pendingTasks > completedTasks) {
      suggestions.push(
        "You have more pending tasks than completed tasks. Start by finishing the easiest pending task first."
      );
    }

    if (totalTasks >= 5) {
      suggestions.push(
        "You have multiple tasks. Group similar tasks together and complete them in batches."
      );
    }

    if (completedTasks > 0) {
      suggestions.push(
        "Good progress! Review your completed tasks and continue with the next high-priority item."
      );
    }

    if (suggestions.length === 0) {
      suggestions.push(
        "Focus on one task at a time and avoid multitasking for better productivity."
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

    const client = getOpenAIClient();

    const taskSummary =
      tasks && tasks.length > 0
        ? tasks
            .map(
              (task) =>
                `Title: ${task.title}, Status: ${task.status}, Priority: ${task.priority}`
            )
            .join("\n")
        : "No tasks available";

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a smart AI productivity assistant helping users manage tasks, priorities, deadlines, and workflow efficiently.",
        },
        {
          role: "user",
          content: `
User Tasks:
${taskSummary}

User Question:
${prompt}
          `,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message || "AI response generation failed",
    });
  }
};

module.exports = {
  generateProductivityTips,
  chatWithAI,
};