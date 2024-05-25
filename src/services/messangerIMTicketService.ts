import axiosInstance from "./axiosInstance.ts";
import isValidApiResponse from "../utils/utils.ts";

const getImTicketList = async (im_id) => {
  try {
    const response = await axiosInstance.get(
      `/api/v2/document/IM Messangers?fields=["*"]&filters=[["im_id","=","${im_messanger_id}"]]`
    );
    if (isValidApiResponse(response)) {
      return response.data.data;
    } else {
      throw error({ message: "Error while getting IM details" });
    }
  } catch (error) {
    console.error("Error while getting IM details:", error);
    throw error;
  }
};

const postImDetails = async (request_body) => {
  try {
    const response = await axiosInstance.post(
      `/api/v2/document/IM Messangers`,
      request_body
    );
    if (isValidApiResponse(response)) {
      return response.data.data;
    } else {
      throw error({ message: "Error while getting IM details" });
    }
  } catch (error) {
    console.error("Error while getting IM details:", error);
    throw error;
  }
};

const createHdTicket = async (request_body) => {
  try {
    const response = await axiosInstance.post(
      `api/v2/method/helpdesk.helpdesk.doctype.hd_ticket.api.new`,
      request_body
    );
    if (isValidApiResponse(response)) {
      return response.data.data;
    } else {
      throw error({ message: "Error while creating ticket" });
    }
  } catch (error) {
    console.error("Error While Creating HD ticket:", error);
    throw error;
  }
};

const updateImTicketDetails = async (request_body) => {
  try {
    const response = await axiosInstance.post(
      `/api/v2/document/IM Ticket`,
      request_body
    );
    if (isValidApiResponse(response)) {
      return response.data.data;
    } else {
      throw error({ message: "Error while updating IM ticket details" });
    }
  } catch (error) {
    console.error("Error while updating IM ticket details:", error);
    throw error;
  }
};

const fecthImTicketDetails = async (im_messanger_id) => {
  try {
    const response = await axiosInstance.get(`/api/v2/document/IM Ticket?fields=["*"]&filters=[["im_messanger_id","=","${im_messanger_id}"]]`);
    if (isValidApiResponse(response)) {
      return response.data.data;
    } else {
      throw error({ message: "Error while updating IM ticket details" });
    }
  } catch (error) {
    console.error("Error while updating IM ticket details:", error);
    throw error;
  }
};

export {
  getImDetails,
  postImDetails,
  createHdTicket,
  updateImTicketDetails,
  fecthImTicketDetails,
};
