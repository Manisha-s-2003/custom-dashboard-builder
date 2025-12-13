import { createContext, useContext, useState, useEffect } from "react";
import dashboardService from "../services/dashboardServices";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [widgets, setWidgets] = useState([]);
  const [dateFilter, setDateFilter] = useState("all-time");
  const [loading, setLoading] = useState(true);

  // Load dashboard on mount
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    const result = await dashboardService.fetchDashboard();

    if (result.success) {
      setWidgets(result.data.widgets || []);
      setDateFilter(result.data.dateFilter || "all-time");
    }
    setLoading(false);
  };

  const saveConfiguration = async (newWidgets) => {
    const result = await dashboardService.saveDashboard(newWidgets, dateFilter);

    if (result.success) {
      setWidgets(newWidgets);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const resetDashboard = async () => {
    const result = await dashboardService.resetDashboard();

    if (result.success) {
      setWidgets([]);
      setDateFilter("all-time");
    }
    return result;
  };

  return (
    <DashboardContext.Provider
      value={{
        widgets,
        dateFilter,
        setDateFilter,
        saveConfiguration,
        resetDashboard,
        loading,
        refreshDashboard: loadDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
