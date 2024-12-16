import Component, { html } from 'qyber';
import { CartItem } from '../../../interface';
import { addToCart } from '../../../signal/cartSignal';
import Swal from 'sweetalert2';
import { urlImg } from '../../../utils';
import router from '../../../router';
import { startLoading } from '../../../signal/appLoadingSignal';

interface MenuItemProps {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
}
export default class MenuItem extends Component<MenuItemProps> {
    constructor(props: MenuItemProps) {
        super(props);
    }
    render(): HTMLElement {
        const handleAddToCart = () => {
            const cartItem: CartItem = {
                image: this.props.image,
                name: this.props.name,
                price: this.props.price,
                description: this.props.description,
                quantity: 1,
                isChecked: false,
            };
            addToCart(cartItem);
            Swal.fire({
                toast: true,
                position: 'top',
                icon: 'success',
                title: 'Added to cart successfully!',
                showConfirmButton: false,
                timer: 1000,
            });
        };

        const handleDetail = () => {
            router.navigate(`/dish/${this.props.id}`);
            startLoading();
        };
        return html`
            <div class="menu-item">
                <div style="display: contents" onclick=${handleDetail}>
                    <img src=${urlImg(this.props.image)} alt="Burger" />
                </div>
                <h3>${this.props.name}</h3>
                <p>${this.props.description}</p>
                <div class="price">$${this.props.price}</div>
                <div onclick=${handleAddToCart} class="btn">Add to Cart</div>
            </div>
        `;
    }
}
