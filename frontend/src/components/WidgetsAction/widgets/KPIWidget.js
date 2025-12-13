import { Box, Typography } from "@mui/material";

function KPIWidget({ widget, filteredOrders }) {
  const { metric, aggregation, dataFormat, decimalPrecision } =
    widget.config || {};

  // Show 0 if not configured
  if (!metric) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h3" sx={{ color: "#ccc", fontWeight: 600 }}>
          0
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Metric Value
        </Typography>
      </Box>
    );
  }

  let value = 0;
  if (
    metric === "Total amount" ||
    metric === "Unit price" ||
    metric === "Quantity"
  ) {
    const values = filteredOrders.map((o) => {
      if (metric === "Total amount") return o?.totalAmount || 0;
      if (metric === "Unit price") return parseFloat(o?.unitPrice || 0);
      if (metric === "Quantity") return o?.quantity || 0;
      return 0;
    });

    if (aggregation === "Sum") value = values.reduce((a, b) => a + b, 0);
    else if (aggregation === "Average")
      value = values.reduce((a, b) => a + b, 0) / (values.length || 1);
    else if (aggregation === "Count") value = values.length;
  } else {
    value = filteredOrders.length;
  }

  const formatted =
    dataFormat === "Currency"
      ? `${value.toFixed(decimalPrecision || 0)}`
      : value.toFixed(decimalPrecision || 0);

  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h3" color="primary">
        {formatted}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {metric}
      </Typography>
    </Box>
  );
}

export default KPIWidget;
