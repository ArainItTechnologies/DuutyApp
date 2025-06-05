import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAppState } from "../../hooks/Hooks";
import { changePassword } from "../../services/auth";
import { PrimaryButton } from "../custom/FormElements";
import { ROUTES } from "../../Constants";

const ChangePassword = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    }
  }, [user, navigate]);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {setIsLoading} = useAppState();
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirmation do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await changePassword(
        {
          email: user.email,
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        user.token
      );

      setIsLoading(false);
      setSuccess("Password updated successfully.");
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Change Password</h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <PrimaryButton type="submit">
          Change Password
        </PrimaryButton>
      </form>
    </section>
  );
};

export default ChangePassword;
