import { Box } from "@mui/material";
import { Button } from "../Button";

function ActionBar({ onCancel, onSave }) {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "white",
        borderTop: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "flex-end",
        gap: 2,
      }}
    >
      <Button variant="outlined" color="default" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="contained" color="primary" onClick={onSave}>
        Save
      </Button>
    </Box>
  );
}

export default ActionBar;
