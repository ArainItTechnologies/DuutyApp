import React, { useState, useEffect, useMemo } from "react";
import { Edit3, Building2, Phone, Mail, MapPin, Globe } from "lucide-react";
import { FormInput, FormTextArea, PrimaryButton } from "../custom/FormElements";
import { ROUTES } from "../../Constants";
import { useNotification } from "../../context/NotificationContext";
import { useAppState, useUser } from "../../hooks/Hooks";
import userAPI from "../../api/user";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { parseApiError } from "../../utils/ValidationUtils";
import { CloudArrowUpIcon, XCircleIcon } from "@heroicons/react/24/outline";
import EmployerProfileView from "./EmployerProfileView";

// Main Employer Profile Component
const EmployerProfile = () => {
  const { user } = useUser();
  const { userId } = useParams();
  const location = useLocation();
  const { showSuccess, showError } = useNotification();
  const { setIsLoading } = useAppState();
  const navigate = useNavigate();

  const profileUserId = useMemo(() => {
    return userId || user?.userId;
  }, [userId, user?.userId]);

  const [isEditMode, setIsEditMode] = useState(location.state?.isEditMode || false);

  // Error states
  const [phoneError, setPhoneError] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [profile, setProfile] = useState({
    organisationName: user?.organisationName || "",
    addressLine1: user?.addressLine1 || "",
    city: user?.city || "",
    state: user?.state || "",
    country: user?.country || "India",
    postCode: user?.postCode || "",
    telephone: user?.telephone || "",
    websiteUrl: user?.websiteUrl || "",
  });

  // Fetch profile data
  useEffect(() => {
    const getProfile = async () => {
      if (!profileUserId) return;
      
      setIsLoading(true);
      try {
        const data = await userAPI.fetchProfile(profileUserId, user?.token);
        setProfile(data);
      } catch (error) {
        const errorMessage = parseApiError(error);
        showError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [profileUserId, user?.token, setIsLoading, showError]);

  // Clear navigation state after using it
  useEffect(() => {
    if (location.state?.isEditMode) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user types
    if (name === "telephone") setPhoneError("");
    if (name === "websiteUrl") setWebsiteError("");
  };

  const validateForm = () => {
    let isValid = true;

    // Phone validation
    if (!profile.telephone) {
      setPhoneError("Telephone number is required");
      isValid = false;
    } else if (profile.telephone.length < 10) {
      setPhoneError("Telephone number must be at least 10 digits");
      isValid = false;
    }

    // Website URL validation
    if (profile.websiteUrl && profile.websiteUrl.trim()) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlPattern.test(profile.websiteUrl)) {
        setWebsiteError("Please enter a valid URL");
        isValid = false;
      }
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
        userId: profileUserId,
        organisationName: profile.organisationName,
        addressLine1: profile.addressLine1,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        postCode: profile.postCode,
        telephone: profile.telephone,
        websiteUrl: profile.websiteUrl,
      }, user?.token);

      if (response.success) {
        showSuccess("Profile updated successfully!");
        setIsEditMode(false);
      } else {
        showError(response.message);
      }
    } catch (err) {
      const errorMessage = parseApiError(err);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset form to original data
    setProfile({
      organisationName: user?.organisationName || "",
      addressLine1: user?.addressLine1 || "",
      city: user?.city || "",
      state: user?.state || "",
      country: user?.country || "India",
      postCode: user?.postCode || "",
      telephone: user?.telephone || "",
      websiteUrl: user?.websiteUrl || "",
    });
    setPhoneError("");
    setWebsiteError("");
    setIsEditMode(false);
  };

  // If not in edit mode, show profile view
  if (!isEditMode) {
    return (
      <EmployerProfileView
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
              Update Restaurant Profile
            </h2>
            <p className="mt-2 text-gray-600">
              Keep your restaurant information up to date
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Restaurant Name"
                name="organisationName"
                type="text"
                id="organisationName"
                value={profile.organisationName}
                onChange={handleChange}
                placeholder="Enter restaurant name"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="City"
                  name="city"
                  type="text"
                  id="city"
                  value={profile.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                />
                <FormInput
                  label="State"
                  name="state"
                  type="text"
                  id="state"
                  value={profile.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Country"
                  name="country"
                  type="text"
                  id="country"
                  value={profile.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  required
                />
                <FormInput
                  label="Pin Code"
                  name="postCode"
                  type="text"
                  id="postCode"
                  value={profile.postCode}
                  onChange={handleChange}
                  placeholder="Enter postcode"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Telephone Number"
                  name="telephone"
                  type="tel"
                  id="telephone"
                  value={profile.telephone}
                  onChange={handleChange}
                  placeholder="Enter telephone number"
                  error={phoneError}
                  required
                />
                <FormInput
                  label="Website URL"
                  name="websiteUrl"
                  type="url"
                  id="websiteUrl"
                  value={profile.websiteUrl}
                  onChange={handleChange}
                  placeholder="Enter website URL"
                  error={websiteError}
                />
              </div>

              <FormTextArea
                label="Address"
                name="addressLine1"
                id="addressLine1"
                value={profile.addressLine1}
                onChange={handleChange}
                placeholder="Enter restaurant address"
                required
              />

                            {/* File Upload Section */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Documents (Optional)
                </label>
                <p className="text-xs text-gray-500">
                  Only PDF, JPG, PNG files. Max size: 5MB each. Max 3 files.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  {/* Choose Files Button */}
                  <label htmlFor="fileInput" className="inline-block">
                    <span
                      className={`hover:bg-[#ECEFFF] text-[15px] text-[#3B31FF] font-medium inline-block rounded-[11px] px-[25px] py-[10px] border border-[#3B31FF] cursor-pointer transition-colors ${
                        uploadedFiles.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <CloudArrowUpIcon className="h-5 w-5 inline-block mr-2" />
                      {uploadedFiles.length === 0 ? 'Choose Files' : `Add More (${uploadedFiles.length}/3)`}
                      <input
                        id="fileInput"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        disabled={uploadedFiles.length >= 3}
                        onChange={(e) => {
                          let files = Array.from(e.target.files);
                          if (uploadedFiles.length + files.length > 3) {
                            showError("You can upload a maximum of 3 files.");
                            e.target.value = "";
                            return;
                          }
                          for (const file of files) {
                            if (file.size > 5 * 1024 * 1024) {
                              showError(`File ${file.name} exceeds 5MB.`);
                              e.target.value = "";
                              return;
                            }
                          }
                          setUploadedFiles(prev => [...prev, ...files].slice(0, 3));
                          e.target.value = "";
                        }}
                        className="hidden"
                      />
                    </span>
                  </label>

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="w-full mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</p>
                      <div className="flex flex-wrap gap-2">
                        {uploadedFiles.map((file, idx) => (
                          <span
                            key={(file.name || `document-${idx}`) + idx}
                            className="inline-flex items-center bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-200"
                          >
                            <span className="truncate max-w-[150px]">
                              {file.name || `Document ${idx + 1}`}
                            </span>
                            <button
                              type="button"
                              className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                              onClick={() => {
                                setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
                              }}
                              aria-label={`Remove ${file.name || `Document ${idx + 1}`}`}
                            >
                              <XCircleIcon className="h-4 w-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <PrimaryButton
                  type="submit"
                  disabled={!profile.organisationName || !profile.telephone || !profile.city || !profile.state}
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

export default EmployerProfile;