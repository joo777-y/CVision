import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiPost } from "../services/api";


export default function VerifyResetCode() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [countdown, setCountdown] = useState(30);

  const inputsRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();

    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    setCountdown(30);

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current);

          return 0;
        }

        return c - 1;
      });
    }, 1000);
  };

  const handleChange = (i, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const next = [...otp];

    next[i] = digit;

    setOtp(next);

    if (digit && i < 5) {
      inputsRef.current[i + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter the 6-digit code");

      return;
    }

    try {
      setLoading(true);
      setError("");

      await apiPost("/auth/verify-reset-code", {
        email,
        code,
        });

      navigate("/new-password", {
        state: {
          email,
          code,
        },
      });
    } catch (error) {
      error?.message || "Invalid verification code"
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await apiPost("/auth/forgot-password", {
        email,
        });

      setOtp(Array(6).fill(""));

      startTimer();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 mb-4 shadow-lg">
            🔐
          </div>

          <h1 className="text-3xl font-bold text-slate-800">Verify Code</h1>

          <p className="text-slate-500 text-sm mt-1">Enter the code sent to</p>

          <p className="text-indigo-600 font-semibold text-sm">{email}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100 p-8">
          <div className="flex justify-center gap-2 mb-5">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-11 h-12 text-center rounded-xl border border-slate-200 text-lg outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>

          <div className="text-center mt-5">
            {countdown > 0 ? (
              <span className="text-sm text-slate-400">
                Resend in {countdown}s
              </span>
            ) : (
              <button
                onClick={handleResend}
                className="text-indigo-600 text-sm font-semibold"
              >
                Resend Code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
