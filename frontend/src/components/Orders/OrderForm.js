import { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { countries, products, statuses, creators } from "../../data/orderData";

function OrderForm({ formData, setFormData, errors, setErrors }) {
  useEffect(() => {
    const total =
      (formData.quantity || 0) * (parseFloat(formData.unitPrice) || 0);
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  }, [formData.quantity, formData.unitPrice, setFormData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear existing errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Box sx={{ pt: 2 }}>
      {/* Customer Information Section */}
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          mb: 2,
          color: "#333",
          fontSize: "1rem",
        }}
      >
        Customer Information
      </Typography>

      <Grid container spacing={2}>
        {/* Row 1: First name and Email id */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="First name"
            required
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Email id"
            required
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>

        {/* Row 2: Last name and Phone number */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Last name"
            required
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Phone number"
            required
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
        </Grid>

        {/* Row 3: Street Address (Full Width) */}
        <Grid item xs={12} sm={12} className="input">
          <TextField
            fullWidth
            size="small"
            label="Street Address"
            required
            value={formData.streetAddress}
            onChange={(e) => handleChange("streetAddress", e.target.value)}
            error={!!errors.streetAddress}
            helperText={errors.streetAddress}
          />
        </Grid>

        {/* Row 4: City and State/Province */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="City"
            required
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            error={!!errors.city}
            helperText={errors.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="State / Province"
            required
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            error={!!errors.state}
            helperText={errors.state}
          />
        </Grid>

        {/* Row 5: Postal code and Country */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Postal code"
            required
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            error={!!errors.postalCode}
            helperText={errors.postalCode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            select
            label="Country"
            required
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            error={!!errors.country}
            helperText={errors.country}
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Order Information Section */}
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          mt: 3,
          mb: 2,
          color: "#333",
          fontSize: "1rem",
        }}
      >
        Order Information
      </Typography>

      <Grid container spacing={2}>
        {/* Row 1: Choose product (Full Width) */}
        <Grid item xs={12} sm={12} className="input">
          <TextField
            fullWidth
            size="small"
            select
            label="Choose product"
            required
            value={formData.product}
            onChange={(e) => handleChange("product", e.target.value)}
            error={!!errors.product}
            helperText={errors.product}
          >
            {products.map((product) => (
              <MenuItem key={product} value={product}>
                {product}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Row 2: Quantity and Unit price */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            type="number"
            label="Quantity"
            value={formData.quantity}
            onChange={(e) =>
              handleChange(
                "quantity",
                Math.max(1, parseInt(e.target.value) || 1)
              )
            }
            error={!!errors.quantity}
            helperText={errors.quantity}
            slotProps={{
              htmlInput: { min: 1 },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            type="number"
            label="Unit price"
            required
            value={formData.unitPrice}
            onChange={(e) => handleChange("unitPrice", e.target.value)}
            error={!!errors.unitPrice}
            helperText={errors.unitPrice}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        {/* Row 3: Total amount and Status */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Total amount"
            required
            value={`$${formData.totalAmount.toFixed(2)}`}
            slotProps={{
              input: { readOnly: true },
            }}
            sx={{
              bgcolor: "#f5f5f5",
              "& .MuiInputBase-input": {
                cursor: "not-allowed",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            select
            label="Status"
            required
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Row 4: Created by */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            select
            label="Created by"
            required
            value={formData.createdBy}
            onChange={(e) => handleChange("createdBy", e.target.value)}
            error={!!errors.createdBy}
            helperText={errors.createdBy}
          >
            {creators.map((creator) => (
              <MenuItem key={creator} value={creator}>
                {creator}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderForm;
