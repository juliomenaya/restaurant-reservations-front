import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";


import { IRestaurant, IRestaurantUpdates } from "../../types/restaurantTypes";
import TicketsList from "../Tickets/TicketsList";
import './restaurantStyles.css';

interface ICurrentRestaurantProps {
    restaurant: IRestaurant,
    onUpdateRestaurant:  (restaurantId: number, updates: IRestaurantUpdates) => void,
    onDeleteRestaurant: (restaurantId: number) => void
};

const CurrentRestaurant = ({ restaurant, onUpdateRestaurant, onDeleteRestaurant }: ICurrentRestaurantProps) => {
    const [updatedName, setUpdatedName] = useState<string>('');

    return (
        <div className="current-restaurant-container">
            <h2>Your restaurant: {restaurant.name}</h2>
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
                <Button
                    variant="danger"
                    onClick={() => onDeleteRestaurant(restaurant.id)}
                    style={{marginLeft: 20}}
                >
                    Delete
                </Button>
            </Form>
            <br />
            <TicketsList restaurantId={restaurant.id}/>
        </div>
    );
};

export default CurrentRestaurant;
