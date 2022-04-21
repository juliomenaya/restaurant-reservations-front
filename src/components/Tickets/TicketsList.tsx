import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { State } from "../../reducers";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


import { ITicket } from "../../types/ticketTypes";
import { getTicketsByRestaurant } from "../../services/ticketService";

interface ITicketsListProps {
    restaurantId: number
};

const TicketsList = ({ restaurantId }: ITicketsListProps) => {
    const [tickets, setTickets] = useState<Array<ITicket>|ITicket[]>([]);
    const { token } = useSelector((state: State) => state.owner);
    const navigate = useNavigate();

    const ticketDetail = (ticketId) => {
        navigate(`/tickets/${ticketId}`);
    };

    const fetchTickets = useCallback(async () => {
        const response = await getTicketsByRestaurant(token, restaurantId);
        setTickets(response);
    }, [restaurantId]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);
    
    return tickets && (
        <div>
            <h2>Tickets list:</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ticket name</th>
                        <th>Restaurant name</th>
                        <th>Max purchase count</th>
                        <th>Available</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => {
                        return (
                            <tr key={ticket.id} onClick={() => ticketDetail(ticket.id)}>
                                <td>{ticket.name}</td>
                                <td>{ticket.restaurantName}</td>
                                <td>{ticket.maxPurchaseCount}</td>
                                <td>{ticket.availableCoupons}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default TicketsList;
