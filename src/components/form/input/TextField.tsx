import { TextField as MUITextField } from "@mui/material";
import { FC } from "react";
import { FieldProps } from "./InputField";

const TextField: FC<FieldProps> = (props) => (
  <MUITextField
    autoFocus
    margin="dense"
    fullWidth
    required
    {...props}
  />
);

export default TextField;
