import { Edit3, Building2, Phone, Mail, MapPin, Globe } from "lucide-react";

const EmployerProfileView = ({ profile, onEdit }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Restaurant Profile
              </h2>
              <p className="mt-2 text-gray-600">
                View and manage your restaurant information
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
                  <Building2 className="w-5 h-5" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Restaurant Name</p>
                      <p className="font-medium text-gray-900">{profile.fullName || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Telephone</p>
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
                    <Globe className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <p className="font-medium text-gray-900">
                        {profile.websiteUrl ? (
                          <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                            {profile.websiteUrl}
                          </a>
                        ) : "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">City</p>
                      <p className="font-medium text-gray-900">{profile.city || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">State</p>
                      <p className="font-medium text-gray-900">{profile.state || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium text-gray-900">{profile.country || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Pin Code</p>
                      <p className="font-medium text-gray-900">{profile.postCode || profile.postalCode || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Full Address</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">
                    {[profile.addressLine1, profile.city, profile.state]
                      .filter(Boolean)
                      .join(', ') || "Address not provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileView;