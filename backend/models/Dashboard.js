const mongoose = require("mongoose");

const widgetSchema = new mongoose.Schema({
  id: Number,
  type: String,
  title: String,
  description: String,
  width: Number,
  height: Number,
  config: mongoose.Schema.Types.Mixed,
});

const dashboardSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      default: "default-user", // For now, use a default user
    },
    widgets: [widgetSchema],
    dateFilter: {
      type: String,
      default: "all-time",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one dashboard per user
dashboardSchema.index({ userId: 1 }, { unique: true });

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

module.exports = Dashboard;
