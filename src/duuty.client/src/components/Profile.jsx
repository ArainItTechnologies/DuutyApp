import React, { useState, useEffect } from "react";
import { Edit3, User, Phone, Mail, MapPin, Calendar, Clock, Award, CheckCircle } from "lucide-react";
import { FormInput, FormSelect, PrimaryButton, RoleMultiSelect } from "./custom/FormElements";
import SelectRole from "./user/SelectRole";
import { ROLE_OPTIONS, CHEF_OPTIONS } from "../Constants";
import { useNotification } from "../context/NotificationContext";
import { useAppState, useUser } from "../hooks/Hooks";
import userAPI from "../api/user";

// Profile View Component
const ProfileView = ({ profile, onEdit }) => {
  const getSelectedRoleObjects = () => {
    return ROLE_OPTIONS.filter((role) => profile.preferredRoles.includes(role.id));
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
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">{profile.location || "Not provided"}</p>
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

              {/* Preferred Role */}
              {profile.preferredRoles && profile.preferredRoles.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Role(s)</h3>
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Component
const Profile = () => {
  const { user } = useUser();
  const { showSuccess, showError } = useNotification();
  const { setIsLoading } = useAppState();

  const [isEditMode, setIsEditMode] = useState(false);
  const [roleOptions, setRoleOptions] = useState([{ id: "", name: "Select Role" }]);

  // Error states matching EmployeeRegister pattern
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    email: user?.email || "",
    experience: user?.experience || "",
    preferredRoles: user?.preferredRoles || [],
    location: user?.location || "",
    availability: user?.availability || "",
  });

  // Initialize role options with user's current role
  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      const data = await userAPI.fetchProfile(user?.userId, user?.token);
      setProfile(data);
      setIsLoading(false);
    };

    getProfile();
    if (user?.preferredRole && !roleOptions.some(option => option.id === user.preferredRole)) {
      setRoleOptions(prev => [...prev, { id: user.preferredRole, name: user.preferredRole }]);
    }
  }, [user, roleOptions, setIsLoading]);

  const experienceOptions = [
    { id: "", name: "Select Experience Level" },
    { id: "beginner", name: "Beginner (0-2 years)" },
    { id: "intermediate", name: "Intermediate (2-5 years)" },
    { id: "advanced", name: "Advanced (5+ years)" },
  ];

  const availabilityOptions = [
    { id: "", name: "Select Availability" },
    { id: "fullTime", name: "Full Time" },
    { id: "partTime", name: "Part Time" },
    { id: "weekends", name: "Weekends Only" },
    { id: "evenings", name: "Evenings Only" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user types - matching EmployeeRegister pattern
    if (name === "phone") setPhoneError("");
    if (name === "email") setEmailError("");
  };

  const handleRolesChange = (newRoles) => {
    setProfile((prev) => ({ ...prev, preferredRoles: newRoles }));
  };

  const validateForm = () => {
    let isValid = true;

    // Phone validation - matching EmployeeRegister pattern
    if (!profile.phone) {
      setPhoneError("Phone number is required");
      isValid = false;
    } else if (profile.phone.length < 10) {
      setPhoneError("Phone number must be at least 10 digits");
      isValid = false;
    }

    // Email validation - matching EmployeeRegister pattern
    if (!profile.email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      setEmailError("Email format is invalid");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await userAPI.updateProfile({
        fullName: profile.fullName,
        phone: profile.phone,
        email: profile.email,
        experience: profile.experience,
        location: profile.location,
        availability: profile.availability,
        preferredRoles: profile.preferredRoles,
      });

      setIsLoading(false);
      if (response.isSuccess) {
        showSuccess("Profile updated successfully!");
        setIsEditMode(false);
      } else {
        showError(response.message);
      }
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err?.response?.message || 
                          err?.message || 
                          err?.title || 
                          "Something went wrong";
      showError(errorMessage);
    }
  };

  const handleCancelEdit = () => {
    // Reset form to original user data
    setProfile({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      email: user?.email || "",
      experience: user?.experience || "",
      preferredRoles: user?.preferredRoles || [],
      location: user?.location || "",
      availability: user?.availability || "",
    });
    setPhoneError("");
    setEmailError("");
    setIsEditMode(false);
  };

  // If not in edit mode, show profile view
  if (!isEditMode) {
    return (
      <ProfileView
        profile={profile}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  // Edit mode - show form
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Update Your Profile
            </h2>
            <p className="mt-2 text-gray-600">
              Keep your information up to date
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Full Name"
                name="fullName"
                type="text"
                id="fullName"
                value={profile.fullName}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Mobile Number"
                name="phone"
                type="tel"
                id="phone"
                value={profile.phone}
                onChange={handleChange}
                error={phoneError}
                required
              />

              <FormInput
                label="Email Address"
                name="email"
                type="email"
                id="email"
                value={profile.email}
                onChange={handleChange}
                error={emailError}
                required
              />

              <FormInput
                label="Location"
                name="location"
                type="text"
                id="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="Mumbai, Delhi, Bangalore..."
                required
              />

              <FormSelect
                label="Experience Level"
                name="experience"
                required
                value={profile.experience}
                setValue={(value) => handleChange({ target: { name: 'experience', value } })}
                options={experienceOptions}
              />

              <FormSelect
                label="Availability"
                name="availability"
                required
                value={profile.availability}
                setValue={(value) => handleChange({ target: { name: 'availability', value } })}
                options={availabilityOptions}
              />

              <RoleMultiSelect
                label="Additional Skills (Optional)"
                selectedRoles={profile.preferredRoles}
                onChange={handleRolesChange}
                placeholder="Select additional skills..."
              />

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <PrimaryButton
                  type="submit"
                  disabled={!profile.fullName || !profile.phone || !profile.email}
                  className="flex-1"
                >
                  Update Profile
                </PrimaryButton>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;