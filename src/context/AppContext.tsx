import React, { useContext, useState } from "react";

const AppContext = React.createContext();

export function AppContextProvider({ children }) {
  const [activeChannel, setActiveChannel] = useState(null);
  const [hdTicketType, setHdTicketType] = useState(null);
  const [hdTicketPriority, setHdTicketPriority] = useState(null);
  const [hdTicketStatus, setHdTicketStatus] = useState([
    {
      name: "Open",
    },
    { name: "Replied" },
    {
      name: "Resolved",
    },
    {
      name: "Closed",
    },
  ]);
  const [hdTeam, setHdTeam] = useState(null);

  const [ hdActiveUser, setHdActiveUser ] = useState({});
  const [ hdSessionUsers, setHdSessionUsers ] = useState([]);

  const updateActiveChannel = (id) => {
    setActiveChannel(id);
  };

  const updateIMDetails = (channelId, obj) => {
    setActiveChannel((prev) => {
      if (prev.channelId === channelId) {
        return {
          ...prev,
          im_details: obj,
        };
      }
    });
  };

  const updateHDTicketStates = (type, data) => {
    if (type == "HD_TICKET_TYPE") {
      setHdTicketType(data);
    }
    if (type == "HD_TICKET_PRIORITY") {
      setHdTicketPriority(data);
    }
    if (type == "hdTicketStatus") {
      setHdTicketStatus(data);
    }
    if (type == "HD_TEAM") {
      setHdTeam(data);
    }
  };

  const updateHDUserDetails = (data1,data2) => {
    setHdActiveUser(data1);
    setHdSessionUsers(data2);
  }

  const [ activeTab , setActiveTab] = useState(1);
  const updateActiveTab = (val) => {
    setActiveTab(val)
  }

  return (
    <AppContext.Provider
      value={{
        activeChannel,
        updateActiveChannel,
        updateIMDetails,
        hdTicketType,
        hdTicketPriority,
        hdTicketStatus,
        hdTeam,
        updateHDTicketStates,
        hdActiveUser,
        hdSessionUsers,
        updateHDUserDetails,
        activeTab, updateActiveTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("appContext within a provider");
  }
  return context;
};
