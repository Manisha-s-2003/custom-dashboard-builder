import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  InputLabel,
  IconButton,
  Chip,
} from "@mui/material";
import { X, Plus } from "lucide-react";
import { Button } from "../Button";
import { getThemeColors } from "../../utils/theme";
import {
  dataFields,
  numericFields,
  chartAxisFields,
  tableColumns,
  aggregationTypes,
  dataFormats,
  sortOptions,
  paginationOptions,
  fontSizeRange,
} from "../../data/widgetData";

function WidgetConfigPanel({ widget, onSave, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [config, setConfig] = useState({
    title: "Untitled",
    description: "",
    width: 2,
    height: 2,
    ...widget,
    config: widget?.config || {},
  });

  useEffect(() => {
    if (widget) {
      setConfig({
        title: "Untitled",
        description: "",
        width: 2,
        height: 2,
        ...widget,
        config: widget.config || {},
      });
    }
  }, [widget]);

  const handleChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfigChange = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      config: { ...prev.config, [field]: value },
    }));
  };

  const handleSave = () => {
    onSave(config);
  };

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  if (!widget) return null;

  return (
    <Box
      sx={{
        width: 400,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
      }}
    >
      {/* Close Button - Top Left Corner */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 1,
          left: 1,
          zIndex: 10,
          color: "#999",
          "&:hover": {
            bgcolor: "#f5f5f5",
            color: "#666",
          },
        }}
      >
        <X size={20} />
      </IconButton>

      {/* Header */}
      <Box
        sx={{
          pt: 1,
          pb: 2,
          px: 6,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontSize: "1rem", color: "#333" }}
        >
          Widget configuration
        </Typography>
      </Box>

      {/* Custom Tab Bar - Only show for table widgets */}
      {widget.type === "table" ? (
        <Box sx={{ px: 2.5, pt: 2.5, pb: 0 }}>
          <Box
            sx={{
              display: "flex",
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              p: 0.5,
            }}
          >
            <Box
              onClick={() => handleTabChange(0)}
              sx={{
                flex: 1,
                px: 3,
                py: 1.5,
                borderRadius: 1.5,
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
                textAlign: "center",
                transition: "all 0.2s ease",
                ...(activeTab === 0
                  ? {
                      bgcolor: "#54bd95",
                      color: "white",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }
                  : {
                      bgcolor: "transparent",
                      color: "#666",
                      "&:hover": {
                        bgcolor: "rgba(84, 189, 149, 0.1)",
                      },
                    }),
              }}
            >
              Data
            </Box>
            <Box
              onClick={() => handleTabChange(1)}
              sx={{
                flex: 1,
                px: 3,
                py: 1.5,
                borderRadius: 1.5,
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
                textAlign: "center",
                transition: "all 0.2s ease",
                ...(activeTab === 1
                  ? {
                      bgcolor: "#54bd95",
                      color: "white",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }
                  : {
                      bgcolor: "transparent",
                      color: "#666",
                      "&:hover": {
                        bgcolor: "rgba(84, 189, 149, 0.1)",
                      },
                    }),
              }}
            >
              Styling
            </Box>
          </Box>
        </Box>
      ) : null}

      {/* Tab Content */}
      <Box sx={{ flex: 1, overflow: "auto" }}>
        {/* Data Tab - Always show for activeTab 0, or always show for non-table widgets */}
        {(widget.type === "table" && activeTab === 0) ||
        widget.type !== "table" ? (
          <Box sx={{ p: 2.5 }}>
            <TextField
              fullWidth
              size="small"
              label="Widget title *"
              value={config.title}
              onChange={(e) => handleChange("title", e.target.value)}
              sx={{ mb: 2.5 }}
            />

            <TextField
              fullWidth
              size="small"
              label="Widget type *"
              value={widget.type.charAt(0).toUpperCase() + widget.type.slice(1)}
              slotProps={{ input: { readOnly: true } }}
              sx={{ mb: 2.5, bgcolor: "#f5f5f5" }}
            />

            <TextField
              fullWidth
              size="small"
              label="Description"
              multiline
              rows={3}
              value={config.description}
              onChange={(e) => handleChange("description", e.target.value)}
              sx={{ mb: 3 }}
            />

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, mb: 1.5, fontSize: "0.875rem" }}
            >
              Widget size
            </Typography>

            <TextField
              fullWidth
              size="small"
              label="Width (Columns) *"
              type="number"
              value={config.width}
              onChange={(e) =>
                handleChange(
                  "width",
                  Math.max(1, parseInt(e.target.value) || 1)
                )
              }
              slotProps={{ htmlInput: { min: 1 } }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              size="small"
              label="Height (Rows) *"
              type="number"
              value={config.height}
              onChange={(e) =>
                handleChange(
                  "height",
                  Math.max(1, parseInt(e.target.value) || 1)
                )
              }
              slotProps={{ htmlInput: { min: 1 } }}
              sx={{ mb: 3 }}
            />

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, mb: 1.5, fontSize: "0.875rem" }}
            >
              Data setting
            </Typography>

            {widget.type === "kpi" && (
              <>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel id="select-metric-label">
                    Select metric *
                  </InputLabel>
                  <Select
                    labelId="select-metric-label"
                    label="Select metric *"
                    value={config.config.metric || ""}
                    onChange={(e) =>
                      handleConfigChange("metric", e.target.value)
                    }
                  >
                    {dataFields.map((field) => (
                      <MenuItem key={field} value={field}>
                        {field}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  size="small"
                  sx={{ mb: 2 }}
                  disabled={!numericFields.includes(config.config.metric)}
                >
                  <InputLabel id="aggregation-label">Aggregation *</InputLabel>
                  <Select
                    labelId="aggregation-label"
                    label="Aggregation *"
                    value={config.config.aggregation || ""}
                    onChange={(e) =>
                      handleConfigChange("aggregation", e.target.value)
                    }
                  >
                    {aggregationTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel id="data-format-label">Data format *</InputLabel>
                  <Select
                    labelId="data-format-label"
                    label="Data format *"
                    value={config.config.dataFormat || ""}
                    onChange={(e) =>
                      handleConfigChange("dataFormat", e.target.value)
                    }
                  >
                    {dataFormats.map((format) => (
                      <MenuItem key={format} value={format}>
                        {format}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  size="small"
                  label="Decimal Precision *"
                  type="number"
                  value={config.config.decimalPrecision || 0}
                  onChange={(e) =>
                    handleConfigChange(
                      "decimalPrecision",
                      Math.max(0, parseInt(e.target.value) || 0)
                    )
                  }
                  slotProps={{ htmlInput: { min: 0 } }}
                  sx={{ mb: 2 }}
                />
              </>
            )}

            {["bar", "line", "area", "scatter"].includes(widget.type) && (
              <>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel id="x-axis-label">
                    Choose X-Axis data *
                  </InputLabel>
                  <Select
                    labelId="x-axis-label"
                    label="Choose X-Axis data *"
                    value={config.config.xAxis || ""}
                    onChange={(e) =>
                      handleConfigChange("xAxis", e.target.value)
                    }
                  >
                    {chartAxisFields.map((field) => (
                      <MenuItem key={field} value={field}>
                        {field}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel id="y-axis-label">
                    Choose Y-Axis data *
                  </InputLabel>
                  <Select
                    labelId="y-axis-label"
                    label="Choose Y-Axis data *"
                    value={config.config.yAxis || ""}
                    onChange={(e) =>
                      handleConfigChange("yAxis", e.target.value)
                    }
                  >
                    {chartAxisFields.map((field) => (
                      <MenuItem key={field} value={field}>
                        {field}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={config.config.showDataLabel || false}
                      onChange={(e) =>
                        handleConfigChange("showDataLabel", e.target.checked)
                      }
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2">Show data label</Typography>
                  }
                />
              </>
            )}

            {widget.type === "pie" && (
              <>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel id="chart-data-label">
                    Choose chart data *
                  </InputLabel>
                  <Select
                    labelId="chart-data-label"
                    label="Choose chart data *"
                    value={config.config.chartData || ""}
                    onChange={(e) =>
                      handleConfigChange("chartData", e.target.value)
                    }
                  >
                    {[
                      "Product",
                      "Quantity",
                      "Unit price",
                      "Total amount",
                      "Status",
                      "Created by",
                    ].map((field) => (
                      <MenuItem key={field} value={field}>
                        {field}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        config.config.showLegend !== undefined
                          ? config.config.showLegend
                          : true
                      }
                      onChange={(e) =>
                        handleConfigChange("showLegend", e.target.checked)
                      }
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">Show legend</Typography>}
                />
              </>
            )}

            {widget.type === "table" && (
              <>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel id="choose-columns-label">
                    Choose columns *
                  </InputLabel>
                  <Select
                    multiple
                    labelId="choose-columns-label"
                    label="Choose columns *"
                    value={config.config.columns || []}
                    onChange={(e) =>
                      handleConfigChange("columns", e.target.value)
                    }
                    renderValue={(selected) => {
                      if (selected.length === 0) return "";
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                            mt: 0.5,
                          }}
                        >
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              size="small"
                              onDelete={(e) => {
                                e.stopPropagation();
                                const currentColumns =
                                  config.config.columns || [];
                                const newColumns = currentColumns.filter(
                                  (col) => col !== value
                                );
                                handleConfigChange("columns", newColumns);
                              }}
                              sx={{
                                bgcolor: "#e8f5e8",
                                color: "#2e7d32",
                                "& .MuiChip-deleteIcon": {
                                  color: "#2e7d32",
                                  "&:hover": {
                                    color: "#1b5e20",
                                  },
                                },
                              }}
                            />
                          ))}
                        </Box>
                      );
                    }}
                  >
                    {tableColumns.map((col) => (
                      <MenuItem key={col} value={col}>
                        {col}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel id="sort-by-label">Sort by</InputLabel>
                  <Select
                    labelId="sort-by-label"
                    label="Sort by"
                    value={config.config.sortBy || ""}
                    onChange={(e) =>
                      handleConfigChange("sortBy", e.target.value)
                    }
                  >
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel id="pagination-label">Pagination</InputLabel>
                  <Select
                    labelId="pagination-label"
                    label="Pagination"
                    value={config.config.pagination || ""}
                    onChange={(e) =>
                      handleConfigChange("pagination", e.target.value)
                    }
                  >
                    {paginationOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={config.config.applyFilter || false}
                      onChange={(e) => {
                        handleConfigChange("applyFilter", e.target.checked);
                        if (e.target.checked) {
                          // Add default filter when checking
                          const defaultFilter = {
                            attribute: "",
                            operator: "=",
                            value: "",
                          };
                          handleConfigChange("filters", [defaultFilter]);
                        } else {
                          // Clear filters when unchecking
                          handleConfigChange("filters", []);
                        }
                      }}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">Apply filter</Typography>}
                />

                {/* Advanced Filter System */}
                {config.config.applyFilter && (
                  <Box sx={{ mt: 2 }}>
                    {/* Existing Filters */}
                    {(config.config.filters || []).map((filter, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <FormControl size="small" sx={{ flex: 1 }}>
                            <InputLabel>Choose attribute</InputLabel>
                            <Select
                              value={filter.attribute || ""}
                              label="Choose attribute"
                              onChange={(e) => {
                                const newFilters = [
                                  ...(config.config.filters || []),
                                ];
                                newFilters[index] = {
                                  ...filter,
                                  attribute: e.target.value,
                                };
                                handleConfigChange("filters", newFilters);
                              }}
                            >
                              {(config.config.columns || []).map((col) => (
                                <MenuItem key={col} value={col}>
                                  {col}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <FormControl size="small" sx={{ minWidth: 100 }}>
                            <InputLabel>Operator</InputLabel>
                            <Select
                              value={filter.operator || "="}
                              label="Operator"
                              onChange={(e) => {
                                const newFilters = [
                                  ...(config.config.filters || []),
                                ];
                                newFilters[index] = {
                                  ...filter,
                                  operator: e.target.value,
                                };
                                handleConfigChange("filters", newFilters);
                              }}
                            >
                              <MenuItem value="=">=</MenuItem>
                              <MenuItem value="≠">≠</MenuItem>
                              <MenuItem value=">">&gt;</MenuItem>
                              <MenuItem value=">=">&gt;=</MenuItem>
                              <MenuItem value="<">&lt;</MenuItem>
                              <MenuItem value="<=">&lt;=</MenuItem>
                              <MenuItem value="contains">contains</MenuItem>
                            </Select>
                          </FormControl>

                          {(config.config.filters || []).length > 1 && (
                            <IconButton
                              size="small"
                              onClick={() => {
                                const newFilters = (
                                  config.config.filters || []
                                ).filter((_, i) => i !== index);
                                handleConfigChange("filters", newFilters);
                              }}
                              sx={{ color: getThemeColors().secondary }}
                            >
                              <X size={16} />
                            </IconButton>
                          )}
                        </Box>

                        <TextField
                          fullWidth
                          size="small"
                          label="Value"
                          value={filter.value || ""}
                          onChange={(e) => {
                            const newFilters = [
                              ...(config.config.filters || []),
                            ];
                            newFilters[index] = {
                              ...filter,
                              value: e.target.value,
                            };
                            handleConfigChange("filters", newFilters);
                          }}
                          sx={{ mb: 2 }}
                        />
                      </Box>
                    ))}

                    {/* Add Filter Button */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        variant="contained"
                        color="default"
                        onClick={() => {
                          const newFilter = {
                            attribute: "",
                            operator: "=",
                            value: "",
                          };
                          const currentFilters = config.config.filters || [];
                          handleConfigChange("filters", [
                            ...currentFilters,
                            newFilter,
                          ]);
                        }}
                      >
                        <Plus size={16} style={{ marginRight: 8 }} />
                        Add filter
                      </Button>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
        ) : (
          ""
        )}

        {/* Styling Tab - Only for table widgets */}
        {widget.type === "table" && activeTab === 1 && (
          <Box sx={{ p: 3 }}>
            {/* Font Size with px unit */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Font size *
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <TextField
                  size="small"
                  type="number"
                  value={config.config.fontSize || fontSizeRange.default}
                  onChange={(e) => {
                    const val =
                      parseInt(e.target.value) || fontSizeRange.default;
                    handleConfigChange(
                      "fontSize",
                      Math.min(
                        fontSizeRange.max,
                        Math.max(fontSizeRange.min, val)
                      )
                    );
                  }}
                  slotProps={{
                    htmlInput: {
                      min: fontSizeRange.min,
                      max: fontSizeRange.max,
                    },
                    input: {
                      sx: { border: "none", "& fieldset": { border: "none" } },
                    },
                  }}
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { border: "none" },
                      "&:hover fieldset": { border: "none" },
                      "&.Mui-focused fieldset": { border: "none" },
                    },
                  }}
                />
                <Box
                  sx={{
                    bgcolor: "#f5f5f5",
                    px: 2,
                    py: 1.2,
                    fontSize: "0.875rem",
                    color: "#666",
                    minWidth: 50,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderLeft: "1px solid #e0e0e0",
                  }}
                >
                  px
                </Box>
              </Box>
            </Box>

            {/* Header Background Color Picker */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Header background
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 40,
                    bgcolor: config.config.headerBg || "#D8D8D8",
                    cursor: "pointer",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: "1px solid #e0e0e0",
                  }}
                >
                  <input
                    type="color"
                    value={config.config.headerBg || "#D8D8D8"}
                    onChange={(e) =>
                      handleConfigChange("headerBg", e.target.value)
                    }
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                    }}
                  />
                  <Box
                    sx={{
                      fontSize: "12px",
                      color: "#666",
                      transform: "rotate(90deg)",
                    }}
                  ></Box>
                </Box>
                <TextField
                  size="small"
                  value={config.config.headerBg || "#D8D8D8"}
                  onChange={(e) =>
                    handleConfigChange("headerBg", e.target.value)
                  }
                  placeholder="#D8D8D8"
                  slotProps={{
                    input: {
                      sx: { border: "none", "& fieldset": { border: "none" } },
                    },
                  }}
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { border: "none" },
                      "&:hover fieldset": { border: "none" },
                      "&.Mui-focused fieldset": { border: "none" },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* Footer Actions */}
      <Box
        sx={{
          p: 2.5,
          borderTop: "1px solid #e0e0e0",
          display: "flex",
          gap: 2,
        }}
      >
        <Button fullWidth variant="outlined" color="default" onClick={onClose}>
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}

export default WidgetConfigPanel;
