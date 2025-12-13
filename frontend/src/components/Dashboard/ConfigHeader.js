import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ConfigHeader({ onBack }) {
  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        bgcolor: "white",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <IconButton
        size="small"
        onClick={onBack}
        sx={{
          color: "#666",
          "&:hover": {
            bgcolor: "#f5f5f5",
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ px: 3, py: 1, borderLeft: "1px solid #e0e0e0" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.2 }}
        >
          Configure dashboard
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#666", fontSize: "0.875rem" }}
        >
          Configure your dashboard to start viewing analytics
        </Typography>
      </Box>
    </Box>
  );
}

export default ConfigHeader;
