import React from "react";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { FiPlus } from "react-icons/fi";
import AddJob from "./addJob";
import JobList from "./jobList";

const page = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between mb-2">
        <h1 className="text-2xl font-bold mb-4 text-nav">Available Jobs</h1>
        <AddJob />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <JobList />
      </div>
    </div>
  );
};

export default page;
