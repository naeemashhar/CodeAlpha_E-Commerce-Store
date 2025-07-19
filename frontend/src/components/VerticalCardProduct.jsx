import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context/context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
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
    <div className="container mx-auto px-4 my-15 relative">
      <h2 className="text-2xl font-bold py-4">{heading}</h2>

      {/* Scrollable Product List */}
      <div
        className="flex items-stretch gap-4 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide"
        ref={scrollElement}
      >
        {/* Arrows for Desktop */}
        <button
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-base-100 shadow-md rounded-full p-2"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>

        <button
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-base-100 shadow-md rounded-full p-2"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="min-w-[280px] max-w-[320px] bg-base-200 rounded-xl shadow animate-pulse"
              >
                <div className="h-48 bg-base-300 rounded-t-xl" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-3/4 bg-base-300 rounded-full" />
                  <div className="h-4 w-1/2 bg-base-300 rounded-full" />
                  <div className="flex gap-4">
                    <div className="h-4 w-20 bg-base-300 rounded-full" />
                    <div className="h-4 w-16 bg-base-300 rounded-full" />
                  </div>
                  <div className="h-8 w-full bg-base-300 rounded-full" />
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="min-w-[280px] max-w-[320px] bg-base-100 rounded-xl shadow hover:shadow-xl transition duration-300 flex flex-col"
              >
                <div className="h-48 p-4 flex justify-center items-center bg-gray-300 rounded-t-xl">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="mix-blend-multiply h-full object-contain transition-transform hover:scale-110"
                  />
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base font-semibold line-clamp-1">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-base-content/70 capitalize">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="text-primary font-semibold">
                      {displayINRCurrency(product.sellingPrice)}
                    </p>
                    <p className="line-through text-sm text-base-content/50">
                      {displayINRCurrency(product.price)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, product._id)}
                    className="btn btn-sm btn-primary rounded-full mt-2"
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
