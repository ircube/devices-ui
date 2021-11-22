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
  const [filter, setFilter] = useState("ALL");

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
    setList(
      value.filter((device) => {
        if (event.target.value === "ALL") return true;
        return device.type === event.target.value;
      })
    );
  };

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, minWidth: 140 }}>
          <InputLabel id="device-type">Filter by device type</InputLabel>
          <Select
            labelId="device-type"
            id="device-type-id"
            value={filter}
            label="Filter by device type"
            onChange={handleFilterChange}
          >
            <MenuItem value={"ALL"}>All</MenuItem>
            <MenuItem value={"WINDOWS_WORKSTATION"}>
              Windows Workstation
            </MenuItem>
            <MenuItem value={"WINDOWS_SERVER"}>Windows Server</MenuItem>
            <MenuItem value={"MAC"}>Mac</MenuItem>
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
                  <span>{item.hdd_capacity} GB</span>
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
