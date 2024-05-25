const SEND_MESSAGE_ENUM = {
  event: "SEND_MESSAGE",
  data: {
    type: "SEND_MESSAGE",
    channelId: "",
    message: {
      type: "",
      text: "",
    },
    userId: "",
    options: {
      type: "conversation",
      filter: {},
    },
  },
};



export { 
  SEND_MESSAGE_ENUM
};
