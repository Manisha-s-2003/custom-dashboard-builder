import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import { useDashboard } from "../context/DashboardContext";
import { WidgetConfigPanel } from "../components/WidgetsAction";
import {
  ConfigHeader,
  WidgetLibrarySidebar,
  CanvasGrid,
  ActionBar,
} from "../components/Dashboard";
import { defaultWidgetDimensions } from "../data/widgetTypes";
import { ConfirmationDialog } from "../components/ConfirmationDialog.js";
import { SnackbarAlert } from "../components/SnackbarAlert";

function DashboardConfig() {
  const navigate = useNavigate();
  const {
    widgets,
    dateFilter,
    setDateFilter,
    saveConfiguration,
    loadDashboard,
    resetDashboard,
  } = useDashboard();
  const [configWidgets, setConfigWidgets] = useState(widgets);
  const [expandedSections, setExpandedSections] = useState({});
  const [draggingWidget, setDraggingWidget] = useState(null);
  const [configPanelOpen, setConfigPanelOpen] = useState(false);
  const [editingWidget, setEditingWidget] = useState(null);
  const [hoveredWidget, setHoveredWidget] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [widgetToDelete, setWidgetToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleDragStart = (e, widgetType) => {
    setDraggingWidget(widgetType);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggingWidget) {
      const dimensions = defaultWidgetDimensions[draggingWidget.type] || {
        width: 5,
        height: 5,
      };
      const newWidget = {
        id: Date.now(),
        type: draggingWidget.type,
        title: "Untitled",
        width: dimensions.width,
        height: dimensions.height,
        config: {},
      };
      setConfigWidgets([...configWidgets, newWidget]);
      setDraggingWidget(null);
    }
  };

  const handleDeleteWidget = (widget) => {
    setWidgetToDelete(widget);
    setDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (widgetToDelete) {
      const updatedWidgets = configWidgets.filter(
        (w) => w.id !== widgetToDelete.id
      );
      setConfigWidgets(updatedWidgets);
      setSnackbar({
        open: true,
        message: "Done! Your widget has been removed",
        severity: "success",
      });
    }
    setDeleteConfirm(false);
    setWidgetToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteConfirm(false);
    setWidgetToDelete(null);
  };

  const handleEditWidget = (widget) => {
    setEditingWidget(widget);
    setConfigPanelOpen(true);
  };

  const handleSaveConfig = () => {
    saveConfiguration(configWidgets);
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleWidgetUpdate = (updatedWidget) => {
    setConfigWidgets(
      configWidgets.map((w) => (w.id === updatedWidget.id ? updatedWidget : w))
    );
    setConfigPanelOpen(false);
    setEditingWidget(null);
    setSnackbar({
      open: true,
      message: `All set! Your new widget have been added successfully!`,
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCloseConfigPanel = () => {
    setConfigPanelOpen(false);
    setEditingWidget(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#fafafa",
      }}
    >
      {/* Header - Full Width */}
      <ConfigHeader onBack={() => navigate("/dashboard")} />

      {/* Content Area - Sidebar + Canvas */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left Sidebar */}
        <Box
          sx={{
            width: 280,
            bgcolor: "white",
            borderRight: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <WidgetLibrarySidebar
            expandedSections={expandedSections}
            onToggleSection={toggleSection}
            onDragStart={handleDragStart}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
          />
        </Box>

        {/* Main Canvas Area */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <CanvasGrid
            widgets={configWidgets}
            hoveredWidget={hoveredWidget}
            onWidgetHover={setHoveredWidget}
            onWidgetLeave={() => setHoveredWidget(null)}
            onEditWidget={handleEditWidget}
            onDeleteWidget={handleDeleteWidget}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />

          <ActionBar onCancel={handleCancel} onSave={handleSaveConfig} />
        </Box>
      </Box>

      {/* Widget Configuration Drawer */}
      <Drawer
        anchor="right"
        open={configPanelOpen}
        onClose={handleCloseConfigPanel}
      >
        <WidgetConfigPanel
          widget={editingWidget}
          onSave={handleWidgetUpdate}
          onClose={handleCloseConfigPanel}
        />
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteConfirm}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete"
        message={
          <>
            Are you sure you want to delete the{" "}
            <strong>"{widgetToDelete?.title || "Untitled widget"}"</strong>?
          </>
        }
      />

      {/* Snackbar for notifications */}
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
}

export default DashboardConfig;
