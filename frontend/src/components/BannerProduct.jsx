import React, { useEffect, useState, useRef } from "react";
import {
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa6";

import image1 from "../../asset/banner/img1.webp";
import image2 from "../../asset/banner/img2.jpg";
import image5 from "../../asset/banner/img5.webp";

import image1Mobile from "../../asset/banner/img1_mobile.jpg";
import image2Mobile from "../../asset/banner/img2_mobile.webp";
import image3Mobile from "../../asset/banner/img3_mobile.jpg";
import image4Mobile from "../../asset/banner/img4_mobile.jpg";
import image5Mobile from "../../asset/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef(null);

  const desktopImages = [image1, image2, image5];
  const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

  const totalSlides = desktopImages.length;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % totalSlides);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const renderImages = (images) => (
    <div className="flex h-full w-full overflow-hidden">
      {images.map((url, index) => (
        <div
          key={url}
          className="w-full h-full min-w-full min-h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          <img
            src={url}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="relative h-56 md:h-80 w-full rounded-lg overflow-hidden shadow-md bg-base-200">
        {/* Arrows */}
        <div className="absolute top-1/2 left-0 right-0 z-10 justify-between px-4 -translate-y-1/2 hidden md:flex">

          <button
            onClick={prevImage}
            className="bg-base-100 shadow-md hover:shadow-xl rounded-full p-2 text-lg transition hover:scale-110"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={nextImage}
            className="bg-base-100 shadow-md hover:shadow-xl rounded-full p-2 text-lg transition hover:scale-110"
          >
            <FaAngleRight />
          </button>
        </div>

        {/* Desktop carousel */}
        <div className="hidden md:block">
          {renderImages(desktopImages)}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          {renderImages(mobileImages)}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
