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
  AccordionIcon,
} from "@chakra-ui/react";
import IMTicketList from "../IM/IMTicketList.tsx";

import { AddIcon, MinusIcon, HamburgerIcon } from "@chakra-ui/icons";

import { useAppContext } from "../../context/AppContext.tsx";
import ChatIcon from "../ChatIcon.tsx";
import MessangerTicketCreate from "./MessangerTicketCreate.tsx";
import { ChatUserIcon } from "../ChatIcon.tsx";
import { SearchableSelect } from "../../components/SearchableSelect.tsx";

const MessangerIMDetails = () => {
  const { activeChannel, hdTicketType, hdTicketPriority, hdTicketStatus } =
    useAppContext();
  let { channelId, conversation, im_details } = { ...activeChannel };


  const buildUserName = () => {
    if (conversation?.user && conversation?.user?.name) {
      return conversation.user.name;
    }
  };

  const handleChange = (value) => {
    console.log('Selected value:', value);
  };

  return (
    <Flex
      id="messanger-agent-contact-details"
      w="100%"
      pt={2}
      flexDir={"column"}
      gap={4}
    >
      {/** IM Details section */}
      <Flex w="100%" gap={4} alignItems="center" flexDir={"row"} px={2}>
        <Avatar name={buildUserName()}>
          <AvatarBadge boxSize="1em" bg="green.500">
            <ChatIcon
              type={conversation?.bot && conversation.bot.integration_slug}
              size={{
                width: "1rem",
                height: "1rem",
              }}
            />
          </AvatarBadge>
        </Avatar>
        <Text fontSize="sm" fontWeight="medium">{buildUserName()}</Text>
      </Flex>

      {/*  <Divider /> */}

      {/** Ticket Section */}
      <Flex w="100%" gap={4} alignItems="center" flexDir={"row"} px={2}>
        <MessangerTicketCreate />
      </Flex>

      <VStack spacing={4}>
        <SearchableSelect
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
            // Add more options as needed
          ]}
          placeholder="Search and select..."
          onChange={handleChange}
        />
      </VStack>

      <Accordion allowMultiple>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" cursor="pointer" fontSize="sm" fontWeight="medium" display="flex" alignItems="center" gap={1}>
                    <ChatUserIcon type={"company_icon"} mr={1} /> Customer Details
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {isExpanded ? <IMTicketList /> : ""}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>

      <Accordion allowMultiple>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" cursor="pointer" fontSize="sm" fontWeight="medium" display="flex" alignItems="center" gap={1}>
                    <HamburgerIcon mr={1} /> My Tickets
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {isExpanded ? <IMTicketList /> : ""}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default MessangerIMDetails;
