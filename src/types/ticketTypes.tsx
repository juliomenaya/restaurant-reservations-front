// represent the api response
export interface ITicketResponse {
    id: number,
    name: string,
    max_purchase_count: number,
    available_coupons: number,
    restaurant_name: string
};

// represent the objects handled with javascript
// just to stick up with the naming conventions
export interface ITicket {
    id: number,
    name: string,
    maxPurchaseCount: number,
    availableCoupons: number,
    restaurantName: string
};
