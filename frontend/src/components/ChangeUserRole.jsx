import React, { useState } from "react";
import ROLE from "../common/role.js";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message || "User role updated successfully");
      onClose();
      callFunc();
    } else {
      toast.error(responseData.message || "Failed to update user role");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div
        className="bg-base-200 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md relative border border-base-300 space-y-6"
        data-theme="night"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-base-content/70 hover:text-error transition"
        >
          <IoMdClose className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-primary">
          Change User Role
        </h2>

        {/* Divider */}
        <div className="h-px bg-base-300 mb-4"></div>

        {/* User Info */}
        <div className="space-y-2 text-sm sm:text-base text-base-content/80">
          <p>
            <span className="font-semibold text-base-content">Name:</span>{" "}
            {name}
          </p>
          <p>
            <span className="font-semibold text-base-content">Email:</span>{" "}
            {email}
          </p>
        </div>

        {/* Role Selector */}
        <div className="form-control">
          <label className="label label-text text-sm mb-1">Select Role</label>
          <select
            value={userRole}
            onChange={handleOnChangeSelect}
            className="select select-bordered bg-base-100 text-sm"
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el.charAt(0).toUpperCase() + el.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            onClick={updateUserRole}
            className="btn btn-accent w-full text-base-100 tracking-wide text-sm sm:text-base shadow-md hover:shadow-lg transition"
          >
            Update Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
