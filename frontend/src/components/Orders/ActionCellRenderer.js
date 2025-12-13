import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ActionCellRenderer({ data, onMenuOpen }) {
  if (!data) return null;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onMenuOpen(e, data);
  };

  return (
    <IconButton size="small" onClick={handleClick} sx={{ color: "gray" }}>
      <MoreVertIcon />
    </IconButton>
  );
}

export default ActionCellRenderer;
