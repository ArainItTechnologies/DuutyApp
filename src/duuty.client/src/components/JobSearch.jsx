import { useState, useEffect } from "react";
import {
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Chinese from "../assets/Chinese.png";
import JobDetails from "./JobDetails";
import { fetchJobs } from "../services/auth";
import { pageSizeOptions } from "../Constants";
import { FormSelect } from "./custom/FormElements";
import SelectRole from "./user/SelectRole";

const JobSearch = () => {
  const [roleOptions, setRoleOptions] = useState([{ id: "", name: "Search job by Role" }]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showSelectRole, setShowSelectRole] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJobType, setFilterJobType] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5);

  // Filter jobs based on search term and job type
  const filteredJobs = jobs && jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterJobType === "" || job.jobType === filterJobType)
  );

  // Calculate pagination values
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Pagination navigation
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  const maxPageNumbersShown = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersShown / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbersShown - 1);

  if (endPage - startPage + 1 < maxPageNumbersShown) {
    startPage = Math.max(1, endPage - maxPageNumbersShown + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs(searchTerm,);
      setJobs(data.jobs);
    };

    getJobs();
  }, [searchTerm]);

    const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (!roleOptions.some((option) => option.id === role)) {
      setRoleOptions([...roleOptions, { id: role, name: role }]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold w-full sm:w-auto">Find Your Dream Job</h1>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2 flex-grow px-3 py-2 block w-full sm:w-3/4 rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 text-base text-gray-900 border border-gray-300 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px]"
        />

        <FormSelect
          name="role"
          value={selectedRole}
          setValue={setSelectedRole}
          onMouseDown={() => setShowSelectRole(true)}
          options={roleOptions}
        />

        <FormSelect
          name="jobsPerPage"
          value={jobsPerPage}
          options={pageSizeOptions}
          setValue={setJobsPerPage}
          onChange={() => setCurrentPage(1)} // Reset to page 1 on change
        />
      </div>

      {/* Results summary */}
      <div className="mb-4 text-gray-600">
        Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, jobs.length)} of {jobs.length} jobs
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No jobs found matching your search criteria.
        </div>
      )}

      {/* Job Listings */}
      <div className="container-wrapper min-h-screen py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-[20px] shadow-md p-4 hover:shadow-lg transition duration-300">
              <img
                src={Chinese}
                alt={job.title}
                className="rounded-[20px] mb-4 w-full h-48 object-cover"
              />
              <h2 className="text-lg font-medium mb-2">
                {job.title}
                <span className="ml-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                  {job.jobType}
                </span>
              </h2>
              <p className="text-xl font-bold">{job.salary.substring(0, 20)}</p>
              <p className="flex items-center text-sm text-gray-500 mt-1">
                <MapPinIcon className="h-5 w-5 mr-1 text-gray-500" />
                {job.location}, {job.state}
              </p>

              {/* Actions Row */}
              <div className="flex items-center gap-2 mt-4">
                {/* Eye Icon Button with same border & style */}
                <button
                  onClick={() => handleViewDetails(job)}
                  className="border border-purple-400 text-purple-600 hover:font-bold hover:bg-purple-600 hover:text-white p-2 rounded-[10px] transition"
                  title="View Details"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>

                {/* Apply Job Button */}
                <button
                  onClick={() => handleApply(job)}
                  className="flex-grow text-purple-600 border border-purple-400 hover:bg-purple-600 hover:text-white hover:font-bold font-medium py-2 px-4 rounded-[10px] transition cursor-pointer"
                >
                  Apply Job
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {filteredJobs.length > 0 && (
        <div className="flex justify-center items-center mt-8 mb-12">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            {/* First page button */}
            {startPage > 1 && (
              <>
                <button
                  onClick={() => paginate(1)}
                  className="px-3 py-1 rounded-md hover:bg-gray-100"
                >
                  1
                </button>
                {startPage > 2 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
              </>
            )}

            {/* Page numbers */}
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-md ${currentPage === number
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100"
                  }`}
              >
                {number}
              </button>
            ))}

            {/* Last page button */}
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
                <button
                  onClick={() => paginate(totalPages)}
                  className="px-3 py-1 rounded-md hover:bg-gray-100"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </nav>
        </div>
      )}

      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={handleCloseJobDetails}
        />
      )}

      {showSelectRole && (
        <SelectRole
          onClose={() => setShowSelectRole(false)}
          onRoleSelect={handleRoleSelect}
          selectedRole={selectedRole}
          includeSubroles={true}
        />
      )}
    </div>
  );
};

export default JobSearch;