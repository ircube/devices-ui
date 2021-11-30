import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import InputField, { FieldProps } from "./form/input/InputField";

interface AddProps {
  open: boolean;
  fields: Array<FieldProps>;
  handleClose: () => void;
  handleSave: (data: any) => void;
  valid: Object;
}

export interface DeviceSave {
  system_name: string;
  type: string;
  hdd_capacity: string;
}

const Add: FC<AddProps> = ({
  fields,
  open,
  handleClose,
  handleSave,
  valid,
}) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!Object.values(valid).reduce((a, b) => a && b));
  }, [valid]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Device</DialogTitle>
      <DialogContent>
        {fields.map((props) => (
          <InputField key={props.id} {...props} />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={disabled}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Add;
