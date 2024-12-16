import Component, { html } from 'qyber';

export class Footer extends Component {
    render(): HTMLElement {
        return html` <!-- Footer -->
            <footer>
                <div class="footer-content container">
                    <p>&copy; 2024 Pittu Pittu. All Rights Reserved.</p>
                    <div class="social-icons">
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                    </div>
                    <p>
                        Contact us:
                        <a href="mailto:support@pittupittu.com"
                            >support@pittupittu.com</a
                        >
                    </p>
                </div>
            </footer>`;
    }
}
