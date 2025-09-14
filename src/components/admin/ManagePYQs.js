import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { deleteFileFromS3 } from "../../services/awsS3";

const ManagePYQs = () => {
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterSemester, setFilterSemester] = useState("");

  useEffect(() => {
    fetchPYQs();
  }, []);

  const fetchPYQs = async () => {
    try {
      const pyqsRef = collection(db, "pyqs");
      const q = query(pyqsRef, orderBy("uploadedAt", "desc"));
      const snapshot = await getDocs(q);

      const pyqsList = [];
      snapshot.forEach((doc) => {
        pyqsList.push({ id: doc.id, ...doc.data() });
      });

      setPyqs(pyqsList);
    } catch (error) {
      console.error("Error fetching PYQs:", error);
      setMessage("Error loading PYQs");
    }
    setLoading(false);
  };

  const handleDelete = async (pyq) => {
    if (
      !window.confirm(`Are you sure you want to delete "${pyq.subject}" PYQ?`)
    ) {
      return;
    }

    try {
      // Delete from S3
      await deleteFileFromS3(pyq.fileName);

      // Delete from Firestore
      await deleteDoc(doc(db, "pyqs", pyq.id));

      // Update local state
      setPyqs(pyqs.filter((p) => p.id !== pyq.id));
      setMessage("PYQ deleted successfully");

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting PYQ:", error);
      setMessage("Error deleting PYQ");
    }
  };

  const filteredPyqs = pyqs.filter((pyq) => {
    const matchesSearch =
      pyq.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pyq.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === "" || pyq.year.toString() === filterYear;
    const matchesSemester =
      filterSemester === "" || pyq.semester === filterSemester;

    return matchesSearch && matchesYear && matchesSemester;
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage PYQs</h1>
        <p className="mt-2 text-gray-600">
          View and manage all uploaded question papers.
        </p>
      </div>

      {message && (
        <div
          className={`mb-4 p-4 rounded-md ${
            message.includes("Error")
              ? "bg-red-100 border border-red-400 text-red-700"
              : "bg-green-100 border border-green-400 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search
            </label>
            <input
              type="text"
              id="search"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search by subject or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="filterYear"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Year
            </label>
            <select
              id="filterYear"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filterSemester"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Semester
            </label>
            <select
              id="filterSemester"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
            >
              <option value="">All Semesters</option>
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester} Semester
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* PYQs List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredPyqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No PYQs found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year/Semester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPyqs.map((pyq) => (
                  <tr key={pyq.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {pyq.subject}
                        </div>
                        {pyq.description && (
                          <div className="text-sm text-gray-500">
                            {pyq.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pyq.year} - {pyq.semester}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {pyq.examType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pyq.uploaderName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(pyq.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pyq.downloadCount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <a
                        href={pyq.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDelete(pyq)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePYQs;
