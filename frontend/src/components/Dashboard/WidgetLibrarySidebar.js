import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  ChartLine,
  ChartColumn,
  ChartPie,
  ChartArea,
  ChartScatter,
  PanelsTopLeft,
  Activity,
} from "lucide-react";
import { widgetTypes } from "../../data/widgetTypes";
import { dateFilterOptions } from "../../data/dateFilterData";

const getWidgetIcon = (type) => {
  const iconProps = { fontSize: "small" };
  switch (type) {
    case "bar":
      return <ChartColumn {...iconProps} />;
    case "line":
      return <ChartLine {...iconProps} />;
    case "pie":
      return <ChartPie {...iconProps} />;
    case "area":
      return <ChartArea {...iconProps} />;
    case "scatter":
      return <ChartScatter {...iconProps} />;
    case "table":
      return <PanelsTopLeft {...iconProps} />;
    case "kpi":
      return <Activity {...iconProps} />;
    default:
      return null;
  }
};

function WidgetLibrarySidebar({
  expandedSections,
  onToggleSection,
  onDragStart,
  dateFilter,
  onDateFilterChange,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Date Filter Section */}
      <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
        <Typography
          variant="caption"
          sx={{
            color: "black",
            display: "block",
            mb: 1,
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          Show Data For
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            sx={{ bgcolor: "#f5f5f5" }}
          >
            {dateFilterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Widget Library */}
      <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: "black", mb: 1, fontSize: "0.9rem", fontWeight: 600 }}
        >
          Widget library
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#999", display: "block", mb: 2 }}
        >
          Drag and drop your canvas
        </Typography>

        <List
          disablePadding
          sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
        >
          {Object.entries(widgetTypes).map(([section, widgets]) => (
            <Box
              key={section}
              sx={{
                bgcolor: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <ListItem
                button
                onClick={() => onToggleSection(section)}
                sx={{
                  px: 2,
                  py: 1.5,
                  "&:hover": { bgcolor: "#f9f9f9" },
                }}
              >
                <ListItemText
                  primary={section}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#333",
                      },
                    },
                  }}
                />
                {expandedSections[section] ? (
                  <ExpandMoreIcon fontSize="small" sx={{ color: "#999" }} />
                ) : (
                  <ChevronRightIcon fontSize="small" sx={{ color: "#999" }} />
                )}
              </ListItem>
              <Collapse
                in={expandedSections[section]}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ borderTop: "1px solid #f0f0f0" }}>
                  <List component="div" disablePadding>
                    {widgets.map((widget) => (
                      <ListItem
                        key={widget.type}
                        sx={{
                          px: 2,
                          py: 1.5,
                          cursor: "move",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          "&:hover": { bgcolor: "#f9f9f9" },
                          borderBottom: "1px solid #f5f5f5",
                          "&:last-child": {
                            borderBottom: "none",
                          },
                        }}
                        draggable
                        onDragStart={(e) => onDragStart(e, widget)}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#999",
                          }}
                        >
                          <DragIndicatorIcon fontSize="small" />
                        </Box>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "#e8f4f1",
                            borderRadius: "8px",
                            color: "gray",
                          }}
                        >
                          {getWidgetIcon(widget.type)}
                        </Box>
                        <ListItemText
                          primary={widget.label}
                          slotProps={{
                            primary: {
                              sx: {
                                fontSize: "0.875rem",
                                color: "#333",
                                fontWeight: 400,
                              },
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default WidgetLibrarySidebar;
