import { useNavigate } from "react-router-dom";
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { Settings, CalendarDays } from "lucide-react";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useDashboard } from "../context/DashboardContext";
import WidgetRenderer from "../components/WidgetsAction/WidgetRenderer";
import MainLayout from "../components/MainLayout/MainLayout";
import { dateFilterOptions } from "../data/dateFilterData";
import { Button } from "../components/Button";

function Dashboard() {
  const navigate = useNavigate();
  const { widgets, dateFilter, setDateFilter } = useDashboard();

  return (
    <MainLayout>
      {widgets.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            bgcolor: "white",
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              border: "2px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <ShowChartIcon sx={{ fontSize: 40, color: "#9e9e9e" }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "#666",
              mb: 1,
              fontWeight: 500,
              fontSize: "1rem",
            }}
          >
            Dashboard Not Configured
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#999",
              mb: 3,
              fontSize: "0.875rem",
            }}
          >
            Configure your dashboard to start viewing analytics
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Settings />}
            onClick={() => navigate("/dashboard/config")}
          >
            Configure dashboard
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mb: 2,
              gap: 1.5,
            }}
          >
            <CalendarDays size={20} color="#999" />
            <Box
              sx={{
                px: 2,
                py: 1,
                bgcolor: "white",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#666", fontSize: "0.9rem" }}
              >
                {dateFilterOptions.find((opt) => opt.value === dateFilter)
                  ?.label || "All time"}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(4, 1fr)", // Mobile: 4 columns
                sm: "repeat(8, 1fr)", // Tablet: 8 columns
                md: "repeat(12, 1fr)", // Desktop: 12 columns
              },
              gap: 2,
            }}
          >
            {widgets.map((widget) => {
              // Calculate responsive column spans
              const getResponsiveSpan = (width) => {
                return {
                  xs: Math.min(width, 4), // Mobile: max 4 columns
                  sm: Math.min(width, 8), // Tablet: max 8 columns
                  md: width, // Desktop: original width
                };
              };

              const responsiveSpan = getResponsiveSpan(widget.width);

              return (
                <Box
                  key={widget.id}
                  sx={{
                    gridColumn: {
                      xs: `span ${responsiveSpan.xs}`,
                      sm: `span ${responsiveSpan.sm}`,
                      md: `span ${responsiveSpan.md}`,
                    },
                    gridRow: `span ${widget.height}`,
                  }}
                >
                  <WidgetRenderer widget={widget} />
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </MainLayout>
  );
}

export default Dashboard;
