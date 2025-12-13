import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function SearchBar({ value, onChange, placeholder = "Search" }) {
  const handleClear = () => {
    const event = { target: { value: "" } };
    onChange(event);
  };

  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      sx={{
        flex: { xs: "1", sm: "0 1 300px" },
        minWidth: { xs: "100%", sm: "250px" },
        maxWidth: { xs: "100%", sm: "400px" },
        bgcolor: "white",
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
          paddingRight: "8px",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {/* Search Icon */}
            <SearchIcon sx={{ color: "#999", mr: value ? 1 : 0 }} />

            {/* Clear Icon Only When Text Exists */}
            {value && (
              <IconButton onClick={handleClear} size="small">
                <CloseIcon sx={{ color: "#999" }} />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
