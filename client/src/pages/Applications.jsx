import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import moment from "moment";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

function Applications() {
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { userApplications, userData, backendUrl, fetchUserData } =
    useContext(AppContext);
  const { getToken } = useAuth();

  // Initialize resume URL from userData
  useEffect(() => {
    if (userData?.resume) setResumeUrl(userData.resume);
  }, [userData]);

  // Upload resume to backend
  async function updateResume() {
    if (!resume) {
      toast.error("Please select a resume file first");
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();

      const formData = new FormData();
      formData.append("resume", resume);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setResumeUrl(data.resume); // Use URL returned from backend
        setResume(null);
        setIsEdit(false);

        // Refresh user data in context
        fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {/* Resume Section */}
        <h2 className="text-xl font-bold mb-4">Your Resume</h2>
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          {(resumeUrl || userData?.resume) && !isEdit ? (
            <div className="flex items-center justify-between">
              <a
                href={resumeUrl || userData?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition"
              >
                View Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <label
                htmlFor="resumeUpload"
                className="cursor-pointer flex items-center gap-2 border-2 border-dashed border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition w-full"
              >
                <img
                  src={assets.profile_upload_icon}
                  alt="upload"
                  className="w-6 h-6"
                />
                <span className="text-gray-600">
                  {resume ? resume.name : "Select Resume (PDF)"}
                </span>
                <input
                  id="resumeUpload"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  hidden
                />
              </label>

              <button
                onClick={updateResume}
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        {/* Jobs Applied Section */}
        <h2 className="text-xl font-bold mb-4">Jobs Applied</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Job Title</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications?.length > 0 ? (
                userApplications.map((app, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition text-gray-800"
                  >
                    <td className="px-4 py-3 flex items-center gap-2">
                      <img
                        src={
                          app.companyId?.image || assets.default_company_logo
                        }
                        alt={app.companyId?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{app.companyId?.name || "Company"}</span>
                    </td>
                    <td className="px-4 py-3">{app.jobId?.title}</td>
                    <td className="px-4 py-3">{app.jobId?.location}</td>
                    <td className="px-4 py-3">
                      {moment(app.date).format("DD MMM, YYYY")}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        app.status.toLowerCase() === "accepted"
                          ? "text-green-600"
                          : app.status.toLowerCase() === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {app.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-4 italic"
                  >
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Applications;
