const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Get dashboard configuration
router.get("/", dashboardController.getDashboard);

// Save dashboard configuration
router.post("/", dashboardController.saveDashboard);

// Reset dashboard (optional)
router.delete("/", dashboardController.resetDashboard);

module.exports = router;
