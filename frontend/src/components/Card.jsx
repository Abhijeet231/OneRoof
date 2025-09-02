// const Card = ({ data }) => {
//   return (
//     <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white m-4 hover:shadow-xl transition-shadow duration-300">
//       {/* Image */}
//       <img
//         className="w-full h-48 object-cover"
//         src={data.image.url}
//         alt={data.title}
//       />

//       {/* Content */}
//       <div className="p-4 space-y-2">
//         <h2 className="text-xl font-semibold text-gray-800 truncate">
//           {data.title}
//         </h2>
//         <p className="text-gray-600 text-sm line-clamp-2">
//           {data.description}
//         </p>

//         {/* Price */}
//         <div className="flex items-center justify-between mt-3">
//           <p className="text-lg font-bold text-green-600">
//             ₹{data.price}
//           </p>
//           <p className="text-sm text-gray-500">
//             {data.location}, {data.country}
//           </p>
//         </div>

//         {/* Owner */}
//         <p className="text-sm text-gray-500 italic">
//           Listed by :{data.owner.userName}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Card;



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

