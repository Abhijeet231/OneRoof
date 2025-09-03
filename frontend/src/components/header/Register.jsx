import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema.js";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log("✅ Form Data:", data);
    // Here you’d call your backend API (fetch/axios)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username:</label>
        <input type="text" {...register("username")} />
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

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
