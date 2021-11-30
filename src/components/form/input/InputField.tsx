import { InputProps } from "@mui/material";
import { FC } from "react";

import { SelectField, SelectItem } from "./SelectField";
import TextField from "./TextField";

export interface FieldProps {
  id: string;
  label: string;
  type: "text" | "number" | "select";
  value: unknown;
  onChange: (event: any) => void;
  error: boolean;
  selectItemList?: SelectItem[];
  InputProps?: InputProps;
}

const InputField: FC<FieldProps> = (props) => (
  <>
    {props.type === "select" ? (
      <SelectField {...props} />
    ) : (
      <TextField {...props} />
    )}
  </>
);

export default InputField;
