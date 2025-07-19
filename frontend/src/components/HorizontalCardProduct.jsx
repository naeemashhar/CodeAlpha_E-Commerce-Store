import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context/context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-9 mb-13 relative">
      <h2 className="text-xl font-bold py-4 tracking-wide">
        Explore Top {heading}
      </h2>

      <div
        ref={scrollElement}
        className="flex items-center gap-4 md:gap-6 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide"
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((product, index) => {
              return (
                <div key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  key={index}
                  to={"product/" + product?._id}
                  className="w-full min-w-[280px] max-w-[300px] h-auto bg-base-100 rounded-xl shadow-md flex overflow-hidden"
                >
                  <div className="p-3 min-w-[110px] bg-base-200 flex items-center justify-center">
                    <img
                      src={product.productImage[0]}
                      alt="product"
                      className="h-24 object-contain transition-transform duration-200 hover:scale-105"
                    />
                  </div>

                  <div className="p-3 flex flex-col justify-between flex-1 gap-1">
                    <h2 className="font-semibold text-base leading-snug text-ellipsis line-clamp-1">
                      {product?.productName}
                    </h2>
                    <p className="text-sm text-muted">{product?.category}</p>

                    <div className="flex gap-2 items-center text-sm">
                      <span className="text-primary font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </span>
                      <span className="line-through text-xs text-muted">
                        {displayINRCurrency(product?.price)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, product?._id)}
                      className="cursor-pointer mt-2 flex items-center gap-2 justify-center text-sm bg-primary text-primary-content hover:bg-primary-focus transition-all px-3 py-1 rounded-full"
                    >
                      <RiShoppingCart2Line className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
