import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Aboutus from "./components/Aboutus";
import Error from "./components/error";
import Cart from "./components/cart";
import Contact from "./components/contact";
import RestaurantDetails from "./components/Restuarantdetails";
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

const AppLayout = () => 
{
    return(
        <div className = "app">
            <Header />
            <Outlet />
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children:[
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <Aboutus />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/cart",
                element: <Cart />
            }

        ],
        errorElement : <Error />,
    },
    {
        path: "/about",
        element: <Aboutus />
    },
    {
        path: "/contact",
        element: <Contact />
    },
    {
        path: "/cart",
        element: <Cart />
    },
    {
        path: "/restaurant/:resId",
        element: <RestaurantDetails />
    }
],
)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);