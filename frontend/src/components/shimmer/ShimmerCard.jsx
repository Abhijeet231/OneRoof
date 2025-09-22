const ShimmerCard = () => {
  return (
    <div className="w-52 rounded-xl overflow-hidden bg-white m-3 shadow-md animate-pulse">
      {/* Image placeholder */}
      <div className="relative">
        <div className="w-full h-36 bg-gray-300"></div>
        {/* Price tag placeholder */}
        <span className="absolute bottom-2 right-2 h-5 w-12 bg-gray-300 rounded-lg"></span>
      </div>

      {/* Content placeholders */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>

        {/* Description */}
        <div className="h-3 w-full bg-gray-300 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-300 rounded"></div>

        {/* Location */}
        <div className="h-3 w-1/2 bg-gray-300 rounded mt-2"></div>

        {/* Owner */}
        <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
