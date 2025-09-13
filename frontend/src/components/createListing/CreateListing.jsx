import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import api from "@/lib/api";
import { useAuth } from "../provider/AuthProvider";
import { listingSchema } from "@/schemas/listingSchema.js";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  //RHF stuff
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmiting },
    reset,
  } = useForm({
    resolver: zodResolver(listingSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/listings", data);
      const result = res.data;

      if (!result) {
        toast.error("Error while Sending NEw listing");
      }

      toast.success("🎉 Listing Created successfully!");
      console.log("New Listing:", result);

      setTimeout(() => {
        navigate("/");
      }, 700);

      reset();
    } catch (error) {
      toast.error(`⚠️ ${error.message}`);
      console.log("Error While Creating New Listing", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg bg-gradient-to-br from-orange-200 via-orange-100 to-green-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border-green-100">
        <h2 className=" text-2xl font-medium text-center text-emerald-800 mb-5">
          Create New Listing
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* title*/}
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
            <label htmlFor="description">Description</label>
            <input type="text"
            id="description"
            {...register("description")}
          className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter Description"
            />
            {
              errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )
            }
          </div>

            {/* price */}
          <div>
            <label htmlFor="price">price</label>
            <input type="number"
            id="price"
            {...register("price")}
          className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter Price"
            />
            {
              errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )
            }
          </div>



        </form>
      </div>
    </div>
  );
};

export default CreateListing;
