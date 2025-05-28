import { useState } from "react";
import { FormInput, FormTextArea } from "./custom/FormElements";

const AddRestaurantModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    organisationName: "",
    addressLine1: "",
    city: "",
    state: "",
    country: "India",
    postCode: "",
    telephone: "",
    website: "",
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
          formData.website
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
          <div className="px-6">
          <FormInput
            label={"Restaurant Name"}
            name="organisationName"
            value={formData.organisationName}
            onChange={handleChange}
            placeholder="Enter restaurant name"
            errors={errors.organisationName}
            errorMessage="Restaurant name is required"
            required />

          <FormInput
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />
          <FormInput
            label="State"
            name="state"
            value={formData.state}
            placeholder="Enter State"
            onChange={handleChange}
            required
          />
          <FormInput
            label="Country"
            name="country"
            placeholder="Enter Country"
            value={formData.country}
            onChange={handleChange}
            required
          />

          <FormInput
            label={"Website URL"}
            name="websiteUrl"
            type="url"
            value={formData.websiteUrl}
            onChange={handleChange}
            placeholder="Enter website URL"
            errors={errors.websiteUrl}
            errorMessage="Please enter a valid URL" />

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

          <FormInput
            label="Pin Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Enter postcode"
            errors={errors.postalCode}
            errorMessage="Postcode is required"
            required
          />
          </div>

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

export default AddRestaurantModal;
