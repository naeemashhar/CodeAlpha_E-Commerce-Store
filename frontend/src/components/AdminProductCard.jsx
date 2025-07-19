import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <>
      <div className="bg-base-100 rounded-xl shadow-md border border-base-200 p-4 w-full max-w-[300px] transition-all hover:shadow-lg">
        {/* Image Section */}
        <div className="w-full aspect-square bg-base-200 rounded-md overflow-hidden flex items-center justify-center">
          <img
            src={data?.productImage?.[0]}
            alt={data.productName}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold text-base-content text-lg line-clamp-2">
            {data.productName}
          </h3>

          <p className="text-sm text-base-content/70">{data.brandName}</p>

          <div className="flex justify-between items-center mt-3">
            <button
              className="btn btn-sm btn-neutral btn-circle hover:scale-110 transition tooltip"
              data-tip="Edit Product"
              onClick={() => setEditProduct(true)}
            >
              <MdModeEditOutline className="w-4 h-4" />
            </button>

            <span className="text-xl font-bold text-primary">
              {displayINRCurrency(data.sellingPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </>
  );
};

export default AdminProductCard;
