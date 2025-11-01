import { useState } from "react";
import { FormInput, CustomButton } from "../custom/FormElements";
import {
    CheckCircleIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";

const VerifyOtp = ({ isOpen, onClose, onVerify, handleResend }) => {

    const [otpCode, setOtpCode] = useState("");
    const handleSubmit = async () => {
        try {
            await onVerify(otpCode);
            setOtpCode("");
            onClose();
        } catch (error) {
            // Don't close modal or clear OTP if verification fails
            console.error("OTP verification failed:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                {/* Modal Header */}
                <div className="bg-linear-(--gradient-bg) text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Verify OTP</h3>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="py-4">
                    <div className="px-6">
                        <FormInput
                            label={"Otp Code"}
                            name="otpCode"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="Enter OTP code"
                            errorMessage="OTP code is required"
                            required />
                    </div>

                    {/* Modal Footer */}
                    <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between">
                        <CustomButton
                            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                            onClick={handleResend}>
                            <ArrowPathIcon className="w-5 h-5 text-black" />
                            <span className="ml-1">Resend</span>
                        </CustomButton>
                        <CustomButton
                            className="cursor-pointer flex items-center justify-center p-3 rounded-[11px] bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                            onClick={handleSubmit}
                        >
                            <CheckCircleIcon className="w-5 h-5 text-white" />
                            <span className="ml-1">Verify</span>
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
