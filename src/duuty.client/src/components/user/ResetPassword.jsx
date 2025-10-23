import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import publicAPI from "../../api/public";
import { FormPasswordInput, PrimaryButton } from "../custom/FormElements";
import { ROUTES } from "../../Constants";
import { useNotification } from "../../context/NotificationContext";
import { useAppState } from "../../hooks/Hooks";

const ResetPassword = () => {
    const { showSuccess, showError } = useNotification();
    const { setIsLoading } = useAppState(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (!userId || !token) {
            showError('Invalid reset password link');
            navigate(ROUTES.HOME);
        }
    }, [userId, token, navigate, showError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'newPassword') {
            setPasswordError("");
            if (value && value.length < 8) {
                setPasswordError("Password must be at least 8 characters long");
            }
        }

        if (name === 'confirmPassword') {
            setConfirmPasswordError("");
            if (value && value !== formData.newPassword) {
                setConfirmPasswordError("Passwords do not match");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const resetPasswordData = {
                userId: userId,
                token: token,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            };

            const response = await publicAPI.resetPassword(resetPasswordData);
            
            if (response.isSuccess) {
                showSuccess('Password reset successfully! You can now login with your new password.');
                navigate(ROUTES.LOGIN);
            } else {
                showError(response.message || 'Failed to reset password. Please try again.');
            }
        } catch (error) {
            showError(error.message || 'Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-1 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Forgot your password?
                </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <FormPasswordInput
                            label="New Password"
                            name="newPassword"
                            type="password"
                            id="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required />
                        {passwordError && (
                            <p className="mt-1 text-sm text-red-600" role="alert">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    <div>
                        <FormPasswordInput
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {confirmPasswordError && (
                            <p className="mt-1 text-sm text-red-600" role="alert">
                                {confirmPasswordError}
                            </p>
                        )}
                    </div>
                    <PrimaryButton type="submit">
                        Reset Password
                    </PrimaryButton>"
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;