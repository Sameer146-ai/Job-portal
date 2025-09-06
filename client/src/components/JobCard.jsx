import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="border p-6 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-300 bg-white">
      {/* Company Logo */}
      <div className="flex justify-between items-center">
        <img
          className="h-10 w-10 object-contain"
          src={job.companyId.image}
          alt="company logo"
        />
      </div>

      {/* Job Title */}
      <h4 className="font-semibold text-xl mt-4 text-gray-800">{job.title}</h4>

      {/* Tags (Location + Level) */}
      <div className="flex items-center gap-3 mt-3 text-xs">
        <span className="bg-blue-50 border border-blue-200 text-blue-700 font-medium px-4 py-1.5 rounded-full">
          {job.location}
        </span>
        <span className="bg-green-50 border border-green-200 text-green-700 font-medium px-4 py-1.5 rounded-full">
          {job.level}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-gray-600 text-sm mt-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4 text-sm">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors duration-300"
        >
          Apply Now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="border border-gray-400 hover:border-gray-600 text-gray-600 hover:text-gray-800 px-5 py-2 rounded-lg transition-colors duration-300"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

export default JobCard;
