import { Route, Router } from 'qyber';

const routes: Route[] = [
    {
        path: '/',
        lazyComponent: () => import('./layout/Layout'),
        children: [
            { path: '', lazyComponent: () => import('./pages/home/Home') },
            { path: 'home', lazyComponent: () => import('./pages/home/Home') },
            { path: 'cart', lazyComponent: () => import('./pages/cart/Cart') },
            {
                path: 'dish/:id',
                lazyComponent: () => import('./pages/detail/Detail'),
            },
        ],
    },
    { path: '/login', lazyComponent: () => import('./pages/login/Login') },
];

const router = new Router(routes);

export default router;
