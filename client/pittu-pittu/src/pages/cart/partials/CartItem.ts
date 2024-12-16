import Component, { html } from 'qyber';
import { changeQuantity, removeFromCart } from '../../../signal/cartSignal';
import Swal from 'sweetalert2';
import { urlImg } from '../../../utils';

interface CartItemProps {
    image: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    isChecked: boolean;
}
export default class CartItem extends Component<CartItemProps> {
    constructor(props: CartItemProps) {
        super(props);
    }
    render(): HTMLElement {
        const handleRemove = () => {
            removeFromCart(this.props.name);
            Swal.fire({
                toast: true,
                position: 'top',
                icon: 'success',
                title: 'Removed from cart successfully!',
                showConfirmButton: false,
                timer: 1000,
            });
        };
        const handleChangeQuantity = () => {
            const quantity = (this.query('#quantity') as HTMLInputElement)
                .value;
            changeQuantity(this.props.name, Number(quantity));
        };
        return html`
            <div class="cart-item">
                <img src=${urlImg(this.props.image)} alt="Burger" />
                <div class="cart-item-details">
                    <h3>${this.props.name}</h3>
                    <p>${this.props.description}</p>
                </div>
                <div class="cart-item-price">$${this.props.price}</div>
                <div class="cart-item-quantity">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value=${this.props.quantity}
                        min="1"
                        onchange=${handleChangeQuantity}
                        id="quantity"
                    />
                </div>
                <div class="remove-btn" onclick=${handleRemove}>Remove</div>
            </div>
        `;
    }
}
