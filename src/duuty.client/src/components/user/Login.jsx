import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";
import { useAppState, useUser } from "../../hooks/Hooks";
import { jwtDecode } from "jwt-decode";
import { normalizeClaims } from "../../utils/ClaimsUtility";
import { FormInput, FormPasswordInput, PrimaryButton } from "../custom/FormElements";
import { ROUTES } from "../../Constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { setIsLoading } = useAppState();
  
  const from = location.state?.from || "/";

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
    setIsLoading(true);
    const result = await loginUser({ phoneNumber, email, password });
    const userInfo = getUserDetailsFromToken(result.token);

    userInfo.token = result.token;
    userInfo.userId = result.userId;

    setUser(userInfo);
    setIsLoading(false);

    if (from === ROUTES.HIRE_NOW) {
      navigate(ROUTES.JOB_LISTING, { replace: true });
    } else {
      navigate(from, { replace: true });
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
            {!email && <FormInput
              label="Mobile Number"
              name="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            }

            {!phoneNumber && !email && <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-gray-600">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>}

            {!phoneNumber && <FormInput
              label="Email address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />}

            <FormPasswordInput
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              forgotPassword
              autoComplete="current-password" />

            <PrimaryButton type="submit">
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
    </section>
  );
};

export default Login;
