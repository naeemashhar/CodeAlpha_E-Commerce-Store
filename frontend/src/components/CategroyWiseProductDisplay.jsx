import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import scrollTop from '../helpers/scrollTop';
import Context from '../context/context';

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(10).fill(null);

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

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-xl md:text-2xl font-semibold py-4 text-base-content">
        {heading}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="bg-base-100 border border-base-300 rounded-xl shadow p-4 animate-pulse"
              >
                <div className="bg-base-200 h-40 rounded mb-4" />
                <div className="h-4 w-3/4 bg-base-200 rounded mb-2" />
                <div className="h-3 w-1/2 bg-base-200 rounded mb-2" />
                <div className="h-3 w-full bg-base-200 rounded mb-2" />
                <div className="h-8 w-full bg-base-200 rounded" />
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                onClick={scrollTop}
                className="bg-base-100 border border-base-300 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="bg-gray-300 h-40 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="mix-blend-multiply h-full object-contain hover:scale-105 transition-transform duration-300 "
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-medium text-base-content line-clamp-1">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-base-content/60 mb-1 capitalize">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold mb-3">
                    <span className="text-primary">
                      {displayINRCurrency(product.sellingPrice)}
                    </span>
                    <span className="line-through text-base-content/50">
                      {displayINRCurrency(product.price)}
                    </span>
                  </div>
                  <button
                    className="btn btn-sm btn-primary w-full"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategroyWiseProductDisplay;
