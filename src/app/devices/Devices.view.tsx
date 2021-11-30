import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import useFetch, { FetchData, Res } from "use-http";

import List from "../../components/List";
import Device from "../../core/models/device.model";

interface DevicesProps {}

export interface DeviceMethods {
  post: FetchData<Device>;
  put: FetchData<Device>;
  get: (route?: string | undefined) => Promise<any>;
  response: Res<Device>;
  setDevices: Dispatch<SetStateAction<never[]>>;
}

const Devices: FC<DevicesProps> = () => {
  const [devices, setDevices] = useState([]);
  const url = "http://localhost:3000";
  const { get, post, put, response, loading, error } = useFetch(url);

  useEffect(() => {
    const loadInitialDevices = async () => {
      const initialDevices = await get("/devices");
      if (response.ok) {
        setDevices(initialDevices);
      }
    };
    loadInitialDevices();
  }, [get, response.ok]);

  return (
    <>
      {error && "Error!"}
      {loading && "Loading..."}
      <h1>Devices:</h1>
      <List
        value={devices}
        methods={{ get, post, put, response, setDevices }}
      />
    </>
  );
};

export default Devices;
