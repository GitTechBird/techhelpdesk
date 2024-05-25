import React, { useRef, useEffect, useState, useReducer, useMemo, useCallback } from "react";
import { useImmer } from "use-immer";
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
  HStack,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,Skeleton, SkeletonCircle, SkeletonText,Progress 
} from "@chakra-ui/react";

// Import Component lists
import MessangerConvesationHeader from "./Messanger/MessangerConvesationHeader.tsx";
import MessangerConvesation from "./Messanger/MessangerConvesation.tsx";
import MessangerQlEditor from "./Messanger/MessangerQlEditor.tsx";
import MessangerTextEditor from "./Messanger/MessangerTextEditor.tsx";

import MessangerDetails from "./Messanger/MessangerDetails.tsx";
import MessangerIMDetails from "./Messanger/MessangerIMDetails.tsx";

// Import Hooks lists
import { useHDDetailsFetch } from "../hooks/useHDDetailsFetch.ts";

import { EmailIcon } from "@chakra-ui/icons";
import { getConversationList } from "../services/flowXoServices.ts";
import { Outlet, useNavigate } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { isJSON } from "../utils/utils.ts";
import { processPublishEvents } from "../utils/eventUtils.ts";
import { useAppContext } from "../context/AppContext.tsx";
import ConversationListItem from "./ConversationListItem.tsx";
import { SEND_MESSAGE_ENUM } from "../utils/chatEventEnum.ts";
import { CHAT_IM_DETAILS_ENUM, MESSANGER_TAB_ENUN } from "../utils/chatRequestEnum.ts";

import { getImDetails, postImDetails } from "../services/messangerIMService.ts";

export const MainPage: React.FC<any> = () => {
  const { activeChannel, updateActiveChannel, updateIMDetails, hdActiveUser, activeTab } =
    useAppContext();

  const channelId = "659ff3b4d82398007c649739";
  const userId = "659ff3b4d82398007c649739";
  const socketUrl =
    "wss://socket.flowxo.com/socketcluster/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmZjNiNGQ4MjM5ODAwN2M2NDk3MzkiLCJyb2xlIjoiT3duZXIiLCJzZXNzaW9uX3NlY3JldCI6IiQyYiQxMCRQSWdlanN0aTFycmpqamE1NFJtcjguMk5lc0lVbTkyWnkudVFRSk5YYklSbFlpblJETFY3MiIsImZlYXR1cmVzIjpbXSwidGVhbU1lbWJlcklkIjoiNjU5ZmYzYjVjOWU2MDYwMDdjMGIwNDMxIiwiaWF0IjoxNzA0OTg1NzQ5fQ.NVt54h23Ix5jKUnLLd-0judjmT27grDnkeMgu0ho-Js";
  useHDDetailsFetch("HD_TICKET_TYPE");
  useHDDetailsFetch("HD_TICKET_PRIORITY");
  useHDDetailsFetch("HD_TEAM");


  const channelReducer = (state, action) => {
    switch (action.type) {
      case "cid":
        return [...state, { ...action.payload, status: 0 }];

      case "RESET":
        return [];

      default:
        throw new Error();
    }
  };
  const [loading, setLoading] = useState(0);
  let messangerCount = useRef(0);
  let channelRef = useRef(0);
  // Channel subscription state
  const [channelSubList, dispatchChannelSub] = useReducer(channelReducer, []);

  const fnInvokeTOProcessIMs = (data) => {
    console.log("fnInvokeTOProcessIMs", data)
    // data.forEach(function (obj, index) {
    //   channelRef.current = channelRef.current + 1;
    //   processImDetails(obj);
    // });
  }

  const processImDetails = async (channelDetail) => {
    if (!channelDetail?.im_details) {
      // fnGetImDetails(channelDetail.conversation.user._id)
      let channelIMDetails = await getImDetails(
        channelDetail.conversation.user._id
      );
      // console.log("channelIMDetails", channelIMDetails);
      /**
       * Update Context to get the IM details
       */
      // updateIMDetails(channelDetail.channelId, channelIMDetails[0]);

      /**
       *  Channel IM Details are availble on System
       */
      if (channelIMDetails.length > 0) {
        dispatchChannelList({
          type: "updateImDetails",
          payload: {
            channelId: channelDetail.channelId,
            im_details: channelIMDetails[0],
          },
        });
      } else {
        /**
         *  Update FLowXO IM Details into Server system
         *
         */
        let jsonObj = _.cloneDeep(CHAT_IM_DETAILS_ENUM);

        jsonObj.im_id = channelDetail.conversation.user._id;
        jsonObj.im_name = channelDetail.conversation.user.name;
        jsonObj.im_handle = channelDetail.conversation.user.handle;
        jsonObj.im_response_path = channelDetail.conversation._id;

        jsonObj.islivechat = channelDetail.conversation.agent_mode;

        jsonObj.bot_id = channelDetail.conversation.bot._id;
        jsonObj.bot_user = channelDetail.conversation.bot.user;
        jsonObj.bot_type = channelDetail.conversation.bot.type;
        jsonObj.bot_name = channelDetail.conversation.bot.name;
        jsonObj.bot_integration_slug =
          channelDetail.conversation.bot.integration_slug;

        jsonObj.hd_agent = null;
        jsonObj.hd_team = null;

        let updateIMResponse = await postImDetails(jsonObj);
        // console.log("updateIMResponse", updateIMResponse);
        dispatchChannelList({
          type: "updateImDetails",
          payload: {
            channelId: channelDetail.channelId,
            im_details: updateIMResponse,
          },
        });
      }
    }
  };
  // Channel List state variable to store the List of Messangers
  const [ChannelList, dispatchChannelList] = useReducer((state, action) => {
    switch (action.type) {
      case "addChannel":
        processImDetails(action.payload)
        // Count the channel list with subscription count to block the loading of websocket and APIs, After chat loads completely, fetch IM and Agent details from API.
        // console.log("addChannel ref", channelRef.current)
        if(channelRef.current === channelSubList.length) {
          // channelRef.current = 0
          // setLoading(false);
          // Call "processImDetails" Functions to Load IM details
          
        }
        let channelIndex = _.findIndex(state, function (channel) {
          return channel.channelId == action.payload.channelId;
        });
        
        if (channelIndex < 0) {
          let temp =  [...state, { ...action.payload }];
          // fnInvokeTOProcessIMs(temp);
          return temp
        }
        
      // return [...state, { ...action.payload }];

      case "updateLatestMessage":
        return state.map((channel) => {
          if (channel.channelId === action.payload.channelId) {
            return {
              ...channel,
              conversation: action.payload.conversation,
              latestMessage: action.payload.conversation.last_message,
              options: action.payload.options,
            };
          }
          return channel;
        });

      case "updateImDetails":
        return state.map((channel) => {
          if (channel.channelId === action.payload.channelId) {
            return {
              ...channel,
              im_details: action.payload.im_details,
            };
          }

          if(channelRef.current === channelSubList.length) {
            channelRef.current = 0
            
          }
          return channel;
        });

      case "clearChannel":
        return [];

      default:
        throw new Error();
    }
  }, []);

  const [messages, setMessages] = useImmer({});

  const cid = useRef(0);
  const rid = useRef(0);

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('ws opened'),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  const getCurrentCidValue = () => {
    cid.current = cid.current + 1;
    return cid.current;
  };
  const sendWsMessage = (data) => {
    sendJsonMessage(data);
  };

  useEffect(()=>{
    console.log("loading", loading)
  },[loading])

  useEffect(() => {
    if (lastMessage !== null) {
      let event_data;
      if (isJSON(lastMessage.data)) {
        event_data = JSON.parse(lastMessage.data);
      } else {
        event_data = lastMessage.data;
      }
      // setMessageHistory((prev) => prev.concat(event_data));

      // Ping-pong to make  sure the server has received our message
      if (event_data === "#1") {
        sendMessage("#2");
      }

      if (event_data.rid === 1) {
        // Step - 2 :: Subscribe to channel ID
        sendWsMessage({
          event: "#subscribe",
          data: {
            channel: `${channelId}`,
          },
          cid: getCurrentCidValue(),
        });

        // Step - 3 :: Get Agnet state
        sendMessage(
          JSON.stringify({
            event: "AGENT_STATE",
            data: {
              type: "AGENT_STATE",
              channelId: `${channelId}`,
              userId: `${userId}`,
              options: {
                limit: 30,
                type: "agent",
                filter: {},

                // "filter": {
                //   "agent_mode":true // [true : Live chat | false : BOT]
                // }
              },
            },
          })
        );
      }

      // Provide Response back to above channel Id subscription
      if (event_data.rid > 2) {
        setLoading(40);
        channelSubList.find((obj, index) => {
          if (obj.cid === event_data.rid && obj.status === 0) {
            let jsonObj = {
              event: "CONVERSATION_STATE",
              data: {
                type: "CONVERSATION_STATE",
                channelId: obj.data.channel,
                userId: userId,
                options: {
                  limit: 20,
                  type: "conversation",
                  filter: {},
                },
              },
            };
            sendWsMessage(jsonObj);

            // Hold : for further impl
            // dispatchChannelSub({ type:"cidProcessed", payload: index})
          }
        });
      }

      /**
       * When messgae arrices
       */
      if (event_data.event === "#publish") {
        // console.log("Publish 1", event_data);
        processPublishEvents(event_data.data, function (result) {
          switch (result.eventType) {
            case "AGENT_STATE":
              dispatchChannelList({ type: "clearChannel", payload: [] });
              dispatchChannelSub({ type: "RESET", payload: [] });
              if (channelSubList.length > 0) {
                invokeUnSubscription(channelSubList);
              }

              // Step-4 : Subscribe all the channels received from server.
              // This is the no fo active channels on messanger list
              // messangerCount.current = result.data.conversations.length;
              invokeSubscription(result.data.conversations);
              break;

            case "CONVERSATION_STATE":
              channelRef.current = channelRef.current + 1;
              dispatchChannelList({ type: "addChannel", payload: result.data });
              dispatchChannelList({
                type: "updateLatestMessage",
                payload: result.data,
              });
              // dispatchChannelList({ type: "add_update_channel", payload: result.data })
              // If Channel is selected, push messages data into respective channel
              if (activeChannel.channelId === result.data.channelId) {
                setMessages(result.data.conversation);
                // setMessages(draft => {
                //     draft =  result.data.conversation
                // })
              }
              break;

            default:
              break;
          }
        });
      }
    }
  }, [lastMessage]);

  const invokeUnSubscription = (result) => {
    result.forEach(function (element, index) {
      let jsonObj = {
        event: "#unsubscribe",
        data: element,
      };
      sendWsMessage(jsonObj);
    });
  };

  const invokeSubscription = (result) => {
    result.forEach(function (element, index) {
      let jsonObj = {
        event: "#subscribe",
        data: {
          channel: `${element}`,
        },
        cid: getCurrentCidValue(),
      };
      dispatchChannelSub({ type: "cid", payload: jsonObj });
      sendWsMessage(jsonObj);
    });
  };

  

  useEffect(() => {
    console.log("Ready State changed,", readyState)
    if (readyState === ReadyState.CONNECTING) {
    }

    // Step - 1 to  connect the WebSocket server using "#handshake" event
    if (readyState === ReadyState.OPEN) {
      sendWsMessage({
        event: "#handshake",
        data: { authToken: "" },
        cid: getCurrentCidValue(),
      });
    }
  }, [readyState]);


  

  

  useEffect(() => {
    if (activeChannel) {
      let filterChannelDetails = _.find(ChannelList, {
        channelId: activeChannel.channelId,
      });
      setMessages(filterChannelDetails.conversation);

      /**
       *  Function to get Latest IM IM details for the selected customer
       */
      // processImDetails(filterChannelDetails);
    }
  }, [activeChannel]);

  useEffect(() => {
    // console.log("ChannelList useEffect")
    if (ChannelList.length > 0 && activeChannel == null) {
      updateActiveChannel(ChannelList[0]);
    }
  }, [ChannelList]);

  // Sort channel list based on time stamp and user Assigned rules
  function filterChannelListOnTabSelection(){
    if(activeTab == 0) {
      return _.filter(ChannelList, function(o) { return (o?.im_details || o.im_details?.hd_agent ) && o.im_details.hd_agent == null});
    } else if (activeTab == 1) {
      return _.filter(ChannelList, function(o) { return o?.im_details && o.im_details?.hd_agent && o.im_details.hd_agent === hdActiveUser.user_id })
    } else {
      return _.filter(ChannelList, function(o) { return o?.im_details && o.im_details?.hd_agent && o.im_details.hd_agent !== hdActiveUser.user_id })
    }
  };

  const sortChannelList = useMemo(() => {
    // Filter Channel list based on Tab Selection
    // console.log("Active agent", hdActiveUser, ChannelList.length)
    
    if (channelSubList.length > 0 && ChannelList.length === channelSubList.length){
      
      setLoading(100)
      return (
        ChannelList &&
        ChannelList.length > 0 &&
        filterChannelListOnTabSelection().sort((x, y) => {
          return new Date(x.conversation.last_message.timestamp) <
            new Date(y.conversation.last_message.timestamp)
            ? 1
            : -1;
        })
      );
    }
    
  }, [ChannelList, activeTab]);

  // If req is same as user id (conversation.user._id)
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



  // Function to send message, Clone the schema object from Enum
  const sendImMessage = (data) => {
    // e.preventDefault();
    let message = {
      ...SEND_MESSAGE_ENUM,
    };
    message.data.channelId = activeChannel.channelId;
    message.data.message = {
      text: data,
      type: "text",
    };
    message.data.userId = activeChannel.conversation.bot.user;
    sendWsMessage(message);
  };
  if (loading < 100) {
    return(
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        <Text>Agent Logged in as {hdActiveUser.user_id}</Text>
        <Progress hasStripe size='lg' value={loading} w="100%"/>
      </Box>
    );
  }

  return (
    <Flex h="100vh">
      {/* Users List */}
      <Flex className="w1" mh="100%" overflow="auto" mw="100%" w="100%">
        <VStack w="25%" maxW="25%" h="100vh" overflow="hidden">

          {/* Messanger List cataegory */}
          <MessangerDetails>
            <Flex
              flexDirection="column"
              className="conversation-list-item"
              overflowY="auto"
              h="100%"
            >
              {sortChannelList &&
                sortChannelList.map((conversation, index) => (
                  <ConversationListItem
                    key={index}
                    data={conversation}
                    channelId={conversation.channelId}
                  />
                ))}
            </Flex>
          </MessangerDetails>
        </VStack>

        {/* Chat Messages */}
        <VStack
          w="55%"
          spacing={2}
          align="stretch"
          style={{
            background: "#F8F8F8",
            backgroundImage: "url(http://3.110.128.51/files/IM-BG-IMAGE.png)",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundColor: "#EEF1FA",
          }}
        >
          <MessangerConvesationHeader />
          <MessangerConvesation messages={messages} />

          {/* Message Section to send message */}
          {/* <MessangerQlEditor sendImMessage={sendImMessage}/> */}
          <MessangerTextEditor sendImMessage={sendImMessage} />
        </VStack>

        {/* Additional Messanger details */}
        <VStack w="20%">
          <MessangerIMDetails />
        </VStack>
      </Flex>
    </Flex>
  );
};
