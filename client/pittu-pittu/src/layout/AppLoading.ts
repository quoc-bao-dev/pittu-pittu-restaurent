import Component, { html } from 'qyber';
import './AppLoading.css';
import appLoadingSignal from '../signal/appLoadingSignal';

export default class AppLoading extends Component {
    constructor() {
        super();
        this.addSignal(appLoadingSignal);
    }
    render() {
        if (!appLoadingSignal.get) {
            return html`<div style="display: none;"></div>`;
        }

        return html`
            <!-- Spinner Overlay -->
            <div class="spinner-overlay" id="spinner">
                <div class="spinner"></div>
            </div>
        `;
    }
}
