import router from './router';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app')!;
    router.render(root);
});
