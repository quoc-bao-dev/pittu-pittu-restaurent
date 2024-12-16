import Component, { html } from 'qyber';
import router from '../../router';
import authSignal from '../../signal/authSignal';
import { cartSignal, clearCart } from '../../signal/cartSignal';
import './Cart.css';
import CartItem from './partials/CartItem';
import Swal from 'sweetalert2';

export default class Cart extends Component {
    constructor() {
        super();
        this.addSignal(cartSignal);
    }

    componentDidMount(): void {
        if (authSignal.get.isLogin === false) {
            router.navigate('/login');
        }
    }
    checkOut = () => {
        Swal.fire({
            icon: 'success',
            title: 'Checkout successful!',
            showConfirmButton: false,
            timer: 3000,
        });
        clearCart();
        router.navigate('/home');
    };
    render(): HTMLElement {
        const ls = cartSignal.get;
        const total =
            Math.round(
                ls.reduce((acc, item) => acc + item.price * item.quantity, 0) *
                    100
            ) / 100;
        return html`
            <div>
                <section class="cart container">
                    <h2>Your Cart</h2>
                    <div class="cart-items">
                        ${ls.map((item) => CartItem.r(item))}
                        ${ls.length === 0 &&
                        html`<div>
                            <p style="font-size: 20px; text-align: center">
                                Your cart is empty
                            </p>
                            <div class="wrapper-btn">
                                <button
                                    class="btn"
                                    onclick=${() => router.navigate('/home')}
                                >
                                    Go to Home
                                </button>
                            </div>
                        </div>`}
                    </div>

                    ${ls.length > 0 &&
                    html`<div class="cart-total">
                        <p>Total: $${total}</p>
                        <button class="btn" onclick=${this.checkOut}>
                            Checkout
                        </button>
                    </div>`}
                </section>
            </div>
        `;
    }
}
