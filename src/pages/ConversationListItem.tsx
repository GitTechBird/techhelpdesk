import React, { useEffect, useMemo, useState } from "react";
import shave from "shave";
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
  useDisclosure,
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
  HStack,
  Divider,
} from "@chakra-ui/react";

// Context Loading
import { useAppContext } from "../context/AppContext.tsx";
import ChatIcon from "./ChatIcon.tsx";
import moment from "moment";
import { formatDate } from "../utils/date.ts"

const messageSubstring = (data) => {
  if ("message" in data && data.message.length > 0) {
    return data.message.substring(0, 30);
  } else {
    return "";
  }
};



function ConversationListItem({ data, channelId }) {
  // console.log("ConversationListItem")
  const { activeChannel, updateActiveChannel } = useAppContext();
  // const unReadMsgCountRef = useRef(-1);
  const [unreadeCount, setUnReadCount] = useState(-1);

  // useEffect(() => {
  //   shave(".conversation-snippet", 20);
  // });
  const { user, bot, last_message } = data.conversation;
  // Convert timestamp to a readable format
  // const formattedTimestamp = moment(last_message.timestamp).format(
  //   "MMMM Do YYYY, h:mm:ss a"
  // );

  const formattedTimestamp = moment(last_message.timestamp).calendar({
    sameDay: "HH:mm",
    lastDay: "[Yesterday]",
    lastWeek: "Do MMMM",
    sameElse: "Do MMMM",
  });

  

  const isActive = useMemo(() => {
    if (activeChannel && activeChannel.channelId === channelId) {
      setUnReadCount(-1)
      return true;
    }
    return false;
  }, [activeChannel])

  const unReadeMsgCount = useMemo(() => {
    let tempCount = unreadeCount;
    if(!isActive){
      tempCount++
      setUnReadCount((c) => c + 1);
    } else {
      tempCount = 0;
      setUnReadCount(0)
    }
    return tempCount;
  }, [last_message]);

  return (
    <Box
      className="messanger_item"
      borderBottom="1px solid #E2E8F0"
      // align="center"
      p={1}
      cursor="pointer"
      bg={ isActive ? "blue.100" : "transparent"}
      onClick={() => updateActiveChannel(data)}
      _hover={{ bg: "blue.50" }}
    >
      <Flex gap={3} alignItems="center">
        <ChatIcon type={bot.integration_slug} mr="3" />
        <VStack align="flex-start" spacing="1" flexGrow={1}>
          <Text fontWeight="medium" fontSize="sm" color="#0C0C0C">{user.name ? user.name : user._id}</Text>
          <Text fontWeight="normal" fontSize="xs" color="#0C0C0C">{messageSubstring(last_message)}</Text>
        </VStack>
        <VStack align="flex-start" spacing="1">
          {unreadeCount > 0 && <Text
            as="span"
            ml="auto"
            fontSize="xs"
            fontWeight="medium"
            color="#fff"
            bg={"#25D366"}
            borderRadius="18px"
            minW={"18px"}
            h={"18px"}
            p={"0 3px"}
            lineHeight={"18px"}
            verticalAlign="middle"
            textAlign="center"
            marginRight="5px"
          >
            {unreadeCount}
          </Text>}
          <Text ml="auto" fontSize="xs" fontWeight="normal" color="#0C0C0C">
            {/* {formattedTimestamp} */}
            {formatDate(last_message.timestamp)}
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}

export default ConversationListItem;
