import { Button as MuiButton } from "@mui/material";
import { getThemeColors } from "../../utils/theme";

/**
 * Common Button Component
 * Provides consistent styling across the application with theme colors
 *
 * @param {string} variant - 'contained' | 'outlined' | 'text'
 * @param {string} color - 'primary' | 'secondary' | 'default'
 * @param {node} children - Button content
 * @param {object} sx - Additional styles
 * @param {rest} props - Other MUI Button props
 */
function Button({
  variant = "contained",
  color = "primary",
  children,
  sx = {},
  ...props
}) {
  const themeColors = getThemeColors();

  const getButtonStyles = () => {
    const baseStyles = {
      textTransform: "none",
      fontWeight: 500,
      px: { xs: 2, sm: 3 },
      py: { xs: 0.75, sm: 1 },
      fontSize: { xs: "0.875rem", sm: "1rem" },
      minWidth: { xs: "auto", sm: "64px" },
    };

    if (variant === "contained") {
      if (color === "primary") {
        return {
          ...baseStyles,
          bgcolor: themeColors.primary,
          color: "white",
          "&:hover": {
            bgcolor: themeColors.primary + "dd", // Darker on hover
          },
          "&:disabled": {
            bgcolor: "#e0e0e0",
            color: "#9e9e9e",
          },
        };
      }
      if (color === "secondary") {
        return {
          ...baseStyles,
          bgcolor: themeColors.secondary,
          color: "white",
          "&:hover": {
            bgcolor: themeColors.secondary + "dd",
          },
          "&:disabled": {
            bgcolor: "#e0e0e0",
            color: "#9e9e9e",
          },
        };
      }
      if (color === "default") {
        return {
          ...baseStyles,
          bgcolor: "white",
          color: themeColors.primary,
          border: `1px solid ${themeColors.primary}`,
        };
      }
    }

    if (variant === "outlined") {
      if (color === "primary") {
        return {
          ...baseStyles,
          borderColor: themeColors.primary,
          color: themeColors.primary,
          "&:hover": {
            borderColor: themeColors.primary,
            bgcolor: themeColors.primary + "10", // Light background
          },
        };
      }
      if (color === "secondary") {
        return {
          ...baseStyles,
          borderColor: themeColors.secondary,
          color: themeColors.secondary,
          "&:hover": {
            borderColor: themeColors.secondary,
            bgcolor: themeColors.secondary + "10",
          },
        };
      }
      if (color === "default") {
        return {
          ...baseStyles,
          borderColor: "#265E4B",
          color: "#54BD95",
          "&:hover": {
            borderColor: "#bbb",
            bgcolor: "#f5f5f5",
          },
        };
      }
    }

    if (variant === "text") {
      return {
        ...baseStyles,
        color:
          color === "primary"
            ? themeColors.primary
            : color === "secondary"
            ? themeColors.secondary
            : "#666",
        "&:hover": {
          bgcolor:
            color === "primary"
              ? themeColors.primary + "10"
              : color === "secondary"
              ? themeColors.secondary + "10"
              : "#f5f5f5",
        },
      };
    }

    return baseStyles;
  };

  return (
    <MuiButton
      variant={variant}
      sx={{
        ...getButtonStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
