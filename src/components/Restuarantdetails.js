import { useEffect, useState } from "react";
import { API_URLs } from "./constants/urls";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { IMG_URLs } from "./constants/urls";
import Menulist from "./Menulist";

const { RESTURANT_DETAILS } = API_URLs;
const { RESTO_DETAILS_IMG } = IMG_URLs;


const RestaurantDetails = () => {
    const { resId } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState([]);
    const [menuSections, setMenuSections] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchRestaurantDetails();
    }, [])

    const fetchRestaurantDetails = async () => {
        const data = await fetch(RESTURANT_DETAILS + resId);
        const json = await data.json();
        const restaurantData = json?.data?.cards[2]?.card?.card || {};
        setRestaurantDetails(restaurantData);
        const menuData =
            json?.data?.cards[5]
                ?.groupedCard
                ?.cardGroupMap
                ?.REGULAR
                ?.cards
                ?.filter(
                    (section) =>
                        section?.card?.card?.["@type"] ===
                        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
                ) || [];

        setMenuSections(menuData);
        setSearchItems(menuData);
        setIsLoading(false);
    }

    if (isLoading || !restaurantDetails) {
        return <Shimmer />;
    }



    const {
        name,
        cloudinaryImageId,
        costForTwoMessage,
        avgRating,
        locality,
        areaName,
        totalRatingsString
    } = restaurantDetails?.info || {};


    return (
        <div className="restaurant-details">

            <div className="restaurant-header">
                <h1>{name}</h1>

                <img
                    className="resto-detail-img"
                    src={RESTO_DETAILS_IMG + cloudinaryImageId}
                    alt={name}
                />
                <div className="restaurant-info">
                    <span>⭐ {Number(avgRating).toFixed(1)} ({totalRatingsString})</span>
                    <span>•</span>
                    <span>{costForTwoMessage}</span>
                </div>

                <hr />

                <div className="delivery-info">
                    <div>
                        <strong>Outlet</strong>
                        <span>{locality} / {areaName}</span>
                    </div>

                    <div>
                        <strong>Delivery</strong>
                        <span>{restaurantDetails?.info?.sla?.deliveryTime} mins</span>
                    </div>
                </div>
                <hr />
                <div>
                    <input type="search" className="search-container" placeholder=" Search items" onChange={(event) => {
                        const value = event.target.value.toLowerCase();
                        const filteredSections = menuSections.map((section) => {
                            const sectionData = section?.card?.card;
                            const filteredItems = sectionData?.itemCards?.filter((item) =>
                                    item?.card?.info?.name?.toLowerCase().includes(value));

                                return {
                                    ...section,
                                    card: {
                                        ...section.card,
                                        card: {
                                            ...sectionData,
                                            itemCards: filteredItems
                                        }
                                    }
                                };
                            })
                            .filter(
                                (section) =>
                                    section?.card?.card?.itemCards?.length > 0
                            );

                        setSearchItems(filteredSections);
                    }}></input>
                </div>
                <div className="menu-items">
                    
                        {searchItems.map((section) => {
                            const sectionData = section?.card?.card;
                            return (
                                <div className="menu-section" key={sectionData?.title}>
                                    <h3>{sectionData?.title}</h3>
                                    <div className="menu-list">
                                        {sectionData?.itemCards?.map((item) => {
                                            return (
                                                <Menulist key={item?.card?.info?.id} itemData={item} />
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    
                </div>
            </div>

        </div>
    );
}

export default RestaurantDetails;