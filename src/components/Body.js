import RestaurantCards from "./RestaurantCards";
import { restaurantList } from "./constants/mockdata";
import { useState } from "react";
const Body = () => {

    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantList);
    const [searchText, setSearchText] = useState("");

    return (
        <div className = "main-body">
            <div>
                <input className = "search-container" type = "search" placeholder="Search for restaurants and foods" 
                onChange={(event)=> {
                    setSearchText(event.target.value);
                    const filteredList = restaurantList.filter((res)=> res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                    setFilteredRestaurants(filteredList);
                }} />
            </div>
            <button className="filter-btn" onClick={()=>{
                const filteredList = restaurantList.filter((res)=> res.info.avgRating > 4.5);
                setFilteredRestaurants(filteredList);
            }}> Top Rated Restaurants</button>
            <div className = "restaurant-list">
             {filteredRestaurants.map((restaurant) => {
                return <RestaurantCards key={restaurant.info.id} resData={restaurant} />
             } )}
            </div>

        </div>
    )
}

export default Body;