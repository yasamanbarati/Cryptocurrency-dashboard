import React, { useContext, useRef } from "react";
import { CryptoContext } from "services/context/crypto-context";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

const SearchBar = () => {
  const context = useContext(CryptoContext);

  if (!context) {
    throw new Error("SearchBar must be used within a CryptoProvider");
  }

  const { currency } = context;
  const currencyRef = useRef<HTMLSelectElement>(null);

  const handleCurrency = (e: SelectChangeEvent<string>) => {
    const val = e.target.value;
    if (currencyRef.current) {
      currencyRef.current.value = "";
    }
  };

  return (
    <Box display="flex" justifyContent="start">
      <FormControl variant="outlined" size="small" sx={{ minWidth: 90 }}>
        <InputLabel id="currency-select-label"></InputLabel>
        <Select
          labelId="currency-select-label"
          value={currency}
          onChange={handleCurrency}
          inputRef={currencyRef}
          sx={{
            backgroundColor: "yellow",
            borderRadius: "8px",
            "& .MuiSelect-select": {
              color: "black",
              fontSize: "0.86rem",
              fontWeight: "600",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          }}
        >
          <MenuItem value={"usd"}>USD</MenuItem>
          <MenuItem value={"inr"}>INR</MenuItem>
          <MenuItem value={"eur"}>EUR</MenuItem>
          <MenuItem value={"jpy"}>JPY</MenuItem>
          <MenuItem value={"aud"}>AUD</MenuItem>
          <MenuItem value={"nzd"}>NZD</MenuItem>
          <MenuItem value={"cad"}>CAD</MenuItem>
          <MenuItem value={"gbp"}>GBP</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchBar;
