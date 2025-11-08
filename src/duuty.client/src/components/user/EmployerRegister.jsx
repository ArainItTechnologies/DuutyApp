import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AddRestaurantModal from "../AddRestaurantModal";
import { becomeEmployer } from "../../services/auth";
import { FormInput, FormPasswordInput, PrimaryButton } from "../custom/FormElements";
import { validateMobileNumber, validateEmail, parseApiError, validatePassword } from "../../utils/ValidationUtils";
import publicAPI from "../../api/public";
import { ROUTES } from "../../Constants";
import { useAppState } from "../../hooks/Hooks";
import { useNotification } from "../../context/NotificationContext";
import VerifyOtp from "./VerifyOtp";

const EmployerRegister = () => {

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  const navigate = useNavigate();
  const { setIsLoading } = useAppState();
  const { showError } = useNotification();

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

    if (name === 'phone') {
      setPhoneError("");
      // Validate phone number if value exists
      if (value && !validateMobileNumber(value)) {
        setPhoneError("Please enter a valid phone number");
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
      if (value) {
        const validation = validatePassword(value);
        if (!validation.isValid) {
          setPasswordError(validation.message);
        }
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
    setIsLoading(true);

    try {
      var response = await publicAPI.registerUser({
        fullName: formData.name,
        phoneNumber: formData.phone,
        email: formData.email,
        confirmPassword: formData.confirmPassword,
        password: formData.password,
        isEmployer: true,
      });

      setIsLoading(false);
      if (response.isSuccess) {
        setIsVerifyOpen(true);
      } else {
        showError(response.message);
      }
    } catch (err) {
      setIsLoading(false);
      const errorMessage = parseApiError(err);
      showError(errorMessage);
      return;
    }
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Organisation Name"
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
                label="Phone Number"
                name="phone"
                type="tel"
                id="phone"
                placeholder={"+918745478962"}
                value={formData.phone}
                onChange={handleChange}
                required />
              {phoneError && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {phoneError}
                </p>
              )}
            </div>
          )}

          {!formData.phone && !formData.email && (
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-gray-600">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
          )}

          {!formData.phone && (
            <div>
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={"example@duuty.in"}
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

        {isVerifyOpen && (
        <VerifyOtp
          isOpen={isVerifyOpen}
          onClose={() => setIsVerifyOpen(false)}
          onVerify={async (otpCode) => {
            try {
              var response = await publicAPI.verifyOtp({ otp: otpCode, phoneNumber: formData.phone, userEmail: formData.email });

              if (response?.isVerified && response?.userId) {
                const profileUrl = ROUTES.EMPLOYER_PROFILE.replace(':userId', response.userId);
                navigate(profileUrl, { state: { isEditMode: true } });
              } else {
                showError("OTP verification failed. Please try again.");
                return;
              }
            } catch (err) {
              // Handle different error response formats
              setIsLoading(false);
              const errorMessage = parseApiError(err);
              showError(errorMessage);
              return;
            }
          }}
        />
      )}
      </div>
    </>
  );
};

export default EmployerRegister;
