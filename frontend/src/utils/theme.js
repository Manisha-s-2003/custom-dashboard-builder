// Theme utility functions and constants

// Get theme colors from environment variables
export const getThemeColors = () => ({
  primary: process.env.REACT_APP_PRIMARY_COLOR || "#54bd95",
  secondary: process.env.REACT_APP_SECONDARY_COLOR || "#f44336",
});

// Generate color variations
export const generateColorVariations = (baseColor) => ({
  main: baseColor,
  light: baseColor + "20", // 20% opacity
  lighter: baseColor + "10", // 10% opacity
  dark: baseColor + "dd", // Darker variant
  darker: baseColor + "aa", // Even darker
});

// Common theme-aware styles
export const getThemeStyles = () => {
  const colors = getThemeColors();

  return {
    primaryButton: {
      backgroundColor: colors.primary,
      color: "#ffffff",
      "&:hover": {
        backgroundColor: colors.primary + "dd",
      },
    },
    secondaryButton: {
      backgroundColor: colors.secondary,
      color: "#ffffff",
      "&:hover": {
        backgroundColor: colors.secondary + "dd",
      },
    },
    primaryOutlined: {
      borderColor: colors.primary,
      color: colors.primary,
      "&:hover": {
        backgroundColor: colors.primary + "10",
        borderColor: colors.primary,
      },
    },
    primaryBackground: {
      backgroundColor: colors.primary,
      color: "#ffffff",
    },
    secondaryBackground: {
      backgroundColor: colors.secondary,
      color: "#ffffff",
    },
    primaryText: {
      color: colors.primary,
    },
    secondaryText: {
      color: colors.secondary,
    },
    primaryBorder: {
      borderColor: colors.primary,
    },
    secondaryBorder: {
      borderColor: colors.secondary,
    },
  };
};

// Widget-specific theme colors
export const getWidgetThemeColors = () => {
  const colors = getThemeColors();

  return {
    // Chart colors based on primary theme
    chartColors: [
      colors.primary,
      colors.secondary,
      "#00C49F",
      "#FFBB28",
      "#FF8042",
      "#8884D8",
      "#82ca9d",
      "#ffc658",
    ],

    // Table theme colors
    tableHeader: colors.primary,
    tableHeaderText: "#ffffff",
    tableBorder: "#e0e0e0",

    // KPI colors
    kpiPrimary: colors.primary,
    kpiSecondary: colors.secondary,

    // Status colors
    success: colors.primary,
    error: colors.secondary,
    warning: "#ff9800",
    info: "#2196f3",
  };
};

export default {
  getThemeColors,
  generateColorVariations,
  getThemeStyles,
  getWidgetThemeColors,
};
