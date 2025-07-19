import React, { useEffect, useState } from "react";
import UploadProduct from "./UploadProduct";
import AdminProductCard from "./AdminProductCard";
import apiSummary from "../common";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(apiSummary.allProduct.url);
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="w-full h-full bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary">All Products</h2>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className="btn btn-sm btn-outline btn-accent rounded-full px-4"
        >
          Upload Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
        {allProduct.length > 0 ? (
          allProduct.map((product, index) => (
            <AdminProductCard
              key={`product-${index}`}
              data={product}
              fetchdata={fetchAllProduct}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-base-content/70 py-10">
            No products found.
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
