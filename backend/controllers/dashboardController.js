const Dashboard = require("../models/Dashboard");

// Get dashboard configuration
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.query.userId || "default-user";

    let dashboard = await Dashboard.findOne({ userId });

    // If no dashboard exists, return empty configuration
    if (!dashboard) {
      return res.status(200).json({
        success: true,
        data: {
          widgets: [],
          dateFilter: "all-time",
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        widgets: dashboard.widgets,
        dateFilter: dashboard.dateFilter,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard",
      error: error.message,
    });
  }
};

// Save dashboard configuration
exports.saveDashboard = async (req, res) => {
  try {
    const { widgets, dateFilter } = req.body;
    const userId = req.body.userId || "default-user";

    // Validate
    if (!Array.isArray(widgets)) {
      return res.status(400).json({
        success: false,
        message: "Widgets must be an array",
      });
    }

    // Update or create dashboard
    const dashboard = await Dashboard.findOneAndUpdate(
      { userId },
      {
        userId,
        widgets,
        dateFilter: dateFilter || "all-time",
      },
      {
        new: true,
        upsert: true, // Create if doesn't exist
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Dashboard saved successfully",
      data: {
        widgets: dashboard.widgets,
        dateFilter: dashboard.dateFilter,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save dashboard",
      error: error.message,
    });
  }
};

// Reset dashboard (optional)
exports.resetDashboard = async (req, res) => {
  try {
    const userId = req.query.userId || "default-user";

    await Dashboard.findOneAndDelete({ userId });

    res.status(200).json({
      success: true,
      message: "Dashboard reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reset dashboard",
      error: error.message,
    });
  }
};
