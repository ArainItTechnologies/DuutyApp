import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoSrc from "../../assets/logo.svg";
import { loginUser } from "../../services/auth";
import { useUser } from "../../hooks/Hooks";
import { jwtDecode } from "jwt-decode";
import { normalizeClaims } from "../../utils/ClaimsUtility";
import FormInput from "../custom/FormInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/"; // fallback to home

  const { setUser } = useUser();

  const getUserDetailsFromToken = (token) => {
    const decoded = jwtDecode(token);
    var normalized = normalizeClaims(decoded);

    var role = Array.isArray(normalized.role)
      ? normalized.role
      : [normalized.role];
    return { name: normalized.name, email: normalized.email, role };
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await loginUser({ email, password });
    const userInfo = getUserDetailsFromToken(result.token);

    userInfo.token = result.token;

    setUser(userInfo);

    if (from === "/hire") {
      navigate("/job-listing", { replace: true });
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={LogoSrc}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <FormInput
              label="Mobile Number"
              name="phoneNumber"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormInput
              label="Email address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl sm:h-[50px] h-[40px] bg-white sm:p-3 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[16px] text-[14px]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
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
    </>
  );
};

export default Login;
