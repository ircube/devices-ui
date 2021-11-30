import {
  Fab,
  FormControl,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import MuiList from "@mui/material/List";
import { FC, Fragment, useEffect, useState } from "react";

import Device from "../core/models/device.model";
import AddDevice from "../app/devices/AddDevice";
import { DeviceSave } from "./Add";
import { DeviceMethods } from "../app/devices/Devices.view";

interface ListProps {
  value: Array<Device>;
  methods: DeviceMethods;
}

const List: FC<ListProps> = ({ value, methods }) => {
  const [list, setList] = useState<Array<Device>>([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("value", value);
    setList(value);
  }, [value]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (deviceSave: DeviceSave) => {
    const newDevice = await methods.post("/devices", deviceSave);
    if (methods.response.ok) {
      console.log("saved!", newDevice);
      await setTimeout(() => {
        handleReloadList();
      }, 1000);
    } else {
      console.error("Error Saving!", newDevice);
    }
    handleClose();
  };

  const handleReloadList = async () => {
    // TODO: refactor this function.
    const devices = await methods.get("/devices");
    if (methods.response.ok) {
      methods.setDevices(devices);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
    setList(
      [...value].filter((device) => {
        if (event.target.value === "") return true;
        return device?.type === event.target.value;
      })
    );
  };

  const handleSortbyChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
    setList(
      event.target.value === ""
        ? [...list]
        : [...list].sort((a, b) => {
            if (event.target.value === "SystemName") {
              return a.system_name.localeCompare(b.system_name);
            }
            if (event.target.value === "HDDCapacity") {
              console.log(a.hdd_capacity, b.hdd_capacity);
              return parseInt(a.hdd_capacity) - parseInt(b.hdd_capacity);
            }
            return 0;
          })
    );
  };

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, minWidth: 190 }}>
          <InputLabel id="device-type">Show by device type</InputLabel>
          <Select
            labelId="device-type"
            id="device-type-id"
            value={filter}
            label="Show by device type"
            onChange={handleFilterChange}
          >
            <MenuItem value={""}>None</MenuItem>
            <MenuItem value={"WINDOWS_WORKSTATION"}>
              Windows Workstation
            </MenuItem>
            <MenuItem value={"WINDOWS_SERVER"}>Windows Server</MenuItem>
            <MenuItem value={"MAC"}>Mac</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <InputLabel id="sort-by">Sort by</InputLabel>
          <Select
            labelId="sort-by"
            id="sort-by-id"
            value={sort}
            label="Sort by"
            onChange={handleSortbyChange}
          >
            <MenuItem value={""}>None</MenuItem>
            <MenuItem value={"SystemName"}>System Name</MenuItem>
            <MenuItem value={"HDDCapacity"}>HDD Capacity</MenuItem>
          </Select>
        </FormControl>
      </div>
      <MuiList>
        {list.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.system_name}
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {item.type}
                  </Typography>
                  <span> - {item.hdd_capacity} GB</span>
                </Fragment>
              }
            />
          </ListItem>
        ))}
      </MuiList>
      <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <AddDevice
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
      ></AddDevice>
    </>
  );
};

export default List;
