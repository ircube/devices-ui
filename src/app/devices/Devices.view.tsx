import { FC } from "react";
import { useFetch } from "usehooks-ts";

import List from "../../components/List";
import Device from "../../core/models/device.model";

interface DevicesProps {}

const Devices: FC<DevicesProps> = () => {
  const url = "http://localhost:3000/devices";
  const { data, error } = useFetch<Array<Device>>(url);

  if (error) return <p>There is an error.</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h1>Devices:</h1>
      <List value={data} />
    </div>
  );
};

export default Devices;
