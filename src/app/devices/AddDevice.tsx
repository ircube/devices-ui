import { FC, useState } from "react";
import Add, { DeviceSave } from "../../components/Add";
import { FieldProps } from "../../components/form/input/InputField";

export interface AddDeviceProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (data: any) => void;
}

const AddDevice: FC<AddDeviceProps> = ({ open, handleClose, handleSave }) => {
  const [valid, setValid] = useState({
    name: false,
    type: false,
    capacity: false,
  });

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleNameChange = (event: any) => {
    setName(event.target.value as string);
    setValid({ ...valid, name: "" !== event.target.value });
  };

  const handleTypeChange = (event: any) => {
    setType(event.target.value as string);
    setValid({ ...valid, type: "" !== event.target.value });
  };

  const handleCapacityChange = (event: any) => {
    setCapacity(event.target.value as string);
    setValid({ ...valid, capacity: "" !== event.target.value });
  };

  const clearFields = () => {
    setName("");
    setType("");
    setCapacity("");
  };

  const handleLocalSave = (device: DeviceSave) => {
    clearFields();
    handleSave({ system_name: name, type, hdd_capacity: capacity });
  };

  const nameField: FieldProps = {
    id: "system_name",
    label: "System Name",
    type: "text",
    value: name,
    onChange: handleNameChange,
    error: !valid.name,
  };

  const typeField: FieldProps = {
    id: "type",
    label: "type",
    type: "select",
    value: type,
    onChange: handleTypeChange,
    error: !valid.type,
    selectItemList: [
      { value: "WINDOWS_WORKSTATION", text: "Windows Workstation" },
      { value: "WINDOWS_SERVER", text: "Windows Server" },
      { value: "MAC", text: "Mac" },
    ],
  };

  const capacityField: FieldProps = {
    id: "hdd_capacity",
    label: "Hdd capacity",
    type: "number",
    value: capacity,
    onChange: handleCapacityChange,
    error: !valid.capacity,
  };

  const inputFields: FieldProps[] = [nameField, typeField, capacityField];
  return (
    <Add
      open={open}
      fields={inputFields}
      handleClose={handleClose}
      handleSave={handleLocalSave}
      valid={valid}
    ></Add>
  );
};

export default AddDevice;
