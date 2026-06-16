import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await apiPost("/auth/forgot-password", {
        email,
      });

      navigate("/verify-reset-code", {
        state: { email },
      });
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 mb-4 shadow-lg">
            📧
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Forgot Password
          </h1>

          <p className="text-slate-500 text-sm mt-1">
            Enter your email to receive a reset code
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100 p-8">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-red-600 text-sm">
              {error}
            </div>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 mb-4"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </div>
      </div>
    </div>
  );
}