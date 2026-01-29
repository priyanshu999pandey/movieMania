import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const HorizontalScroll = ({ data, heading, media_type, trending }) => {
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const containerRef = useRef(null);

  const slideRightHandler = () => {
    containerRef.current.scrollLeft += 900;
  };

  const slideLeftHandler = () => {
    containerRef.current.scrollLeft -= 900;
  };

  return (
    <div className="relative px-4 md:px-10 py-5">

      {/* Heading */}
    <h2 className="relative inline-block text-2xl md:text-3xl lg:text-4xl font-extrabold mb-8 tracking-wider">

  {/* Gradient text */}
  <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-600 bg-clip-text text-transparent">
    {heading}
  </span>

  {/* Glowing underline */}
  <span className="absolute left-0 -bottom-2 w-full h-[3px] rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-red-600 shadow-[0_0_10px_rgba(255,0,0,0.6)]" />

</h2>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-6 md:gap-8 overflow-x-scroll scrollbar-hide scroll-smooth pb-4"
      >
        {data.map((item, index) => (
          <Card
            key={index}
            data={item}
            imageURL={imageURL}
            index={index + 1}
            trending={trending}
            media_type={media_type}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="hidden lg:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 justify-between px-2 pointer-events-none">

        <button
          onClick={slideLeftHandler}
          className="pointer-events-auto bg-black/60 hover:bg-red-800/50 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaAngleLeft size={24} />
        </button>

        <button
          onClick={slideRightHandler}
          className="pointer-events-auto bg-black/60  hover:bg-red-800/50 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaAngleRight size={24} />
        </button>

      </div>
    </div>
  );
};

export default HorizontalScroll;
