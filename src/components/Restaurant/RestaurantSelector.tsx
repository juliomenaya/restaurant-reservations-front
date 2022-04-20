import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


import { State } from "../../reducers";
import { IRestaurant } from "../../types/restaurantTypes";
import { getRestaurants } from "../../services/restaurantService";

interface IRestaurantSelectorProps {
    restaurants: Array<IRestaurant>,
    onSelection: (restaurantId: number) => void
};

const RestaurantSelector = ({ restaurants, onSelection }: IRestaurantSelectorProps) => {
    return (
        <div>
            <span>Select your restaurant:</span>
            <select onChange={(e) => onSelection(parseInt(e.target.value))}>
                {restaurants.map((restaurant) => <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>)}
            </select>
        </div>
    );
};

export default RestaurantSelector;
