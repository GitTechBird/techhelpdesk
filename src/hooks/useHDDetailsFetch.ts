import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext.tsx";
import axiosInstance from "../services/axiosInstance.ts";
const REQUEST_ENUM = {
  "HD_TICKET_TYPE" :{
    doctype: "HD Ticket Type",
    fields: ["name"],
  },
  "HD_TICKET_PRIORITY" :{
    doctype: "HD Ticket Priority",
    fields: ["name"],
  },
  "HD_TEAM" :{
    doctype: "HD Team",
    fields: ["name,team_name"],
  }
}
export const useHDDetailsFetch = (type) => {
  const { updateHDTicketStates } = useAppContext();

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axiosInstance.post<any>(
        `/api/v2/method/helpdesk.extends.client.get_list`,
        REQUEST_ENUM[type]
      );
      updateHDTicketStates(type, response.data.data)
      setData(response.data);
    } catch (error) {
      setError("Axios Error with Message: " + error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, error, loading] as const;
};
