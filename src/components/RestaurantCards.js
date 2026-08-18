import { IMG_URLs } from "./constants/urls";

const { RESTO_CARD } = IMG_URLs;

const RestaurantCards = (props) => {

    const {resData} = props;
    const {name,cloudinaryImageId,costForTwo,cuisines,avgRating} = resData.info;
    return (
        <div className = "restaurantcards">
            <img src = {RESTO_CARD + cloudinaryImageId } alt = "reslogo" />
            <div className = "res-info">
            <h3>{name}</h3>
            <h4>⭐️ {avgRating}</h4>
            <h4>{resData.info.sla.deliveryTime} minutes</h4>
            <h4>{costForTwo}</h4>
            </div>
        </div>
    )
}

export default RestaurantCards;