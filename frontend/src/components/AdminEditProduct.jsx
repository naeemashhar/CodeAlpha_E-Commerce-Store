import React, { useState } from "react";
import { X } from "lucide-react";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import apiSummary from "../common";

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newImages = [...data.productImage];
    newImages.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(apiSummary.updateProduct.url, {
      method: apiSummary.updateProduct.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    } else if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-base-300/60 flex items-center justify-center p-4">
      <div className="bg-base-100 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-base-content">Edit Product</h2>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-base-content hover:text-error"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          className="flex-1 overflow-y-auto px-4 py-3 space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="label text-sm">Product Name</label>
            <input
              type="text"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              placeholder="Enter product name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label text-sm">Brand Name</label>
            <input
              type="text"
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              placeholder="Enter brand name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label text-sm">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label text-sm">Product Images</label>
            <label htmlFor="uploadImageInput" className="cursor-pointer">
              <div className="border-2 border-dashed border-base-300 bg-base-200 hover:bg-base-300 transition-all rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <FaCloudUploadAlt className="text-4xl text-base-content/60" />
                <p className="text-sm mt-2">Click to Upload Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </label>
            {data.productImage?.length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {data.productImage.map((img, idx) => (
                  <div className="relative group w-20 h-20">
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover rounded border cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(img);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteProductImage(idx)}
                      className="absolute -top-2 -right-2 bg-error text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-sm">Price</label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleOnChange}
                placeholder="Enter price"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label text-sm">Selling Price</label>
              <input
                type="number"
                name="sellingPrice"
                value={data.sellingPrice}
                onChange={handleOnChange}
                placeholder="Enter selling price"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="label text-sm">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleOnChange}
              placeholder="Enter product description"
              className="textarea textarea-bordered w-full min-h-[100px]"
            />
          </div>

          <div className="pt-2">
            <button className="btn btn-error w-full text-white">Update Product</button>
          </div>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;