import Component, { html } from 'qyber';
import { Dish } from '../../interface';
import { getAllDishes } from '../../services/dishesService';
import './Home.css';
import MenuItem from './partials/MenuItem';
import { getAllCate } from '../../services/categoriesService';

interface CateItemProps {
    name: string;
    selectedCategory: string;
    onClick: () => void;
}
class CateItem extends Component<CateItemProps> {
    constructor(props: CateItemProps) {
        super(props);
    }
    render(): HTMLElement {
        return html`
            <li
                class=${this.props.name === this.props.selectedCategory
                    ? 'active'
                    : ''}
            >
                <div onclick=${this.props.onClick}>${this.props.name}</div>
            </li>
        `;
    }
}
interface HomeState {
    listDishes: Dish[];
    listCategory: string[];
    selectedCategory: string;
}

export default class Home extends Component<{}, HomeState> {
    constructor() {
        super();
        this.state = {
            listDishes: [],
            listCategory: [],
            selectedCategory: 'All',
        };
    }
    componentDidMount() {
        getAllDishes()
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                this.setState({ listDishes: data });
            });

        getAllCate()
            .then((res) => {
                return res.data.map((item: any) => item.name);
            })
            .then((data) => {
                this.setState({ listCategory: ['All', ...data] });
            });
    }

    render(): HTMLElement {
        const filterDishes = (cate: string) => {
            if (cate === 'All') {
                return this.state.listDishes;
            } else {
                return this.state.listDishes.filter(
                    (item) => item.category === cate
                );
            }
        };

        const filteredDishes = filterDishes(this.state.selectedCategory);

        const selectCategory = (cate: string) => () => {
            this.setState({ selectedCategory: cate });
        };

        return html`
            <div>
                <!-- Hero Section -->
                <section class="hero">
                    <div class="hero-content">
                        <h1>
                            Welcome to
                            <span class="logo-text">Pittu</span> Pittu
                            <br />
                            Restaurant
                        </h1>
                        <p>Discover our delicious dishes</p>
                        <a class="btn">Order Now</a>
                    </div>
                </section>

                <!-- Menu Section -->
                <section class="menu container">
                    <h2>MENU</h2>
                    <div class="list-category">
                        <ul>
                            ${this.state.listCategory.map((item) =>
                                CateItem.r({
                                    name: item,
                                    selectedCategory:
                                        this.state.selectedCategory,
                                    onClick: selectCategory(item),
                                })
                            )}
                        </ul>
                    </div>
                    <div class="menu-items">
                        ${filteredDishes.map((item) => MenuItem.r(item))}
                        ${filteredDishes.length === 0 &&
                        html`<p style="font-size: 20px; text-align: center">
                            No dishes
                        </p>`}
                        <!-- Add more menu items as needed -->
                    </div>
                </section>
            </div>
        `;
    }
}
