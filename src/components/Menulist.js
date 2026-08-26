import { IMG_URLs } from "./constants/urls";
import veg from "url:../../Images/veg.png";
import nonveg from "url:../../Images/nonveg.png";
import greenstar from "url:../../Images/greenstar.png";

const { ITEM_IMG } = IMG_URLs;

const Menulist = (props) => {
    const { itemData } = props;
    const {
        name,
        category,
        description,
        imageId,
        isVeg,
        defaultPrice,
        price,
    } = itemData?.card?.info || {};
    const {rating} = itemData?.card?.info?.ratings?.aggregatedRating || {};
    const itemPrice = defaultPrice || price;

    return (
        <div className="menu-item">
            <div className="menu-item-info">
                <img
                    className="food-type-icon"
                    src={isVeg ? veg : nonveg}
                    alt={isVeg ? "Vegetarian" : "Non-Vegetarian"}
                />
                <h3>{name}</h3>
                <p className="item-price">₹{itemPrice ? itemPrice / 100 : "N/A"}</p>
                {rating && 
                (<p className="item-rating"><img className="rating-star" src={greenstar} alt="rating" />{rating}</p>
                )}
                <p className="item-description">{description}</p>
            </div>
             <div className="menu-item-image">
                <img src={ITEM_IMG + imageId} alt={name} />
            </div>
        </div>
    )
}
export default Menulist;