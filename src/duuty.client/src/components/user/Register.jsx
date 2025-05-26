import { useState } from "react";
import RegistrationTabs from "./RegistrationTabs";

const Register = () => {
  const [activeTab, setActiveTab] = useState("employeeForm");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-[700px] lg:max-w-[600px]">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-4">
          Create Account
        </h2>
        <RegistrationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default Register;
