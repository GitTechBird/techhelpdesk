import { Icon } from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { FaTelegram } from "react-icons/fa6";
import { FaTelegramPlane  } from "react-icons/fa";

import { FaWhatsapp  } from "react-icons/fa6";
import { FaMessage, FaRegMessage } from "react-icons/fa6";
import { BiMessageRoundedDots } from "react-icons/bi";

import { RiUserReceived2Line } from "react-icons/ri";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { PiUserFocus } from "react-icons/pi";
import { GoOrganization } from "react-icons/go";
import { IoInformationCircleOutline } from "react-icons/io5";


const telegramIconstyle = {
  "width" : "1.5rem",
  "height" : "1.5rem",
  "background" : "#2DA5D8",
  "borderRadius" : "50%",
  "padding" : "4px",
  "color" : "#FFF"
}

const webIconstyle = {
  "width" : "1.5rem",
  "height" : "1.5rem",
  "borderRadius" : "50%",
  "padding" : "4px",
  "color" : "#000"
}


function ChatIcon({ type, size }) {
  if (type === "integration_sandbox") {
    return <Icon as={ FaWhatsapp } style={{ ...telegramIconstyle, "background" : "#075e55", ...size }} />;

  } else if (type === "integration_telegram") {
    return <Icon as={FaTelegramPlane} style={{ ...telegramIconstyle,  ...size }} />;

  } else if (type === "integration_web") {
    return <Icon as={ BiMessageRoundedDots }  style={{ ...webIconstyle , ...size }} />;

  } else {
    return <Icon as={ BiMessageRoundedDots } style={{ ...webIconstyle , ...size }} />;
  }
}

export function ChatUserIcon({ type }) {
  if ( type === "self_user" ) {
    return <Icon as={ RiUserReceived2Line } />;
  } else if ( type === "open" ) {
    return <Icon as={ MdOutlineMarkChatRead } />;
  } else if ( type === "Unassigned" ) {
    return <Icon as={ PiUserFocus } />;
  } else if ( type === "company_icon" ) {
    return <Icon as={ GoOrganization } fontSize="2xl"/>;
  } else if ( type === "info_icon" ) {
    return <Icon as={ IoInformationCircleOutline } fontSize="xl"/>;
  }
}


export default ChatIcon