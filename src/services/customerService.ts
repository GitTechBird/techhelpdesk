import axiosInstance from './axiosInstance.js';
import isValidApiResponse from '../utils/utils.js';

const getCustomers = async () => {
    try {
        const response = await axiosInstance.get(`/api/resource/Customer`);
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

const getContacts = async (custom) => {
    try {
        const response = await axiosInstance.get(`/api/resource/Customer`);
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


export { getCustomers }