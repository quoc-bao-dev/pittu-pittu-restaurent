import Component, { html } from 'qyber';
import Swal from 'sweetalert2';
import { CartItem, Dish } from '../../interface';
import { getDishById } from '../../services/dishesService';
import { stopLoading } from '../../signal/appLoadingSignal';
import { addToCart } from '../../signal/cartSignal';
import { urlImg } from '../../utils';
import './Detail.css';

interface DetailProps {
    params: { id: string };
}
interface DetailState {
    dish: Dish;
}
export default class Detail extends Component<DetailProps, DetailState> {
    constructor(props: DetailProps) {
        super(props);
        this.state = {
            dish: {
                id: 0,
                image: '',
                name: '',
                category: '',
                price: 0,
                description: '',
            },
        };
    }

    componentDidMount(): void {
        const id = this.props.params.id;

        getDishById(Number(id))
            .then((data) => {
                this.setState({ dish: data.data });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            })
            .finally(() =>
                setTimeout(() => {
                    stopLoading();
                }, 400)
            );
    }

    render(): HTMLElement {
        const handleAddToCart = () => {
            const cartItem: CartItem = {
                image: this.state.dish.image,
                name: this.state.dish.name,
                price: this.state.dish.price,
                description: this.state.dish.description,
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
        return html`
            <div class="container">
                <!-- Detail Section -->
                <div class="detail-container">
                    <!-- Image Section -->
                    <div class="detail-image">
                        <img
                            src=${urlImg(this.state.dish.image)}
                            alt="Food Image"
                        />
                    </div>

                    <!-- Info Section -->
                    <div class="detail-info">
                        <h2>${this.state.dish.name}</h2>
                        <p>${this.state.dish.description}</p>
                        <p class="price">$${this.state.dish.price}</p>
                        <button class="add-to-cart" onclick=${handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}
