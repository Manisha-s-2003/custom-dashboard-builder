import { useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useOrders } from "../context/OrderContext";
import { OrderDialog, OrdersTable, EmptyState } from "../components/Orders";
import { SnackbarAlert } from "../components/SnackbarAlert";
import { MainLayout } from "../components/MainLayout";

function CustomerOrders() {
  const { orders, loading, error, deleteOrder } = useOrders();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleCreateOrder = () => {
    setEditingOrder(null);
    setDialogOpen(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = (success, data, isEdit) => {
    setDialogOpen(false);

    if (success && data?.orderId) {
      const orderId = data.orderId;
      if (isEdit) {
        showSnackbar(
          `All Set! Your changes have been saved successfully!`,
          "success"
        );
      } else {
        showSnackbar(
          `Nice work! Your new order "${orderId}" is now in\nthe list!`,
          "success"
        );
      }
    }

    setEditingOrder(null);
  };

  const handleDelete = async (orderId) => {
    const result = await deleteOrder(orderId);

    if (result.success) {
      showSnackbar("Done! Your Item has been removed", "success");
    } else {
      showSnackbar(result.error || "Failed to delete order", "error");
    }
  };

  return (
    <MainLayout>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && orders.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <EmptyState onCreateOrder={handleCreateOrder} />
      ) : (
        <OrdersTable
          orders={orders}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreateOrder={handleCreateOrder}
        />
      )}

      <OrderDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        editingOrder={editingOrder}
      />

      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </MainLayout>
  );
}

export default CustomerOrders;
