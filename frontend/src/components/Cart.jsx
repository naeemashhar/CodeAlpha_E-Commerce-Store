import React, { useContext, useEffect, useState } from "react";
import Context from "../context/context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { Plus, Minus } from "lucide-react";
import apiSummary from "../common";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(apiSummary.addToCartProductView.url, {
      method: apiSummary.addToCartProductView.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(apiSummary.updateCartProduct.url, {
      method: apiSummary.updateCartProduct.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, quantity: qty + 1 }),
    });
    const responseData = await response.json();
    if (responseData.success) fetchData();
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(apiSummary.updateCartProduct.url, {
        method: apiSummary.updateCartProduct.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, quantity: qty - 1 }),
      });
      const responseData = await response.json();
      if (responseData.success) fetchData();
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(apiSummary.deleteCartProduct.url, {
      method: apiSummary.deleteCartProduct.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart?.();
    }
  };

  const totalQty = data.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = data.reduce(
    (sum, item) => sum + item.quantity * item?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="text-center text-xl font-semibold my-4">
        {data.length === 0 && !loading && (
          <p className="bg-base-100 p-5 rounded shadow">Your cart is empty.</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        {/* Cart Items */}
        <div className="w-full max-w-3xl space-y-4">
          {loading
            ? loadingCart.map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-base-300 rounded-lg animate-pulse"
                />
              ))
            : data.map((product) => (
                <div
                  key={product?._id + "CartItem"}
                  className="w-full bg-base-100 text-base-content px-3 py-3 rounded-xl shadow-sm flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center"
                >
                  {/* Image Section */}
                  <div className="w-full sm:w-24 h-36 sm:h-24 bg-gray-300 rounded-md flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="w-full h-full object-contain rounded mix-blend-multiply bg-gray-100"
                    />
                  </div>

                  {/* Info + Quantity Section */}
                  <div className="flex flex-col flex-grow justify-between gap-2">
                    <h2 className="text-sm sm:text-lg font-semibold line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="text-xs sm:text-base text-base-content/70 capitalize">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="cursor-pointer w-8 h-8 sm:w-7 sm:h-7 border border-primary text-primary hover:bg-primary hover:text-white rounded-full flex items-center justify-center text-sm"
                        onClick={() =>
                          decraseQty(product?._id, product?.quantity)
                        }
                      >
                        <Minus size={16} />
                      </button>
                      <span className="min-w-[24px] text-center text-sm sm:text-base font-medium">
                        {product?.quantity}
                      </span>
                      <button
                        className="cursor-pointer w-8 h-8 sm:w-7 sm:h-7 border border-primary text-primary hover:bg-primary hover:text-white rounded-full flex items-center justify-center text-sm"
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Price + Delete Section */}
                  <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end gap-2 mt-2 sm:mt-0">
                    <MdDelete
                      className="text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-full text-4xl sm:text-3xl cursor-pointer transition-shadow shadow-md"
                      onClick={() => deleteCartProduct(product?._id)}
                    />
                    <p className="text-base sm:text-xl font-semibold text-primary">
                      {displayINRCurrency(
                        product?.productId?.sellingPrice * product?.quantity
                      )}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary Box */}
        <div className="w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-base-300 rounded-lg animate-pulse" />
          ) : (
            <div className="bg-base-100 border border-base-300 rounded-xl shadow-lg p-4">
              <h2 className="text-lg font-semibold text-base-content mb-3 border-b pb-2">
                Order Summary
              </h2>
              <div className="flex justify-between text-base-content/80 mb-2">
                <span>Items</span>
                <span>{totalQty}</span>
              </div>
              <div className="flex justify-between text-base-content/80 mb-4">
                <span>Total Price</span>
                <span className="font-bold">
                  {displayINRCurrency(totalPrice)}
                </span>
              </div>
              <button className="btn btn-primary w-full mt-2">
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
