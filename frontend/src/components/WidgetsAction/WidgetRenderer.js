import { Paper, Typography, Box } from "@mui/material";
import { useOrders } from "../../context/OrderContext";
import { useDashboard } from "../../context/DashboardContext";
import { KPIWidget, ChartWidget, PieChartWidget, TableWidget } from "./widgets";

function WidgetRenderer({ widget }) {
  const { orders } = useOrders();
  const { dateFilter } = useDashboard();

  const getFilteredOrders = () => {
    const now = new Date();
    return orders.filter((order) => {
      // Use createdAt from MongoDB timestamps or orderDate if available
      const orderDate = new Date(
        order?.createdAt || order?.orderDate || order?.updatedAt
      );

      // Handle invalid dates
      if (isNaN(orderDate.getTime())) {
        return dateFilter === "all-time";
      }

      switch (dateFilter) {
        case "today":
          return orderDate.toDateString() === now.toDateString();
        case "last-7-days":
          const days7Ago = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDate >= days7Ago;
        case "last-30-days":
          const days30Ago = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return orderDate >= days30Ago;
        case "last-90-days":
          const days90Ago = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          return orderDate >= days90Ago;
        case "all-time":
        default:
          return true;
      }
    });
  };

  const filteredOrders = getFilteredOrders();

  const renderWidget = () => {
    switch (widget?.type) {
      case "kpi":
        return <KPIWidget widget={widget} filteredOrders={filteredOrders} />;

      case "bar":
      case "line":
      case "area":
      case "scatter":
        return <ChartWidget widget={widget} filteredOrders={filteredOrders} />;

      case "pie":
        return (
          <PieChartWidget widget={widget} filteredOrders={filteredOrders} />
        );

      case "table":
        return <TableWidget widget={widget} filteredOrders={filteredOrders} />;

      default:
        return (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Unknown widget type: {widget?.type}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Paper sx={{ p: 2, height: "100%", overflow: "auto" }}>
      <Typography variant="h6" gutterBottom>
        {widget?.title}
      </Typography>
      {widget?.description && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {widget.description}
        </Typography>
      )}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {renderWidget()}
      </Box>
    </Paper>
  );
}

export default WidgetRenderer;
