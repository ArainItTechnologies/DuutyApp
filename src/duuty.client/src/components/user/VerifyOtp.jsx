import { useState } from "react";
import { FormInput } from "../custom/FormElements";

const VerifyOtp = ({ isOpen, onClose, onVerify }) => {

    const [otpCode, setOtpCode] = useState("");
    const handleSubmit = () => {
        onVerify(otpCode);
        onClose();
        setOtpCode("");
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
                        <button
                            onClick={onClose}
                            className="cursor-pointer text-[15px] text-gray-700 font-medium inline-block rounded-[11px] border-2 border-gray-300 px-[25px] py-[10px] hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="cursor-pointer text-[15px] text-white font-medium inline-block rounded-[11px] bg-linear-(--gradient-bg) px-[25px] py-[10px] mr-[12px]"
                        >
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
