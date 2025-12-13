import { Box, Typography } from "@mui/material";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "../Button";

function EmptyState({ onCreateOrder }) {
  return (
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
        <TableChartOutlinedIcon sx={{ fontSize: 40, color: "#9e9e9e" }} />
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
        No Orders Yet
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#999",
          mb: 3,
          fontSize: "0.875rem",
        }}
      >
        Click Create Order and enter your order information
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onCreateOrder}
      >
        Create order
      </Button>
    </Box>
  );
}

export default EmptyState;
