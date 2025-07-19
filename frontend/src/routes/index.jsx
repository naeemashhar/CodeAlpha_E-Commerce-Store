import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../components/Home.jsx";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import Admin from "../components/Admin.jsx";
import AllUsers from "../components/AllUsers.jsx";
import AllProducts from "../components/AllProducts.jsx";
import CategoryProduct from "../components/CategoryProduct.jsx";
import ProductDetails from "../components/ProductDetails.jsx";
import Cart from "../components/Cart.jsx";
import SearchProduct from "../components/SearchProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path:"/",
        element: <Home />
      },
      {
        path:"login",
        element : <Login />
      },
      {
        path:"signup",
        element : <Signup />
      },
      {
        path:"product-category",
        element : <CategoryProduct />
      },
      {
        path:"product/:id",
        element : <ProductDetails />
      },
      {
        path:"cart",
        element : <Cart />
      },
      {
        path:"search",
        element : <SearchProduct />
      },
      {
        path:"admin-panel",
        element: <Admin />,
        children : [
          {
            path:"all-users",
            element:<AllUsers />
          },
          {
            path:"all-products",
            element:<AllProducts />
          },
        ]
      }
    ]
  },
]);

export default router;
