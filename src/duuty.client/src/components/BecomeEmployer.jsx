import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/Hooks";
import { FormInput, FormTextArea } from "./custom/FormElements";
import { becomeEmployer } from "../services/auth";

const BecomeEmployer = () => {
  const navigate = useNavigate();
  const { user } = useUser();
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
    await becomeEmployer(formData, user.token);

    navigate("/hire");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary text-center">
        Become an Employer
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-6 max-w-xl mx-auto"
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

          <FormInput
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />
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
            label="Telephone Number"
            name="telephone"
            type="tel"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Enter telephone number"
            errors={errors.telephone}
            errorMessage="Telephone number is required"
            required />

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

        <div>
          <button
            type="submit"
            className="w-full text-[15px] text-white font-medium inline-block rounded-[11px] bg-linear-(--gradient-bg) px-[25px] py-[10px] mr-[12px]"
          >
            Become Employer
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomeEmployer;
