import Component, { html } from 'qyber';
import router from '../router';
import authSignal, { logout } from '../signal/authSignal';
import { cartSignal } from '../signal/cartSignal';
import SearchResult from './SearchResult';
import { hideResult, searchResult, showResult } from '../signal/searchSignal';

class CartCounter extends Component {
    constructor() {
        super();
        this.addSignal(cartSignal);
    }
    render(): HTMLElement {
        return html`
            <div style="display: contents;">${cartSignal.get.length}</div>
        `;
    }
}
export default class Header extends Component {
    constructor() {
        super();
        this.addSignal(authSignal);
    }
    render(): HTMLElement {
        const handleSearch = () => {
            const keyword = (this.query('#keyword') as HTMLInputElement).value;
            searchResult(keyword);
        };
        return html`
            <!-- Header -->
            <header>
                <div class="container">
                    <div class="logo" onclick=${() => router.navigate('/home')}>
                        <span class="logo-text">Pittu</span> Pittu
                    </div>

                    <div class="search-bar">
                        <input
                            type="text"
                            placeholder="Search for dishes"
                            onfocus=${showResult}
                            onblur=${hideResult}
                            oninput=${handleSearch}
                            autocomplete="off"
                            id="keyword"
                        />
                        ${SearchResult.r()}
                    </div>

                    <nav class="nav">
                        ${!authSignal.get.isLogin &&
                        html`<button
                            class="login"
                            onclick=${() => router.navigate('/login')}
                        >
                            Login
                        </button>`}
                        ${authSignal.get.isLogin &&
                        html`<div class="user-info">
                            <h3 class="user-name">
                                ${authSignal.get.user?.name}
                            </h3>
                        </div>`}
                        ${authSignal.get.isLogin &&
                        html` <button class="logout" onclick=${logout}>
                            Logout
                        </button>`}

                        <button onclick=${() => router.navigate('/cart')}>
                            Cart (${CartCounter.r()})
                        </button>
                    </nav>
                </div>
            </header>
        `;
    }
}
