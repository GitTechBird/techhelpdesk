import axiosInstance from './axiosInstance.js';
import isValidApiResponse from '../utils/utils.ts';

const getImDetails = async (im_id) => {
    try {
        const response = await axiosInstance.get(`/api/v2/document/IM Messangers?fields=["*"]&filters=[["im_id","=","${im_id}"]]`);
        if(isValidApiResponse(response)){
            return response.data.data;
        } else {
            throw error({message: "Error while getting IM details"})
        }
    } catch (error) {
        console.error('Error while getting IM details:', error);
        throw error;
    }
}

const postImDetails = async (request_body) => {
    try {
        const response = await axiosInstance.post(`/api/v2/document/IM Messangers`,
        request_body
        );
        if(isValidApiResponse(response)){
            return response.data.data;
        } else {
            throw error({message: "Error while getting IM details"})
        }
    } catch (error) {
        console.error('Error while getting IM details:', error);
        throw error;
    }
}


export { getImDetails, postImDetails }