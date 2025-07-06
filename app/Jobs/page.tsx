import React from "react";

import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { FiPlus } from "react-icons/fi";
import AddJob from "./addJob";

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechNova Inc.",
    location: "Bangalore, India",
    type: "Full-time",
  },
  {
    title: "Backend Engineer",
    company: "Cloudify Labs",
    location: "Remote",
    type: "Contract",
  },
  {
    title: "UI/UX Designer",
    company: "PixelCraft",
    location: "Mumbai, India",
    type: "Part-time",
  },
  {
    title: "Software Tester",
    company: "BugCatchers Pvt Ltd",
    location: "Hyderabad, India",
    type: "Full-time",
  },
  {
    title: "Data Analyst",
    company: "InsightWorks",
    location: "Chennai, India",
    type: "Internship",
  },
  {
    title: "DevOps Engineer",
    company: "ScaleOps",
    location: "Pune, India",
    type: "Full-time",
  },
];

const page = async () => {
  return (
    <div className="p-6">
      <div className="flex justify-between mb-2">
        <h1 className="text-2xl font-bold mb-4 text-nav">Available Jobs</h1>
        <AddJob />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 shadow-md bg-white hover:bg-gray-100 transition"
          >
            <h2 className="text-xl font-semibold text-black">{job.title}</h2>
            <p className="text-black">{job.company}</p>
            <p className="text-sm text-gray-800">{job.location}</p>
            <span className="inline-block mt-2 px-2 py-1 text-sm rounded bg-blue-100 text-blue-800">
              {job.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
