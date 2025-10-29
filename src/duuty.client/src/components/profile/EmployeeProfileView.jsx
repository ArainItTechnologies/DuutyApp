import { Edit3, User, Phone, Mail, MapPin, Calendar, Clock, Award, CheckCircle } from "lucide-react";
import { ALL_ROLE_OPTIONS } from "../../Constants";

// Profile View Component
const EmployeeProfileView = ({ profile, onEdit }) => {
  const getSelectedRoleObjects = () => {
    return ALL_ROLE_OPTIONS.filter((role) => profile.preferredRoles.includes(role.id));
  };

  const getExperienceLabel = (experience) => {
    const experienceMap = {
      "beginner": "Beginner (0-2 years)",
      "intermediate": "Intermediate (2-5 years)",
      "advanced": "Advanced (5+ years)"
    };
    return experienceMap[experience] || experience;
  };

  const getAvailabilityLabel = (availability) => {
    const availabilityMap = {
      "fullTime": "Full Time",
      "partTime": "Part Time",
      "weekends": "Weekends Only",
      "evenings": "Evenings Only"
    };
    return availabilityMap[availability] || availability;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                My Profile
              </h2>
              <p className="mt-2 text-gray-600">
                View and manage your profile information
              </p>
            </div>
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">{profile.fullName || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{profile.phone || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{profile.email || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Location{profile.locations && Array.isArray(profile.locations) && profile.locations.length > 1 ? 's' : ''}</p>
                      <p className="font-medium text-gray-900">
                        {profile.locations && Array.isArray(profile.locations)
                          ? profile.locations.length > 0
                            ? profile.locations.join(", ")
                            : "Not provided"
                          : profile.locations || "Not provided"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Experience Level</p>
                      <p className="font-medium text-gray-900">
                        {getExperienceLabel(profile.experience) || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Availability</p>
                      <p className="font-medium text-gray-900">
                        {getAvailabilityLabel(profile.availability) || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferred Roles */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Roles</h3>
                {profile.preferredRoles && profile.preferredRoles.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {getSelectedRoleObjects().map((role) => (
                      <div
                        key={role.id}
                        className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 border border-gray-200"
                      >
                        <img
                          src={role.image}
                          alt={role.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 text-sm truncate">
                            {role.name}
                          </h4>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-indigo-600" />
                      <span className="font-medium text-indigo-900">
                        No preferred roles selected
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileView;