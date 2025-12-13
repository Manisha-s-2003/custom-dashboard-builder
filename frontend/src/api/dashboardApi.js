import httpClient from "../config/httpClient";

const dashboardApi = {
  // Get dashboard configuration
  getDashboard: async (userId = "default-user") => {
    return await httpClient.get("/dashboard", { params: { userId } });
  },

  // Save dashboard configuration
  saveDashboard: async (widgets, dateFilter, userId = "default-user") => {
    return await httpClient.post("/dashboard", {
      userId,
      widgets,
      dateFilter,
    });
  },

  // Reset dashboard
  resetDashboard: async (userId = "default-user") => {
    return await httpClient.delete("/dashboard", { params: { userId } });
  },
};

export default dashboardApi;
