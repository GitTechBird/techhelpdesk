import React, { useRef, useEffect } from "react";
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
  HStack,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import { useAppContext } from "../../context/AppContext.tsx";
import { formatDate } from "../../utils/date.ts"
import parse from 'html-react-parser';

const MessangerConvesation = ({ messages }) => {
  const { activeChannel, updateActiveChannel, updateIMDetails } =
    useAppContext();


  // Function to handle the scroll event of chat
  const bottomRef = useRef(null);
  // useEffect(() => {
  //   if (bottomRef.current) {
  //     bottomRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);


  const checkIsOwnMessage = (req) => {
    if (
      activeChannel &&
      "conversation" in activeChannel &&
      activeChannel.conversation.user._id === req.from
    ) {
      return true;
    }
    return false;
  };
  return (
    <>
      <VStack spacing={4} align="stretch" overflowY="auto" h="full" p={3}>
        {messages.hasOwnProperty("messages") &&
          messages.messages.map((message, index) => (
            <ChatMessage
              key={index}
              messages={message}
              isOwnMessage={checkIsOwnMessage(message)}
            />
          ))}
        <Box as="div" ref={bottomRef} h={1}>
          &nbsp;
        </Box>
      </VStack>
    </>
  );
};

export default MessangerConvesation;

// Chat message component
const parseWhatsAppText = (text) => {
  // Replace asterisks (*) with <strong> tags for bold
  // console.log("parseWhatsAppText-mew ", text)
  let parsed: any = "";

  try {

    if (typeof text !== "undefined") {
      parsed = text;
      parsed = text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

      // Replace underscores (_) with <em> tags for italic
      parsed = parsed.replace(/_([^_]+)_/g, '<em>$1</em>');

      // Replace strike (~) with <del> tags for italic
      parsed = parsed.replace(/~([^_]+)~/g, '<del>$1</del>');

      // Custom Code: Replace grave accents (`) with custom <code> tags
      parsed = parsed.replace(/```([^`]+)```/g, '<code>$1</code>');


      // Replace for break area
      parsed = parsed.replace(/\n/g, '<br>');
      return parsed;
    }


  } catch (err) {
    console.log("parseWhatsAppText", parsed)
    return "";
  }

};

const ChatMessage = ({ messages, isOwnMessage }) => {
  let { message, timestamp, type, from, conversation, agent_mode, _id } = { ...messages };

  return (
    <>
      <HStack
        position={"relative"}
        alignSelf={isOwnMessage ? "flex-end" : "flex-start"}
        _before={
          !isOwnMessage && {
            content: `""`,
            position: "absolute",
            width: "0%",
            height: "0px",
            left: "-10px",
            right: "0px",
            top: "0px",
            bottom: "auto",
            border: "10px solid",
            borderColor: "var(--chakra-colors-transparent)",
            borderTopColor: "var(--chakra-colors-gray-100)",
            borderRadius: "6px",
          }
        }
        _after={
          isOwnMessage && {
            content: `""`,
            position: "absolute",
            width: "0%",
            height: "0px",
            right: "-10px",
            top: "0px",
            bottom: "auto",
            border: "10px solid",
            borderColor: "var(--chakra-colors-transparent)",
            borderTopColor: "var(--chakra-colors-blue-500)",
            borderRadius: "6px",
          }
        }
      >
        <Box
          p={3}
          bg={isOwnMessage ? "blue.500" : "#FFF"}
          color={isOwnMessage ? "white" : "rgba(0, 0, 0, 0.9)"}
          borderRadius="lg"
          borderColor="#E4E4E4"
          fontSize="sm"
          minWidth="100px"
          boxShadow="base"
          flex={1}
          mb={"0px"}
        >
          {/* <Text >{message}</Text> */}
          <div dangerouslySetInnerHTML={{ __html: parseWhatsAppText(message) }} />
          {/* <Text>{parse(parseWhatsAppText(message))}</Text> */}

          <Text fontSize="2xs" fontWeight="light" textAlign="right" mt="1">{formatDate(timestamp)}</Text>
        </Box>
      </HStack>
    </>
  )
}