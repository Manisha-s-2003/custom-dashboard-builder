import { useMemo } from "react";
import { formatDate } from "../../utils";

function useOrderColumns(ActionCellRenderer) {
  const columnDefs = useMemo(
    () => [
      {
        headerName: "S.no",
        valueGetter: "node.rowIndex + 1",
        width: 70,
        suppressMenu: true,
        sortable: false,
        filter: false,
        pinned: "left",
        lockPosition: true,
        cellStyle: {
          color: "#666",
        },
      },
      {
        headerName: "Customer ID",
        field: "customerId",
        width: 150,
        cellStyle: {
          color: "#333",
        },
      },
      {
        headerName: "Customer name",
        valueGetter: (params) => {
          const { firstName = "", lastName = "" } = params.data || {};
          return `${firstName} ${lastName}`.trim();
        },
        width: 190,
        cellStyle: {
          color: "#333",
        },
      },
      {
        headerName: "Email id",
        field: "email",
        width: 220,
        cellStyle: {
          color: "#555",
        },
      },
      {
        headerName: "Phone number",
        field: "phoneNumber",
        width: 150,
        cellStyle: {
          color: "#555",
        },
      },
      {
        headerName: "Address",
        valueGetter: (params) => {
          const {
            streetAddress = "",
            city = "",
            state = "",
            country = "",
          } = params.data || {};
          return `${streetAddress}, ${city}, ${state}, ${country}`
            .replace(/, ,/g, ",")
            .trim();
        },
        width: 280,
        cellStyle: {
          color: "#555",
          lineHeight: "1.4",
        },
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: "Order ID",
        field: "orderId",
        width: 140,
        cellStyle: {
          color: "#333",
        },
      },
      {
        headerName: "Order date",
        valueGetter: (params) => formatDate(params.data?.createdAt),
        width: 190,
        cellStyle: {
          color: "#555",
        },
      },
      {
        headerName: "Product",
        field: "product",
        width: 180,
        cellStyle: {
          color: "#555",
        },
      },
      {
        headerName: "Quantity",
        field: "quantity",
        width: 110,
        type: "numericColumn",
        cellStyle: {
          color: "#555",
        },
      },
      {
        headerName: "Unit Price",
        field: "unitPrice",
        width: 130,
        valueFormatter: (params) => {
          return params.value
            ? `$${parseFloat(params.value).toFixed(2)}`
            : "$0.00";
        },
        type: "numericColumn",
        cellStyle: {
          color: "#555",
        },
      },
      {
        headerName: "Total Amount",
        field: "totalAmount",
        width: 140,
        valueFormatter: (params) => {
          return params.value
            ? `$${parseFloat(params.value).toFixed(2)}`
            : "$0.00";
        },
        type: "numericColumn",
        cellStyle: {
          fontWeight: 500,
          color: "#333",
        },
      },
      {
        headerName: "Status",
        field: "status",
        width: 130,
        cellStyle: (params) => {
          const status = params.value;
          if (status === "Delivered")
            return { color: "#2e7d32", fontWeight: 500 };
          if (status === "Shipped")
            return { color: "#1976d2", fontWeight: 500 };
          if (status === "Processing")
            return { color: "#ed6c02", fontWeight: 500 };
          if (status === "Cancelled")
            return { color: "#d32f2f", fontWeight: 500 };
          return { color: "#666", fontWeight: 500 };
        },
      },
      {
        headerName: "Created By",
        field: "createdBy",
        width: 200,
        cellStyle: {
          color: "#555",
        },
      },
      {
        cellRenderer: ActionCellRenderer,
        width: 80,
        sortable: false,
        filter: false,
        suppressMenu: true,
        pinned: "right",
        lockPosition: true,
        cellStyle: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    ],
    [ActionCellRenderer]
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: false,
      filter: false,
      resizable: false,
      suppressMenu: true,
    }),
    []
  );

  return { columnDefs, defaultColDef };
}

export default useOrderColumns;
