export interface Dish {
    id: number;
    image: string;
    name: string;
    category: string;
    price: number;
    description: string;
}

export interface CartItem {
    image: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    isChecked: boolean;
}

export type Cart = CartItem[];

export interface User {
    name: string;
}
