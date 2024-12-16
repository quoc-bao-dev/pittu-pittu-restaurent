import { signal } from 'qyber';
import { loginApi } from '../services/authService';
import { jwtDecode } from 'jwt-decode';
import { User } from '../interface';
import router from '../router';
import Swal from 'sweetalert2';

const authSignal = signal<{ isLogin: boolean; user: User | null }>({
    isLogin: false,
    user: null,
});

export const login = async (username: string, password: string) => {
    try {
        const res = await loginApi(username, password);
        const token = res.data.token;
        localStorage.setItem('token', token);
        const payload = jwtDecode<{ username: string }>(token);
        const user: User = { name: payload.username };

        authSignal.set({ isLogin: true, user });
        Swal.fire({
            icon: 'success',
            title: 'Login successful',
            text: 'Welcome, ' + user.name,
        });
        router.navigate('/home');
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: 'Invalid username or password',
        });
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    authSignal.set({ isLogin: false, user: null });
    router.navigate('/login');
};

export default authSignal;
