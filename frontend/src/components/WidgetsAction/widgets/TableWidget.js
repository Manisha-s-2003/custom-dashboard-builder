import { useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getThemeColors } from "../../../utils/theme";

function TableWidget({ widget, filteredOrders }) {
  const [currentPage, setCurrentPage] = useState(1);

  const themeColors = getThemeColors();

  const {
    columns = [],
    fontSize = 14,
    headerBg = themeColors.primary,
    pagination = 10,
    sortBy = "",
  } = widget.config || {};

  // Show default table structure if not configured
  const defaultColumns = ["Column 1", "Column 2", "Column 3", "Column 4"];
  const displayColumns =
    columns && columns.length > 0 ? columns : defaultColumns;
  const emptyRows = 4;

  // Function to get the actual value from order data
  const getOrderValue = (order, columnName) => {
    switch (columnName) {
      case "Customer ID":
        return order?.customerId || order?.id || "-";
      case "Customer name":
        return (
          `${order?.firstName || ""} ${order?.lastName || ""}`.trim() ||
          order?.customerName ||
          "-"
        );
      case "Email id":
        return order?.email || "-";
      case "Phone number":
        return order?.phoneNumber || order?.phone || "-";
      case "Address":
        return order?.address || "-";
      case "Order ID":
        return order?.orderId || order?.id || "-";
      case "Order date":
        const dateValue =
          order?.createdAt || order?.orderDate || order?.updatedAt;
        return dateValue ? new Date(dateValue).toLocaleDateString() : "-";
      case "Product":
        return order?.product || "-";
      case "Quantity":
        return order?.quantity || "-";
      case "Unit price":
        return order?.unitPrice
          ? `$${parseFloat(order.unitPrice).toFixed(2)}`
          : "-";
      case "Total amount":
        return order?.totalAmount
          ? `$${parseFloat(order.totalAmount).toFixed(2)}`
          : "-";
      case "Status":
        return order?.status || "-";
      case "Created by":
        return order?.createdBy || order?.creator || "-";
      default:
        return "-";
    }
  };

  // Apply advanced filters if enabled
  let columnFilteredOrders = [...filteredOrders];
  if (
    widget.config?.applyFilter &&
    widget.config?.filters &&
    widget.config.filters.length > 0
  ) {
    columnFilteredOrders = filteredOrders.filter((order) => {
      return widget.config.filters.every((filter) => {
        if (
          !filter.attribute ||
          !filter.operator ||
          filter.value === undefined ||
          filter.value === ""
        )
          return true;

        const orderValue = getOrderValue(order, filter.attribute);
        const filterValue = filter.value;

        // Convert to appropriate types for comparison
        const orderStr = orderValue.toString().toLowerCase();
        const filterStr = filterValue.toString().toLowerCase();
        const orderNum = parseFloat(orderValue) || 0;
        const filterNum = parseFloat(filterValue) || 0;

        switch (filter.operator) {
          case "=":
            return orderStr === filterStr;
          case "≠":
            return orderStr !== filterStr;
          case ">":
            return orderNum > filterNum;
          case ">=":
            return orderNum >= filterNum;
          case "<":
            return orderNum < filterNum;
          case "<=":
            return orderNum <= filterNum;
          case "contains":
            return orderStr.includes(filterStr);
          default:
            return true;
        }
      });
    });
  }

  // Sort orders if sortBy is configured
  let sortedOrders = [...columnFilteredOrders];
  if (sortBy && sortBy !== "") {
    sortedOrders.sort((a, b) => {
      if (sortBy === "Ascending") {
        return (a?.id || 0) - (b?.id || 0);
      } else if (sortBy === "Descending") {
        return (b?.id || 0) - (a?.id || 0);
      } else if (sortBy === "Order date") {
        const dateA = new Date(a?.createdAt || a?.orderDate || a?.updatedAt);
        const dateB = new Date(b?.createdAt || b?.orderDate || b?.updatedAt);
        return dateA - dateB;
      }
      return 0;
    });
  }

  // Pagination logic
  const itemsPerPage = pagination || 10;
  const totalItems = sortedOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = sortedOrders.slice(startIndex, endIndex);

  // Reset to page 1 if current page is beyond total pages
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  return (
    <Box sx={{ overflow: "auto", maxHeight: (widget?.height || 3) * 80 }}>
      <table
        style={{
          width: "100%",
          fontSize: fontSize || 14,
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: headerBg || "#54bd95",
              color: "white",
            }}
          >
            {displayColumns.map((col) => (
              <th
                key={col}
                style={{
                  padding: 8,
                  textAlign: "left",
                  border: "1px solid #ddd",
                  fontSize: `${fontSize}px`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{col}</span>
                </Box>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {columns && columns.length > 0
            ? paginatedOrders.map((order, index) => (
                <tr
                  key={order?.id || index}
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  {columns.map((col) => (
                    <td
                      key={col}
                      style={{
                        padding: 8,
                        border: "1px solid #ddd",
                        fontSize: `${fontSize}px`,
                      }}
                    >
                      {getOrderValue(order, col)}
                    </td>
                  ))}
                </tr>
              ))
            : // Show empty rows when not configured
              Array.from({ length: emptyRows }).map((_, rowIndex) => (
                <tr key={rowIndex} style={{ borderBottom: "1px solid #ddd" }}>
                  {displayColumns.map((_, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        padding: 8,
                        border: "1px solid #ddd",
                        color: "#ccc",
                        fontSize: `${fontSize}px`,
                      }}
                    >
                      -
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>

      {/* Pagination Controls - Only show if there are multiple pages and columns are configured */}
      {columns && columns.length > 0 && totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            px: 1,
            borderTop: "1px solid #e0e0e0",
            pt: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#666", fontSize: "12px" }}
          >
            Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of{" "}
            {totalItems} entries
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 1,
                width: 28,
                height: 28,
                "&:disabled": {
                  opacity: 0.5,
                  cursor: "not-allowed",
                },
              }}
            >
              <ChevronLeft size={14} />
            </IconButton>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  size="small"
                  variant={currentPage === pageNum ? "contained" : "outlined"}
                  onClick={() => setCurrentPage(pageNum)}
                  sx={{
                    minWidth: 28,
                    width: 28,
                    height: 28,
                    fontSize: "11px",
                    padding: 0,
                    backgroundColor:
                      currentPage === pageNum
                        ? headerBg || "#54bd95"
                        : "transparent",
                    borderColor: "#ddd",
                    color: currentPage === pageNum ? "white" : "#666",
                    "&:hover": {
                      backgroundColor:
                        currentPage === pageNum
                          ? headerBg || "#54bd95"
                          : "#f5f5f5",
                    },
                  }}
                >
                  {pageNum}
                </Button>
              );
            })}

            <IconButton
              size="small"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 1,
                width: 28,
                height: 28,
                "&:disabled": {
                  opacity: 0.5,
                  cursor: "not-allowed",
                },
              }}
            >
              <ChevronRight size={14} />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TableWidget;
