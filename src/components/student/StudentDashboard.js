import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";

const StudentDashboard = () => {
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterSemester, setFilterSemester] = useState("");
  const [filterExamType, setFilterExamType] = useState("");
  const { currentUser } = useAuth();

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
    }
    setLoading(false);
  };

  const handleDownload = async (pyq) => {
    try {
      // Increment download count
      const pyqRef = doc(db, "pyqs", pyq.id);
      await updateDoc(pyqRef, {
        downloadCount: increment(1),
      });

      // Update local state
      setPyqs(
        pyqs.map((p) =>
          p.id === pyq.id
            ? { ...p, downloadCount: (p.downloadCount || 0) + 1 }
            : p
        )
      );

      // Open file in new tab
      window.open(pyq.fileUrl, "_blank");
    } catch (error) {
      console.error("Error downloading PYQ:", error);
    }
  };

  const filteredPyqs = pyqs.filter((pyq) => {
    const matchesSearch =
      pyq.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pyq.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === "" || pyq.year.toString() === filterYear;
    const matchesSemester =
      filterSemester === "" || pyq.semester === filterSemester;
    const matchesExamType =
      filterExamType === "" || pyq.examType === filterExamType;

    return matchesSearch && matchesYear && matchesSemester && matchesExamType;
  });

  // Get unique values for filters
  const uniqueYears = [...new Set(pyqs.map((pyq) => pyq.year))].sort(
    (a, b) => b - a
  );
  const uniqueSemesters = [...new Set(pyqs.map((pyq) => pyq.semester))];
  const uniqueExamTypes = [...new Set(pyqs.map((pyq) => pyq.examType))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome, {currentUser?.displayName}! Search and download previous year
          question papers.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                    Total PYQs Available
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {pyqs.length}
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
                  <span className="text-white font-bold">🎯</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Subjects Available
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {new Set(pyqs.map((pyq) => pyq.subject)).size}
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
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">📊</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Filtered Results
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {filteredPyqs.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Search & Filter PYQs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              placeholder="Search by subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="filterYear"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Year
            </label>
            <select
              id="filterYear"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="">All Years</option>
              {uniqueYears.map((year) => (
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
              Semester
            </label>
            <select
              id="filterSemester"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
            >
              <option value="">All Semesters</option>
              {uniqueSemesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester} Semester
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filterExamType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Exam Type
            </label>
            <select
              id="filterExamType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={filterExamType}
              onChange={(e) => setFilterExamType(e.target.value)}
            >
              <option value="">All Types</option>
              {uniqueExamTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* PYQs Grid */}
      {filteredPyqs.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-16 w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No PYQs Found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or clear the filters to see all
            available question papers.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPyqs.map((pyq) => (
            <div
              key={pyq.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                    {pyq.examType}
                  </span>
                  <span className="text-xs text-gray-500">
                    {pyq.downloadCount || 0} downloads
                  </span>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {pyq.subject}
                </h3>

                <div className="text-sm text-gray-600 mb-4 space-y-1">
                  <p>
                    <span className="font-medium">Year:</span> {pyq.year}
                  </p>
                  <p>
                    <span className="font-medium">Semester:</span>{" "}
                    {pyq.semester}
                  </p>
                  <p>
                    <span className="font-medium">Uploaded:</span>{" "}
                    {new Date(pyq.uploadedAt).toLocaleDateString()}
                  </p>
                  {pyq.description && (
                    <p>
                      <span className="font-medium">Description:</span>{" "}
                      {pyq.description}
                    </p>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleDownload(pyq)}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-200"
                  >
                    Download PDF
                  </button>
                  <a
                    href={pyq.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-gray-200 transition duration-200"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
