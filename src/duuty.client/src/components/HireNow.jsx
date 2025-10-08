import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ArrowLeftIcon, CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/Hooks";
import { ROUTES, CITIES, STATES } from "../Constants";
import { FormInput, FormSelect, FormTextArea, PrimaryButton } from "./custom/FormElements";
import employerAPI from "../api/employer";

const HireNow = () => {
  const [locationOptions] = useState([{ id: "", name: "Select City" }, ...CITIES]);
  const [stateOptions] = useState([{ id: "", name: "Select State" }, ...STATES]);

  const [jobLocation, setJobLocation] = useState("");
  const [state, setState] = useState("");

  const navigate = useNavigate();
  const { user, isAdmin, isEmployer, isEmployee } = useUser();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    state: "",
    experience: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
  });

  const location = useLocation();

  const [jobRole, setJobRole] = useState(location.state?.title);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
    } else if (!isAdmin && !isEmployer && isEmployee) {
      navigate(ROUTES.BECOME_EMPLOYER, { state: { from: location.pathname } });
    }
  }, [navigate, user, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!jobRole.trim()) newErrors.title = "Job title is required";
    if (!jobLocation.trim()) newErrors.location = "Location is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!formData.experience.trim())
      newErrors.experience = "Experience is required";
    if (!formData.description.trim())
      newErrors.description = "Job description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const jobData = {
        userId: user?.userId,
        jobTitle: jobRole,
        jobDescription: formData.description,
        jobLocation: jobLocation,
        jobState: state,
        experience: formData.experience,
        salaryRange: formData.salary,
        requirements: formData.requirements,
        benefits: formData.benefits,
      };

      await employerAPI.postJob(jobData, user.token);

      // Show success dialog
      setShowSuccessDialog(true);

      // Reset form
      setFormData({
        title: "",
        location: "",
        state: "",
        jobType: "full-time",
        experience: "",
        salary: "",
        description: "",
        requirements: "",
        benefits: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
      setJobRole("");
    }
  };

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <div className="bg-[#f4f2ff] min-h-screen py-12 px-4">
      <div className="container-wrapper mx-auto">
        <h1 className="text-2xl font-semibold mb-2 text-left flex">
          <button
            className="cursor-pointer flex items-center text-gray-700 hover:text-indigo-600"
            onClick={() => navigate("/job-listing")}
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
          </button>{" "}
          Post a New Job</h1>

        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <FormInput
              label="Job Title"
              name="title"
              type="text"
              id="title"
              value={jobRole}
              required
            />

            <FormInput
              label="Experience Required"
              name="experience"
              type="text"
              id="experience"
              placeholder={"e.g. 2+ years"}
              value={formData.experience}
              onChange={handleChange}
              errors={errors.experience}
              errorMessage={errors.experience}
              required
            />

            <FormSelect
              label="Job Location"
              name="location"
              id="location"
              options={locationOptions}
              value={jobLocation}
              setValue={setJobLocation}
              errors={errors.location}
              errorMessage={errors.location}
              required />

            <FormSelect
              label="State"
              name="state"
              id="state"
              options={stateOptions}
              value={state}
              setValue={setState}
              errors={errors.state}
              errorMessage={errors.state}
              required
            />

            <FormInput
              label="Salary Range"
              name="salary"
              type="text"
              id="salary"
              placeholder="e.g. ₹25,000 - ₹35,000 per month"
              value={formData.salary}
              onChange={handleChange}
              errors={errors.salary}
              errorMessage={errors.salary}
              required
            />
          </div>

          <FormTextArea
            label="Job Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            errors={errors.description}
            errorMessage={errors.description}
            rows={5}
            placeholder="Describe the role, responsibilities, and expectations..."
          />

          <FormTextArea
            label="Job Requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={4}
            placeholder="List skills, qualifications, and other requirements..."
          />

          <FormTextArea
            label="Benefits and Perks"
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            rows={3}
            placeholder="List benefits, perks, and additional offerings..."
          />

          <PrimaryButton type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Posting Job...
              </>
            ) : (
              "Post Job"
            )}
          </PrimaryButton>
        </form>

        {/* Success Dialog */}
        <Dialog
          open={showSuccessDialog}
          onClose={closeSuccessDialog}
          className="relative z-50"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <DialogPanel
                transition
                className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Job Posted Successfully!
                  </h3>
                  <button
                    onClick={closeSuccessDialog}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 flex items-center">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                  <p className="text-sm text-gray-500">
                    Your job has been posted successfully and is now live!
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={closeSuccessDialog}
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Great, thanks!
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default HireNow;
