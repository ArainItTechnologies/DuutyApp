import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../../services/auth";
import Toast from "../custom/Toast";
import { FormInput, PrimaryButton } from "../custom/FormElements";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [success, setSuccess] = useState(true);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setToastMessage("Reset link sent to your email!");
      setSuccess(true);
    } catch {
      setToastMessage("Failed to send reset link.");
      setSuccess(false);
    } finally {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-1 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Forgot your password?
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleReset} className="space-y-6">
            <FormInput 
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              />
            <PrimaryButton type="submit">
              Send Reset Link
            </PrimaryButton>"
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Remembered your password?{" "}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Back to login
            </Link>
          </p>
        </div>
      </div>

      {showToast && <Toast message={toastMessage} success={success} />}
    </>
  );
};

export default ForgotPassword;