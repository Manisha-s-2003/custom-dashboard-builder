import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CustomLegendContent from "./CustomLegendContent";
import CustomXAxisTick from "./CustomXAxisTick";
import { getThemeColors, getWidgetThemeColors } from "../../../utils/theme";

function ChartWidget({ widget, filteredOrders }) {
  const themeColors = getThemeColors();
  const { xAxis, yAxis } = widget.config || {};
  const color = widget.config?.chartColor || themeColors.primary;
  const width = (widget?.width || 4) * 120;
  const height = (widget?.height || 3) * 100;

  // Check if Y-axis is numeric (same logic as in getChartData)
  const isYAxisNumeric = [
    "Quantity",
    "Unit price",
    "Total amount",
    "Duration",
  ].includes(yAxis);

  // Show empty chart structure if not configured
  const emptyData = [];

  const getChartData = () => {
    // Return empty if not configured
    if (!xAxis || !yAxis) {
      return [];
    }

    // Function to get the actual value from order data based on field name
    const getFieldValue = (order, fieldName) => {
      switch (fieldName) {
        case "Product":
          return order?.product;
        case "Quantity":
          return parseFloat(order?.quantity) || 0;
        case "Unit price":
          return parseFloat(order?.unitPrice) || 0;
        case "Total amount":
          return parseFloat(order?.totalAmount) || 0;
        case "Status":
          return order?.status;
        case "Created by":
          return order?.createdBy || order?.creator;
        case "Duration":
          return order?.duration || 0;
        default:
          return order?.[fieldName?.toLowerCase().replace(/ /g, "")] || 0;
      }
    };

    // Check if fields are numeric for proper aggregation
    const isXAxisNumeric = [
      "Quantity",
      "Unit price",
      "Total amount",
      "Duration",
    ].includes(xAxis);

    const grouped = {};
    filteredOrders.forEach((order) => {
      const xValue = getFieldValue(order, xAxis);
      const yValue = getFieldValue(order, yAxis);

      // For X-axis, use the actual value (preserve strings like "Pending", "In progress")
      const xKey = String(xValue);

      if (!grouped[xKey]) {
        grouped[xKey] = { values: [], count: 0 };
      }

      // Store both the raw values and count for flexible aggregation
      grouped[xKey].values.push(yValue);
      grouped[xKey].count += 1;
    });

    // Process the grouped data based on Y-axis type
    const processedData = Object.entries(grouped).map(([name, data]) => {
      let value, displayValue;

      if (isYAxisNumeric) {
        // For numeric Y-axis, sum all values
        value = data.values.reduce((sum, val) => {
          const num = typeof val === "number" ? val : parseFloat(val) || 0;
          return sum + num;
        }, 0);
        value = parseFloat(value.toFixed(2));
        displayValue = value;
      } else {
        // For string Y-axis, count occurrences of each string value
        const stringCounts = {};
        data.values.forEach((val) => {
          const strVal = String(val);
          stringCounts[strVal] = (stringCounts[strVal] || 0) + 1;
        });

        // Use the total count as the numeric value for chart display
        value = data.count;

        // Create a display string showing the breakdown
        const breakdown = Object.entries(stringCounts)
          .map(([str, count]) => `${str}: ${count}`)
          .join(", ");

        displayValue = `${data.count} (${breakdown})`;
      }

      return {
        name,
        value,
        displayValue,
        isStringYAxis: !isYAxisNumeric,
      };
    });

    return processedData;
  };

  const data = getChartData();

  const renderChart = () => {
    switch (widget.type) {
      case "bar":
        return (
          <BarChart
            key={`bar-${widget?.id}-${xAxis}-${yAxis}`}
            width={width}
            height={height}
            data={xAxis && yAxis ? data : emptyData}
            margin={{
              top: 20,
              right: widget.config?.showDataLabel ? 140 : 30,
              left: 40,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: xAxis || "X-Axis",
                position: "insideBottom",
                offset: -10,
                style: { fontSize: "11px", fill: "#666" },
              }}
              tick={<CustomXAxisTick />}
              interval={0}
              height={70}
            />
            <YAxis
              label={{
                value: !isYAxisNumeric
                  ? `Count of ${yAxis || "Y-Axis"}`
                  : yAxis || "Y-Axis",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fontSize: "11px", fill: "#666" },
                offset: 10,
                dx: -20,
              }}
            />
            <Tooltip />
            {widget.config?.showDataLabel && (
              <Legend
                align="right"
                verticalAlign="top"
                layout="vertical"
                content={<CustomLegendContent />}
                wrapperStyle={{ paddingLeft: "10px", fontSize: "10px" }}
              />
            )}
            <Bar
              dataKey="value"
              fill={color}
              label={{ position: "top", fontSize: 10, fill: "#666" }}
            />
          </BarChart>
        );

      case "line":
        return (
          <LineChart
            key={`line-${widget?.id}-${xAxis}-${yAxis}`}
            width={width}
            height={height}
            data={xAxis && yAxis ? data : emptyData}
            margin={{
              top: 20,
              right: widget.config?.showDataLabel ? 140 : 30,
              left: 40,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: xAxis || "X-Axis",
                position: "insideBottom",
                offset: -10,
                style: { fontSize: "11px", fill: "#666" },
              }}
              tick={<CustomXAxisTick />}
              interval={0}
              height={70}
            />
            <YAxis
              label={{
                value: !isYAxisNumeric
                  ? `Count of ${yAxis || "Y-Axis"}`
                  : yAxis || "Y-Axis",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fontSize: "11px", fill: "#666" },
                offset: 10,
                dx: -20,
              }}
            />
            <Tooltip />
            {widget.config?.showDataLabel && (
              <Legend
                align="right"
                verticalAlign="top"
                layout="vertical"
                content={<CustomLegendContent />}
                wrapperStyle={{ paddingLeft: "10px", fontSize: "10px" }}
              />
            )}
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
            />
          </LineChart>
        );

      case "area":
        return (
          <AreaChart
            key={`area-${widget?.id}-${xAxis}-${yAxis}`}
            width={width}
            height={height}
            data={xAxis && yAxis ? data : emptyData}
            margin={{
              top: 20,
              right: widget.config?.showDataLabel ? 140 : 30,
              left: 40,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: xAxis || "X-Axis",
                position: "insideBottom",
                offset: -5,
              }}
              tick={<CustomXAxisTick />}
              interval={0}
              height={40}
            />
            <YAxis
              label={{
                value: !isYAxisNumeric
                  ? `Count of ${yAxis || "Y-Axis"}`
                  : yAxis || "Y-Axis",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
                offset: 25,
                dx: -15,
              }}
            />
            <Tooltip />
            {widget.config?.showDataLabel && (
              <Legend
                align="right"
                verticalAlign="top"
                layout="vertical"
                content={<CustomLegendContent />}
                wrapperStyle={{ paddingLeft: "10px", fontSize: "10px" }}
              />
            )}
            <Area
              type="monotone"
              dataKey="value"
              fill={color}
              stroke={color}
              fillOpacity={0.6}
            />
          </AreaChart>
        );

      case "scatter":
        return (
          <ScatterChart
            key={`scatter-${widget?.id}-${xAxis}-${yAxis}`}
            width={width * 0.9}
            height={height * 0.9}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid />
            <XAxis
              dataKey="name"
              label={{
                value: xAxis || "X-Axis",
                position: "insideBottom",
                offset: -5,
              }}
              tick={<CustomXAxisTick />}
              interval={0}
              height={40}
            />
            <YAxis
              dataKey="value"
              label={{
                value: !isYAxisNumeric
                  ? `Count of ${yAxis || "Y-Axis"}`
                  : yAxis || "Y-Axis",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
                offset: 25,
                dx: -15,
              }}
            />
            <Tooltip />
            {widget.config?.showDataLabel && (
              <Legend
                align="right"
                verticalAlign="top"
                layout="vertical"
                content={<CustomLegendContent />}
                wrapperStyle={{ paddingLeft: "10px", fontSize: "10px" }}
              />
            )}
            <Scatter data={xAxis && yAxis ? data : emptyData} fill={color} />
          </ScatterChart>
        );

      default:
        return null;
    }
  };

  return renderChart();
}

export default ChartWidget;
