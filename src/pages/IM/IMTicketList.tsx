import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip, Flex, Box
} from "@chakra-ui/react";
import { ChatUserIcon } from "../ChatIcon.tsx";
import { useImTikcetList } from './useImTikcetList.ts';

const ToolTipComp = ({ type, children }) => {
  return (
    <Tooltip hasArrow label={type} bg="black.900" placement="top">
      {children}
    </Tooltip>
  );
};

const IMTicketList = (props) => {
  let [data, error, loading] = useImTikcetList();
  return (
    <Flex flexDirection="column" gap="5px">
      {data && data.length > 0 && data.map((obj, index) => (
        <Box as="p" bg="#e8e6e6b5" p={1} key={index}
          borderRadius={"3px"} borderLeft={"4px solid #3965ff"} cursor="pointer" fontSize="sm"
        >Ticket : {obj.im_hd_ticket}</Box>
      ))}
      {data && data.length == 0 && <Box as="p" bg="#e8e6e6b5" p={1}
        borderRadius={"3px"} borderLeft={"4px solid #3965ff"} cursor="pointer" fontSize="sm"
      >No Ticket Found</Box>}
    </Flex>

  );
};

export default IMTicketList;

