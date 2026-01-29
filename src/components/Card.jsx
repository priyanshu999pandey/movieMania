import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Card = ({ data, index, trending, media_type }) => {
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const mediaType = data.media_type || media_type;

  return (
    <Link to={`/${mediaType}/${data.id}`} className="block">
      <div className="relative group w-[140px] sm:w-[160px] md:w-[180px] lg:w-[230px] transition-transform duration-300 hover:scale-105">

        {/* Image */}
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          {data.poster_path ? (
            <img
              src={imageURL + data.poster_path}
              alt={data.title || data.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex items-center justify-center h-[320px] bg-neutral-800 text-gray-400 text-sm">
              Image not found
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
        </div>

        {/* Trending Ribbon */}
        {trending && (
          <div className="absolute top-3 left-0 bg-red-600 text-white text-xs px-2 py-1  rounded-r-full shadow-md">
            #{index} Trending
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 right-0 bg-black/80 text-yellow-400 text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow">
          <FaStar />
          {data.vote_average?.toFixed(1)}
        </div>

        {/* Info */}
        <div className="mt-3 px-1">
          <p className="text-white font-semibold text-sm md:text-base line-clamp-1">
            {data.name || data.title}
          </p>

          <p className="text-gray-400 text-xs md:text-sm mt-1">
            {data.release_date
              ? moment(data.release_date).format("MMM YYYY")
              : moment(data.first_air_date).format("MMM YYYY")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
