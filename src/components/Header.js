import { IMG_URLs } from "./constants/urls";

const { HEADER_LOGO } = IMG_URLs;

const Header = () => {
    return (
        <div className = "header">
            <img className = "logo" src = {HEADER_LOGO} alt = "logo" />
            <div className = "title">👩🏻‍🍳 Tanu's Kitchen ❤️</div>
            <div className = "nav-items">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;