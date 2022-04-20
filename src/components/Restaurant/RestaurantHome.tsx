import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


import { State } from "../../reducers";
import { IRestaurant, IRestaurantUpdates } from "../../types/restaurantTypes";
import { getRestaurants, updateRestaurant } from "../../services/restaurantService";
import RestaurantSelector from "./RestaurantSelector";
import CurrentRestaurant from "./CurrentRestaurant";


const RestaurantHome = () => {
    const { token } = useSelector((state: State) => state.owner);
    const [restaurants, setRestaurants] = useState<Array<IRestaurant>|IRestaurant[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState<IRestaurant>({ id: 0, name: '' });

    const fetchRestaurants = useCallback(async (restaurantToSelect: number = null) => {
        const response = await getRestaurants(token);
        setRestaurants(response);
        if (restaurantToSelect)
            setSelectedRestaurant(response.find(restaurant => restaurant.id === restaurantToSelect));
        else
            setSelectedRestaurant(response[0]);
    }, []);

    const saveChanges = async (restaurantId: number, updates: IRestaurantUpdates) => {
        await updateRestaurant(token, restaurantId, updates)
            .catch(console.error);
        await fetchRestaurants(restaurantId);
    };

    useEffect(() => {
        fetchRestaurants();
    }, [fetchRestaurants]);

    const onRestaurantSelection = (restaurantId: number) => {
        setSelectedRestaurant(restaurants.find(restaurant => restaurant.id === restaurantId));
    };

    return restaurants && (
        <div>
            <RestaurantSelector restaurants={restaurants} onSelection={onRestaurantSelection} />
            <Link to={'/new-restaurant'}>Create restaurant</Link>
            <CurrentRestaurant restaurant={selectedRestaurant} onUpdateRestaurant={saveChanges} />
        </div>
    );
};

export default RestaurantHome;
