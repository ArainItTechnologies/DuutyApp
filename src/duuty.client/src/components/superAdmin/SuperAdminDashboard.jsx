import { useState } from "react";
import { useUser, useAppState, useAlert } from "../../hooks/Hooks";
import {
    BriefcaseIcon,
    UserGroupIcon,
    EyeIcon,
    ChartBarIcon,
    XCircleIcon,
    MapPinIcon,
    BuildingOfficeIcon,
    CreditCardIcon,
    UserPlusIcon,
    CogIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
    EllipsisVerticalIcon,
    ArrowLeftIcon
} from "@heroicons/react/24/outline";
import { FormInput } from "../custom/FormElements";
import AddRestaurentWithEmployer from "../admin/AddRestaurentWithEmployer";

// Mock data - replace with actual API calls
const mockStats = {
    totalEmployers: 45,
    activeEmployers: 38,
    totalRestaurants: 89,
    activeRestaurants: 76,
    totalSubscriptions: 45,
    activeSubscriptions: 38,
    totalJobs: 234,
    activeJobs: 189
};

const mockEmployers = [
    {
        id: 1,
        name: "Rajesh Kumar",
        email: "rajesh@foodie.com",
        restaurantName: "Foodie Paradise",
        location: "Mumbai, Maharashtra",
        subscriptionStatus: "Active",
        subscriptionPlan: "Premium",
        registrationDate: "2024-01-15",
        activeJobs: 5,
        totalApplications: 124,
        lastActive: "2024-01-20"
    },
    {
        id: 2,
        name: "Priya Sharma",
        email: "priya@spiceworld.com",
        restaurantName: "Spice World",
        location: "Delhi, Delhi",
        subscriptionStatus: "Active",
        subscriptionPlan: "Basic",
        registrationDate: "2024-01-10",
        activeJobs: 3,
        totalApplications: 87,
        lastActive: "2024-01-19"
    },
    {
        id: 3,
        name: "Amit Singh",
        email: "amit@tastycrunch.com",
        restaurantName: "Tasty Crunch",
        location: "Bangalore, Karnataka",
        subscriptionStatus: "Expired",
        subscriptionPlan: "Premium",
        registrationDate: "2023-12-05",
        activeJobs: 0,
        totalApplications: 45,
        lastActive: "2024-01-10"
    }
];

const mockEmployees = [
    {
        id: 1,
        name: "Sunita Devi",
        email: "sunita@example.com",
        currentRole: "Employee",
        registrationDate: "2024-01-12",
        location: "Mumbai, Maharashtra",
        applications: 8,
        experience: "3 years"
    },
    {
        id: 2,
        name: "Ravi Kumar",
        email: "ravi@example.com",
        currentRole: "Employee",
        registrationDate: "2024-01-08",
        location: "Delhi, Delhi",
        applications: 12,
        experience: "5 years"
    }
];

const SuperAdminDashboard = () => {
    const { user, isAdmin } = useUser();
    const { setIsLoading } = useAppState();
    const { showSuccess, showError } = useAlert();

    const [activeAction, setActiveAction] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showEmployerForm, setShowEmployerForm] = useState(false);
    const [showRoleChangeForm, setShowRoleChangeForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [actionMenuOpen, setActionMenuOpen] = useState(null);

    const handlePromoteToEmployer = async (employeeId) => {
        try {
            setIsLoading(true);
            // Replace with actual API call
            // await addRoleToUser(employeeId, 'Employer', user?.token);

            showSuccess("Employee promoted to Employer successfully!");
            setShowRoleChangeForm(false);
            setSelectedEmployee(null);
        } catch (error) {
            showError("Failed to promote employee");
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Expired': return 'bg-red-100 text-red-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Cancelled': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const StatCard = ({ title, value, icon: Icon, color, trend }) => (
        <div className="bg-white rounded-[12px] sm:rounded-[16px] border-[1px] border-[var(--neutral-black)] p-4 sm:p-6 shadow-[4px_4px_0_var(--employee-card-border)] sm:shadow-[8px_8px_0_var(--employee-card-border)] hover:shadow-[6px_6px_0_var(--employee-card-border)] sm:hover:shadow-[12px_12px_0_var(--employee-card-border)] transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[var(--secondary-text-color)] text-xs sm:text-sm font-medium">{title}</p>
                    <p className="text-xl sm:text-2xl font-[AvenirNextBold] mt-1 sm:mt-2">{value}</p>
                    {trend && (
                        <p className={`text-xs mt-1 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.positive ? '↗' : '↘'} {trend.value}
                        </p>
                    )}
                </div>
                <div className={`p-2 sm:p-3 rounded-full ${color}`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
            </div>
        </div>
    );

    // Mobile Employee Card Component
    const MobileEmployeeCard = ({ employee }) => (
        <div className="bg-white border border-gray-200 rounded-[12px] p-4 mb-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h3 className="font-[AvenirNextBold] text-lg text-gray-900 mb-1">{employee.name}</h3>
                    <p className="text-[var(--secondary-text-color)] text-sm mb-1">{employee.email}</p>
                    <p className="text-[var(--secondary-text-color)] text-sm flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {employee.location}
                    </p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {employee.currentRole}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-[var(--secondary-text-color)]">Applications</p>
                    <p className="font-medium text-sm">{employee.applications}</p>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-[var(--secondary-text-color)]">Experience</p>
                    <p className="font-medium text-sm">{employee.experience}</p>
                </div>
            </div>

            <button
                onClick={() => {
                    setSelectedEmployee(employee);
                    setShowRoleChangeForm(true);
                }}
                className="w-full px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition text-sm font-medium"
                disabled={!isAdmin}
            >
                Promote to Employer
            </button>
        </div>
    );

    // Desktop Employee Card Component
    const DesktopEmployeeCard = ({ employee }) => (
        <div className="bg-white rounded-[16px] border-[1px] border-[var(--neutral-black)] p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-[AvenirNextBold]">{employee.name}</h3>
                    <p className="text-[var(--secondary-text-color)] text-sm">{employee.email}</p>
                    <p className="text-[var(--secondary-text-color)] flex items-center mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {employee.location}
                    </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {employee.currentRole}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-xs text-[var(--secondary-text-color)]">Applications</p>
                    <p className="font-medium">{employee.applications}</p>
                </div>
                <div>
                    <p className="text-xs text-[var(--secondary-text-color)]">Experience</p>
                    <p className="font-medium">{employee.experience}</p>
                </div>
            </div>

            <button
                onClick={() => {
                    setSelectedEmployee(employee);
                    setShowRoleChangeForm(true);
                }}
                className="w-full px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition text-sm font-medium"
                disabled={!isAdmin}
            >
                Promote to Employer
            </button>
        </div>
    );

    const renderActionContent = () => {
        if (activeAction === 'employers') {
            const filteredEmployers = mockEmployers.filter(employer => {
                const searchLower = searchTerm.toLowerCase();
                const matchesSearch = searchTerm === '' ||
                    employer.restaurantName.toLowerCase().includes(searchLower) ||
                    employer.name.toLowerCase().includes(searchLower) ||
                    employer.email.toLowerCase().includes(searchLower) ||
                    employer.location.toLowerCase().includes(searchLower);

                return matchesSearch;
            });

            return (
                <div className="space-y-4 sm:space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setActiveAction(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                            </button>
                            <h2 className="text-xl sm:text-2xl font-[AvenirNextBold]">Employers & Restaurants</h2>
                        </div>
                        <button
                            onClick={() => setShowEmployerForm(true)}
                            className="flex items-center gap-2 bg-linear-(--gradient-bg) text-white px-4 sm:px-6 py-3 rounded-[11px] hover:opacity-90 transition text-sm w-full sm:w-auto justify-center"
                            disabled={!isAdmin}
                        >
                            <UserPlusIcon className="h-5 w-5" />
                            <span className="hidden sm:inline">Register New Employer</span>
                            <span className="sm:hidden">Register Employer</span>
                        </button>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-[12px] sm:rounded-[16px] border-[1px] border-[var(--neutral-black)] p-4 sm:p-6">
                        <div className="space-y-4">
                            {/* Search */}
                            <div className="relative">
                                <FormInput
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Search Results Info */}
                            {searchTerm && (
                                <div className="text-sm text-gray-600">
                                    {filteredEmployers.length > 0 ? (
                                        <p>Found {filteredEmployers.length} employer{filteredEmployers.length !== 1 ? 's' : ''} matching "{searchTerm}"</p>
                                    ) : (
                                        <p className="text-red-600">No employers found matching "{searchTerm}"</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Employers Table/List */}
                    <div className="bg-white rounded-[12px] sm:rounded-[16px] border-[1px] border-[var(--neutral-black)] overflow-hidden">
                        {filteredEmployers.length === 0 ? (
                            // Empty State
                            <div className="text-center py-12">
                                <BuildingOfficeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No employers found</h3>
                                <p className="text-gray-500 mb-4">
                                    {searchTerm
                                        ? "Try adjusting your search criteria or filters"
                                        : "No employers have been registered yet"
                                    }
                                </p>
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="text-purple-600 hover:text-purple-800 font-medium"
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                {/* Mobile List View */}
                                <div className="block lg:hidden">
                                    <div className="divide-y divide-gray-200">
                                        {filteredEmployers.map((employer) => (
                                            <div key={employer.id} className="p-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="font-[AvenirNextBold] text-lg text-gray-900 mb-1">
                                                            {employer.restaurantName}
                                                        </h3>
                                                        <p className="text-[var(--secondary-text-color)] text-sm mb-1">
                                                            {employer.name}
                                                        </p>
                                                        <p className="text-[var(--secondary-text-color)] text-sm mb-2">
                                                            {employer.email}
                                                        </p>
                                                        <p className="text-[var(--secondary-text-color)] text-sm flex items-center">
                                                            <MapPinIcon className="h-4 w-4 mr-1" />
                                                            {employer.location}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employer.subscriptionStatus)}`}>
                                                            {employer.subscriptionStatus}
                                                        </span>
                                                        <div className="relative">
                                                            <button
                                                                onClick={() => setActionMenuOpen(actionMenuOpen === employer.id ? null : employer.id)}
                                                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                            >
                                                                <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                                                            </button>

                                                            {/* Action Menu */}
                                                            {actionMenuOpen === employer.id && (
                                                                <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                                                                    <button
                                                                        onClick={() => {
                                                                            // View details action
                                                                            setActionMenuOpen(null);
                                                                        }}
                                                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                                                                    >
                                                                        <EyeIcon className="h-4 w-4" />
                                                                        View Details
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            // Edit action
                                                                            setActionMenuOpen(null);
                                                                        }}
                                                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                                                                    >
                                                                        <PencilIcon className="h-4 w-4" />
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            // Manage action
                                                                            setActionMenuOpen(null);
                                                                        }}
                                                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                                                                    >
                                                                        <CogIcon className="h-4 w-4" />
                                                                        Manage
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            // Delete action
                                                                            setActionMenuOpen(null);
                                                                        }}
                                                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600"
                                                                    >
                                                                        <TrashIcon className="h-4 w-4" />
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Stats Grid */}
                                                <div className="grid grid-cols-4 gap-3 text-center">
                                                    <div className="bg-gray-50 rounded-lg p-2">
                                                        <p className="text-xs text-[var(--secondary-text-color)]">Plan</p>
                                                        <p className="font-medium text-sm">{employer.subscriptionPlan}</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-2">
                                                        <p className="text-xs text-[var(--secondary-text-color)]">Jobs</p>
                                                        <p className="font-medium text-sm">{employer.activeJobs}</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-2">
                                                        <p className="text-xs text-[var(--secondary-text-color)]">Applications</p>
                                                        <p className="font-medium text-sm">{employer.totalApplications}</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-2">
                                                        <p className="text-xs text-[var(--secondary-text-color)]">Registered</p>
                                                        <p className="font-medium text-sm">
                                                            {new Date(employer.registrationDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Desktop Table View */}
                                <div className="hidden lg:block">
                                    {/* Table Header */}
                                    <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
                                        <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="col-span-3">Restaurant & Owner</div>
                                            <div className="col-span-2">Location</div>
                                            <div className="col-span-1">Plan</div>
                                            <div className="col-span-1">Status</div>
                                            <div className="col-span-1">Jobs</div>
                                            <div className="col-span-1">Applications</div>
                                            <div className="col-span-2">Registered</div>
                                            <div className="col-span-1">Actions</div>
                                        </div>
                                    </div>

                                    {/* Table Body */}
                                    <div className="divide-y divide-gray-200">
                                        {filteredEmployers.map((employer) => (
                                            <div key={employer.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                                <div className="grid grid-cols-12 gap-4 items-center">
                                                    {/* Restaurant & Owner */}
                                                    <div className="col-span-3">
                                                        <div>
                                                            <h3 className="font-[AvenirNextBold] text-sm text-gray-900">
                                                                {employer.restaurantName}
                                                            </h3>
                                                            <p className="text-sm text-[var(--secondary-text-color)]">
                                                                {employer.name}
                                                            </p>
                                                            <p className="text-xs text-[var(--secondary-text-color)]">
                                                                {employer.email}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Location */}
                                                    <div className="col-span-2">
                                                        <p className="text-sm text-gray-900 flex items-center">
                                                            <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                                                            {employer.location}
                                                        </p>
                                                    </div>

                                                    {/* Plan */}
                                                    <div className="col-span-1">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            {employer.subscriptionPlan}
                                                        </span>
                                                    </div>

                                                    {/* Status */}
                                                    <div className="col-span-1">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employer.subscriptionStatus)}`}>
                                                            {employer.subscriptionStatus}
                                                        </span>
                                                    </div>

                                                    {/* Active Jobs */}
                                                    <div className="col-span-1">
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {employer.activeJobs}
                                                        </span>
                                                    </div>

                                                    {/* Applications */}
                                                    <div className="col-span-1">
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {employer.totalApplications}
                                                        </span>
                                                    </div>

                                                    {/* Registration Date */}
                                                    <div className="col-span-2">
                                                        <div>
                                                            <p className="text-sm text-gray-900">
                                                                {new Date(employer.registrationDate).toLocaleDateString()}
                                                            </p>
                                                            <p className="text-xs text-[var(--secondary-text-color)]">
                                                                Last active: {new Date(employer.lastActive).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="col-span-1">
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => {
                                                                    // View details action
                                                                }}
                                                                className="text-purple-600 hover:text-purple-900 transition-colors p-1 rounded hover:bg-purple-50"
                                                                title="View Details"
                                                            >
                                                                <EyeIcon className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    // Edit action
                                                                }}
                                                                className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded hover:bg-blue-50"
                                                                title="Edit"
                                                            >
                                                                <PencilIcon className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    // Manage action
                                                                }}
                                                                className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded hover:bg-gray-50"
                                                                title="Manage"
                                                            >
                                                                <CogIcon className="h-4 w-4" />
                                                            </button>
                                                            <div className="relative">
                                                                <button
                                                                    onClick={() => setActionMenuOpen(actionMenuOpen === employer.id ? null : employer.id)}
                                                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-50"
                                                                    title="More actions"
                                                                >
                                                                    <EllipsisVerticalIcon className="h-4 w-4" />
                                                                </button>

                                                                {/* More Actions Menu */}
                                                                {actionMenuOpen === employer.id && (
                                                                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                                                                        <button
                                                                            onClick={() => {
                                                                                // Reset password action
                                                                                setActionMenuOpen(null);
                                                                            }}
                                                                            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                                                                        >
                                                                            <CogIcon className="h-4 w-4" />
                                                                            Reset Password
                                                                        </button>
                                                                        <button
                                                                            onClick={() => {
                                                                                // Toggle status action
                                                                                setActionMenuOpen(null);
                                                                            }}
                                                                            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                                                                        >
                                                                            <EyeIcon className="h-4 w-4" />
                                                                            {employer.subscriptionStatus === 'Active' ? 'Deactivate' : 'Activate'}
                                                                        </button>
                                                                        <hr className="my-1" />
                                                                        <button
                                                                            onClick={() => {
                                                                                // Delete action
                                                                                setActionMenuOpen(null);
                                                                            }}
                                                                            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600"
                                                                        >
                                                                            <TrashIcon className="h-4 w-4" />
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Table Footer */}
                                    <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEmployers.length}</span> of{' '}
                                                <span className="font-medium">{filteredEmployers.length}</span> results
                                                {searchTerm && (
                                                    <span className="text-gray-500"> (filtered from {mockEmployers.length} total)</span>
                                                )}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                                                    Previous
                                                </button>
                                                <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            );
        }

        if (activeAction === 'employees') {
            return (
                <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setActiveAction(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                            </button>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-[AvenirNextBold]">Employee Role Management</h2>
                                <p className="text-[var(--secondary-text-color)] text-sm">Promote employees to employers</p>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="bg-white rounded-[12px] sm:rounded-[16px] border-[1px] border-[var(--neutral-black)] p-4 sm:p-6">
                        <div className="relative">
                            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                            <FormInput
                                type="text"
                                placeholder="Search employees..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Employees List */}
                    <div>
                        {/* Mobile View */}
                        <div className="block lg:hidden">
                            {mockEmployees.map((employee) => (
                                <MobileEmployeeCard key={employee.id} employee={employee} />
                            ))}
                        </div>

                        {/* Desktop View */}
                        <div className="hidden lg:block">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {mockEmployees.map((employee) => (
                                    <DesktopEmployeeCard key={employee.id} employee={employee} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (activeAction === 'subscriptions') {
            return (
                <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setActiveAction(null)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <h2 className="text-xl sm:text-2xl font-[AvenirNextBold]">Subscription Management</h2>
                    </div>

                    <div className="bg-white rounded-[12px] sm:rounded-[16px] border-[1px] border-[var(--neutral-black)] p-6 sm:p-8 text-center">
                        <CreditCardIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Subscription Management Coming Soon</h3>
                        <p className="text-[var(--secondary-text-color)] text-sm sm:text-base">
                            Detailed subscription management and billing features will be available here.
                        </p>
                    </div>
                </div>
            );
        }

        if (activeAction === 'analytics') {
            return (
                <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setActiveAction(null)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <h2 className="text-xl sm:text-2xl font-[AvenirNextBold]">Platform Analytics</h2>
                    </div>

                    <div className="bg-white rounded-[12px] sm:rounded-[16px] border-[1px] border-[var(--neutral-black)] p-6 sm:p-8 text-center">
                        <ChartBarIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Analytics Dashboard Coming Soon</h3>
                        <p className="text-[var(--secondary-text-color)] text-sm sm:text-base">
                            Comprehensive analytics and insights about platform usage will be available here.
                        </p>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <section className="main-wrapper bg-linear-[180deg,#F4F3FF,#FFFFFF] min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
                <div className="container-wrapper">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1 sm:flex-none">
                            <h1 className="text-xl sm:text-2xl font-[AvenirNextBold]">Admin Dashboard</h1>
                            <p className="text-[var(--secondary-text-color)] text-sm">
                                Welcome back, {user?.name || 'Admin'} • Platform Management
                            </p>
                        </div>
                        {isAdmin && !activeAction && (
                            <button
                                onClick={() => setShowEmployerForm(true)}
                                className="flex items-center gap-2 bg-linear-(--gradient-bg) text-white px-4 sm:px-6 py-3 rounded-[11px] hover:opacity-90 transition text-sm w-full sm:w-auto justify-center"
                            >
                                <UserPlusIcon className="h-5 w-5" />
                                <span className="hidden sm:inline">Register Employer</span>
                                <span className="sm:hidden">Register</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-6 py-4 sm:py-8">
                <div className="container-wrapper">
                    {!activeAction ? (
                        <div className="space-y-6 sm:space-y-8">
                            {/* Quick Actions */}
                            <div className="bg-white rounded-[12px] sm:rounded-[16px] border-[1px] border-[var(--neutral-black)] p-4 sm:p-6">
                                <h2 className="text-lg sm:text-xl font-[AvenirNextBold] mb-4">Quick Actions</h2>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                    <button
                                        onClick={() => setShowEmployerForm(true)}
                                        className="flex flex-col items-center p-3 sm:p-4 bg-[var(--employee-card-bg)] rounded-[8px] sm:rounded-[12px] border border-gray-200 hover:shadow-md transition"
                                        disabled={!isAdmin}
                                    >
                                        <UserPlusIcon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mb-1 sm:mb-2" />
                                        <span className="font-medium text-xs sm:text-sm text-center">Register Employer</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveAction('employers')}
                                        className="flex flex-col items-center p-3 sm:p-4 bg-[var(--employee-card-child2)] rounded-[8px] sm:rounded-[12px] border border-gray-200 hover:shadow-md transition"
                                    >
                                        <BuildingOfficeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-1 sm:mb-2" />
                                        <span className="font-medium text-xs sm:text-sm text-center">View Employers</span>
                                    </button>
                                               <button
                                        onClick={() => setActiveAction('employees')}
                                        className="flex flex-col items-center p-3 sm:p-4 bg-[var(--employee-card-child1)] rounded-[8px] sm:rounded-[12px] border border-gray-200 hover:shadow-md transition"
                                    >
                                        <UserPlusIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-1 sm:mb-2" />
                                        <span className="font-medium text-xs sm:text-sm text-center">Register Employee</span>
                                    </button>
                                                     <button
                                        onClick={() => setActiveAction('employers')}
                                        className="flex flex-col items-center p-3 sm:p-4 bg-[var(--employee-card-child2)] rounded-[8px] sm:rounded-[12px] border border-gray-200 hover:shadow-md transition"
                                    >
                                        <BuildingOfficeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-1 sm:mb-2" />
                                        <span className="font-medium text-xs sm:text-sm text-center">View Employees</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveAction('subscriptions')}
                                        className="flex flex-col items-center p-3 sm:p-4 bg-[var(--employee-card-child3)] rounded-[8px] sm:rounded-[12px] border border-gray-200 hover:shadow-md transition"
                                    >
                                        <CreditCardIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mb-1 sm:mb-2" />
                                        <span className="font-medium text-xs sm:text-sm text-center">Subscriptions</span>
                                    </button>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                                <StatCard
                                    title="Total Employers"
                                    value={mockStats.totalEmployers}
                                    icon={BuildingOfficeIcon}
                                    color="bg-linear-(--gradient-bg)"
                                    trend={{ positive: true, value: "+5 this month" }}
                                />
                                <StatCard
                                    title="Active Restaurants"
                                    value={mockStats.activeRestaurants}
                                    icon={UserGroupIcon}
                                    color="bg-green-500"
                                    trend={{ positive: true, value: "+8 this week" }}
                                />
                                <StatCard
                                    title="Active Subscriptions"
                                    value={mockStats.activeSubscriptions}
                                    icon={CreditCardIcon}
                                    color="bg-blue-500"
                                />
                                <StatCard
                                    title="Total Active Jobs"
                                    value={mockStats.activeJobs}
                                    icon={BriefcaseIcon}
                                    color="bg-purple-500"
                                />
                            </div>

                            {/* Recent Activity Overview */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                                {/* Incomplete Employers */}
                                <div className="bg-white rounded-[12px] sm:rounded-[16px] border-[1px] border-[var(--neutral-black)] p-4 sm:p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg sm:text-xl font-[AvenirNextBold]">Incomplete Employers</h2>
                                        <button
                                            onClick={() => setActiveAction('employers')}
                                            className="text-purple-600 hover:underline text-sm"
                                        >
                                            View All
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {mockEmployers.slice(0, 2).map((employer) => (
                                            <div key={employer.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="font-medium text-sm">{employer.restaurantName}</p>
                                                    <p className="text-xs text-[var(--secondary-text-color)]">{employer.name}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employer.subscriptionStatus)}`}>
                                                    {employer.subscriptionStatus}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Subscription Overview */}
                                <div className="bg-white rounded-[12px] sm:rounded-[16px] border-[1px] border-[var(--neutral-black)] p-4 sm:p-6">
                                    <h2 className="text-lg sm:text-xl font-[AvenirNextBold] mb-4">Subscription Overview</h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 sm:p-4 bg-green-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-sm sm:text-base">Active Subscriptions</p>
                                                <p className="text-xs sm:text-sm text-green-600">Revenue generating</p>
                                            </div>
                                            <p className="text-xl sm:text-2xl font-bold text-green-600">{mockStats.activeSubscriptions}</p>
                                        </div>
                                        <div className="flex justify-between items-center p-3 sm:p-4 bg-red-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-sm sm:text-base">Expired Subscriptions</p>
                                                <p className="text-xs sm:text-sm text-red-600">Need renewal</p>
                                            </div>
                                            <p className="text-xl sm:text-2xl font-bold text-red-600">{mockStats.totalSubscriptions - mockStats.activeSubscriptions}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        renderActionContent()
                    )}
                </div>
            </div>

            <AddRestaurentWithEmployer isOpen={showEmployerForm} onClose={() => setShowEmployerForm(false)} onSave={null} />

            {/* Role Change Confirmation Modal */}
            {showRoleChangeForm && selectedEmployee && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[12px] sm:rounded-[16px] w-full max-w-md">
                        <div className="p-4 sm:p-6">
                            <div className="flex justify-between items-center mb-4 sm:mb-6">
                                <h2 className="text-lg sm:text-xl font-[AvenirNextBold]">Promote to Employer</h2>
                                <button
                                    onClick={() => setShowRoleChangeForm(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <XCircleIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="mb-4 sm:mb-6">
                                <p className="text-[var(--secondary-text-color)] mb-4 text-sm sm:text-base">
                                    Are you sure you want to promote <strong>{selectedEmployee.name}</strong> to Employer role?
                                </p>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                                    <p className="text-sm text-yellow-800">
                                        This will give them access to employer features including posting jobs and managing applications.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setShowRoleChangeForm(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handlePromoteToEmployer(selectedEmployee.id)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                >
                                    Promote
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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

export default SuperAdminDashboard;