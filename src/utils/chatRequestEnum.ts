const CHAT_IM_DETAILS_ENUM = {
  im_id: null,
  im_name: null,
  im_handle: null,
  im_response_path: null,
  islivechat: 0,
  bot_id: null,
  bot_user: null,
  bot_type: null,
  bot_name: null,
  bot_integration_slug: null,
  hd_agent: null,
  hd_team: null,
};

const CREATE_HD_TICKET_ENUM = {
  doc: {
    description: "",
    subject: "",
    template: "",
    priority: "",
    ticket_type: "",
    status: "",
    raised_by: "",
    agent_group: "",
  },
  attachments: [],
};

const UPDATE_IM_TICKET_DETAILS = {
  "im_messanger_id" : "",
  "im_hd_ticket" : ""
}

const MESSANGER_TAB_ENUN = {
  "UN_ASSIGNED" :  0 ,
  "SELF" : 1,
  "OPEN" : 2

}

export { 
  CHAT_IM_DETAILS_ENUM,
  CREATE_HD_TICKET_ENUM,
  UPDATE_IM_TICKET_DETAILS,
  MESSANGER_TAB_ENUN
};
