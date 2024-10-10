import api from "@/helpers/axiosInstance";
import { CreateOrderResponse } from "@/interfaces/apiResponse";

export const usePayment = () => {

    const createOrder = async (amount: string): Promise<CreateOrderResponse> => {
        try {
            const response = await api.post('/payment/create-order', {
                total_amount: amount
            });
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };

    return { createOrder }
}