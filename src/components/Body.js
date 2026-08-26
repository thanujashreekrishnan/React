import RestaurantCards from "./RestaurantCards";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
const Body = () => {

    const [restaurantList, setRestaurantList] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{fetchRestaurants()},[])

    const fetchRestaurants = async() => {
        const data =  await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0226054&lng=77.6477361&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        const restaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setRestaurantList(restaurants);
        setFilteredRestaurants(restaurants);
        setIsLoading(false);
    }
    return isLoading ?(
        <Shimmer />
    ):(
        <div className = "main-body">
            <div>
                <input className = "search-container" type = "search" placeholder="Search for restaurants and foods" 
                onChange={(event)=> {
                    const value = event.target.value;
                    setSearchText(value);
                    const filteredList = restaurantList.filter((res)=> res.info.name.toLowerCase().includes(value.toLowerCase()));
                    setFilteredRestaurants(filteredList);
                }} />
            </div>
            <button className="filter-btn" onClick={()=>{
                const filteredList = restaurantList.filter((res)=> res.info.avgRating > 4.0);
                setFilteredRestaurants(filteredList);
            }}> Top Rated Restaurants</button>
            <div className = "restaurant-list">
             {filteredRestaurants.map((restaurant) => {
                return (<Link key={restaurant.info.id} to = {"/restaurant/"+ restaurant.info.id}><RestaurantCards resData={restaurant} /></Link>)
             } )}
            </div>

        </div>
    )
            }

export default Body;