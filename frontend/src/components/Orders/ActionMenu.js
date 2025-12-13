import {
  Popover,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Trash2, SquarePen } from "lucide-react";

function ActionMenu({ menuPosition, onClose, onEdit, onDelete }) {
  return (
    <Popover
      open={Boolean(menuPosition)}
      anchorReference="anchorPosition"
      anchorPosition={
        menuPosition
          ? { top: menuPosition.top + 5, left: menuPosition.left }
          : undefined
      }
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
            borderRadius: "8px",
            minWidth: "140px",
          },
        },
      }}
    >
      <List sx={{ py: 0.5 }}>
        <ListItemButton
          onClick={onEdit}
          sx={{
            gap: 1.5,
            py: 1,
            px: 2,
            fontSize: "14px",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: "auto" }}>
            <SquarePen sx={{ fontSize: 18, color: "#666" }} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{
              fontSize: "14px",
              color: "#333",
            }}
          />
        </ListItemButton>
        <ListItemButton
          onClick={onDelete}
          sx={{
            gap: 1.5,
            py: 1,
            px: 2,
            fontSize: "14px",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: "auto" }}>
            <Trash2 sx={{ fontSize: 18, color: "#666" }} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{
              fontSize: "14px",
              color: "#333",
            }}
          />
        </ListItemButton>
      </List>
    </Popover>
  );
}

export default ActionMenu;
