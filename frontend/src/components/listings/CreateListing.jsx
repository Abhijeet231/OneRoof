import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import api from "@/lib/api";
import { listingSchema } from "@/schemas/listingSchema.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const CreateListing = () => {
  const navigate = useNavigate();
  const {refetchUser} = useAuth();

  //RHF stuff
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(listingSchema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("location", data.location);
      formData.append("country", data.country);

      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await api.post("/listings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = res.data;

      toast.success("🎉 Listing Created successfully!", {autoClose:1500});
      console.log("New Listing:", result);
      
      await refetchUser();
      
      reset();
     
      navigate("/profile")
      
      
    } catch (error) {
      toast.error(`⚠️ ${error.message}`);
      console.log("Error While Creating New Listing", error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-start justify-center px-4 py-16 overflow-hidden bg-gray-50 ">
      {/* background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative w-full md:w-4/5 lg:w-3/5 bg-white rounded-2xl shadow-2xl p-8 border border-emerald-100">
        <h2 className="text-2xl font-semibold text-center text-emerald-800 mb-6">
          Share Your Space
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter Title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              {...register("description")}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter Description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* price + Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="w-full  mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter Price"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* image */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image
              </label>
              <input
                id="image"
                type="file"
                {...register("image")}
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1"> {errors.image.message}</p>
              )}
            </div>
          </div>

          {/* location + country row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                {...register("location")}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter Location"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                {...register("country")}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter Country"
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          {/* submit button */}
          <div className="flex justify-center mt-6">
            <button
              disabled={isSubmitting}
              type="submit"
              className="px-6 py-3 rounded-xl font-medium text-white
             bg-gradient-to-r from-violet-600 to-indigo-600
             shadow-md hover:shadow-xl
             transition-all duration-500 ease-in-out
             hover:translate-y-[-2px] active:translate-y-[1px]
             hover:brightness-110"
            >
              {isSubmitting ? "Please wait..." : "Publish Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
