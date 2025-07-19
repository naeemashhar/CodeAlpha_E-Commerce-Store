import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import apiSummary from "./common";
import Context from "./context/context";

import {useDispatch} from "react-redux"
import { setUserDetails } from "./store/userSlice";


const App = () => {
  

  const dispatch = useDispatch();

  const [cartProductCount, setCartProductCount] = useState(0);
  
  const fetchUserDetails = async () => {
    const dataRes = await fetch(apiSummary.userDetails.url, {
      method: apiSummary.userDetails.method,
      credentials: "include",
    });

    const apiData = await dataRes.json();

    if(apiData.success){
      dispatch(setUserDetails(apiData.data))
    }
  };

  const fetchUserAddToCart = async() =>{
      const dataRes = await fetch(apiSummary.addToCartProductCount.url, {
      method: apiSummary.addToCartProductCount.method,
      credentials: "include",
    });

    const apiData = await dataRes.json();

    setCartProductCount(apiData?.data?.count || 0);



  }

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <div className="min-h-screen bg-base-300" data-theme="night">
      <Context.Provider value={{fetchUserDetails,cartProductCount,fetchUserAddToCart}}>
        <Navbar />

        <main>
          <Outlet />
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar
            theme="dark"
          />
        </main>

        <Footer />
      </Context.Provider>
    </div>
  );
};

export default App;
