import axios from 'axios';
import { BASE_URL } from '../constant';

interface DishResponse {
    id: number;
    image: string;
    name: string;
    category: string;
    price: number;
    description: string;
}

export const getAllDishes = () =>
    axios.get<DishResponse[]>(`${BASE_URL}/dishes`);

export const getDishById = (id: number) =>
    axios.get<DishResponse>(`${BASE_URL}/dishes/${id}`);

export const getSearchDish = (keyword: string) =>
    axios.get(`${BASE_URL}/search?query=${keyword}`);
