import { Snackbar, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";

function SnackbarAlert({
  open,
  message,
  severity = "success",
  onClose,
  autoHideDuration = 4000,
}) {
  const config = {
    success: {
      leftBoxColor: "#54BD95",
      bgColor: "#DFF5EE",
      icon: <CheckIcon sx={{ color: "#fff" }} />,
    },
    error: {
      leftBoxColor: "#D32F2F",
      bgColor: "#FDECEC",
      icon: <ErrorIcon sx={{ color: "#fff" }} />,
    },
    warning: {
      leftBoxColor: "#ED6C02",
      bgColor: "#FFF4E5",
      icon: <WarningIcon sx={{ color: "#fff" }} />,
    },
    info: {
      leftBoxColor: "#0288D1",
      bgColor: "#E5F6FD",
      icon: <InfoIcon sx={{ color: "#fff" }} />,
    },
  };

  const { leftBoxColor, bgColor, icon } = config[severity];

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          minWidth: 420,
          backgroundColor: bgColor,
          borderRadius: "6px",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: 38,
            minHeight: 38,
            backgroundColor: leftBoxColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
        <Typography
          sx={{
            padding: "10px 12px",
            fontSize: "0.95rem",
            flexGrow: 1,
            whiteSpace: "pre-line",
            wordBreak: "break-word",
          }}
        >
          {message}
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            paddingRight: "6px",
            alignSelf: "flex-start",
            marginTop: "4px",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Snackbar>
  );
}

export default SnackbarAlert;
