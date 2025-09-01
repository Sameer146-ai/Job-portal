import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobdata, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  async function fetchJob() {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
    }
  }

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);

  return jobdata ? (
    <>
    <Navbar/>
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      {/* Company Logo */}
      <div className="flex justify-center mb-6">
        <img
          src={jobdata.companyId.image}
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
          <img src={assets.location_icon} alt="Location" className="h-5 w-5" />
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
          <span className="text-gray-700">{jobdata.salary || "Not Disclosed"}</span>
        </div>
      </div>

      {/* Description */}
      <p
        className="text-gray-600 text-base mt-6 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: jobdata.description }}
      ></p>

      {/* Apply Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate(`/apply-job/${jobdata._id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
        >
          Apply Now
        </button>
      </div>
    </div>
    <Footer/>
    </>
  ) : (
    <div>
      <Loader/>
    </div>
  );
}

export default ApplyJob;
