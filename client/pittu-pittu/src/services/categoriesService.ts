import axios from 'axios';
import { BASE_URL } from '../constant';

export const getAllCate = () => axios.get(`${BASE_URL}/categories`);
