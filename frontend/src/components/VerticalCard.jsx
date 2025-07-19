import React, { useContext } from "react";
import scrollTop from "../helpers/scrollTop";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import Context from "../context/context";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(12).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault(); // prevent navigation on button click
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
      {loading
        ? loadingList.map((_, index) => (
            <div
              key={index}
              className="bg-base-100 rounded-2xl shadow animate-pulse p-4 space-y-4"
            >
              <div className="h-40 bg-base-300 rounded-xl" />
              <div className="h-4 w-3/4 bg-base-300 rounded-full" />
              <div className="h-3 w-1/2 bg-base-300 rounded-full" />
              <div className="h-4 w-full bg-base-300 rounded-full" />
              <div className="h-8 w-full bg-base-300 rounded-full" />
            </div>
          ))
        : data.map((product) => (
            <Link
              key={product?._id}
              to={`/product/${product?._id}`}
              onClick={scrollTop}
              className="bg-base-100 border border-base-300 hover:shadow-lg rounded-2xl transition-all overflow-hidden group"
            >
              <div className="bg-gray-300 p-4 h-48 flex items-center justify-center">
                <img
                  src={product?.productImage[0]}
                  alt={product?.productName}
                  className="object-contain h-full transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
                />
              </div>

              <div className="p-4 space-y-2">
                <h2 className="text-base-content font-semibold text-lg truncate">
                  {product?.productName}
                </h2>
                <p className="text-sm text-base-content/60 capitalize">
                  {product?.category}
                </p>

                <div className="flex items-center gap-2">
                  <p className="text-primary font-bold text-base">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="line-through text-sm text-base-content/50">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>

                <button
                  className="mt-2 w-full btn btn-sm btn-primary rounded-full"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default VerticalCard;
