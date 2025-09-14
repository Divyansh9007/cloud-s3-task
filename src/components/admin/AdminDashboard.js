import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UploadPYQ from "./UploadPYQ";
import ManagePYQs from "./ManagePYQs";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPYQs: 0,
    recentUploads: 0,
  });
  const [recentPYQs, setRecentPYQs] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchStats();
    fetchRecentPYQs();
  }, []);

  const fetchStats = async () => {
    try {
      const pyqsRef = collection(db, "pyqs");
      const snapshot = await getDocs(pyqsRef);

      const total = snapshot.size;
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const recentQuery = query(
        pyqsRef,
        where("uploadedAt", ">=", oneWeekAgo.toISOString())
      );
      const recentSnapshot = await getDocs(recentQuery);

      setStats({
        totalPYQs: total,
        recentUploads: recentSnapshot.size,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchRecentPYQs = async () => {
    try {
      const pyqsRef = collection(db, "pyqs");
      const recentQuery = query(
        pyqsRef,
        orderBy("uploadedAt", "desc")
        // limit(5) // Would use limit here if available
      );
      const snapshot = await getDocs(recentQuery);

      const pyqs = [];
      snapshot.forEach((doc) => {
        pyqs.push({ id: doc.id, ...doc.data() });
      });

      setRecentPYQs(pyqs.slice(0, 5)); // Limit to 5 items manually
    } catch (error) {
      console.error("Error fetching recent PYQs:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="mt-2 text-gray-600">
                  Welcome back, {currentUser?.displayName}! Manage PYQs and view
                  statistics.
                </p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                          <span className="text-white font-bold">📚</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Total PYQs
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {stats.totalPYQs}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                          <span className="text-white font-bold">📈</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Recent Uploads
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {stats.recentUploads}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="/admin/upload"
                      className="block w-full bg-indigo-600 text-white text-center py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                      Upload New PYQ
                    </a>
                    <a
                      href="/admin/manage"
                      className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
                    >
                      Manage All PYQs
                    </a>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Recent Uploads
                  </h3>
                  <div className="space-y-3">
                    {recentPYQs.length > 0 ? (
                      recentPYQs.map((pyq) => (
                        <div
                          key={pyq.id}
                          className="border-l-4 border-indigo-400 pl-4"
                        >
                          <p className="text-sm font-medium text-gray-900">
                            {pyq.subject}
                          </p>
                          <p className="text-xs text-gray-500">
                            {pyq.year} - {pyq.semester} |{" "}
                            {new Date(pyq.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No recent uploads</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/upload" element={<UploadPYQ />} />
        <Route path="/manage" element={<ManagePYQs />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
