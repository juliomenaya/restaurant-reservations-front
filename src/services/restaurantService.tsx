import { IRestaurant, IRestaurantUpdates } from "../types/restaurantTypes";


import { api } from ".";

export const getRestaurants = async (token: string) => {
    const response = await api.get('restaurants', {
        headers: { Authorization: `Token ${token}` }
    });
    return response.data as Array<IRestaurant>;
};

export const updateRestaurant = async (token: string, restaurantId: number, updates: IRestaurantUpdates) => {
    const response = await api.patch(
        `restaurants/${restaurantId}/`,
        updates,
        {
            headers: { Authorization: `Token ${token}` }
        }
    );
    return response.data as IRestaurant;
};
