import { signal } from 'qyber';
import { Cart, CartItem } from '../interface';

export const cartSignal = signal<Cart>([]);

export const addToCart = (item: CartItem) => {
    const curCart = [...cartSignal.get];
    const findIndex = curCart.findIndex((i) => i.name === item.name);
    if (findIndex !== -1) {
        curCart[findIndex].quantity += item.quantity;
        cartSignal.set(curCart);
    } else {
        curCart.push(item);
        cartSignal.set(curCart);
    }
};

export const removeFromCart = (name: string) => {
    const curCart = [...cartSignal.get];
    const findIndex = curCart.findIndex((i) => i.name === name);
    if (findIndex !== -1) {
        curCart.splice(findIndex, 1);
        cartSignal.set(curCart);
    }
};

export const changeQuantity = (name: string, quantity: number) => {
    const curCart = [...cartSignal.get];
    const findIndex = curCart.findIndex((i) => i.name === name);
    if (findIndex !== -1) {
        curCart[findIndex].quantity = quantity;
        cartSignal.set(curCart);
    }
};

export const clearCart = () => {
    cartSignal.set([]);
};
