import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormInput, FormPasswordInput, FormSelect, PrimaryButton } from "../custom/FormElements";
import SelectRole from "../user/SelectRole";
import { CHEF_OPTIONS, ROUTES } from "../../Constants";
import { useAppState } from "../../hooks/Hooks";
import { validateMobileNumber, validateEmail } from "../../utils/ValidationUtils";
import publicAPI from "../../api/public";
import VerifyOtp from "./VerifyOtp";
import { useNotification } from "../../context/NotificationContext";

const EmployeeRegister = () => {
  const { setIsLoading } = useAppState();

  const { showSuccess, showError } = useNotification();

  const [showSelectRole, setShowSelectRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSubRole, setSelectedSubRole] = useState(null);
  const [roleOptions, setRoleOptions] = useState([{ id: "", name: "Select Role" }]);

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  const chefOptionsWithPlaceholder = [
    { id: "", name: "Select Sub Role" },
    ...CHEF_OPTIONS
  ];

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    preferredRole: "",
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
    setIsLoading(true);

    try {
      var response = await publicAPI.registerUser({
        fullName: formData.name,
        phoneNumber: formData.mobile,
        email: formData.email,
        preferredRole: selectedRole == "Chef" ? selectedSubRole : selectedRole,
        confirmPassword: formData.confirmPassword,
        password: formData.password,
      });

      setIsLoading(false);
      if (response.isSuccess) {
        showSuccess(
          "Registration successful! Please check your email for confirmation."
        );
        setIsVerifyOpen(true);
      } else {
        showError(response.message);
      }
    } catch (err) {
      setIsLoading(false);
      // Handle different error response formats
      const errorMessage = err?.response?.message || 
                          err?.message || 
                          err?.title || 
                          "Something went wrong";
      showError(errorMessage);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (!roleOptions.some((option) => option.id === role)) {
      setRoleOptions([...roleOptions, { id: role, name: role }]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="sm:space-y-6 space-y-4">
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

        <FormSelect
          label="Preferred Role"
          name="role"
          required
          value={selectedRole}
          setValue={setSelectedRole}
          onMouseDown={() => setShowSelectRole(true)}
          options={roleOptions}
        />

        {selectedRole === "Chef" && (
          <FormSelect
            label="Sub Role"
            name="subRole"
            required
            value={selectedSubRole}
            setValue={setSelectedSubRole}
            options={chefOptionsWithPlaceholder}
          />
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

        <PrimaryButton type="submit" disabled={emailError || phoneError || passwordError || confirmPasswordError || !formData.name || !selectedRole}>
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

      {showSelectRole && (
        <SelectRole
          onClose={() => setShowSelectRole(false)}
          onRoleSelect={handleRoleSelect}
          selectedRole={selectedRole}
        />
      )}

      {isVerifyOpen && (
        <VerifyOtp
          isOpen={isVerifyOpen}
          onClose={() => setIsVerifyOpen(false)}
          onVerify={async (otpCode) => {
            try {
              var response = await publicAPI.verifyOtp({ otp: otpCode, phoneNumber: formData.mobile, userEmail: formData.email });

              var isVerified = response?.isVerified;
              if (isVerified) {
                showSuccess("OTP verified successfully!");
              } else {
                showError("OTP verification failed. Please try again.");
                return;
              }
            } catch (err) {
              // Handle different error response formats
              const errorMessage = err?.response?.data?.message || 
                                  err?.message || 
                                  err?.title || 
                                  "OTP verification failed";
              showError(errorMessage);
              return;
            }

            navigate(ROUTES.PROFILE, { replace: true });
          }}
        />
      )}
    </div>
  );
};

export default EmployeeRegister;
