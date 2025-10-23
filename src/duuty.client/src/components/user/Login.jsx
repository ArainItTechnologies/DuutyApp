import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import publicAPI from "../../api/public";
import { useAppState, useUser } from "../../hooks/Hooks";
import { jwtDecode } from "jwt-decode";
import { normalizeClaims } from "../../utils/ClaimsUtility";
import {
  FormInput,
  FormPasswordInput,
  PrimaryButton,
} from "../custom/FormElements";
import { ROUTES } from "../../Constants";
import {
  validateMobileNumber,
  validateEmail,
} from "../../utils/ValidationUtils";
import VerifyOtp from "./VerifyOtp";
import { useNotification } from "../../context/NotificationContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { setIsLoading } = useAppState();

  const from = location.state?.from || ROUTES.HOME;

  const { setUser } = useUser();

  const { showSuccess, showError } = useNotification();

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setPhoneError("");

    if (value && !validateMobileNumber(value)) {
      setPhoneError("Please enter a valid mobile number");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError("");

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    }
  };

  const getUserDetailsFromToken = (token) => {
    const decoded = jwtDecode(token);
    const normalized = normalizeClaims(decoded);
    return { ...normalized };
  };

  const handleResendOtp = async () => {
    try {
      await publicAPI.resendOtp(email, phoneNumber);
    } catch (error) {
      showError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await publicAPI.loginUser({
        phoneNumber,
        email,
        password,
      });

      var data = result.data;
      if (data.success) {
        const userInfo = getUserDetailsFromToken(data.token);
        userInfo.token = data.token;
        userInfo.userId = data.userId;

        setUser(userInfo);
        setIsLoading(false);
        navigate(ROUTES.HOME, { replace: true });
      } else {
        setIsLoading(false);
        setIsVerifyOpen(data.requiresOtp);
      }
    } catch (error) {
      setIsLoading(false);
      showError(error.errorMessage);
    }
  };

  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-1 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="sm:space-y-6 space-y-4">
            {!email && (
              <div>
                <FormInput
                  label="Mobile Number"
                  name="phoneNumber"
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                />
                {phoneError && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {phoneError}
                  </p>
                )}
              </div>
            )}

            {!phoneNumber && !email && (
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-600">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
            )}

            {!phoneNumber && (
              <div>
                <FormInput
                  label="Email address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {emailError}
                  </p>
                )}
              </div>
            )}

            <FormPasswordInput
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              forgotPassword
              autoComplete="current-password"
            />

            <PrimaryButton
              type="submit"
              disabled={phoneError || emailError || !password}
            >
              Sign in
            </PrimaryButton>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            New to Duuty?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
      {isVerifyOpen && (
        <VerifyOtp
          isOpen={isVerifyOpen}
          onClose={() => setIsVerifyOpen(false)}
          handleResend={handleResendOtp}
          onVerify={async (otpCode) => {
            try {
              await publicAPI.verifyOtp({
                otp: otpCode,
                phoneNumber,
                userEmail: email,
              });
              showSuccess("OTP verified successfully!, Login now.");
            } catch (err) {
              showError(err.message || "OTP verification failed");
              return;
            }

            navigate(ROUTES.LOGIN, { replace: true });
          }}
        />
      )}
    </section>
  );
};

export default Login;
