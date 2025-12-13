import { useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "../Button";
import { SearchBar } from "../Searchbar/";
import { ConfirmationDialog } from "../ConfirmationDialog.js";
import ActionMenu from "./ActionMenu";
import ActionCellRenderer from "./ActionCellRenderer";
import useOrderColumns from "./useOrderColumns";

function OrdersTable({ orders, onEdit, onDelete, onCreateOrder }) {
  const gridRef = useRef(null);
  const [search, setSearch] = useState("");
  const [menuPosition, setMenuPosition] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleMenuOpen = useCallback((event, order) => {
    event.stopPropagation();
    event.preventDefault();

    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom,
      left: rect.left,
    });
    setSelectedOrder(order);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMenuPosition(null);
  }, []);

  const handleEdit = useCallback(() => {
    if (selectedOrder) {
      onEdit(selectedOrder);
    }
    handleMenuClose();
  }, [selectedOrder, onEdit, handleMenuClose]);

  const openDeleteConfirm = () => {
    setDeleteConfirm(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (!selectedOrder) return;
    onDelete(selectedOrder._id || selectedOrder.id);
    setDeleteConfirm(false);
    setSelectedOrder(null);
  };

  // Create ActionCellRenderer with handleMenuOpen
  const ActionCell = useCallback(
    (props) => {
      return (
        <ActionCellRenderer data={props.data} onMenuOpen={handleMenuOpen} />
      );
    },
    [handleMenuOpen]
  );

  const { columnDefs, defaultColDef } = useOrderColumns(ActionCell);

  const onFilterTextChange = useCallback((e) => {
    const value = e.target.value;
    setSearch(value);

    if (gridRef.current?.api) {
      gridRef.current.api.setGridOption("quickFilterText", value);
    }
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "flex-end",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 2,
          gap: 2,
        }}
      >
        <SearchBar value={search} onChange={onFilterTextChange} />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateOrder}
          sx={{
            whiteSpace: "nowrap",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Create order
        </Button>
      </Box>

      {/* AG Grid Table */}
      <div
        className="ag-theme-alpine"
        style={{
          height: "420px",
          width: "100%",
          "--ag-header-background-color": "#f5f5f5",
          "--ag-header-foreground-color": "#666",
          "--ag-row-hover-color": "#f9f9f9",
          "--ag-border-color": "#e0e0e0",
          "--ag-row-border-color": "#f0f0f0",
          "--ag-font-size": "14px",
          "--ag-font-family":
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={orders || []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={5}
          paginationPageSizeSelector={[5, 10, 20, 50]}
          animateRows={true}
          rowHeight={60}
          headerHeight={45}
          suppressCellFocus={true}
          enableCellTextSelection={true}
          rowStyle={{
            borderBottom: "1px solid #f0f0f0",
          }}
        />
      </div>

      {/* Action Menu */}
      <ActionMenu
        menuPosition={menuPosition}
        onClose={handleMenuClose}
        onEdit={handleEdit}
        onDelete={openDeleteConfirm}
      />

      <ConfirmationDialog
        open={deleteConfirm}
        title="Delete"
        message={
          <>
            Are you sure you want to delete the{" "}
            <strong>{selectedOrder?.orderId || "this order"}</strong>?
          </>
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirm(false)}
      />
    </Box>
  );
}

export default OrdersTable;
