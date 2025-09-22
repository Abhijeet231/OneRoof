const ShimmerShowListing = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-10 animate-pulse">
      {/* Property Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image with Title overlay */}
        <div className="relative">
          <div className="w-full h-80 bg-gray-300"></div>
          <div className="absolute bottom-4 left-4 h-10 w-40 bg-gray-300 rounded-xl"></div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
          </div>

          {/* Price */}
          <div className="h-6 w-32 bg-gray-300 rounded"></div>

          {/* Location */}
          <div className="space-y-1">
            <div className="h-4 w-40 bg-gray-300 rounded"></div>
            <div className="h-3 w-24 bg-gray-300 rounded"></div>
          </div>

          {/* Host Info */}
          <div className="pt-4 border-t">
            <div className="h-3 w-40 bg-gray-300 rounded"></div>
          </div>

          {/* Actions */}
          <div className="pt-6 flex gap-4">
            <div className="flex-1 h-10 bg-gray-300 rounded-xl"></div>
            <div className="flex-1 h-10 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <hr />

      <div className="w-full max-w-[1200px] mx-auto mt-8">
        {/* Text Section */}
        <div className="mb-4 text-center mt-3 space-y-2">
          <div className="h-5 w-52 mx-auto bg-gray-300 rounded"></div>
          <div className="h-3 w-40 mx-auto bg-gray-300 rounded"></div>
        </div>

        {/* Map Section */}
        <div className="w-3/4 h-[400px] mx-auto rounded-2xl overflow-hidden shadow-lg">
          <div className="w-full h-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerShowListing;
