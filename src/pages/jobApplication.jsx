import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

// ─── APPLY PAGE ────────────────────────────────────────────────────────────────
export default function ApplyPage() {
  const navigate  = useNavigate();
  const location  = useLocation();

  // Job info passed via navigate state: navigate("/apply", { state: { job } })
  const job = location.state?.job;

  

  const EMPTY = {
    fullName:    "",
    email:       "",
    phoneNumber: "",
    whatsappNumber: "",
    coverLetter: "",
  };

  const [form, setForm]         = useState(EMPTY);
  const [cvFile, setCvFile]     = useState(null);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState(null);
  const fileRef                 = useRef(null);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  // ── File handling ─────────────────────────────────────────────────────────
  const acceptFile = (file) => {
    if (!file) return;
    const allowed = ["application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      setError("Only PDF or Word files are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5 MB.");
      return;
    }
    setError(null);
    setCvFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    acceptFile(e.dataTransfer.files[0]);
  };

      // ── Submit ────────────────────────────────────────────────────────────────
    const handleSubmit = async () => {

      // Basic validation
      if (
        !form.fullName ||
        !form.email ||
        !form.phoneNumber ||
        !form.whatsappNumber ||
        !cvFile
      ) {
        setError("Please fill in all required fields and upload your CV.");
        return;
      }

      if (!egyptPhoneRegex.test(form.phoneNumber)) {
        setError(
          "Phone number must start with 010, 011, 012, or 015 and be 11 digits."
        );
        return;
      }

      if (!egyptPhoneRegex.test(form.whatsappNumber)) {
        setError(
          "WhatsApp number must start with 010, 011, 012, or 015 and be 11 digits."
        );
        return;
      }

      setError(null);
      setSubmitting(true);

      try {

        const formData = new FormData();

        formData.append("jobId", job._id || job.id);
        formData.append("fullName", form.fullName);
        formData.append("email", form.email);
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("whatsappNumber", form.whatsappNumber);
        formData.append("coverLetter", form.coverLetter);
        formData.append("cv", cvFile);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/cvs/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Upload failed");
        }

        setSuccess(true);
        setForm(EMPTY);
        setCvFile(null);

      } catch (err) {

        setError(err.message || "Something went wrong.");

      } finally {

        setSubmitting(false);

      }
    };
    
    useEffect(() => {
      if (success) {
        toast.success("Application submitted successfully");
      }
    }, [success]);

    useEffect(() => {
      if (error) {
        toast.error(error);
      }
    }, [error]);

    const egyptPhoneRegex = /^(010|011|012|015)\d{8}$/;
  

  // ── Success screen ────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 max-w-sm w-full text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Application Submitted!</h2>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Your application for <span className="font-semibold text-gray-600">{job.title}</span> at{" "}
            <span className="font-semibold text-gray-600">{job.company}</span> has been received.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gradient-to-br from-teal-500 to-indigo-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Back to Job Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      {/* ── Back link ── */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 mb-6 transition-colors cursor-pointer"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back To Job Listings
      </button>

      {/* ── Card ── */}
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm px-6 sm:px-8 py-7">

        {/* Job info header */}
        <div className="mb-7 pb-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800 mb-1">
            Apply for {job.title}
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-400">
            <span>{job.department || "Unknown Company"}</span>


            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{job.location || "Unknown Location"}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{job.jobType || "Not Specified"}</span>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs font-medium">
            {error}
          </div>
        )}

        <div className="space-y-5">

          {/* Row 1: Full Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                value={form.fullName} onChange={set("fullName")}
                placeholder="Ahmed Samir"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.email} onChange={set("email")}
                placeholder="ahmed@example.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-300"
              />
            </div>
          </div>

          {/* Row 2: Phone + WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={form.phoneNumber} onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    phoneNumber: e.target.value.replace(/\D/g, "").slice(0, 11),
                  }))
                }
                placeholder="01012345678"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={form.whatsappNumber} onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    whatsappNumber: e.target.value.replace(/\D/g, "").slice(0, 11),
                  }))
                }
                placeholder="01012345678"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-300"
              />
            </div>
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              CV / Resume <span className="text-red-500">*</span>
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-lg px-6 py-10 flex flex-col items-center justify-center cursor-pointer transition-colors
                ${dragging
                  ? "border-blue-400 bg-blue-50"
                  : cvFile
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"}`}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => acceptFile(e.target.files[0])}
              />

              {cvFile ? (
                <>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-green-700 truncate max-w-xs">{cvFile.name}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {(cvFile.size / 1024).toFixed(0)} KB —{" "}
                    <span
                      className="text-blue-500 hover:underline"
                      onClick={(e) => { e.stopPropagation(); setCvFile(null); }}
                    >
                      Remove
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
                    <polyline points="16 16 12 12 8 16"/>
                    <line x1="12" y1="12" x2="12" y2="21"/>
                    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
                  </svg>
                  <p className="text-sm text-gray-500">
                    <span className="text-blue-600 font-medium">Upload a file</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">pdf or word up to 5MB</p>
                </>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Cover Letter <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={form.coverLetter} onChange={set("coverLetter")}
              placeholder="Tell Us Why You Are The Perfect Candidate For This Position ..."
              rows={5}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-1">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer hover:border-purple-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-br from-teal-500 to-indigo-600 hover:opacity-90 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}