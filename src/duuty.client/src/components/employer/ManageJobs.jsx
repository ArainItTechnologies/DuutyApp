import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, useAppState, useAlert } from "../../hooks/Hooks";
import { 
  ArrowLeftIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MapPinIcon,
  CalendarIcon,
  UserGroupIcon,
  ClockIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon
} from "@heroicons/react/24/outline";
import { FormInput, FormSelect, PrimaryButton } from "../custom/FormElements";
import { ROUTES } from "../../Constants";

// Mock data - replace with actual API calls
const mockJobs = [
  {
    id: 1,
    title: "Head Chef",
    description: "Experienced head chef required for fine dining restaurant. Must have 5+ years experience in luxury hotels or restaurants.",
    location: "Mumbai",
    state: "Maharashtra",
    salaryRange: "50,000 - 70,000",
    jobType: "Full-time",
    status: "Active",
    applications: 24,
    views: 145,
    postedDate: "2024-01-15",
    expiryDate: "2024-02-15",
    skills: ["French Cuisine", "Team Management", "Menu Planning"],
    experienceLevel: "Senior"
  },
  {
    id: 2,
    title: "Sous Chef",
    description: "Looking for a skilled sous chef to support kitchen operations. Experience in Italian cuisine preferred.",
    location: "Delhi",
    state: "Delhi",
    salaryRange: "35,000 - 45,000",
    jobType: "Full-time",
    status: "Active",
    applications: 18,
    views: 89,
    postedDate: "2024-01-12",
    expiryDate: "2024-02-12",
    skills: ["Italian Cuisine", "Food Safety", "Kitchen Management"],
    experienceLevel: "Mid-level"
  },
  {
    id: 3,
    title: "Line Cook",
    description: "Entry level position for line cook in busy restaurant. Training will be provided.",
    location: "Bangalore",
    state: "Karnataka",
    salaryRange: "25,000 - 30,000",
    jobType: "Full-time",
    status: "Closed",
    applications: 31,
    views: 203,
    postedDate: "2024-01-10",
    expiryDate: "2024-02-10",
    skills: ["Basic Cooking", "Food Preparation", "Hygiene Standards"],
    experienceLevel: "Entry-level"
  },
  {
    id: 4,
    title: "Pastry Chef",
    description: "Creative pastry chef needed for bakery section. Must have experience with desserts and baking.",
    location: "Chennai",
    state: "Tamil Nadu",
    salaryRange: "40,000 - 55,000",
    jobType: "Full-time",
    status: "Draft",
    applications: 0,
    views: 0,
    postedDate: "2024-01-16",
    expiryDate: "2024-02-16",
    skills: ["Pastry Making", "Dessert Design", "Baking"],
    experienceLevel: "Mid-level"
  }
];

const statusOptions = [
  { id: "", name: "All Status" },
  { id: "Active", name: "Active" },
  { id: "Closed", name: "Closed" },
  { id: "Draft", name: "Draft" },
  { id: "Expired", name: "Expired" }
];

const sortOptions = [
  { id: "newest", name: "Newest First" },
  { id: "oldest", name: "Oldest First" },
  { id: "applications", name: "Most Applications" },
  { id: "views", name: "Most Views" }
];

const ManageJobs = () => {
  const { user } = useUser();
  const { setIsLoading } = useAppState();
  const { showSuccess, showError } = useAlert();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  // Filter and sort jobs
  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !selectedStatus || job.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.postedDate) - new Date(b.postedDate);
        case "applications":
          return b.applications - a.applications;
        case "views":
          return b.views - a.views;
        case "newest":
        default:
          return new Date(b.postedDate) - new Date(a.postedDate);
      }
    });

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedStatus, sortBy]);

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        setIsLoading(true);
        // Replace with actual API call
        // await deleteJob(jobId, user?.token);
        
        setJobs(prev => prev.filter(job => job.id !== jobId));
        showSuccess("Job posting deleted successfully");
      } catch (error) {
        showError("Failed to delete job posting");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleToggleStatus = async (jobId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Closed' : 'Active';
    
    try {
      setIsLoading(true);
      // Replace with actual API call
      // await updateJobStatus(jobId, newStatus, user?.token);
      
      setJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      ));
      showSuccess(`Job ${newStatus.toLowerCase()} successfully`);
    } catch (error) {
      showError("Failed to update job status");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRowExpansion = (jobId) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Closed': return 'bg-red-100 text-red-700';
      case 'Draft': return 'bg-yellow-100 text-yellow-700';
      case 'Expired': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Mobile Job Card Component
  const MobileJobCard = ({ job }) => (
    <div className="bg-white border border-gray-200 rounded-[12px] p-4 mb-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 pr-3">
          <h3 className="font-[AvenirNextBold] text-lg text-gray-900 mb-1">{job.title}</h3>
          <p className="text-[var(--secondary-text-color)] text-sm flex items-center mb-2">
            <MapPinIcon className="h-4 w-4 mr-1" />
            {job.location}, {job.state}
          </p>
          <p className="text-purple-600 font-medium text-sm">₹{job.salaryRange}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
            {job.status}
          </span>
          <div className="relative">
            <button
              onClick={() => setActionMenuOpen(actionMenuOpen === job.id ? null : job.id)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
            </button>
            
            {/* Action Menu */}
            {actionMenuOpen === job.id && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                <button
                  onClick={() => {
                    navigate(`/job-details/${job.id}`);
                    setActionMenuOpen(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                >
                  <EyeIcon className="h-4 w-4" />
                  View Details
                </button>
                <button
                  onClick={() => {
                    navigate(`/edit-job/${job.id}`);
                    setActionMenuOpen(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit Job
                </button>
                <button
                  onClick={() => {
                    handleToggleStatus(job.id, job.status);
                    setActionMenuOpen(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                >
                  <ClockIcon className="h-4 w-4" />
                  {job.status === 'Active' ? 'Close Job' : 'Activate Job'}
                </button>
                <button
                  onClick={() => {
                    handleDeleteJob(job.id);
                    setActionMenuOpen(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600"
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete Job
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-[var(--secondary-text-color)]">Applications</p>
          <p className="font-medium text-sm">{job.applications}</p>
        </div>
        <div className="text-center bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-[var(--secondary-text-color)]">Views</p>
          <p className="font-medium text-sm">{job.views}</p>
        </div>
        <div className="text-center bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-[var(--secondary-text-color)]">Posted</p>
          <p className="font-medium text-sm">{new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Expand Button */}
      <button
        onClick={() => toggleRowExpansion(job.id)}
        className="w-full flex items-center justify-center gap-2 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
      >
        {expandedRows.has(job.id) ? (
          <>
            <span className="text-sm font-medium">Show Less</span>
            <ChevronUpIcon className="h-4 w-4" />
          </>
        ) : (
          <>
            <span className="text-sm font-medium">Show More</span>
            <ChevronDownIcon className="h-4 w-4" />
          </>
        )}
      </button>

      {/* Expanded Content */}
      {expandedRows.has(job.id) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm">Description</h4>
              <p className="text-[var(--secondary-text-color)] text-sm leading-relaxed">
                {job.description}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[var(--secondary-text-color)]">Job Type</p>
                <p className="font-medium text-sm">{job.jobType}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--secondary-text-color)]">Experience</p>
                <p className="font-medium text-sm">{job.experienceLevel}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Desktop Table Row Component
  const DesktopTableRow = ({ job, index }) => (
    <div className={`${index !== filteredJobs.length - 1 ? 'border-b border-gray-200' : ''}`}>
      {/* Main Row */}
      <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Expand Button */}
          <div className="col-span-1">
            <button
              onClick={() => toggleRowExpansion(job.id)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              {expandedRows.has(job.id) ? (
                <ChevronUpIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>

          {/* Job Title */}
          <div className="col-span-3">
            <h3 className="font-[AvenirNextBold] text-gray-900">{job.title}</h3>
            <p className="text-sm text-[var(--secondary-text-color)]">₹{job.salaryRange}</p>
          </div>

          {/* Location */}
          <div className="col-span-2">
            <p className="text-sm text-gray-900 flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
              {job.location}, {job.state}
            </p>
          </div>

          {/* Status */}
          <div className="col-span-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
          </div>

          {/* Applications */}
          <div className="col-span-1">
            <p className="text-sm font-medium flex items-center">
              <UserGroupIcon className="h-4 w-4 mr-1 text-gray-400" />
              {job.applications}
            </p>
          </div>

          {/* Views */}
          <div className="col-span-1">
            <p className="text-sm font-medium flex items-center">
              <EyeIcon className="h-4 w-4 mr-1 text-gray-400" />
              {job.views}
            </p>
          </div>

          {/* Posted Date */}
          <div className="col-span-1">
            <p className="text-sm text-gray-600 flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
              {new Date(job.postedDate).toLocaleDateString()}
            </p>
          </div>

          {/* Actions */}
          <div className="col-span-2 flex gap-2 justify-center">
            <button
              onClick={() => navigate(`/job-details/${job.id}`)}
              className="p-2 border border-purple-400 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg transition text-sm"
              title="View Details"
            >
              <EyeIcon className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => navigate(`/edit-job/${job.id}`)}
              className="p-2 border border-blue-400 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition text-sm"
              title="Edit Job"
            >
              <PencilIcon className="h-4 w-4" />
            </button>

            <button
              onClick={() => handleDeleteJob(job.id)}
              className="p-2 border border-red-400 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition text-sm"
              title="Delete Job"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Row Details */}
      {expandedRows.has(job.id) && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Description */}
            <div className="lg:col-span-2">
              <h4 className="font-medium text-gray-900 mb-2">Job Description</h4>
              <p className="text-sm text-[var(--secondary-text-color)] mb-4">
                {job.description}
              </p>
              
              {/* Skills */}
              <h4 className="font-medium text-gray-900 mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Job Details</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[var(--secondary-text-color)]">Job Type</p>
                  <p className="font-medium text-sm">{job.jobType}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--secondary-text-color)]">Experience Level</p>
                  <p className="font-medium text-sm">{job.experienceLevel}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--secondary-text-color)]">Expiry Date</p>
                  <p className="font-medium text-sm">{new Date(job.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleToggleStatus(job.id, job.status)}
                  className={`w-full px-4 py-2 rounded-lg transition text-sm font-medium ${
                    job.status === 'Active'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {job.status === 'Active' ? 'Close Job' : 'Activate Job'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="main-wrapper bg-linear-[180deg,#F4F3FF,#FFFFFF] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="container-wrapper">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/employer-dashboard")}
                className="cursor-pointer flex items-center text-gray-700 hover:text-indigo-600"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-[AvenirNextBold]">Manage Jobs</h1>
                <p className="text-[var(--secondary-text-color)] text-sm">
                  Manage your job postings and track applications
                </p>
              </div>
            </div>
            <Link
              to={ROUTES.HIRE_NOW}
              className="flex items-center gap-2 bg-linear-(--gradient-bg) text-white px-4 sm:px-6 py-3 rounded-[11px] hover:opacity-90 transition text-sm w-full sm:w-auto justify-center"
            >
              <PlusIcon className="h-5 w-5" />
              Post New Job
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-4 sm:px-6 py-4 sm:py-6">
        <div className="container-wrapper">
          <div className="bg-white rounded-[16px] border-[1px] border-[var(--neutral-black)] p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <FormInput
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters Toggle for Mobile */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                >
                  <FunnelIcon className="h-4 w-4" />
                  Filters
                </button>
              </div>

              {/* Filters */}
              <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <FormSelect
                    value={selectedStatus}
                    setValue={setSelectedStatus}
                    options={statusOptions}
                    placeholder="Filter by status"
                  />
                  
                  <FormSelect
                    value={sortBy}
                    setValue={setSortBy}
                    options={sortOptions}
                    placeholder="Sort by"
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-lg sm:text-2xl font-[AvenirNextBold] text-purple-600">{jobs.length}</p>
                <p className="text-xs sm:text-sm text-[var(--secondary-text-color)]">Total Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-lg sm:text-2xl font-[AvenirNextBold] text-green-600">
                  {jobs.filter(job => job.status === 'Active').length}
                </p>
                <p className="text-xs sm:text-sm text-[var(--secondary-text-color)]">Active Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-lg sm:text-2xl font-[AvenirNextBold] text-blue-600">
                  {jobs.reduce((sum, job) => sum + job.applications, 0)}
                </p>
                <p className="text-xs sm:text-sm text-[var(--secondary-text-color)]">Total Applications</p>
              </div>
              <div className="text-center">
                <p className="text-lg sm:text-2xl font-[AvenirNextBold] text-orange-600">
                  {jobs.reduce((sum, job) => sum + job.views, 0)}
                </p>
                <p className="text-xs sm:text-sm text-[var(--secondary-text-color)]">Total Views</p>
              </div>
            </div>
          </div>

          {/* Jobs List/Table */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-[16px] border-[1px] border-[var(--neutral-black)] p-8 sm:p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-[AvenirNextBold] mb-2">No jobs found</h3>
                <p className="text-[var(--secondary-text-color)] mb-6 text-sm sm:text-base">
                  {searchTerm || selectedStatus 
                    ? "Try adjusting your search criteria or filters"
                    : "You haven't posted any jobs yet"
                  }
                </p>
                {!searchTerm && !selectedStatus && (
                  <Link
                    to="/post-job"
                    className="inline-flex items-center gap-2 bg-linear-(--gradient-bg) text-white px-6 py-3 rounded-[11px] hover:opacity-90 transition"
                  >
                    <PlusIcon className="h-5 w-5" />
                    Post Your First Job
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Mobile View */}
              <div className="block lg:hidden">
                {filteredJobs.map((job) => (
                  <MobileJobCard key={job.id} job={job} />
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block bg-white rounded-[16px] border-[1px] border-[var(--neutral-black)] shadow-[8px_8px_0_var(--employee-card-border)] overflow-hidden">
                {/* Table Header */}
                <div className="bg-[var(--employee-card-bg)] px-6 py-4 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-4 items-center font-[AvenirNextBold] text-sm text-[var(--secondary-text-color)]">
                    <div className="col-span-1"></div>
                    <div className="col-span-3">Job Title</div>
                    <div className="col-span-2">Location</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1">Applications</div>
                    <div className="col-span-1">Views</div>
                    <div className="col-span-1">Posted</div>
                    <div className="col-span-2 text-center">Actions</div>
                  </div>
                </div>

                {/* Job Rows */}
                {filteredJobs.map((job, index) => (
                  <DesktopTableRow key={job.id} job={job} index={index} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Click outside to close action menu */}
      {actionMenuOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setActionMenuOpen(null)}
        />
      )}
    </section>
  );
};

export default ManageJobs;