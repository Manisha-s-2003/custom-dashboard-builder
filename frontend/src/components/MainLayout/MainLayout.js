import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Box, Typography, Tabs, Tab } from "@mui/material";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import { Settings } from "lucide-react";
import { Button } from "../Button";
import { useDashboard } from "../../context/DashboardContext";

function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { widgets } = useDashboard();

  // Determine current tab based on route
  const getCurrentTab = () => {
    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/config"
    ) {
      return 0;
    }
    if (location.pathname === "/orders") {
      return 1;
    }
    return 0;
  };

  const [currentTab, setCurrentTab] = useState(getCurrentTab());

  const handleTabChange = (_, newValue) => {
    setCurrentTab(newValue);
    if (newValue === 0) {
      navigate("/dashboard");
    } else if (newValue === 1) {
      navigate("/orders");
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ pt: 3, pb: 4 }}>
        {/* Header - Single Line */}
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#333",
                fontSize: "1.5rem",
                mb: 0.5,
              }}
            >
              Customer Orders
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#999",
                fontSize: "0.875rem",
              }}
            >
              View and manage customer orders and details
            </Typography>
          </Box>

          {/* Show Configure dashboard button only on dashboard page when widgets exist */}
          {location.pathname === "/dashboard" && widgets.length > 0 && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Settings size={18} />}
              onClick={() => navigate("/dashboard/config")}
            >
              Configure dashboard
            </Button>
          )}
        </Box>

        {/* Tabs */}
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              minHeight: 40,
              "& .MuiTab-root": {
                textTransform: "none",
                minHeight: 40,
                fontWeight: 500,
                color: "#666",
                fontSize: "0.875rem",
                py: 1,
              },
              "& .Mui-selected": {
                color: "#4db8a8 !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#4db8a8",
                height: 2,
              },
            }}
          >
            <Tab
              icon={<ShowChartOutlinedIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Dashboard"
            />
            <Tab
              icon={<TableChartOutlinedIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Table"
            />
          </Tabs>
        </Box>

        {/* Content */}
        {children}
      </Container>
    </Box>
  );
}

export default MainLayout;
