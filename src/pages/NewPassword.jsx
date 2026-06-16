import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function NewPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const code = location.state?.code;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          email,
          code,
          newPassword,
        }
      );

      alert("Password reset successfully");

      navigate("/login-page");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">
            Create New Password
          </h1>

          <p className="text-slate-500 mt-2">
            Enter your new password
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="w-full px-4 py-3 border rounded-xl mb-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full px-4 py-3 border rounded-xl mb-4"
          />

          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
}