import { IMG_URLs } from "./constants/urls";
import { Link } from "react-router-dom";

const { HEADER_LOGO } = IMG_URLs;

const Header = () => {
    return (
        <div className = "header">
            <img className = "logo" src = {HEADER_LOGO} alt = "logo" />
            <div className = "title">👩🏻‍🍳 Tanu's Foods ❤️</div>
            <div className = "nav-items">
                <ul>
                    <li><Link to= "/"> Home</Link></li>
                    <li><Link to= "/about"> About</Link></li>
                    <li><Link to= "/contact"> Contact</Link></li>
                    <li><Link to= "/cart"> Cart</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;