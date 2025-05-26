import { Link } from "react-router-dom";
import { useState } from "react";
import AddRestaurantModal from "../AddRestaurantModal";
import { registerUser, becomeEmployer } from "../../services/auth";
import { FormInput, FormPasswordInput, PrimaryButton } from "../custom/FormElements";

const EmployerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        phoneNumber: formData.phone,
        email: formData.email,
        confirmPassword: formData.confirmPassword,
        password: formData.password,
        isEmployer: true,
      });

      setSuccess(
        "Registration successful! Please check your email for confirmation."
      );
      setError("");
      setIsModalOpen(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleSaveRestaurant = async (restaurantData) => {

    console.log(restaurantData);
    try {
      await becomeEmployer(restaurantData);
      setIsModalOpen(false);
      setSuccess("Restaurant added successfully!");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Full Name"
            name="name"
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {!formData.email && (
            <FormInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required />
          )}

          {!formData.mobile && !formData.email && (
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-gray-600">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
          )}

          {!formData.mobile && (
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          )}

          <FormPasswordInput
            label="Password"
            name="password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required />

          <FormPasswordInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          <PrimaryButton type="submit">
            Sign Up
          </PrimaryButton>
          <p className="mt-6 text-center text-sm/6 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold link-font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>

      <AddRestaurantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveRestaurant} />
    </>
  );
};

export default EmployerRegister;
