import { useState } from "react";
import { useParams } from "react-router-dom";

import { IMG_URLs } from "./constants/urls";
import Shimmer from "./Shimmer";
import Menulist from "./Menulist";
import useRestaurantDetails from "../hooks/useRestaurantDetails";

const { RESTO_DETAILS_IMG } = IMG_URLs;

const RestaurantDetails = () => {
    const { resId } = useParams();

    const {
        restaurantDetails,
        menuSections,
        isLoading
    } = useRestaurantDetails(resId);

    const [searchText, setSearchText] = useState("");

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

    const filteredSections = menuSections
        .map((section) => {
            const sectionData = section?.card?.card;

            const filteredItems = sectionData?.itemCards?.filter((item) => {
                const itemName =
                    item?.card?.info?.name?.toLowerCase() || "";

                const searchRegex = new RegExp(
                    `\\b${searchText.toLowerCase()}\\b`
                );

                return searchRegex.test(itemName);
            });

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
                    <span>
                        ⭐ {Number(avgRating).toFixed(1)} (
                        {totalRatingsString}
                        )
                    </span>

                    <span>•</span>

                    <span>{costForTwoMessage}</span>
                </div>

                <hr />

                <div className="delivery-info">
                    <div>
                        <strong>Outlet</strong>
                        <span>
                            {locality} / {areaName}
                        </span>
                    </div>

                    <div>
                        <strong>Delivery</strong>
                        <span>
                            {restaurantDetails?.info?.sla?.deliveryTime} mins
                        </span>
                    </div>
                </div>

                <hr />

                <div>
                    <input
                        type="search"
                        className="search-container"
                        placeholder="Search items"
                        value={searchText}
                        onChange={(event) => {
                            setSearchText(event.target.value);
                        }}
                    />
                </div>

                <div className="menu-items">
                    {filteredSections.map((section) => {
                        const sectionData = section?.card?.card;

                        return (
                            <div
                                className="menu-section"
                                key={sectionData?.title}
                            >
                                <h3>{sectionData?.title}</h3>

                                <div className="menu-list">
                                    {sectionData?.itemCards?.map((item) => (
                                        <Menulist
                                            key={item?.card?.info?.id}
                                            itemData={item}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;