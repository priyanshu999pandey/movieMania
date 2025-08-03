import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);
  const imageURL = useSelector((state) => state.movieoData.imageURL);

  const [currentImage, setCurrentImage] = useState(0);

  const nextHandler = () => {
    setCurrentImage((prev) => (prev + 1) % bannerData.length);
  };

  const previousHandler = () => {
    setCurrentImage((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextHandler();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage, bannerData.length]);

  return (
    <div className="relative w-full overflow-hidden h-[80vh] sm:h-[90vh] md:h-screen">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentImage * 100}%)` }}
      >
        {bannerData.map((data, index) => (
          <div key={index} className="min-w-full h-full relative">
            {/* Image */}
            <img
              src={imageURL + data.backdrop_path}
              alt="Banner"
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent z-0 pointer-events-none" />

            {/* Navigation Buttons */}
            <div className="absolute top-0 z-10 hidden sm:flex items-center justify-between w-full h-full px-4 group-hover:flex">
              <button
                onClick={previousHandler}
                className="bg-gray-300 text-white p-2 sm:p-3 rounded-full cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
              >
                <FaAngleLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextHandler}
                className="bg-gray-300 text-white p-2 sm:p-3 rounded-full cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
              >
                <FaAngleRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Text Content */}
            <div className="absolute bottom-8 left-4 sm:left-6 md:left-10 md:mb-10 text-white z-10 max-w-[90%]  sm:max-w-[75%] md:max-w-md">
              <h2 className="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-4">
                {data.media_type === "tv" ? data.name : data.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg line-clamp-3 mb-2">
                {data.overview}
              </p>
              <p className="text-sm sm:text-base mb-3">
                Rating: {data.vote_average.toFixed(1)}
              </p>
              <button
                onClick={() => console.log("Play Now clicked")}
                className="mt-2 text-sm sm:text-base bg-white py-2 px-4 text-black rounded-sm hover:text-white bg-gradient-to-l hover:from-neutral-500 hover:to-red-900 transition-all duration-300"
              >
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerHome;
