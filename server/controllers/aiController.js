const generateProductivityTips = async (req, res) => {
  try {
    const { tasks } = req.body;

    if (!tasks || tasks.length === 0) {
      return res.json({
        suggestion:
          "Add your first task to get productivity suggestions.",
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

module.exports = {
  generateProductivityTips,
};