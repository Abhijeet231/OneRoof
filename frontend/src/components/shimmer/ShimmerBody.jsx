import ShimmerCard from "./ShimmerCard";

const ShimmerBody = () => {
  return (
    <div className="mt-10 flex flex-wrap px-6 sm:px-4 md:px-5 lg:px-20">
      {Array.from({ length: 12 }).map((_, idx) => (
        <ShimmerCard key={idx} />
      ))}
    </div>
  );
};

export default ShimmerBody;
