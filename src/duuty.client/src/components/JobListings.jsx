import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ALL_ROLE_OPTIONS } from "../Constants";

const JobListing = () =>{
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleJobRole = (title) => {
    navigate("/hire", { state: { title } });
  };


  const filteredJobs = ALL_ROLE_OPTIONS.filter(
    (job) =>
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#f5f3ff]">
      <div className="container-wrapper min-h-screen py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold w-full sm:w-auto">
            Find your Dream Kitchen Team!
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-[20px] shadow-md p-4 hover:shadow-lg transition duration-300 relative"
            >
              <img
                src={job.image}
                alt={job.name}
                className="rounded-[20px] mb-4 w-full h-58 object-cover"
              />
              <h2 className="text-lg font-medium mb-2">
                {job.name}
                {/* <span className="ml-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                  {job.type}
                </span> */}
              </h2>

              <div className="mt-4 flex justify-between items-center gap-2">
                <button 
                onClick={() => handleJobRole(job.name)}
                className="hover:bg-[linear-gradient(var(--gradient-bg))] hover:text-white w-full text-purple-600 border border-purple-400 hover:bg-purple-100 font-medium py-2 rounded-[10px] transition cursor-pointer">
                  Hire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobListing;
