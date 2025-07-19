import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine, RiDeviceLine } from "@remixicon/react";
import apiSummary from "../common";
import { toast } from "react-toastify";
import Context from "../context/context";

const Login = () => {
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const dataRes = await fetch(apiSummary.signIn.url, {
      method: apiSummary.signIn.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataRes.json();

    if (dataApi.success) {
      toast.success("Login successfully!");
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <div
      className="min-h-dvh w-full flex items-center justify-center bg-base-300 px-4 overflow-hidden"
      data-theme="night"
    >
      <div className="w-full max-w-md bg-base-200/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-base-300">
        {/* App Icon */}
        <div className="flex justify-center mb-4">
          <RiDeviceLine className="w-10 h-10 text-accent" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-center text-base-content/70 mb-6">
          Login to your SonicBay account
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handelSubmit}>
          {/* Email */}
          <div className="form-control">
            <label className="label label-text text-sm mb-1">Email</label>
            <input
              name="email"
              value={data.value}
              onChange={handelChange}
              type="email"
              placeholder="you@example.com"
              className="w-full bg-base-100 px-4 py-3 rounded-xl text-sm outline-none border-none"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label label-text text-sm mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                value={data.password}
                onChange={handelChange}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-base-100 px-4 py-3 pr-10 rounded-xl text-sm outline-none border-none"
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-base-content/60 hover:text-accent transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <RiEyeOffLine className="w-5 h-5" />
                ) : (
                  <RiEyeLine className="w-5 h-5" />
                )}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-accent w-full text-base-100 tracking-wide text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="text-sm text-center mt-6 text-base-content/70">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-accent hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
