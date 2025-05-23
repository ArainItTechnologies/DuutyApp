import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SelectRole from "../SelectRole";
import { registerUser } from "../../services/auth";

const EmployeeRegister = () => {
  const [showSelectRole, setShowSelectRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSubRole, setSelectedSubRole] = useState(null);
  const [roleOptions, setRoleOptions] = useState([
    { value: "chef", label: "Chef" },
  ]);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/";

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    preferredRole: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        phoneNumber: formData.mobile,
        email: formData.email,
        preferredRole: selectedRole == "chef" ? selectedSubRole : selectedRole,
        confirmPassword: formData.confirmPassword,
        password: formData.password,
      });

      setSuccess(
        "Registration successful! Please check your email for confirmation."
      );
      setError("");
      navigate(from); // Redirect to the previous page
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleDropdownClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSelectRole(true);
  };

  const handleCloseSelectRole = () => {
    setShowSelectRole(false);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (!roleOptions.some((option) => option.value === role)) {
      setRoleOptions([...roleOptions, { value: role, label: role }]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="sm:space-y-6 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm/6 font-medium text-(--secondary-text-color)"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              required
              onChange={handleChange}
              autoComplete="name"
              className="block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px]"
            />
          </div>
        </div>

        {!formData.email && (
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm/6 font-medium text-(--secondary-text-color)"
            >
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                onChange={handleChange}
                autoComplete="tel"
                className="block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px]"
              />
            </div>
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
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-(--secondary-text-color)"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                onChange={handleChange}
                className="block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px]"
              />
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="role"
            className="block text-sm/6 font-medium text-(--secondary-text-color)"
          >
            Select Role <span className="text-red-500">*</span>
          </label>
          <div className="mt-2 select-wrapper relative">
            <select
              className="appearance-none cursor-pointer block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px]"
              value={selectedRole || ""}
              onMouseDown={handleDropdownClick}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedRole === "chef" && (
          <div>
            <label
              htmlFor="subRole"
              className="block text-sm/6 font-medium text-(--secondary-text-color)"
            >
              Select Sub Role <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 select-wrapper relative">
              <select
                className="appearance-none cursor-pointer block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px]"
                value={selectedSubRole || ""}
                onChange={(e) => setSelectedSubRole(e.target.value)}
              >
                <option value="">Select Sub Role</option>
                <option value="Pastry Chef">Pastry Chef</option>
                <option value="Chef de partie">Chef de partie</option>
                <option value="Commis Chef">Commis Chef</option>
                <option value="Sous Chef">Sous Chef</option>
                <option value="Station Chef">Station Chef</option>
                <option value="Butcher Chef">Butcher Chef</option>
                <option value="Executive Chef">Executive Chef</option>
                <option value="Head Chef">Head Chef</option>
                <option value="Sauce Chef">Sauce Chef</option>
                <option value="Pantry chef">Pantry chef</option>
              </select>
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-(--secondary-text-color)"
            >
              Password <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="false"
              required
              onChange={handleChange}
              className="block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="confirmPassword"
              className="block text-sm/6 font-medium text-(--secondary-text-color)"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="mt-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="false"
              required
              onChange={handleChange}
              className="block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px]"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}
        <div>
          <button
            type="submit"
            className="cursor-pointer flex w-full justify-center rounded-xl sm:h-[50px] h-[40px] bg-linear-(--gradient-bg) sm:p-3 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </div>
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
          onClose={handleCloseSelectRole}
          onRoleSelect={handleRoleSelect}
          selectedRole={selectedRole}
        />
      )}
    </div>
  );
};

export default EmployeeRegister;
