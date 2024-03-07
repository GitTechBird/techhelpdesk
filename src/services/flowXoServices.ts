import axiosInstanceFlowXO from './axiosInstanceFlowXO.ts';
import axiosInstance from './axiosInstance.ts';

function isValidApiResponse(response) {
    // Check if response is not null or undefined
    if (!response) {
      return false;
    }
  
    // Check if response status is in the range of 200 to 299 (indicating success)
    if (response.status < 200 || response.status >= 300) {
      return false;
    }
  
    // Check if response data is present
    if (!response.data) {
      return false;
    }
  
    // Add additional checks specific to your API response structure if needed
  
    return true;
  }

const getConversationList = async (email) => {
    try {
        const response = await axiosInstance.get(`/api/method/one_tap_v1.api.get_conversations`);
        if(isValidApiResponse(response)){
            return response.data;
        } else {
            throw error({message: "Error while login"})
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}



export { getConversationList }