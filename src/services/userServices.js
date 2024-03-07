import axiosInstance from './axiosInstance.js';
import isValidApiResponse from '../utils/utils.js';

const getUserDetails = async (email) => {
    try {
        const response = await axiosInstance.get(`/api/resource/User/${email}`);
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



export { getUserDetails }