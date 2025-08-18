import { Link } from "react-router-dom";
import { useState } from "react";
import AddRestaurantModal from "../AddRestaurantModal";
import { registerUser, becomeEmployer } from "../../services/auth";
import { FormInput, FormPasswordInput, PrimaryButton } from "../custom/FormElements";
import { validateMobileNumber, validateEmail } from "../../utils/ValidationUtils";

const EmployerRegister = () => {

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

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

    if (name === 'mobile') {
      setPhoneError("");
      // Validate mobile number if value exists
      if (value && !validateMobileNumber(value)) {
        setPhoneError("Please enter a valid mobile number");
      }
    }

    if (name === 'email') {
      setEmailError("");
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address");
      }
    }

    if (name === 'password') {
      setPasswordError("");
      if (value && value.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
      }
    }

    if (name === 'confirmPassword') {
      setConfirmPasswordError("");
      if (value && value !== formData.password) {
        setConfirmPasswordError("Passwords do not match");
      }
    }
  };

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

          <div>
            <FormPasswordInput
              label="Password"
              name="password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required />
            {passwordError && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {passwordError}
              </p>
            )}
          </div>

          <div>
            <FormPasswordInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {confirmPasswordError && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {confirmPasswordError}
              </p>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <PrimaryButton type="submit" disabled={emailError || phoneError || passwordError || confirmPasswordError || !formData.name}>
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
