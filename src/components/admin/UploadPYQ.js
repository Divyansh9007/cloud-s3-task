import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { uploadFileToS3 } from "../../services/awsS3";
import { useAuth } from "../../contexts/AuthContext";

const UploadPYQ = () => {
  const [formData, setFormData] = useState({
    subject: "",
    year: "",
    semester: "",
    examType: "Mid-term",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setMessage("");
    } else {
      setMessage("Please select a PDF file only.");
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a PDF file to upload.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      // Create unique filename
      const timestamp = Date.now();
      const fileName = `pyqs/${formData.subject}_${formData.year}_${formData.semester}_${timestamp}.pdf`;

      // Upload file to S3
      const fileUrl = await uploadFileToS3(file, fileName);

      // Save metadata to Firestore
      await addDoc(collection(db, "pyqs"), {
        subject: formData.subject,
        year: parseInt(formData.year),
        semester: formData.semester,
        examType: formData.examType,
        description: formData.description,
        fileName: fileName,
        fileUrl: fileUrl,
        uploadedBy: currentUser?.uid,
        uploaderName: currentUser?.displayName || currentUser?.email,
        uploadedAt: new Date().toISOString(),
        downloadCount: 0,
      });

      setMessage("PYQ uploaded successfully!");
      setFormData({
        subject: "",
        year: "",
        semester: "",
        examType: "Mid-term",
        description: "",
      });
      setFile(null);

      // Reset file input
      const fileInput = document.getElementById("file-upload");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Error uploading PYQ:", error);
      setMessage("Error uploading PYQ. Please try again.");
    }

    setUploading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload New PYQ</h1>
        <p className="mt-2 text-gray-600">
          Add a new previous year question paper to the repository.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {message && (
            <div
              className={`p-4 rounded-md ${
                message.includes("Error")
                  ? "bg-red-100 border border-red-400 text-red-700"
                  : "bg-green-100 border border-green-400 text-green-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject Name *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., Data Structures, Mathematics"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700"
              >
                Year *
              </label>
              <select
                id="year"
                name="year"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.year}
                onChange={handleInputChange}
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="semester"
                className="block text-sm font-medium text-gray-700"
              >
                Semester *
              </label>
              <select
                id="semester"
                name="semester"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.semester}
                onChange={handleInputChange}
              >
                <option value="">Select Semester</option>
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester} Semester
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="examType"
                className="block text-sm font-medium text-gray-700"
              >
                Exam Type *
              </label>
              <select
                id="examType"
                name="examType"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.examType}
                onChange={handleInputChange}
              >
                <option value="Mid-term">Mid-term</option>
                <option value="End-term">End-term</option>
                <option value="Quiz">Quiz</option>
                <option value="Assignment">Assignment</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Additional information about this PYQ..."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700"
            >
              PDF File *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a PDF file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept=".pdf"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF up to 10MB</p>
                {file && (
                  <p className="text-sm text-green-600">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setFormData({
                  subject: "",
                  year: "",
                  semester: "",
                  examType: "Mid-term",
                  description: "",
                });
                setFile(null);
                setMessage("");
                const fileInput = document.getElementById("file-upload");
                if (fileInput) fileInput.value = "";
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload PYQ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPYQ;
