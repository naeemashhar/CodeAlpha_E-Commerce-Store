import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { toast } from "react-toastify";
import apiSummary from "../common";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
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

    const response = await fetch(apiSummary.uploadProduct.url, {
      method: apiSummary.uploadProduct.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      fetchData();
    } else {
      toast.error(responseData.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center px-4">
      <div className="bg-base-200 w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden max-h-[calc(100vh-60px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <h2 className="text-lg font-semibold text-base-content">
            Upload Product
          </h2>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost hover:bg-red-500 hover:text-white transition-all duration-200 ml-auto"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Form Scrollable Content */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-4 space-y-4"
        >
          <input
            name="productName"
            placeholder="Product Name"
            value={data.productName}
            onChange={handleOnChange}
            className="input input-bordered w-full bg-base-100"
            required
          />
          <input
            name="brandName"
            placeholder="Brand Name"
            value={data.brandName}
            onChange={handleOnChange}
            className="input input-bordered w-full bg-base-100"
            required
          />

          <select
            name="category"
            value={data.category}
            onChange={handleOnChange}
            className="select select-bordered w-full bg-base-100"
            required
          >
            <option value="">Select Category</option>
            {productCategory.map((cat, i) => (
              <option key={i} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <div>
            <label
              htmlFor="uploadImageInput"
              className="cursor-pointer w-full h-32 border border-dashed flex flex-col items-center justify-center text-base-content/70 bg-base-100 rounded-lg"
            >
              <FaCloudUploadAlt className="text-3xl" />
              <p className="text-sm">Upload Product Images</p>
              <input
                type="file"
                id="uploadImageInput"
                className="hidden"
                onChange={handleUploadProduct}
              />
            </label>

            <div className="flex gap-2 flex-wrap pt-2">
              {data.productImage.map((img, idx) => (
                <div className="relative group" key={idx}>
                  <img
                    src={img}
                    alt="product"
                    className="w-20 h-20 object-cover rounded border"
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(img);
                    }}
                  />
                  <button
                    onClick={() => handleDeleteProductImage(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs hidden group-hover:block"
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <input
            name="price"
            placeholder="Price"
            type="number"
            value={data.price}
            onChange={handleOnChange}
            className="input input-bordered w-full bg-base-100"
            required
          />
          <input
            name="sellingPrice"
            placeholder="Selling Price"
            type="number"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="input input-bordered w-full bg-base-100"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={data.description}
            onChange={handleOnChange}
            className="textarea textarea-bordered w-full bg-base-100 resize-none min-h-[100px]"
          />

          <button type="submit" className="btn btn-accent w-full">
            Upload Product
          </button>
        </form>

        {/* Fullscreen image view */}
        {openFullScreenImage && (
          <DisplayImage
            imgUrl={fullScreenImage}
            onClose={() => setOpenFullScreenImage(false)}
          />
        )}
      </div>
    </div>
  );
};

export default UploadProduct;
