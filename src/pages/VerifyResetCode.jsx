import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function VerifyResetCode() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [countdown, setCount] = useState(30);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();

    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    setCount(30);

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }

        return c - 1;
      });
    }, 1000);
  };

  const handleChange = (i, val) => {
    const digit = val.replace(/\D/g, "").slice(-1);

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

      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify-reset-code`,
        {
          email,
          code,
        }
      );

      navigate("/new-password", {
        state: {
          email,
          code,
        },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid verification code"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        { email }
      );

      startTimer();
      setOtp(Array(6).fill(""));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">
            Verify Reset Code
          </h1>

          <p className="text-slate-500 mt-2">
            Enter the code sent to
          </p>

          <p className="text-indigo-600 font-semibold">
            {email}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                value={digit}
                maxLength={1}
                onChange={(e) =>
                  handleChange(i, e.target.value)
                }
                className="w-11 h-12 text-center border rounded-xl"
              />
            ))}
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>

          <div className="text-center mt-4">
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