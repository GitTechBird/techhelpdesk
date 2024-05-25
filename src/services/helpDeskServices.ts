import axiosInstance from './axiosInstance.js';
import isValidApiResponse from '../utils/utils.js';

const helpDeskAuthUser = async (email) => {
    try {
        const response = await axiosInstance.get(`/api/v2/method/helpdesk.api.auth.get_user`);
        if(isValidApiResponse(response)){
            return response.data;
        } else {
            throw error({message: "Error While authenticating helpdesk user"})
        }
    } catch (error) {
        console.error('Error While authenticating helpdesk user', error);
        throw error;
    }
}


const helpDeskSessionUser = async (email) => {
    try {
        const response = await axiosInstance.get(`/api/v2/method/helpdesk.api.session.get_users`);
        if(isValidApiResponse(response)){
            return response.data;
        } else {
            throw error({message: "Error While fetching help desk session users"})
        }
    } catch (error) {
        console.error('Error While fetching help desk session users', error);
        throw error;
    }
}




export { helpDeskAuthUser, helpDeskSessionUser }