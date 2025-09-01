import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

function ViewApplication() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Applications</h2>

      {/* ---------- Desktop / Tablet Table View ---------- */}
      <div className="overflow-x-auto rounded-lg shadow hidden md:block">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Serial No.</th>
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">Job Title</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Resume</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {viewApplicationsPageData.map((app, index) => (
              <tr key={app._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td>

                <td className="px-4 py-2 border flex items-center gap-2">
                  <img
                    src={app.imgSrc}
                    alt={app.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{app.name}</span>
                </td>

                <td className="px-4 py-2 border">{app.jobTitle}</td>
                <td className="px-4 py-2 border">{app.location}</td>

                <td className="px-4 py-2 border">
                  <a href="#" target="_blank" className="flex items-center gap-1 text-blue-600 hover:underline">
                    Resume
                    <img src={assets.resume_download_icon} alt="download" className="w-4 h-4" />
                  </a>
                </td>

                <td className="px-4 py-2 border space-x-2">
                  <button className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700">
                    Accept
                  </button>
                  <button className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile Card View ---------- */}
      <div className="space-y-4 md:hidden">
        {viewApplicationsPageData.map((app, index) => (
          <div key={app._id} className="border rounded-lg shadow p-4 bg-white">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={app.imgSrc}
                alt={app.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{app.name}</h3>
                <p className="text-sm text-gray-500">#{index + 1}</p>
              </div>
            </div>

            {/* Details */}
            <p className="text-sm"><span className="font-semibold">Job Title:</span> {app.jobTitle}</p>
            <p className="text-sm"><span className="font-semibold">Location:</span> {app.location}</p>

            {/* Resume */}
            <div className="mt-2">
              <a href="#" target="_blank" className="flex items-center gap-1 text-blue-600 hover:underline">
                Resume
                <img src={assets.resume_download_icon} alt="download" className="w-4 h-4" />
              </a>
            </div>

            {/* Action Buttons */}
            <div className="mt-3 flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700">
                Accept
              </button>
              <button className="flex-1 px-3 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewApplication
