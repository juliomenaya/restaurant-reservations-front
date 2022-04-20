import { IRestaurantResponse } from "../types/restaurantTypes";


import { api } from ".";

export const getRestaurants = async (token: string) => {
    const response = await api.get('restaurants', {
        headers: { Authorization: `Token ${token}` }
    });
    return response.data as Array<IRestaurantResponse>;
};
