import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext.tsx";
import axiosInstance from "../../services/axiosInstance.ts";
import { fecthImTicketDetails } from "../../services/messangerIMTicketService.ts";


export const useImTikcetList = (type) => {
  const { activeChannel } = useAppContext();

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fecthImTicketDetails(activeChannel.im_details.name);
      setData(response);
    } catch (error) {
      setError("Axios Error with Message: " + error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeChannel]);

  return [data, error, loading] as const;
};
