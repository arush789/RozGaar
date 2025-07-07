import React from "react";
import { getJobs } from "../utils";
import { Jobstype } from "../types";

const JobList = async () => {
  const res = await getJobs();

  if (res) {
    return res?.map((job: Jobstype, index: React.Key | null | undefined) => (
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
    ));
  } else {
    return <h1 className="text-black">No job added</h1>;
  }
};

export default JobList;
