import { Box, Typography, Paper, Chip } from "@mui/material";
import { getThemeColors, getWidgetThemeColors } from "../../utils/theme";
import { Button } from "../Button";

function ThemePreview() {
  const themeColors = getThemeColors();
  const widgetColors = getWidgetThemeColors();

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Current Theme Configuration
      </Typography>

      {/* Primary and Secondary Colors */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Base Colors
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: themeColors.primary,
                borderRadius: 1,
                border: "1px solid #ccc",
              }}
            />
            <Box>
              <Typography variant="body2" fontWeight={500}>
                Primary
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {themeColors.primary}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: themeColors.secondary,
                borderRadius: 1,
                border: "1px solid #ccc",
              }}
            />
            <Box>
              <Typography variant="body2" fontWeight={500}>
                Secondary
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {themeColors.secondary}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Button Examples */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Button Examples
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button variant="contained" color="primary">
            Primary Button
          </Button>
          <Button variant="contained" color="secondary">
            Secondary Button
          </Button>
          <Button variant="outlined" color="primary">
            Primary Outlined
          </Button>
          <Button variant="outlined" color="secondary">
            Secondary Outlined
          </Button>
          <Button variant="text" color="primary">
            Primary Text
          </Button>
        </Box>
      </Box>

      {/* Chart Colors */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Chart Color Palette
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {widgetColors.chartColors.map((color, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: color,
                  borderRadius: 0.5,
                  border: "1px solid #ccc",
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {color}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Status Colors */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Status Colors
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label="Success"
            sx={{ backgroundColor: widgetColors.success, color: "white" }}
          />
          <Chip
            label="Error"
            sx={{ backgroundColor: widgetColors.error, color: "white" }}
          />
          <Chip
            label="Warning"
            sx={{ backgroundColor: widgetColors.warning, color: "white" }}
          />
          <Chip
            label="Info"
            sx={{ backgroundColor: widgetColors.info, color: "white" }}
          />
        </Box>
      </Box>

      {/* Environment Variables Info */}
      <Box sx={{ mt: 3, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Environment Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>REACT_APP_PRIMARY_COLOR:</strong>{" "}
          {process.env.REACT_APP_PRIMARY_COLOR || "Not set (using default)"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>REACT_APP_SECONDARY_COLOR:</strong>{" "}
          {process.env.REACT_APP_SECONDARY_COLOR || "Not set (using default)"}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          To customize colors, update your .env file and restart the development
          server.
        </Typography>
      </Box>
    </Paper>
  );
}

export default ThemePreview;
