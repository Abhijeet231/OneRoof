import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema.js";// this means src/schemas/
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api.js"; // this means src/lib/
import { useAuth } from "@/components/provider/AuthProvider.jsx";// this means src/components



const Login = () => {
  const navigate = useNavigate();
  const {setToken} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
    const res = await api.post("/users/login", data);

      const result = res.data; // this is the parsed data from axios 
      if(!result) throw new Error("No Access Token Returned!")

     setToken(result.data.accessToken);

      toast.success("🎉 Logged in successfully!");
      console.log("LOGGED IN USER:", result);

      setTimeout(() => {
        navigate("/");
      }, 800);

      reset();
    } catch (error) {
      toast.error(`⚠️ ${error.message}`);
      console.error("ERROR WHILE LOGGING IN:", error);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-orange-200 via-orange-100 to-green-50">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
    <h2 className="text-2xl font-medium text-center text-emerald-800 mb-5">
  Welcome Back
</h2>




        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...register("userName")}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter your username"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
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
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold shadow-lg hover:from-emerald-700 hover:to-green-600 transition-all duration-300 disabled:opacity-70"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-emerald-600 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
