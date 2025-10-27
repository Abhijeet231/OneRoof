import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import api from "@/lib/api";
import { editProfileSchema } from "@/schemas/editProfileSchema";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/provider/AuthProvider.jsx";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const EditProfile = () => {
  let { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
  });



  //Prefill form with current user data
  useEffect(() => {
    if (!currentUser) return;

    reset({
      userName: currentUser.userName ?? "",
      fullName: currentUser.fullName ?? "",
      email: currentUser.email ?? "",
      about: currentUser.about ?? "",
      language: Array.isArray(currentUser.language)
        ? currentUser.language.join(", ")
        : currentUser.language ?? "",
      password: "",
    });
    //save image
    setPreviewImage(currentUser?.profileImage?.url ?? null);
    setSelectedFile(null);
  }, [currentUser, reset]);

  // Handle Profile Image Section
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file", { autoClose: 2000 });
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size must be under 5mb");
      return;
    }

    setPreviewImage(URL.createObjectURL(file)); // THis is how the live image preview works
    setSelectedFile(file);
    console.log("SELECTED NEWWWWWWWWW FILE : ", file);
    
  };

  const onSubmit = async (data) => {


    console.log("Form Data Submitted: ", data);
    console.log("Profile Image File: ", data.profileImage);
    
    

    const formData = new FormData();

    if (data.userName) formData.append("userName", data.userName);
    if (data.fullName) formData.append("fullName", data.fullName);
    if (data.email) formData.append("email", data.email);
    if (data.about) formData.append("about", data.about);
    if (data.password) formData.append("password", data.password);

    // language -> send as multiple entries so backend receives array
    if (data.language) {
      const langs = data.language
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      langs.forEach((l) => formData.append("language", l));
    }

    if (selectedFile) {      
      formData.append("profileImage", selectedFile);
    }else{
      console.log("No profile image to append");
      
    }

    try {
    

    const response =   await api.put(`/users/me`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Server Response****:",response.data );
      
      toast.success("Form Updated Successfully", { autoClose: 2000 });
      const updatedUser = await api.get("/users/me");
      setCurrentUser(updatedUser.data?.data?.currUser);

      navigate("/profile");
      reset();
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error(`Update Failed: ${err.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* Profile Image */}
        <div className="flex justify-center mb-6 relative">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-500 shadow-md">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                {currentUser?.fullName?.charAt(0) ?? "U"}
              </div>
            )}
          </div>
          {/* Upload Button Overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-2 right-[40%] bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full shadow-lg"
          >
            <i className="fa-regular fa-camera"></i>
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...register("userName")}
              placeholder="Add your username"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="Add your full name"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              {...register("about")}
              rows={3}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.about && (
              <p className="text-red-500 text-sm mt-1">
                {errors.about.message}
              </p>
            )}
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Languages
            </label>
            <input
              type="text"
              {...register("language")}
              placeholder="e.g. English, Hindi, Spanish"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.language && (
              <p className="text-red-500 text-sm mt-1">
                {errors.language.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Delete Account */}
        <div className="mt-6 text-center">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
