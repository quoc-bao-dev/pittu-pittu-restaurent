import Component, { html } from 'qyber';
import { login } from '../../signal/authSignal';
import './Login.css';
import router from '../../router';
import { urlImg } from '../../utils';

export default class Login extends Component {
    render(): HTMLElement {
        const handleLogin = async ({
            username,
            password,
        }: {
            username: string;
            password: string;
        }) => {
            login(username, password);
        };
        const handleSubmit = (event: Event) => {
            event.preventDefault();
            const username = (this.query('#user-name') as HTMLInputElement)
                .value;
            const password = (this.query('#password') as HTMLInputElement)
                .value;

            const payload = {
                username,
                password,
            };
            handleLogin(payload);
        };
        return html`
            <div class="auth-page">
                <img
                    src=${urlImg('auth-cover.jpg')}
                    alt="Auth Cover"
                    class="auth-cover"
                />
                <div class="auth-page-logo">
                    <h1 onclick=${() => router.navigate('/home')}>
                        <span class="logo-text">Pittu</span> Pittu
                    </h1>
                </div>
                <div class="login-container">
                    <h2>Login</h2>
                    <form onsubmit=${handleSubmit}>
                        <input
                            type="text"
                            placeholder="User Name"
                            id="user-name"
                            value="david"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            value="123"
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                    <a>Forgot Password?</a>
                    <a>Create an Account</a>
                </div>
            </div>
        `;
    }
}
