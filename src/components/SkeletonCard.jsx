const SkeletonCard = () => {
  return (
    <div
      className="relative shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[230px]"
      aria-hidden="true"
    >
      <div className="shimmer-surface h-[210px] sm:h-[240px] md:h-[270px] lg:h-[340px] rounded-xl" />
      <div className="shimmer-surface mt-3 h-4 w-3/4 rounded" />
      <div className="shimmer-surface mt-2 h-3 w-1/2 rounded" />
    </div>
  );
};

export default SkeletonCard;
