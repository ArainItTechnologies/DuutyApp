import { useState } from "react";
import EmployeeRegister from "./EmployeeRegister";
import EmployerRegister from "./EmployerRegister";

const RegisterTabbed = () => {
  const [activeTab, setActiveTab] = useState("employeeForm");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-[700px] lg:max-w-[600px]">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-4">
          Create Account
        </h2>
        <div className="bg-white rounded-[20px] border border-[#F2F4FF] shadow-[0_2px_24px_0_#4D598E0F] flex min-h-full flex-1 flex-col justify-center p-5">
          {/* Tabs */}
          <div className="flex rounded-[12px] border border-[#ECEFFF]">
            <button
              className={`cursor-pointer p-3 w-1/2 sm:text-[17px] text-[15px] rounded-[12px] ${
                activeTab === "employeeForm"
                  ? "bg-[#EDEBFF] text-[#3C31FF] font-medium"
                  : "text-(--secondary-text-color) font-normal"
              }`}
              onClick={() => setActiveTab("employeeForm")}
            >
              Employee
            </button>
            <button
              className={`cursor-pointer p-3 w-1/2 sm:text-[17px] text-[15px] rounded-[12px] ${
                activeTab === "employerForm"
                  ? "bg-[#EDEBFF] text-[#3C31FF] font-medium"
                  : "text-(--secondary-text-color) font-normal"
              }`}
              onClick={() => {
                setActiveTab("employerForm");
              }}
            >
              Employer
            </button>
          </div>

          {/* Forms */}
          <div className="mt-4">
            {activeTab === "employeeForm" && <EmployeeRegister />}

            {activeTab === "employerForm" && <EmployerRegister />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTabbed;
