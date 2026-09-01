import { useEffect, useState } from "react";
import { API_URLs } from "../components/constants/urls";


const { RESTURANT_DETAILS } = API_URLs;

const useRestaurantDetails = (resId) => {
    const [restaurantDetails, setRestaurantDetails] = useState({});
    const [menuSections, setMenuSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchRestaurantDetails();
    }, [resId]);

    const fetchRestaurantDetails = async () => {
        try {
            const data = await fetch(RESTURANT_DETAILS + resId);
            const json = await data.json();

            const restaurantData =
                json?.data?.cards[2]?.card?.card || {};

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

            setRestaurantDetails(restaurantData);
            setMenuSections(menuData);
            setIsLoading(false);

        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return {
        restaurantDetails,
        menuSections,
        isLoading
    };
};

export default useRestaurantDetails;