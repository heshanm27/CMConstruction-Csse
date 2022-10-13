import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

export default function CustomSelect({
  name,
  label,
  error,
  errorsMsg,
  value,
  handleChanges,
  options,
  width,
  variant,
}) {
  return (
    <>
      <FormControl
        sx={{ minWidth: width ? width : 120 }}
        error={error ? true : false}
        variant={variant ? variant : "outlined"}
      >
        <InputLabel id="custom-select">{label}</InputLabel>
        <Select
          labelId="custom-select"
          id="custom-select-input"
          name={name}
          value={value}
          onChange={handleChanges}
          label={label}
        >
          {options.map((option, index) => {
            return (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
        {error && <FormHelperText>{errorsMsg}</FormHelperText>}
      </FormControl>
    </>
  );
}
