import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine, RiUserAddLine } from "@remixicon/react";
import imageToBase64 from "../helpers/imageToBase64";
import apiSummary from "../common";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profileImage: "",
  });

  const navigate = useNavigate();

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

    if (data.password === data.confirmPassword) {
      try {
        const dataRes = await fetch(apiSummary.signUp.url, {
          method: apiSummary.signUp.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const apiData = await dataRes.json();

        if (apiData.success) {
          toast.success("Profile created successfully!")
          navigate("/login")
        }
        if (apiData.error) {
          toast.error(apiData.message);
        }

        // Optionally reset form:
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          profileImage: "",
        });
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      toast.warn("Passwords do not match!");
    }
  };

  const handelUploadImg = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageToBase64(file);
    setData((prev) => {
      return {
        ...prev,
        profileImage: imagePic,
      };
    });
  };

  return (
    <div
      className="min-h-dvh w-full flex items-center justify-center bg-base-100 px-4 overflow-hidden"
      data-theme="night"
    >
      <div className="w-full max-w-md bg-base-200/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-base-300">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <label className="relative group cursor-pointer">
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-full bg-base-300 overflow-hidden border-2 border-accent shadow-md transition-all group-hover:brightness-105 flex items-center justify-center relative">
              {data.profileImage ? (
                <img
                  src={data.profileImage}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <RiUserAddLine className="w-8 h-8 text-accent z-10" />
              )}

              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity z-20">
                <span className="text-[10px] sm:text-xs text-white font-medium">
                  Upload Photo
                </span>
              </div>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handelUploadImg}
            />
          </label>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2">
          Create Account
        </h1>
        <p className="text-sm text-center text-base-content/70 mb-6">
          Join SonicBay to explore the best products
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handelSubmit}>
          {/* Name */}
          <div className="form-control">
            <label className="label label-text text-sm mb-1">Full Name</label>
            <input
              name="name"
              value={data.name}
              onChange={handelChange}
              type="text"
              placeholder="John Doe"
              className="w-full bg-base-100 px-4 py-3 rounded-xl text-sm outline-none border-none focus:ring-2 focus:ring-accent transition"
              required
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label label-text text-sm mb-1">Email</label>
            <input
              name="email"
              value={data.value}
              onChange={handelChange}
              type="email"
              placeholder="you@example.com"
              className="w-full bg-base-100 px-4 py-3 rounded-xl text-sm outline-none border-none focus:ring-2 focus:ring-accent transition"
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
                className="w-full bg-base-100 px-4 py-3 pr-10 rounded-xl text-sm outline-none border-none focus:ring-2 focus:ring-accent transition"
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

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label label-text text-sm mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handelChange}
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-base-100 px-4 py-3 pr-10 rounded-xl text-sm outline-none border-none focus:ring-2 focus:ring-accent transition"
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-base-content/60 hover:text-accent transition"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
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
            Sign Up
          </button>
        </form>

        {/* Footer link */}
        <p className="text-sm text-center mt-6 text-base-content/70">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
