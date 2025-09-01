import Quill from 'quill'
import React, { useEffect, useRef, useState } from 'react'
import { JobCategories, JobLocations } from '../assets/assets'

function AddJob() { 
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('Banglore')
  const [category, setCategory] = useState('Banglore')
  const [level, setLevel] = useState('Beginner level')
  const [salary, setSalary] = useState('0')

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  return (
    <form
      action=""
      className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6"
    >
      <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 lg:p-8 flex flex-col gap-6">
        
        {/* Job Title */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Job Title</p>
          <input
            type="text"
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
          />
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Job Description</p>
          <div
            ref={editorRef}
            className="min-h-40 h-52 border border-gray-300 rounded-xl overflow-hidden"
          />
        </div>

        {/* Category / Location / Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Job Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {JobCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Job Location</p>
            <select
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {JobLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Job Level</p>
            <select
              onChange={(e) => setLevel(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Beginner level">Beginner level</option>
              <option value="Intermediate level">Intermediate level</option>
              <option value="Senior level">Senior level</option>
            </select>
          </div>
        </div>

        {/* Salary */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Job Salary</p>
          <input
            onChange={(e) => setSalary(e.target.value)}
            type="number"
            placeholder="2500"
            required
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition"
          >
            Add Job
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddJob
