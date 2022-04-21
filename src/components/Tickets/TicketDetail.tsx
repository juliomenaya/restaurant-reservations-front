import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


import './ticketsStyles.css'
import { State } from "../../reducers";
import { getTicketDetail, updateTicket, deleteTicket } from "../../services/ticketService";
import { ITicket } from "../../types/ticketTypes";



const TicketDetail = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState<ITicket|undefined>(undefined);
    const [name, setName] = useState<string>('');
    const [availability, setAvailability] = useState<number>(1);

    const { token } = useSelector((state: State) => state.owner);
    const navigate = useNavigate();

    useEffect(() => {
        const getDetail = async () => {
            const response = await getTicketDetail(token, parseInt(ticketId));
            setTicket(response);
        };
        getDetail();
    }, [ticketId]);

    const update = async () => {
        const response = await updateTicket(
            token,
            parseInt(ticketId),
            {
                name,
	            max_purchase_count: availability
            }
        );
    };

    const onDelete = async () => {
        const deleted = await deleteTicket(token, parseInt(ticketId));
        if (deleted) {
            navigate(-1); // go back to ticketlist
        }
    };

    return ticket && (
        <div className="ticket-detail-container">
            <h2>Ticket Details:</h2>
            <Form key={ticket?.id}>
                <Form.Group className="mb-3">
                    <Form.Label>Ticket name:</Form.Label>
                    <Form.Control
                        defaultValue={ticket?.name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Label>Max purchase count</Form.Label>
                    <Form.Control
                        defaultValue={ticket?.maxPurchaseCount}
                        min={ticket?.maxPurchaseCount}  // avoid edit max purchase with less available tickets
                        onChange={e => setAvailability(parseInt(e.target.value))}
                        type='number'
                    />
                    <Form.Label>Still available</Form.Label>
                    <Form.Control
                        defaultValue={ticket?.availableCoupons}
                        disabled
                    />
                    <Form.Label>Restaurant</Form.Label>
                    <Form.Control
                        defaultValue={ticket?.restaurantName}
                        disabled
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    onClick={update}
                >
                    Save changes
                </Button>
                <Button
                    variant="danger"
                    onClick={onDelete}
                    style={{marginLeft: 20}}
                >
                    Delete
                </Button>
            </Form>
        </div>
    );
};

export default TicketDetail;
