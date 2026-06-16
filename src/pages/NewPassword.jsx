import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiPost } from "../services/api";
import toast from "react-hot-toast";


export default function NewPassword() {
  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const code = location.state?.code;

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

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

      await apiPost("/auth/reset-password", {
        email,
        code,
        newPassword,
      });

      toast.success("Password reset successfully");

      navigate("/login-page");
    } catch (error) {
      error?.message || "Failed to reset password"
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 mb-4 shadow-lg">
            🔑
          </div>

          <h1 className="text-3xl font-bold text-slate-800">New Password</h1>

          <p className="text-slate-500 text-sm mt-1">
            Create your new password
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100 p-8">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            New Password
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 mb-4"
          />

          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 mb-4"
          />

          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
