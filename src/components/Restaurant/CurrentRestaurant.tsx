import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";


import { updateRestaurant } from "../../services/restaurantService";
import { IRestaurant, IRestaurantUpdates } from "../../types/restaurantTypes";
import './restaurantStyles.css';

interface ICurrentRestaurantProps {
    restaurant: IRestaurant,
    onUpdateRestaurant:  (restaurantId: number, updates: IRestaurantUpdates) => void
};

const CurrentRestaurant = ({ restaurant, onUpdateRestaurant }: ICurrentRestaurantProps) => {
    const [updatedName, setUpdatedName] = useState<string>('');

    return (
        <div className="current-restaurant-container">
            <h2>Your restaurant {restaurant.name}</h2>
            <Form key={restaurant.id}>
                <Form.Group className="mb-3">
                    <Form.Label>Restaurant name:</Form.Label>
                    <Form.Control
                        defaultValue={restaurant.name}
                        onChange={e => setUpdatedName(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    onClick={() => onUpdateRestaurant(restaurant.id, { name: updatedName })}
                    disabled={!updatedName}
                >
                    Save changes
                </Button>
            </Form>
        </div>
    );
};

export default CurrentRestaurant;
