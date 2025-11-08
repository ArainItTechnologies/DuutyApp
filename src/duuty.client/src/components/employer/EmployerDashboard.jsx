import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/Hooks";
import {
    BriefcaseIcon,
    UserGroupIcon,
    EyeIcon,
    PlusIcon,
    ChartBarIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    MapPinIcon,
    CalendarIcon
} from "@heroicons/react/24/outline";
import { ROUTES } from "../../Constants";
import employerAPI from "../../api/employer";

// Mock data - replace with actual API calls
const mockStats = {
    totalJobs: 12,
    activeJobs: 8,
    totalApplications: 145,
    newApplications: 23,
    hiredCandidates: 15,
    interviewsScheduled: 7
};

const mockRecentApplications = [
    {
        id: 1,
        candidateName: "Rajesh Kumar",
        jobTitle: "Head Chef",
        appliedDate: "2024-01-16",
        status: "Under Review",
        experience: "5 years"
    },
    {
        id: 2,
        candidateName: "Priya Sharma",
        jobTitle: "Sous Chef",
        appliedDate: "2024-01-16",
        status: "Shortlisted",
        experience: "3 years"
    },
    {
        id: 3,
        candidateName: "Amit Singh",
        jobTitle: "Line Cook",
        appliedDate: "2024-01-15",
        status: "Interview Scheduled",
        experience: "2 years"
    }
];

const EmployerDashboard = () => {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState("overview");
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await employerAPI.fetchJobs(user.userId, user.token);
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        if(activeTab === 'jobs') {
            fetchJobs();
        }
    }, [user.userId, user.token, activeTab]);

    const StatCard = ({ title, value, icon: Icon, color, trend }) => (
        <div className="bg-white rounded-[16px] border-[1px] border-[var(--neutral-black)] p-6 shadow-[8px_8px_0_var(--employee-card-border)] hover:shadow-[12px_12px_0_var(--employee-card-border)] transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[var(--secondary-text-color)] text-sm font-medium">{title}</p>
                    <p className="text-2xl font-[AvenirNextBold] mt-2">{value}</p>
                    {trend && (
                        <p className={`text-xs mt-1 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.positive ? '↗' : '↘'} {trend.value}
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    );

    const JobCard = ({ job }) => (
        <div className="bg-white rounded-[16px] border-[1px] border-[var(--neutral-black)] p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-[var(--secondary-text-color)] flex items-center mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {job.location}
                    </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                    }`}>
                    {job.status}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-xs text-[var(--secondary-text-color)]">Salary Range</p>
                    <p className="font-medium">₹{job.salary}</p>
                </div>
                <div>
                    <p className="text-xs text-[var(--secondary-text-color)]">Applications</p>
                    <p className="font-medium">{job.applications}</p>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-xs text-[var(--secondary-text-color)] flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Posted {new Date(job.postedDate).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                    <button className="p-2 border border-purple-400 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg transition">
                        <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="px-4 py-2 bg-linear-(--gradient-bg) text-white rounded-lg hover:opacity-90 transition text-sm">
                        Manage
                    </button>
                </div>
            </div>
        </div>
    );

    const ApplicationCard = ({ application }) => (
        <div className="bg-white rounded-[16px] border-[1px] border-[var(--neutral-black)] p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="font-semibold">{application.candidateName}</h4>
                    <p className="text-[var(--secondary-text-color)] text-sm">{application.jobTitle}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${application.status === 'Shortlisted'
                    ? 'bg-blue-100 text-blue-700'
                    : application.status === 'Interview Scheduled'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                    {application.status}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-xs text-[var(--secondary-text-color)]">Experience</p>
                    <p className="font-medium">{application.experience}</p>
                </div>
                <div>
                    <p className="text-xs text-[var(--secondary-text-color)]">Applied</p>
                    <p className="font-medium">{new Date(application.appliedDate).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 border border-purple-400 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg transition text-sm">
                    View Profile
                </button>
                <button className="flex-1 px-4 py-2 bg-linear-(--gradient-bg) text-white rounded-lg hover:opacity-90 transition text-sm">
                    Interview
                </button>
            </div>
        </div>
    );

    return (
        <section className="main-wrapper bg-linear-[180deg,#F4F3FF,#FFFFFF] min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="container-wrapper">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-[AvenirNextBold]">Employer Dashboard</h1>
                            <p className="text-[var(--secondary-text-color)]">Welcome back, {user?.name || 'Employer'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-gray-200 px-6">
                <div className="container-wrapper">
                    <nav className="flex space-x-8">
                        {[
                            { id: 'overview', label: 'Overview', icon: ChartBarIcon },
                            { id: 'jobs', label: 'My Jobs', icon: BriefcaseIcon },
                            { id: 'applications', label: 'Applications', icon: UserGroupIcon },
                            { id: 'analytics', label: 'Analytics', icon: ChartBarIcon }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition ${activeTab === tab.id
                                    ? 'border-purple-600 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <tab.icon className="h-5 w-5" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 py-8">
                <div className="container-wrapper">
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Quick Actions */}
                            <div className="bg-white rounded-[16px] border-[1px] border-[var(--neutral-black)] p-6">
                                <h2 className="text-xl font-[AvenirNextBold] mb-4">Quick Actions</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <Link
                                        to={ROUTES.HIRE_NOW}
                                        className="flex flex-col items-center p-4 bg-[var(--employee-card-bg)] rounded-[12px] border border-gray-200 hover:shadow-md transition"
                                    >
                                        <PlusIcon className="h-8 w-8 text-purple-600 mb-2" />
                                        <span className="font-medium">Post New Job</span>
                                    </Link>
                                    <Link
                                        to={ROUTES.MANAGE_JOBS}
                                        className="flex flex-col items-center p-4 bg-[var(--employee-card-child1)] rounded-[12px] border border-gray-200 hover:shadow-md transition"
                                    >
                                        <BriefcaseIcon className="h-8 w-8 text-blue-600 mb-2" />
                                        <span className="font-medium">Manage Jobs</span>
                                    </Link>
                                    <Link
                                        to="/review-applications"
                                        className="flex flex-col items-center p-4 bg-[var(--employee-card-child2)] rounded-[12px] border border-gray-200 hover:shadow-md transition"
                                    >
                                        <UserGroupIcon className="h-8 w-8 text-green-600 mb-2" />
                                        <span className="font-medium">Review Applications</span>
                                    </Link>
                                    <Link
                                        to="/analytics"
                                        className="flex flex-col items-center p-4 bg-[var(--employee-card-child3)] rounded-[12px] border border-gray-200 hover:shadow-md transition"
                                    >
                                        <ChartBarIcon className="h-8 w-8 text-orange-600 mb-2" />
                                        <span className="font-medium">View Analytics</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <StatCard
                                    title="Active Jobs"
                                    value={mockStats.activeJobs}
                                    icon={BriefcaseIcon}
                                    color="bg-linear-(--gradient-bg)"
                                    trend={{ positive: true, value: "+2 this month" }}
                                />
                                <StatCard
                                    title="Total Applications"
                                    value={mockStats.totalApplications}
                                    icon={UserGroupIcon}
                                    color="bg-green-500"
                                    trend={{ positive: true, value: "+15 this week" }}
                                />
                                <StatCard
                                    title="New Applications"
                                    value={mockStats.newApplications}
                                    icon={ClockIcon}
                                    color="bg-yellow-500"
                                />
                                <StatCard
                                    title="Interviews Scheduled"
                                    value={mockStats.interviewsScheduled}
                                    icon={CalendarIcon}
                                    color="bg-blue-500"
                                />
                                <StatCard
                                    title="Hired Candidates"
                                    value={mockStats.hiredCandidates}
                                    icon={CheckCircleIcon}
                                    color="bg-purple-500"
                                />
                                <StatCard
                                    title="Total Jobs Posted"
                                    value={mockStats.totalJobs}
                                    icon={ChartBarIcon}
                                    color="bg-indigo-500"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'jobs' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-[AvenirNextBold]">My Job Posts</h2>
                                <Link
                                    to="/post-job"
                                    className="flex items-center gap-2 bg-linear-(--gradient-bg) text-white px-6 py-3 rounded-[11px] hover:opacity-90 transition"
                                >
                                    <PlusIcon className="h-5 w-5" />
                                    Post New Job
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {jobs.map((job) => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'applications' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-[AvenirNextBold]">Job Applications</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mockRecentApplications.map((application) => (
                                    <ApplicationCard key={application.id} application={application} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-[AvenirNextBold]">Analytics & Insights</h2>

                            <div className="bg-white rounded-[16px] border-[1px] border-[var(--neutral-black)] p-6 text-center">
                                <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                                <p className="text-[var(--secondary-text-color)]">
                                    Detailed analytics and insights about your job posts and applications will be available here.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EmployerDashboard;