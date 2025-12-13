import { Box, IconButton } from "@mui/material";
import { Trash2, Settings } from "lucide-react";
import WidgetRenderer from "../WidgetsAction/WidgetRenderer";

function CanvasGrid({
  widgets,
  hoveredWidget,
  onWidgetHover,
  onWidgetLeave,
  onEditWidget,
  onDeleteWidget,
  onDragOver,
  onDrop,
}) {
  return (
    <Box
      sx={{
        flex: 1,
        p: 3,
        overflow: "auto",
        bgcolor: "#fafafa",
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {widgets.length === 0 ? (
        <Box
          sx={{
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(12, 1fr)",
            gap: 1.5,
          }}
        >
          {Array.from({ length: 144 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                bgcolor: "#e8e8e8",
                borderRadius: 0.5,
                minHeight: 40,
              }}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 2,
          }}
        >
          {widgets.map((widget) => (
            <Box
              key={widget.id}
              sx={{
                gridColumn: `span ${widget.width}`,
                gridRow: `span ${widget.height}`,
                position: "relative",
              }}
              onMouseEnter={() => onWidgetHover(widget.id)}
              onMouseLeave={onWidgetLeave}
            >
              <WidgetRenderer widget={widget} />
              {hoveredWidget === widget.id && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: "white",
                      boxShadow: 0.2,
                      color: "#FC3232",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        boxShadow: 2,
                        bgcolor: "#53BD951F",
                        color: "#D10000",
                      },
                    }}
                    onClick={() => onDeleteWidget(widget)}
                  >
                    <Trash2 fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: "white",
                      boxShadow: 0.2,
                      color: "#54BD95",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        boxShadow: 2,
                        bgcolor: "#53BD951F",
                        color: "#289F72",
                      },
                    }}
                    onClick={() => onEditWidget(widget)}
                  >
                    <Settings fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default CanvasGrid;
