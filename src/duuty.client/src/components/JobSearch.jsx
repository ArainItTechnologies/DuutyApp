import { useState, useEffect } from "react";
import {
  MapPinIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Chinese from "../assets/Chinese.png";
import JobDetails from "./JobDetails";
import { fetchJobs } from "../services/auth";
import { useUser } from "../hooks/Hooks";

const JobSearch = () => {
  const { user } = useUser();
  
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
    console.log(user)
    const getJobs = async () => {
      const data = await fetchJobs(searchTerm,);
      setJobs(data.jobs);
    };

    getJobs();
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Dream Job</h1>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <select
          value={filterJobType}
          onChange={(e) => setFilterJobType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Job Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
        </select>

        <select
          value={jobsPerPage}
          onChange={(e) => {
            setJobsPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to first page when changing items per page
          }}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
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
    </div>
  );
};

export default JobSearch;