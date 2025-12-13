import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Button } from "./../Button";
import CloseIcon from "@mui/icons-material/Close";

function ConfirmationDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          fontSize: "1.25rem",
          fontFamily: '"Open Sans", Arial, sans-serif',
          fontWeight: 600,
          borderBottom: "1px solid #ddd",
        }}
      >
        {title}
        <IconButton onClick={onCancel} size="small" sx={{ color: "#999" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          paddingTop: "20px !important",
          paddingBottom: "32px !important",
        }}
      >
        <DialogContentText
          sx={{
            margin: "0 !important",
            paddingTop: "8px",
            paddingBottom: "8px",
            textAlign: "left",
            fontFamily: '"Open Sans", Arial, sans-serif',
            fontWeight: 400,
            color: "#1C1C1C",
            lineHeight: 1.6,
            fontSize: "15px",
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          gap: 1,
          borderTop: "1px solid #ddd",
        }}
      >
        <Button onClick={onCancel} color="default" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
