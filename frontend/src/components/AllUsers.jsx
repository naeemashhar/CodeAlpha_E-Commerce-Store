import React, { useEffect, useState } from "react";
import apiSummary from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import ChangeUserRole from "./ChangeUserRole";
import { RiEdit2Line } from "@remixicon/react";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUser = async () => {
    try {
      const dataRes = await fetch(apiSummary.allUser.url, {
        method: apiSummary.allUser.method,
        credentials: "include",
      });

      const apiData = await dataRes.json();

      if (apiData.success) {
        setAllUser(apiData.data);
      } else {
        toast.error(apiData.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error("Server error while fetching users");
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div
      className="bg-base-100 p-4 rounded-xl shadow-lg min-h-[400px]"
      data-theme="night"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary">
        All Users
      </h2>

      <div className="overflow-x-auto rounded-lg">
        <table className="table w-full">
          <thead className="bg-base-300 text-base-content uppercase text-xs">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-base-300 text-sm">
            {allUser.length > 0 ? (
              allUser.map((user, index) => (
                <tr key={user._id} className="hover:bg-base-200 transition">
                  <td>{index + 1}</td>
                  <td className="capitalize font-medium">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge text-xs px-3 py-1 rounded-full ${
                        user.role === "admin" ? "badge-accent" : "badge-neutral"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>{moment(user.createdAt).format("LL")}</td>
                  <td>
                    <button
                      className="tooltip tooltip-bottom group p-2 rounded-full bg-base-200 hover:bg-accent transition-colors duration-200"
                      data-tip="Edit Role"
                      onClick={() => {
                        setUpdateUserDetails(user);
                        setOpenUpdateRole(true);
                      }}
                    >
                      <RiEdit2Line className="w-4 h-4 text-base-content group-hover:text-white" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-base-content/60"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUser}
        />
      )}
    </div>
  );
};

export default AllUsers;
