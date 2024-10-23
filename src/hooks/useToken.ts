import api from "@/helpers/axiosInstance";
import { OpenIDResponse } from "@/interfaces/apiResponse";

export const useToken = () => {
    const fetchToken = async (ssoString: string): Promise<OpenIDResponse> => {
        try {
            const { data } = await api.post('/auth/get-user-info', {
                access_token: ssoString
            });
            console.log(data, 'inside useToken')
            return data;
        } catch (error) {
            console.error('Error fetching token:', error);
            throw error;
        }
    }

    return { fetchToken }
}