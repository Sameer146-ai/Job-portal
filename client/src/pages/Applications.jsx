import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'

function Applications() {
  const [isEdit, setIsedit] = useState(false)
  const [resume, setResume] = useState(null)

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {/* Resume Section */}
        <h2 className="text-xl font-bold mb-4">Your Resume</h2>
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          {isEdit ? (
            <div className="flex items-center gap-4">
              <label
                htmlFor="resumeUpload"
                className="cursor-pointer flex items-center gap-2 border-2 border-dashed border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <img src={assets.profile_upload_icon} alt="" className="w-6 h-6" />
                <span className="text-gray-600">
                  {resume ? resume.name : 'Select Resume'}
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
                onClick={() => setIsedit(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="text-blue-600 underline hover:text-blue-800 transition"
              >
                {resume ? resume.name : 'Resume'}
              </a>
              <button
                onClick={() => setIsedit(true)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Edit
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
              {jobsApplied.map((job, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition text-gray-800"
                >
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img src={job.logo} alt="" className="w-8 h-8 rounded-full" />
                    <span>{job.company}</span>
                  </td>
                  <td className="px-4 py-3">{job.title}</td>
                  <td className="px-4 py-3">{job.location}</td>
                  <td className="px-4 py-3">{moment(job.date).format('ll')}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      job.status.toLowerCase() === 'accepted'
                        ? 'text-green-600'
                        : job.status.toLowerCase() === 'rejected'
                        ? 'text-red-600'
                        : job.status.toLowerCase() === 'pending'
                        ? 'text-yellow-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {job.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Applications
