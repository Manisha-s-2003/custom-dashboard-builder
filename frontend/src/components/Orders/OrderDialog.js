import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useOrders } from "../../context/OrderContext";
import OrderForm from "./OrderForm";
import { Button } from "../Button";

function OrderDialog({ open, onClose, editingOrder }) {
  const { addOrder, updateOrder } = useOrders();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    product: "",
    quantity: 1,
    unitPrice: "",
    totalAmount: 0,
    status: "Pending",
    createdBy: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingOrder) {
      setFormData(editingOrder);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        product: "",
        quantity: 1,
        unitPrice: "",
        totalAmount: 0,
        status: "Pending",
        createdBy: "",
      });
    }
    setErrors({});
  }, [editingOrder, open]);

  // Validate form data
  const validateFormData = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.firstName?.trim())
      newErrors.firstName = "Please fill the field";
    if (!formData.lastName?.trim())
      newErrors.lastName = "Please fill the field";
    if (!formData.email?.trim()) {
      newErrors.email = "Please fill the field";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Please fill the field";
    } else if (
      !/^[\+]?[1-9][\d]{0,15}$/.test(
        formData.phoneNumber.replace(/[\s\-\(\)]/g, "")
      )
    ) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!formData.streetAddress?.trim())
      newErrors.streetAddress = "Please fill the field";
    if (!formData.city?.trim()) newErrors.city = "Please fill the field";
    if (!formData.state?.trim()) newErrors.state = "Please fill the field";
    if (!formData.postalCode?.trim())
      newErrors.postalCode = "Please fill the field";
    if (!formData.country?.trim()) newErrors.country = "Please fill the field";
    if (!formData.product?.trim()) newErrors.product = "Please fill the field";
    if (!formData.unitPrice || parseFloat(formData.unitPrice) <= 0) {
      newErrors.unitPrice = "Please enter a valid price";
    }
    if (!formData.createdBy?.trim())
      newErrors.createdBy = "Please fill the field";
    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = "Quantity cannot be less than 1";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    // Validate form data
    const validationErrors = validateFormData();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);

    const isEdit = !!editingOrder;
    let result;

    if (isEdit) {
      result = await updateOrder(editingOrder._id || editingOrder.id, formData);
    } else {
      result = await addOrder(formData);
    }

    setSubmitting(false);

    if (result.success) {
      onClose(true, result.data, isEdit);
    } else {
      onClose(true, result.error);
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            maxHeight: "90vh",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          fontSize: "1.25rem",
          fontWeight: 600,
          borderBottom: "1px solid #ddd",
        }}
      >
        {editingOrder ? "Edit order" : "Create order"}
        <IconButton onClick={handleCancel} size="small" sx={{ color: "#999" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <OrderForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, gap: 1, borderTop: "1px solid #ddd" }}>
        <Button
          onClick={handleCancel}
          variant="outlined"
          color="default"
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={submitting}
        >
          {editingOrder ? "Save" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderDialog;
