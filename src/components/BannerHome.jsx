import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoPlay from "./VideoPlay";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);
  const imageURL = useSelector((state) => state.movieoData.imageURL);

  const [playVideo, setPlayVideo] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const nextHandler = () => {
    setCurrentImage((prev) => (prev + 1) % bannerData.length);
  };

  useEffect(() => {
    if (!bannerData.length) return;

    const interval = setInterval(nextHandler, 5000);
    return () => clearInterval(interval);
  }, [currentImage, bannerData.length]);

  return (
    <div className="relative w-full overflow-hidden h-[60vh] md:h-[60vh] lg:h-[80vh]">

      {/* Slider */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentImage * 100}%)` }}
      >
        {bannerData.map((data, index) => (
          <div key={index} className="min-w-full h-full relative">

            {/* Background Image */}
            <img
              src={imageURL + data.backdrop_path}
              alt="Banner"
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0" />

            {/* Text Content */}
            <div className="absolute bottom-6 left-4 sm:left-6 md:left-10 z-10 max-w-[95%] sm:max-w-[80%] md:max-w-xl text-white">

              {/* Title */}
              <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 leading-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]">
                {data.media_type === "tv" ? data.name : data.title}
              </h2>

              {/* Meta Info */}
              <div className="flex items-center gap-3 mb-3 text-sm sm:text-base">
                <span className="bg-yellow-500/90 text-black px-3 py-1 rounded-full font-semibold shadow-md">
                  ⭐ {data.vote_average.toFixed(1)}
                </span>

                <span className="bg-white/20 px-3 py-1 rounded-full uppercase text-xs tracking-wider">
                  {data.media_type}
                </span>
              </div>

              {/* Overview */}
              <p className="text-gray-200 text-sm sm:text-base md:text-lg line-clamp-3 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                {data.overview}
              </p>

            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {playVideo && <VideoPlay close={setPlayVideo} />}
    </div>
  );
};

export default BannerHome;
