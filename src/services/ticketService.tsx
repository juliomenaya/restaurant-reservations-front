import { api } from ".";
import { ITicket, ITicketCreation, ITicketCreationResponse, ITicketResponse, ITicketToUpdate } from "../types/ticketTypes";

const ticketToCamelCase = (snakeCaseTicket: ITicketResponse): ITicket => {
    return {
        id: snakeCaseTicket.id,
        name: snakeCaseTicket.name,
        maxPurchaseCount: snakeCaseTicket.max_purchase_count,
        availableCoupons: snakeCaseTicket.available_coupons,
        restaurantName: snakeCaseTicket.restaurant_name
    };
};

export const getTicketsByRestaurant = async (token: string, restaurantId: number) => {
    const response = await api.get(
        `tickets/restaurant_coupons?restaurant=${restaurantId}`,
        {
            headers: { Authorization: `Token ${token}` }
        }
    );
    const tickets: Array<ITicketResponse> = response.data;
    return tickets.map(ticket => ticketToCamelCase(ticket));
};

export const getTicketDetail = async (token: string, ticketId: number) => {
    const response = await api.get(
        `tickets/${ticketId}`,
        {
            headers: { Authorization: `Token ${token}` }
        }
    );
    const ticket: ITicketResponse = response.data;
    return ticketToCamelCase(ticket);
};

export const updateTicket = async (token: string, ticketId: number, updates: ITicketToUpdate) => {
    const response = await api.patch(
        `tickets/${ticketId}/`,
        updates,
        {
            headers: { Authorization: `Token ${token}` }
        }
    );
    const ticketResponse: ITicketResponse = response.data;
    return ticketToCamelCase(ticketResponse);
};

export const createTicket = async (token: string, newTicket: ITicketCreation) => {
    const response = await api.post(
        'tickets/',
        newTicket,
        {
            headers: { Authorization: `Token ${token}` }
        }
    );
    return response.data as ITicketCreationResponse;

};
