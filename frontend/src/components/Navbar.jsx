import {
  RiDeviceLine,
  RiLoginBoxLine,
  RiSearchLine,
  RiShoppingCart2Line,
  RiUser3Line,
} from "@remixicon/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import apiSummary from "../common";

import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useContext, useState } from "react";
import ROLE from "../common/role";
import Context from "../context/context";

const Navbar = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);

  const context = useContext(Context);
  const searchInput = useLocation();

  const URLsearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLsearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handelLogout = async () => {
    const fetchData = await fetch(apiSummary.Logout.url, {
      method: apiSummary.Logout.method,
      credentials: "include",
    });

    const apiData = await fetchData.json();

    if (apiData.success) {
      toast.success("Logout successfully!");
      dispatch(setUserDetails(null));
      navigate("/")
    }
    if (apiData.error) {
      toast.error(apiData.message);
    }
  };

  const handelSearch = async (e) => {
    const { value } = e.target;

    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <nav
      className="navbar bg-base-100 shadow-md px-3 py-2 sticky top-0 z-50 flex items-center justify-between flex-wrap sm:flex-nowrap"
      data-theme="night"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2 flex-1 sm:flex-none">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg sm:text-xl font-bold text-primary hover:opacity-80 transition-all"
        >
          <RiDeviceLine className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
          <span>SonicBay</span>
        </Link>
      </div>

      {/* Center: Search Bar (Desktop only) */}
      <div className="hidden sm:flex flex-1 justify-center">
        <div className="w-full max-w-md">
          <label className="flex items-center gap-2 bg-base-200/60 backdrop-blur-md px-4 py-2 rounded-full shadow-inner transition-all duration-200 focus-within:shadow-md">
            <RiSearchLine className="w-5 h-5 text-primary opacity-70" />
            <input
              value={search}
              onChange={handelSearch}
              type="text"
              placeholder="Search product here..."
              className="grow bg-transparent outline-none text-sm sm:text-base placeholder:text-neutral-content/70"
            />
          </label>
        </div>
      </div>

      {/* Right: User, Cart, Login */}
      <div className="flex items-center gap-1 sm:gap-1 ml-auto">
        {/* User Orders */}
        <div className="relative flex justify-center">
          {user?._id && (
            <div
              /* to="/orders" */
              className="btn btn-ghost btn-sm rounded-full tooltip tooltip-bottom"
              onClick={() => setMenu((prev) => !prev)}
              /* data-tip="Your Orders" */
            >
              {user?.profileImage ? (
                <img
                  src={user?.profileImage}
                  className="w-7 h-7 object-cover rounded-full"
                  alt={user?.name}
                />
              ) : (
                <RiUser3Line className="w-5 h-5 text-base-content" />
              )}
            </div>
          )}

          {menu && (
            <div className="absolute bottom-0 top-9 h-fit p-4 shadow-lg rounded ">
              <nav>
                {user?.role === ROLE.ADMIN && (
                  <Link
                    onClick={() => setMenu((prev) => !prev)}
                    to={"/admin-panel/all-products"}
                    className="hidden md:block hover:text-cyan-400"
                  >
                    Admin
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>

        {/* Cart */}
        {user?._id && (
          <Link
            to="/cart"
            className="btn btn-ghost btn-sm rounded-full relative tooltip tooltip-bottom"
            data-tip="Your Cart"
          >
            <RiShoppingCart2Line className="w-5 h-5 text-base-content" />
            {/* Optional badge */}
            <span className="badge badge-accent badge-sm absolute -top-1 -right-1">
              {context?.cartProductCount}
            </span>
          </Link>
        )}

        {user?._id ? (
          <button
            onClick={handelLogout}
            className="btn btn-sm btn-accent rounded-full text-white px-3 sm:px-5 text-xs sm:text-sm"
          >
            <RiLoginBoxLine className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="btn btn-sm btn-accent rounded-full text-white px-3 sm:px-5 text-xs sm:text-sm"
          >
            <RiLoginBoxLine className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
