import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

function ManageJobs() {
  const navigate = useNavigate()

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Manage Jobs</h2>

      {/* ---------- Desktop / Tablet Table View ---------- */}
      <div className="overflow-x-auto rounded-lg shadow hidden md:block">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 border">#</th>
              <th className="px-4 py-3 border">Job Title</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border">Location</th>
              <th className="px-4 py-3 border">Applications</th>
              <th className="px-4 py-3 border text-center">Visible</th>
            </tr>
          </thead>

          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={job._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{job.title}</td>
                <td className="px-4 py-2 border">{moment(job.date).format('ll')}</td>
                <td className="px-4 py-2 border">{job.location}</td>
                <td className="px-4 py-2 border">{job.applicants}</td>
                <td className="px-4 py-2 border text-center">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add New Job button (Desktop) */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/dashboard/add-job')}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Add New Job
          </button>
        </div>
      </div>

      {/* ---------- Mobile Card View ---------- */}
      <div className="space-y-4 md:hidden">
        {manageJobsData.map((job, index) => (
          <div key={job._id} className="border rounded-lg shadow p-4 bg-white">
            <div className="mb-2 flex justify-between items-center">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-sm text-gray-500">#{index + 1}</p>
            </div>

            <p className="text-sm">
              <span className="font-semibold">Date:</span> {moment(job.date).format('ll')}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Location:</span> {job.location}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Applications:</span> {job.applicants}
            </p>

            <div className="mt-2 flex items-center space-x-2">
              <span className="text-sm font-semibold">Visible:</span>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </div>
        ))}

        {/* Add New Job button (Mobile) */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/dashboard/add-job')}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Add New Job
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManageJobs
