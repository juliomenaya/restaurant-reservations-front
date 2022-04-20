import { api } from ".";
import { ITicket, ITicketResponse } from "../types/ticketTypes";

export const getTicketsByRestaurant = async (token, restaurantId: number) => {
    const response = await api.get(
        `tickets/restaurant_coupons?restaurant=${restaurantId}`,
        {
            headers: { Authorization: `Token ${token}` }
        }
    );
    const tickets: Array<ITicketResponse> = response.data;
    return tickets.map(ticket => {
        const _ticket: ITicket = {
            id: ticket.id,
            name: ticket.name,
            maxPurchaseCount: ticket.max_purchase_count,
            availableCoupons: ticket.available_coupons,
            restaurantName: ticket.restaurant_name
        };
        return _ticket;
    });
};
