import Component, { html } from 'qyber';
import authSignal from '../../signal/authSignal';
import router from '../../router';

export default class Protected extends Component<{ children: HTMLElement }> {
    constructor({ children }: { children: HTMLElement }) {
        super({ children });
    }
    componentDidMount(): void {
        if (!authSignal.get.isLogin) {
            router.navigate('/login');
        }
    }
    render(): HTMLElement {
        if (!authSignal.get.isLogin) {
            return html`<div></div>`;
        }
        return this.props.children;
    }
}
