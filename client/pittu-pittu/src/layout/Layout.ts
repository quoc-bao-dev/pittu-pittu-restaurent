import Component, { html } from 'qyber';
import Header from './Header';
import { Footer } from './Footer';
import AppLoading from './AppLoading';

export default class Layout extends Component {
    render(): HTMLElement {
        return html`
            <div class="layout">
                ${AppLoading.r()} ${Header.r()}
                <div id="router-outlet"></div>
                ${Footer.r()}
            </div>
        `;
    }
}
