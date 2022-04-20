import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";


import './restaurantStyles.css';
import { createRestaurant } from "../../services/restaurantService";
import { useSelector } from "react-redux";
import { State } from "../../reducers";
import { useNavigate } from "react-router-dom";


const NewRestaurant = () => {
    const { token } = useSelector((state: State) => state.owner);
    const [restaurantName, setRestaurantName] = useState<string>('');
    const navigate = useNavigate();

    const saveRestaurant = async () => {
        await createRestaurant(token, { name: restaurantName });
        navigate('/restaurants');
    };


    return (
        <div className="create-restaurant-container">
            <h2>Restaurant creation</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Restaurant name:</Form.Label>
                    <Form.Control
                        placeholder="Which is going to be your new's restaurant name?"
                        onChange={e => setRestaurantName(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    onClick={saveRestaurant}
                >
                    Create
                </Button>
            </Form>
        </div>
    );
};

export default NewRestaurant;
