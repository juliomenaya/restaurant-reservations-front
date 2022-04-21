import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";


import { State } from "../../reducers";
import { createTicket } from "../../services/ticketService";

const NewTicket = () => {
    const [name, setName] = useState<string>('');
    const [availability, setAvailability] = useState<number>(1);

    const navigate = useNavigate()
    const { restaurantId } = useParams();
    const { token } = useSelector((state: State) => state.owner);

    const create = async () => {
        await createTicket(token, {
            max_purchase_count: availability,
            name,
            restaurant: parseInt(restaurantId)
        });
        navigate(-1);
    };

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Ticket name:</Form.Label>
                <Form.Control
                    onChange={e => setName(e.target.value)}
                />
                <Form.Label>How many are going to be available?</Form.Label>
                <Form.Control
                    defaultValue={10}
                    min={1}  // avoid edit max purchase with less available tickets
                    onChange={e => setAvailability(parseInt(e.target.value))}
                    type='number'
                />
            </Form.Group>
            <Button
                variant="primary"
                onClick={create}
            >
                Save changes
            </Button>
        </Form>
    );
};

export default NewTicket;
