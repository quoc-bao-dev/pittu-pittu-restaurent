import axios from 'axios';
import { BASE_URL } from '../constant';

export const loginApi = (username: string, password: string) =>
    axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
    });
