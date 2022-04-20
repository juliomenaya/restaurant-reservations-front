import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { State } from "../../reducers";
import { Table } from "react-bootstrap";


import { IRestaurant } from "../../types/restaurantTypes";
import { ITicket } from "../../types/ticketTypes";
import { getTicketsByRestaurant } from "../../services/ticketService";

interface ITicketsListProps {
    restaurantId: number
};

const TicketsList = ({ restaurantId }: ITicketsListProps) => {
    const [tickets, setTickets] = useState<Array<ITicket>|ITicket[]>([]);
    const { token } = useSelector((state: State) => state.owner);

    const fetchTickets = useCallback(async () => {
        const response = await getTicketsByRestaurant(token, restaurantId);
        setTickets(response);
    }, [restaurantId]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    // const tickets = [
    //     {
    //         "id": 1,
    //         "name": "Coupon 1",
    //         "max_purchase_count": 20,
    //         "available_coupons": 17,
    //         "restaurant_name": "Julio's new restaurant"
    //     },
    //     {
    //         "id": 3,
    //         "name": "Coupon 3",
    //         "max_purchase_count": 20,
    //         "available_coupons": 20,
    //         "restaurant_name": "Maia's restaurant"
    //     },
    //     {
    //         "id": 4,
    //         "name": "Coupon 4",
    //         "max_purchase_count": 20,
    //         "available_coupons": 20,
    //         "restaurant_name": "Cat's house"
    //     },
    //     {
    //         "id": 5,
    //         "name": "Coupon 5",
    //         "max_purchase_count": 20,
    //         "available_coupons": 19,
    //         "restaurant_name": "La casona"
    //     }
    // ];
    
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
                            <tr key={ticket.id}>
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
