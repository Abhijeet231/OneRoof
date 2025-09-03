import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema.js";
import { toast} from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    console.log("✅ Form Data:", data);
    // Here you’d call your backend API (fetch/axios)
    try{
      const res = await fetch("http://localhost:8000/api/v1/users/register",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data),
        }
      );
     const result = await res.json();
    if(!res.ok){
      throw new Error(result.message || "Failed to register user");
    }     

    toast.success("User registered successfully!");
    console.log("REGISTERED USER:", result);
    reset();

    }catch(error){
      toast.error(`ERROR: ${error.message}`)
      console.log("ERROR WHILE DOING POST REQUEST F*", error);
    }
  };


      

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username:</label>
        <input type="text" {...register("userName")} />
        {errors.userName && <p style={{ color: "red" }}>{errors.userName.message}</p>}
      </div>

      <div>
        <label>Full Name:</label>
        <input type="text" {...register("fullName")} />
        {errors.fullName && <p style={{ color: "red" }}>{errors.fullName.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
      </div>

      <button type="submit" 
       disabled = {isSubmitting}
      >
        {isSubmitting ? "Registering..." : "Register"}
      
      </button>
    </form>
  );
};

export default Register;
