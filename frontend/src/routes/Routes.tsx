import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import ProductionorderList from "../pages/ProductionorderList/ProductionorderList";
import Productionorder from "../pages/Productionorder/Productionorder";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage />},
            {path: "productionorders", element: <ProductionorderList />},
            {path: "productionorder/:id/:type", element: <Productionorder />}
        ]
    }
])