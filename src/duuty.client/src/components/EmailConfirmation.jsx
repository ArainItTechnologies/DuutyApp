import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmEmail } from "../services/auth";
import Toast from "./custom/Toast";
import { useAppState } from "../hooks/Hooks";

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [confirmed, setConfirmed] = useState(false);
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const { isLoading, setIsLoading } = useAppState();

  useEffect(() => {
    if (userId && token) {
      setIsLoading(true);
      confirmEmail(userId, token)
        .then(() => {
          setIsLoading(false);
          setConfirmed(true);
        })
        .finally(() => setIsLoading(false));
      }
  }, [userId, token, setIsLoading]);

  return (
    <div className="p-4">
      {!isLoading && (
        <p className="text-center text-xl font-medium text-green-700">
          {confirmed ? (
            <Toast
              message="Email confirmed successfully!"
              success={confirmed}
            />
          ) : (
            <Toast message="Invalid confirmation link." success={confirmed} />
          )}
        </p>
      )}
    </div>
  );
};

export default EmailConfirmation;
