import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../services/api";

const ROLES = ["HR Professional"];

export default function LoginPage() {
  const [role, setRole] = useState("HR Professional");
  const [roleOpen, setRoleOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    else if (password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    
          try {
        const data = await apiPost("/auth/login", {
          email,
          password,
        });

        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem(
          "user",
          JSON.stringify(data.data.user)
        );
        console.log(localStorage.getItem("accessToken"));

        console.log("LOGIN SUCCESS:", data);

        navigate("/dashboard");
      } catch (err) {
        console.error("LOGIN ERROR:", err);

        setErrors({
          form:
            err?.response?.data?.message ||
            "Unknown error",
        });
      } finally {
        setLoading(false);
      }
  };

  const navigate= useNavigate();

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      
      <div className="w-full max-w-sm">
        <div className="absolute left-5 top-5">
          <button
            onClick={() => navigate("/")}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-sm cursor-pointer"
            >← Back to Home
          </button>
        </div>
        

        {/* Header */}
        <div className="text-center mb-8">
          
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 mb-4 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white" opacity=".9"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to continue to your workspace</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100 p-8">

          {/* Global error */}
          {errors.form && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-red-600 text-sm">
              {errors.form}
            </div>
          )}

          {/* Role Dropdown */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              I am a
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 bg-indigo-50 text-indigo-700 font-medium text-sm hover:border-indigo-300 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  {role}
                </span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className={`transition-transform duration-200 ${roleOpen ? "rotate-180" : "rotate-0"}`}
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {roleOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => { setRole(r); setRoleOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-indigo-50 ${
                        r === role ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-700"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 bg-white outline-none transition-all focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 ${
                  errors.email ? "border-red-400" : "border-slate-200"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                placeholder="••••••••"
                className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm text-slate-800 placeholder-slate-400 bg-white outline-none transition-all focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 ${
                  errors.password ? "border-red-400" : "border-slate-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between mb-6">
            <label
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setRemember((v) => !v)}
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                remember ? "bg-indigo-600 border-indigo-600" : "border-slate-300"
              }`}>
                {remember && (
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-sm text-slate-600">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-200  cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                </svg>
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        {/* Sign Up */}
        <p className="text-center text-sm text-slate-500 mt-5">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate('/sign-up-page')}
            className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}