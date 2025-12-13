import dashboardApi from "../api/dashboardApi";

const dashboardService = {
  // Fetch dashboard configuration
  fetchDashboard: async () => {
    try {
      const response = await dashboardApi.getDashboard();
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Save dashboard configuration
  saveDashboard: async (widgets, dateFilter) => {
    try {
      const response = await dashboardApi.saveDashboard(widgets, dateFilter);
      return {
        success: true,
        data: response.data,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Reset dashboard
  resetDashboard: async () => {
    try {
      const response = await dashboardApi.resetDashboard();
      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

export default dashboardService;
