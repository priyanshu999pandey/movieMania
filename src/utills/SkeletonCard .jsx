import React from "react";

const SkeletonCard = () => {
  return (
    <div className="relative w-[140px] sm:w-[160px] md:w-[180px] lg:w-[230px]">

      {/* Poster shimmer */}
      <div className="relative h-[210px] sm:h-[240px] md:h-[270px] lg:h-[340px] rounded-xl overflow-hidden bg-neutral-800">

        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800" />

      </div>

      {/* Title shimmer */}
      <div className="mt-3 h-4 w-3/4 rounded bg-neutral-800 overflow-hidden relative">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800" />
      </div>

      {/* Date shimmer */}
      <div className="mt-2 h-3 w-1/2 rounded bg-neutral-800 overflow-hidden relative">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800" />
      </div>

    </div>
  );
};

export default SkeletonCard;
