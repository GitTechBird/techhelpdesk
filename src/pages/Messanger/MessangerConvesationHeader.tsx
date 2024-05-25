import React, { useEffect } from "react";
import _ from "lodash"; // Importing all of lodash
import {
  Flex,
  Box,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  activeChannel,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Input,
  VStack,
  Text,
  Avatar,
  AvatarBadge,
  HStack,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Tooltip
} from "@chakra-ui/react";
import IMTicketList from "../IM/IMTicketList.tsx";

import { AddIcon, MinusIcon, HamburgerIcon } from "@chakra-ui/icons";

import { useAppContext } from "../../context/AppContext.tsx";
import ChatIcon from "../ChatIcon.tsx";
import MessangerTicketCreate from "./MessangerTicketCreate.tsx";
import { ChatUserIcon } from "../ChatIcon.tsx";
import "./Messanger.css";




const MessangerConvesationHeader = () => {
  const { activeChannel, hdTicketType, hdTicketPriority, hdTicketStatus } =
    useAppContext();
  let { channelId, conversation, im_details } = { ...activeChannel };

  const buildUserName = () => {
    if (conversation?.user && conversation?.user?.name) {
      return conversation.user.name;
    } else {
      return conversation?.user && conversation.user._id
    }
  };

  const buildUserId = () => {
    if (conversation?.bot && conversation?.bot?.integration_slug && conversation.bot.integration_slug === "integration_sandbox") {
      return conversation.user._id;
    }
  };

  return (
    <>
      <Flex id="IM-conversation-header" className={"im-messanger-header"}>
        <VStack gap="0.1rem" ml="2%" alignItems="flex-start">
          <HStack >
            <ToolTipComp type={`Ref ID -  ${(im_details && im_details.name) ? im_details.name : " "} `}>
              <Text display="flex" alignItems="center" gap="0.25rem" fontSize="sm" fontWeight="medium">
                {buildUserName()}
                <ChatUserIcon type="info_icon" />
              </Text>
            </ToolTipComp>
          </HStack>
          <Text fontSize="sm" fontWeight="medium">{buildUserId()}</Text>

        </VStack>

      </Flex>
    </>
  );
};

export default MessangerConvesationHeader;


const ToolTipComp = ({ type, children }) => {
  return (
    <Tooltip hasArrow label={type} bg="black.900" placement="top">
      {children}
    </Tooltip>
  );
};