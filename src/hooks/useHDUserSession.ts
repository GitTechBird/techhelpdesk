import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext.tsx";
import axiosInstance from "../services/axiosInstance.ts";

import { helpDeskAuthUser, helpDeskSessionUser } from "../services/helpDeskServices.ts";

const useHDUserSession = (currentUser) => {
  const { updateHDUserDetails } = useAppContext();

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    try {
      const [res1, res2] = await Promise.all([await helpDeskAuthUser(), await helpDeskSessionUser()])

      // const response = await helpDeskAuthUser();
      // updateHDTicketStates(type, response.data.data)
      updateHDUserDetails(res1.data, res2.data)
      setData(res1.data);
    } catch (error) {
      setError("Axios Error with Message: " + error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchData(); 
  }, [currentUser]);

  return [data, error, loading] as const;
};


export {useHDUserSession}