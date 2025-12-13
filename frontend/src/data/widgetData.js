// Data fields available for widgets
export const dataFields = [
  "Customer ID",
  "Customer name",
  "Email id",
  "Address",
  "Order date",
  "Product",
  "Created by",
  "Status",
  "Total amount",
  "Unit price",
  "Quantity",
];

// Numeric fields that support aggregation
export const numericFields = ["Total amount", "Unit price", "Quantity"];

// Chart axis fields
export const chartAxisFields = [
  "Product",
  "Quantity",
  "Unit price",
  "Total amount",
  "Status",
  "Created by",
  "Duration",
];

// Table columns available for table widget
export const tableColumns = [
  "Customer ID",
  "Customer name",
  "Email id",
  "Phone number",
  "Address",
  "Order ID",
  "Order date",
  "Product",
  "Quantity",
  "Unit price",
  "Total amount",
  "Status",
  "Created by",
];

// Aggregation types for KPI widgets
export const aggregationTypes = ["Sum", "Average", "Count"];

// Data format options
export const dataFormats = ["Number", "Currency"];

// Sort options for table widget
export const sortOptions = [
  { value: "Ascending", label: "Ascending" },
  { value: "Descending", label: "Descending" },
  { value: "Order date", label: "Order date" },
];

// Pagination options for table widget
export const paginationOptions = [5, 10, 15];

// Font size range for table widget
export const fontSizeRange = {
  min: 12,
  max: 20,
  default: 14,
};
