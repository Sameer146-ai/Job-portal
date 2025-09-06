import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

function ViewApplication() {
  const [applicants, setApplicants] = useState([]);
  const { companyToken, backendUrl } = useContext(AppContext);

  // update status
  async function updateStatus(applicationId, status) {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { applicationId, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // update list instantly
        setApplicants((prev) =>
          prev.map((a) => (a._id === applicationId ? { ...a, status } : a))
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Fetch company job applications
  async function fetchCompanyApplications() {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setApplicants(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (companyToken) fetchCompanyApplications();
  }, [companyToken]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Applications</h2>

      {/* Desktop / Tablet Table View */}
      <div className="overflow-x-auto rounded-lg shadow hidden md:block">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">Job Title</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Applied On</th>
              <th className="px-4 py-2 border">Resume</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {applicants.length > 0 ? (
              applicants.map((app, index) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>

                  <td className="px-4 py-2 border flex items-center gap-2">
                    <img
                      src={app.userId?.imageUrl || assets.default_user}
                      alt={app.userId?.name || "user"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{app.userId?.name || "Unknown User"}</span>
                  </td>

                  <td className="px-4 py-2 border">{app.jobId?.title}</td>
                  <td className="px-4 py-2 border">{app.jobId?.location}</td>
                  <td className="px-4 py-2 border">
                    {moment(app.date).format("DD MMM YYYY")}
                  </td>
                  <td className="px-4 py-2 border">
                    {app.userId?.resume ? (
                      <a
                        href={app.userId.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        Resume
                        <img
                          src={assets.resume_download_icon}
                          alt="download"
                          className="w-4 h-4"
                        />
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">No Resume</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border font-semibold">
                    {app.status === "accepted" ? (
                      <span className="text-green-600">Accepted</span>
                    ) : app.status === "rejected" ? (
                      <span className="text-red-600">Rejected</span>
                    ) : (
                      <span className="text-yellow-600">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button
                      onClick={() => updateStatus(app._id, "accepted")}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      disabled={app.status === "accepted"}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "rejected")}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      disabled={app.status === "rejected"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-gray-500 py-4 italic"
                >
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {applicants.length > 0 ? (
          applicants.map((app, index) => (
            <div
              key={app._id}
              className="border rounded-lg shadow p-4 bg-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={app.userId?.imageUrl || assets.default_user}
                  alt={app.userId?.name || "user"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{app.userId?.name}</h3>
                  <p className="text-sm text-gray-500">#{index + 1}</p>
                </div>
              </div>

              <p className="text-sm">
                <span className="font-semibold">Job Title:</span>{" "}
                {app.jobId?.title}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Location:</span>{" "}
                {app.jobId?.location}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Applied On:</span>{" "}
                {moment(app.date).format("DD MMM YYYY")}
              </p>

              <div className="mt-2">
                {app.userId?.resume ? (
                  <a
                    href={app.userId.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    Resume
                    <img
                      src={assets.resume_download_icon}
                      alt="download"
                      className="w-4 h-4"
                    />
                  </a>
                ) : (
                  <span className="text-gray-400 italic">No Resume</span>
                )}
              </div>

              {/* Status + Actions */}
              <div className="mt-3">
                <p className="text-sm font-semibold">
                  Status:{" "}
                  {app.status === "accepted" ? (
                    <span className="text-green-600">Accepted</span>
                  ) : app.status === "rejected" ? (
                    <span className="text-red-600">Rejected</span>
                  ) : (
                    <span className="text-yellow-600">Pending</span>
                  )}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateStatus(app._id, "accepted")}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    disabled={app.status === "accepted"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, "rejected")}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    disabled={app.status === "rejected"}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">No applications</p>
        )}
      </div>
    </div>
  );
}

export default ViewApplication;
