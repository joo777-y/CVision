import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
 
// ─── OTP VERIFICATION PAGE ─────────────────────────────────────────────────────
// Shown after registration. Receives { email } via router state.
// Connect backend by uncommenting the fetch calls below.
 
export default function Page() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const email     = location.state?.email || "your email";
 
  const [otp, setOtp]         = useState(Array(6).fill(""));
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCount] = useState(30);
  const inputsRef = useRef([]);
  const timerRef  = useRef(null);
 
  // Start countdown on mount
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);
 
  const startTimer = () => {
    setCount(30);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCount(c => {
        if (c <= 1) { clearInterval(timerRef.current); return 0; }
        return c - 1;
      });
    }, 1000);
  };
 
  // ── OTP box handlers ────────────────────────────────────────────────────────
  const handleChange = (i, val) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next  = [...otp];
    next[i] = digit;
    setOtp(next);
    setError("");
    if (digit && i < 5) inputsRef.current[i + 1]?.focus();
  };
 
  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft"  && i > 0) inputsRef.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) inputsRef.current[i + 1]?.focus();
  };
 
  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    const next = Array(6).fill("");
    digits.forEach((d, i) => { next[i] = d; });
    setOtp(next);
    inputsRef.current[Math.min(digits.length, 5)]?.focus();
  };
 
  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter all 6 digits."); return; }
 
    setLoading(true);
    setError("");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify-email`,
        {
            email,
            code,
        }
        );

        navigate("/login-page");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Incorrect code. Please try again."
        );
      setOtp(Array(6).fill(""));
      setTimeout(() => inputsRef.current[0]?.focus(), 50);
    } finally {
      setLoading(false);
    }
  };
 
  // ── Resend ──────────────────────────────────────────────────────────────────
  const handleResend = async () => {
    try {
      // await fetch("/api/auth/send-otp", { method: "POST", body: JSON.stringify({ email }) });
      await new Promise(r => setTimeout(r, 400));
      setOtp(Array(6).fill(""));
      setError("");
      startTimer();
      inputsRef.current[0]?.focus();
    } catch { /* handle silently */ }
  };
 
  const isComplete = otp.every(d => d !== "");
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-sm">
 
        {/* Header */}
        <div className="text-center mb-8">
          {/* Mail icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 mb-5 shadow-lg shadow-indigo-200 relative">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            {/* Green dot */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
          </div>
 
          <h1 className="text-2xl font-bold text-slate-800">Check your email</h1>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-indigo-600 font-semibold text-sm mt-0.5 truncate px-4">{email}</p>
        </div>
 
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100 px-8 py-8">
 
          <p className="text-xs text-slate-400 text-center mb-5 leading-relaxed">
            Enter the code below. It expires in a few minutes.
          </p>
 
          {/* OTP Boxes */}
          <div className="flex justify-center gap-2.5 mb-5" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => inputsRef.current[i] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className={`w-11 h-13 text-center text-lg font-bold rounded-xl border-2 outline-none transition-all
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                  ${error
                    ? "border-red-400 bg-red-50 text-red-600"
                    : digit
                    ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-800"
                  }`}
                style={{ height: 52 }}
                autoFocus={i === 0}
              />
            ))}
          </div>
 
          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-red-600 text-xs flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}
 
          {/* Verify button */}
          <button
            onClick={handleVerify}
            disabled={!isComplete || loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                </svg>
                Verifying…
              </>
            ) : "Verify Email"}
          </button>
 
          {/* Resend */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <span className="text-xs text-slate-400">Didn't receive it?</span>
            {countdown > 0 ? (
              <span className="text-xs text-slate-400">Resend in <span className="font-semibold text-indigo-500">{countdown}s</span></span>
            ) : (
              <button
                onClick={handleResend}
                className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 transition-colors cursor-pointer"
              >
                Resend code
              </button>
            )}
          </div>
 
          {/* Wrong email */}
          <div className="mt-5 pt-5 border-t border-slate-100 text-center">
            <button
              onClick={() => navigate(-1)}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer flex items-center gap-1 mx-auto"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Wrong email? Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}