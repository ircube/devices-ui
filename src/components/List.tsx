import {
  FormControl,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import MuiList from "@mui/material/List";
import { FC, Fragment, useState } from "react";
import Device from "../core/models/device.model";

interface ListProps {
  value: Array<Device>;
}

const List: FC<ListProps> = ({ value }) => {
  const [list, setList] = useState(value);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

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
    </>
  );
};

export default List;
