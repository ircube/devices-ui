import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { FieldProps } from "./InputField";

export interface SelectItem {
  value: string;
  text: string;
}

export const SelectField: FC<FieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  selectItemList,
}) => (
  <FormControl fullWidth required style={{ marginTop: 4 }} error={error}>
    <InputLabel id={id}>Type</InputLabel>
    <Select
      labelId={label}
      id={id}
      value={value}
      label={label}
      onChange={onChange}
    >
      {selectItemList?.map(({ value, text }) => (
        <MenuItem key={value} value={value}>
          {text}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
