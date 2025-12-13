import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import CustomLegendContent from "./CustomLegendContent";
import { getWidgetThemeColors } from "../../../utils/theme";

function PieChartWidget({ widget, filteredOrders }) {
  const { chartData } = widget.config || {};

  // Show empty pie chart structure if not configured
  const emptyData = [
    { name: "Category 1", value: 1 },
    { name: "Category 2", value: 1 },
    { name: "Category 3", value: 1 },
    { name: "Category 4", value: 1 },
  ];

  let data = emptyData;

  if (chartData) {
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
        default:
          return order?.[fieldName?.toLowerCase().replace(/ /g, "")] || 0;
      }
    };

    const grouped = {};
    filteredOrders.forEach((order) => {
      const key = getFieldValue(order, chartData);
      const keyStr = String(key);

      if (!grouped[keyStr]) {
        grouped[keyStr] = { values: [], count: 0 };
      }

      grouped[keyStr].values.push(key);
      grouped[keyStr].count += 1;
    });

    // Process pie chart data based on field type
    const isChartDataNumeric = [
      "Quantity",
      "Unit price",
      "Total amount",
    ].includes(chartData);

    const actualData = Object.entries(grouped).map(([name, data]) => {
      let value;

      if (isChartDataNumeric) {
        // For numeric fields, sum the values
        value = data.values.reduce((sum, val) => {
          const num = typeof val === "number" ? val : parseFloat(val) || 0;
          return sum + num;
        }, 0);
      } else {
        // For string fields (Status, Created by, Product), count occurrences
        value = data.count;
      }

      return {
        name,
        value: parseFloat(value.toFixed(2)),
      };
    });

    if (actualData.length > 0) {
      data = actualData;
    }
  }

  const themeColors = getWidgetThemeColors();
  const COLORS = ["#e0e0e0", "#d0d0d0", "#c0c0c0", "#b0b0b0", "#8884D8"];
  const activeColors = themeColors.chartColors;

  return (
    <PieChart
      width={(widget?.width || 4) * 80}
      height={(widget?.height || 3) * 80}
    >
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={chartData ? true : false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={
              chartData
                ? activeColors[index % activeColors.length]
                : COLORS[index % COLORS.length]
            }
          />
        ))}
      </Pie>

      {(widget.config?.showLegend !== undefined
        ? widget.config.showLegend
        : true) && (
        <Legend
          align="right"
          verticalAlign="middle"
          layout="vertical"
          content={<CustomLegendContent />}
          wrapperStyle={{
            paddingLeft: "15px",
            fontSize: "10px",
            maxWidth: "120px",
            wordWrap: "break-word",
          }}
        />
      )}

      <Tooltip />
    </PieChart>
  );
}

export default PieChartWidget;
