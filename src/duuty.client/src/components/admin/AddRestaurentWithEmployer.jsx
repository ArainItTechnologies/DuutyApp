import { useState } from "react";
import { FormInput, FormTextArea, FormSelect } from "../custom/FormElements";
import { CITIES, STATES } from "../../Constants";
import { useUser } from "../../hooks/Hooks";
import { CloudArrowUpIcon, XCircleIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";


const AddRestaurentWithEmployer = ({ isOpen, onClose, onSave }) => {
    const [cityOptions] = useState([{ id: "", name: "Search a City" }, ...CITIES]);
    const [stateOptions] = useState([{ id: "", name: "Search a State" }, ...STATES]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [formData, setFormData] = useState({
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
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: false,
            });
        }
    };

    const validateForm = () => {
        const newErrors = {
            organisationName: !formData.organisationName.trim(),
            address: !formData.addressLine1?.trim(),
            postCode: !formData.postCode?.trim(),
            telephone: !formData.telephone?.trim(),
            websiteUrl: formData.websiteUrl?.trim()
                ? !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
                    formData.websiteUrl
                )
                : false,
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSave(formData);
            onClose();
            // Reset form after submission
            setFormData({
                organisationName: "",
                addressLine1: "",
                city: "",
                state: "",
                country: "India",
                postCode: "",
                telephone: "",
                websiteUrl: "",
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                {/* Modal Header */}
                <div className="bg-linear-(--gradient-bg) text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Add Restaurant</h3>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="py-4">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 space-y-6 max-w-xl mx-auto"
                    >
                        <div>
                            {!formData.email && (
                                <div>
                                    <FormInput
                                        label="Mobile Number"
                                        name="mobile"
                                        type="tel"
                                        id="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required />
                                    {phoneError && (
                                        <p className="mt-1 text-sm text-red-600" role="alert">
                                            {phoneError}
                                        </p>
                                    )}
                                </div>
                            )}

                            {!formData.mobile && !formData.email && (
                                <div className="flex items-center my-4">
                                    <hr className="flex-grow border-t border-gray-300" />
                                    <span className="mx-4 text-gray-600">OR</span>
                                    <hr className="flex-grow border-t border-gray-300" />
                                </div>
                            )}

                            {!formData.mobile && (
                                <div>
                                    <FormInput
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {emailError && (
                                        <p className="mt-1 text-sm text-red-600" role="alert">
                                            {emailError}
                                        </p>
                                    )}
                                </div>
                            )}
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

                    {/* Modal Footer */}
                    <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between">
                        <button
                            onClick={onClose}
                            className="cursor-pointer text-[15px] text-gray-700 font-medium inline-block rounded-[11px] border-2 border-gray-300 px-[25px] py-[10px] hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="cursor-pointer text-[15px] text-white font-medium inline-block rounded-[11px] bg-linear-(--gradient-bg) px-[25px] py-[10px] mr-[12px]"
                        >
                            Save Restaurant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRestaurentWithEmployer;
