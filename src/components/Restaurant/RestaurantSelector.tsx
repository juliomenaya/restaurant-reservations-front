import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


import { State } from "../../reducers";
import { IRestaurantResponse } from "../../types/restaurantTypes";
import { getRestaurants } from "../../services/restaurantService";

const RestaurantSelector = () => {
    const { token } = useSelector((state: State) => state.owner);
    const [restaurants, setRestaurants] = useState<Array<IRestaurantResponse>|IRestaurantResponse[]>([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            const response = await getRestaurants(token);
            setRestaurants(response);
        };
        fetchRestaurants()
    }, [token]);

    return restaurants && (
        <select>
            <option value="Select a restaurant"> -- Select a restaurant -- </option>
            {restaurants.map((restaurant) => <option key={restaurant.id}>{restaurant.name}</option>)}
        </select>
    );
};

export default RestaurantSelector;
