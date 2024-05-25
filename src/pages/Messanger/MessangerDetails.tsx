import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
} from "@chakra-ui/react";
import { ChatUserIcon } from "../ChatIcon.tsx";
import { useAppContext } from "../../context/AppContext.tsx";

const ToolTipComp = ({ type, children }) => {
  return (
    <Tooltip hasArrow label={type} bg="black.900" placement="top">
      {children}
    </Tooltip>
  );
};

const MessangerDetails = ({ children }) => {
  const { activeTab, updateActiveTab } = useAppContext();
  const handleTabsChange = (index) => {
    updateActiveTab(index)
  }
  return (
    <Tabs isFitted h="100%" w="100%" defaultIndex={activeTab} onChange={handleTabsChange}>
      <TabList h={"50px"}>
        <ToolTipComp type={"Unassigned Chat"}>
          <Tab gap={3}>
            <ChatUserIcon type={"Unassigned"} />
          </Tab>
        </ToolTipComp>

        <ToolTipComp type={"My Chat"}>
          <Tab gap={3}>
            <ChatUserIcon type={"self_user"} />
          </Tab>
        </ToolTipComp>


        <ToolTipComp type={"Open"}>
          <Tab gap={3}>
            <ChatUserIcon type={"open"} />
          </Tab>
        </ToolTipComp>

      </TabList>

      <TabPanels h={"calc(100% - 50px)"}>
        {/* <TabPanel> */}
        {children}
        {/* </TabPanel> */}
      </TabPanels>
    </Tabs>
  );
};

export default MessangerDetails;
