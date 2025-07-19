import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import CategroyWiseProductDisplay from "./CategroyWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import apiSummary from "../common";
import Context from "../context/context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(apiSummary.productDetails.url, {
      method: apiSummary.productDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();

    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/***product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-gray-300  relative p-2">
            {activeImage ? (
              <img
                src={activeImage}
                className="h-full w-full object-scale-down rounded mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
              />
            ) : (
              <div className="h-full w-full bg-base-200 rounded animate-pulse" />
            )}

            {/**product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] bg-slate-200  scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }% `,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="mr-6 flex gap-2 lg:flex-col overflow-scroll scrollbar-hide scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <div className="grid gap-2 w-full animate-pulse">
            <div className="h-6 bg-base-200 rounded w-1/3" />
            <div className="h-8 bg-base-200 rounded w-2/3" />
            <div className="h-5 bg-base-200 rounded w-1/4" />
            <div className="h-6 bg-base-200 rounded w-1/2" />
            <div className="h-7 bg-base-200 rounded w-full" />
            <div className="h-12 bg-base-200 rounded w-full" />
            <div className="h-20 bg-base-200 rounded w-full" />
          </div>
        ) : (
          <div className="flex flex-col gap-3 ml-8">
            <p className="bg-primary/10 text-primary px-3 py-1 rounded-full w-fit text-sm font-semibold tracking-wide">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-bold text-base-content">
              {data?.productName}
            </h2>
            <p className="capitalize text-secondary text-sm lg:text-base">
              {data?.category}
            </p>
            <div className="text-yellow-500 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-3 text-xl lg:text-3xl font-semibold">
              <p className="text-error">
                {displayINRCurrency(data.sellingPrice)}
              </p>
              <p className="line-through text-secondary">
                {displayINRCurrency(data.price)}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <button
                className="btn btn-outline btn-error min-w-[120px]"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy Now
              </button>
              <button
                className="btn btn-error text-white min-w-[120px]"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 font-semibold mb-1">Description:</p>
              <p className="text-gray-300">{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategroyWiseProductDisplay
          category={data?.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
