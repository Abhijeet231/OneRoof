const Card = ({ data }) => {
  return (
    <div className="w-52 rounded-xl overflow-hidden bg-white m-3 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ">
      {/* Image */}
      <div className="relative">
        <img
          className="w-full h-36 object-cover"
          src={data.image.url}
          alt={data.title}
        />
        <span className="absolute bottom-2 right-2 bg-white/80 text-green-600 text-sm font-semibold px-2 py-0.5 rounded-lg shadow">
          ₹{data.price}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 space-y-1">
        <h2 className="text-base font-semibold text-gray-800 truncate">
          {data.title}
        </h2>
        <p className="text-gray-600 text-xs line-clamp-2">
          {data.description}
        </p>

        {/* Location */}
        <p className="text-xs text-gray-500 mt-1">
          {data.location}, {data.country}
        </p>

        {/* Owner */}
        <p className="text-xs text-gray-400 italic">
          Listed by {data.owner.userName}
        </p>
      </div>
    </div>
  );
};

export default Card;

