import Component, { html } from 'qyber';
import searchSignal, { clearResult } from '../signal/searchSignal';
import { urlImg } from '../utils';
import router from '../router';
import { startLoading } from '../signal/appLoadingSignal';

export default class SearchResult extends Component {
    constructor() {
        super();
        this.addSignal(searchSignal);
    }
    render(): HTMLElement {
        const handleGotoDetail = (id: number) => () => {
            router.navigate(`/dish/${id}`);
            clearResult();
            startLoading();
        };

        if (!searchSignal.get.isShow) {
            return html`<div style="display: none;"></div>`;
        }

        return html`
            <div class="search-result">
                <ul class="search-result-list">
                    ${searchSignal.get.result.map(
                        (item) =>
                            html`<li>
                                <div
                                    class="search-result-item"
                                    onclick=${handleGotoDetail(item.id)}
                                >
                                    <img
                                        src=${urlImg(item.image)}
                                        alt="Food Image"
                                    />
                                    <div class="search-result-item-info">
                                        <h3>${item.name}</h3>
                                        <p>${item.description}</p>
                                    </div>
                                </div>
                            </li>`
                    )}
                </ul>
                <div class="count-result">
                    ${searchSignal.get.result.length === 0 &&
                    html`<p class="no-result">No results</p>`}
                    ${searchSignal.get.result.length > 0 &&
                    html`<p>${searchSignal.get.result.length} results</p>`}
                </div>
            </div>
        `;
    }
}
