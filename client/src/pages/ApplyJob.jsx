import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [jobdata, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const { backendUrl, userData, userApplications, fetchUserApplications } =
    useContext(AppContext);

  // ✅ Fetch single job by ID
  async function fetchJob() {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // ✅ Apply handler
  async function applyHandler() {
    try {
      if (!userData) {
        return toast.error("Login to apply for Job");
      }

      if (!userData.resume) {
        navigate("/applications");
        return toast.error("Upload resume to apply");
      }

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/user/apply`,
        { jobId: jobdata._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications(); // refresh applied jobs
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // ✅ Check if already applied
  useEffect(() => {
    if (userApplications.length > 0 && jobdata) {
      const hasApplied = userApplications.some(
        (item) => item.jobId._id === jobdata._id
      );
      setIsAlreadyApplied(hasApplied);
    }
  }, [jobdata, userApplications]);

  useEffect(() => {
    fetchJob();
  }, [id]);

  return jobdata ? (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl">
        {/* Company Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={jobdata.companyId?.image || assets.default_company_logo}
            alt="Company Logo"
            className="h-16 w-16 object-contain"
          />
        </div>

        {/* Job Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {jobdata.title}
        </h1>

        {/* Posted Time */}
        <p className="text-gray-500 text-sm text-center mt-1">
          Posted {moment(jobdata.date).fromNow()}
        </p>

        {/* Job Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-sm">
          {/* Location */}
          <div className="flex items-center gap-2">
            <img
              src={assets.location_icon}
              alt="Location"
              className="h-5 w-5"
            />
            <span className="text-gray-700">{jobdata.location}</span>
          </div>

          {/* Level */}
          <div className="flex items-center gap-2">
            <img src={assets.person_icon} alt="Level" className="h-5 w-5" />
            <span className="text-gray-700">{jobdata.level}</span>
          </div>

          {/* Salary */}
          <div className="flex items-center gap-2">
            <img src={assets.money_icon} alt="Salary" className="h-5 w-5" />
            <span className="text-gray-700">
              {jobdata.salary || "Not Disclosed"}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-gray-600 text-base mt-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: jobdata.description }}
        ></p>

        {/* Apply Button */}
        <div className="flex justify-center mt-8">
          {isAlreadyApplied ? (
            <button
              disabled
              className="bg-gray-400 text-white px-6 py-3 rounded-lg font-medium cursor-not-allowed"
            >
              Already Applied
            </button>
          ) : (
            <button
              onClick={applyHandler}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <div>
      <Loader />
    </div>
  );
}

export default ApplyJob;
