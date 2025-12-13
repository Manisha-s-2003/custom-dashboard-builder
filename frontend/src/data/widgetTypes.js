// Widget types configuration for dashboard
export const widgetTypes = {
  Charts: [
    { type: "bar", label: "Bar Chart" },
    { type: "line", label: "Line Chart" },
    { type: "pie", label: "Pie Chart" },
    { type: "area", label: "Area Chart" },
    { type: "scatter", label: "Scatter Plot" },
  ],
  Tables: [{ type: "table", label: "Table" }],
  KPIs: [{ type: "kpi", label: "KPI Value" }],
};

// Default widget dimensions (2x2 for all widgets)
export const defaultWidgetDimensions = {
  kpi: { width: 2, height: 2 },
  pie: { width: 4, height: 4 },
  bar: { width: 5, height: 5 },
  line: { width: 5, height: 5 },
  area: { width: 5, height: 5 },
  scatter: { width: 5, height: 5 },
  table: { width: 4, height: 4 },
};
