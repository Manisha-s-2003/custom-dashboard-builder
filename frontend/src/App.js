import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./pages/Dashboard";
import DashboardConfig from "./pages/DashboardConfig";
import CustomerOrders from "./pages/CustomerOrders";
import { DashboardProvider } from "./context/DashboardContext";
import { OrderProvider } from "./context/OrderContext";

// Get theme colors from environment variables
const primaryColor = process.env.REACT_APP_PRIMARY_COLOR || "#54bd95";
const secondaryColor = process.env.REACT_APP_SECONDARY_COLOR || "#f44336";

const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", Arial, sans-serif',
  },
  palette: {
    primary: {
      main: primaryColor,
      light: primaryColor + "20", // Add transparency for hover states
      dark: primaryColor,
      contrastText: "#ffffff",
    },
    secondary: {
      main: secondaryColor,
      light: secondaryColor + "20",
      dark: secondaryColor,
      contrastText: "#ffffff",
    },
    error: {
      main: secondaryColor, // Use secondary color for errors
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: secondaryColor,
          "&$error": {
            color: secondaryColor,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: primaryColor,
          "&:hover": {
            backgroundColor: primaryColor + "dd", // Darker on hover
          },
        },
        outlinedPrimary: {
          borderColor: primaryColor,
          color: primaryColor,
          "&:hover": {
            backgroundColor: primaryColor + "10", // Light background on hover
            borderColor: primaryColor,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: primaryColor,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: primaryColor,
            },
          "& .MuiInputLabel-root.Mui-focused": {
            color: primaryColor,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OrderProvider>
        <DashboardProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/config" element={<DashboardConfig />} />
              <Route path="/orders" element={<CustomerOrders />} />
            </Routes>
          </Router>
        </DashboardProvider>
      </OrderProvider>
    </ThemeProvider>
  );
}

export default App;
