import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-white text-xl font-bold">
              University PYQ Repository
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white">
              Welcome, {currentUser?.displayName || currentUser?.email}
            </span>
            <span className="bg-indigo-500 text-white px-2 py-1 rounded text-sm">
              {userRole === "admin" ? "Admin" : "Student"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
