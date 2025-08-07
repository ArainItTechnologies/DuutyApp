import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState, useUser } from "../hooks/Hooks";
import { FormInput, FormTextArea, FormSelect } from "./custom/FormElements";
import { becomeEmployer } from "../services/auth";
import { CITIES, ROUTES, STATES } from "../Constants";
import { CloudArrowUpIcon, XCircleIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { useNotification } from "../context/NotificationContext";

const BecomeEmployer = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const { setIsLoading } = useAppState(false);

  const { user, setUser } = useUser();
  const [cityOptions] = useState([{ id: "", name: "Search a City" }, ...CITIES]);
  const [stateOptions] = useState([{ id: "", name: "Search a State" }, ...STATES]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [formData, setFormData] = useState({
    userId: user?.userId,
    organisationName: "",
    addressLine1: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({
    organisationName: false,
    addressLine1: false,
    city: false,
    state: false,
    country: false,
    postCode: false,
    telephone: false,
    websiteUrl: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    formData.city = city;
    formData.state = state;
    try {
      await becomeEmployer(formData, user.token);
    } catch (error) {
      setIsLoading(false);
      showError(error.message || "Failed to become an employer");
      return;
    }
    showSuccess("Successfully registered as an employer, you can now post jobs.");

    setIsLoading(false);
    setUser(null);
    navigate(ROUTES.LOGIN);
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary text-center">
        Become an Employer
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 space-y-6 max-w-xl mx-auto"
      >
        <div>
          <FormInput
            label={"Restaurant Name"}
            name="organisationName"
            value={formData.organisationName}
            onChange={handleChange}
            placeholder="Enter restaurant name"
            errors={errors.organisationName}
            errorMessage="Restaurant name is required"
            required />

          <FormTextArea
            label="Address Line 1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            required
            errors={errors.address}
            placeholder="Enter restaurant address"
            errorMessage="Address is required"
          />

          <div className="flex flex-wrap gap-3">
            <div className="w-full sm:w-[49%]">
              <FormSelect
                label="State"
                name="state"
                id="state"
                options={stateOptions}
                value={state}
                setValue={setState}
              />
            </div>
            <div className="w-full sm:w-[48%]">
              <FormSelect
                label="City"
                name="city"
                id="city"
                options={cityOptions}
                value={city}
                setValue={setCity}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="w-full sm:w-[49%]">
              <FormInput
                label="Country"
                name="country"
                placeholder="Enter Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full sm:w-[48%]">
              <FormInput
                label="Post Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Enter postcode"
                errors={errors.postalCode}
                errorMessage="Postcode is required"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="w-full sm:w-[49%]">
              <FormInput
                label="Telephone Number"
                name="telephone"
                type="tel"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Enter telephone number"
                errors={errors.telephone}
                errorMessage="Telephone number is required"
                required />

            </div>
            <div className="w-full sm:w-[48%]">
              <FormInput
                label={"Website URL"}
                name="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={handleChange}
                placeholder="Enter website URL"
                errors={errors.websiteUrl}
                errorMessage="Please enter a valid URL" />
            </div>
          </div>
        </div>
        <p className="w-full mt-1 text-xs text-gray-500">
          Only PDF, JPG, PNG files. Max size: 5MB each. Max 3 files.
        </p>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          {/* Choose Files Button */}
          <label htmlFor="fileInput" className="inline-block">
            <span
              className={`hover:bg-[#ECEFFF] text-[15px] text-[#3B31FF] font-medium inline-block rounded-[11px] px-[25px] py-[10px] border border-[#3B31FF] ${uploadedFiles.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
              tabIndex={0}
            >
              <CloudArrowUpIcon className="h-5 w-5 inline-block mr-2" /> Choose Files
              <input
                id="fileInput"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                disabled={uploadedFiles.length >= 3}
                onChange={(e) => {
                  let files = Array.from(e.target.files);
                  if (uploadedFiles.length + files.length > 3) {
                    alert("You can upload a maximum of 3 files.");
                    e.target.value = "";
                    return;
                  }
                  for (const file of files) {
                    if (file.size > 15 * 1024 * 1024) {
                      alert(`File ${file.name} exceeds 15MB.`);
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

          {/* Submit Button Right-Aligned */}
          <button
            type="submit"
            className="text-[15px] text-white font-medium inline-block rounded-[11px] bg-linear-(--gradient-bg) px-[25px] py-[10px]"
          >
            Become Employer <ChevronDoubleRightIcon className="h-5 w-5 inline-block ml-2" />
          </button>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="w-full mt-2">
              {uploadedFiles.map((file, idx) => (
                <span
                  key={file.name + idx}
                  className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2 text-xs"
                >
                  {file.name}
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
                    }}
                    aria-label={`Remove ${file.name}`}
                  >
                    <XCircleIcon className="h-4 w-4 inline-block cursor-pointer" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

      </form>
    </section>
  );
};

export default BecomeEmployer;
