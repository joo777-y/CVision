import { useEffect, useState } from "react";
import { ChevronDown } from "../components/ui/Icons";
import { apiPost } from "../services/api";
import {
  JOB_TITLES,
  DEPARTMENTS,
  LOCATIONS,
  JOB_TYPES,
} from "../data/jobOptions";
import toast from "react-hot-toast";

// ─── CREATE JOB PAGE ───────────────────────────────────────────────────────────
export default function CreateJobPage() {
  const EMPTY = {
    title: "",
    department: "",
    location: "",
    jobType: "full-time",
    salaryRange: "",
    description: "",
    requirements: "",
    responsibilities: "",
    workplaceType: "onsite",
  };

  const WORK_MODES = [
    { label: "On-site", value: "onsite" },
    { label: "Remote", value: "remote" },
    { label: "Hybrid", value: "hybrid" },
  ];


  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (isDraft = false) => {
    setSubmitting(true);
    setError(null);
    try {
      await apiPost("/jobs", {
        ...form,
        status: isDraft ? "draft" : "active",
      });
      setSuccess(true);
      setForm(EMPTY);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
      if (success) {
        toast.success("Job created successfully");
      }
    }, [success]);

    useEffect(() => {
      if (error) {
        toast.error(error);
      }
    }, [error]);

  return (
    <div className=" w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Create New Job</h2>

      {success && (
        <div className="mb-5 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
          ✓ Job posted successfully!
        </div>
      )}
      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
          ✕ {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 px-4 sm:px-6 py-6 mt-4">
        <h3 className="text-base font-semibold text-gray-800 mb-0.5">Job Details</h3>
        <p className="text-xs text-gray-400 mb-5">Provide the basic information about this job posting.</p>

        <div className="space-y-4">
          {/* Job Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Job Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                </svg>
              </span>
              <select
                value={form.title}
                onChange={set("title")}
                // placeholder="e.g. Senior Frontend Developer"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-400"
              >
                <option value="" hidden>Select job title</option>

                {JOB_TITLES.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>
                
                {/* className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400" /> */}
            </div>
          </div>

          {/* Department + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Department <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                <select
                  value={form.department}
                  onChange={set("department")}
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-400"
                >
                  <option value="" hidden>Select Department</option>

                  {DEPARTMENTS.map((job) => (
                    <option key={job} value={job}>
                      {job}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <select
                  value={form.location}
                  onChange={set("location")}
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-400"
                >
                  <option value="" hidden>Select location</option>

                  {LOCATIONS.map((job) => (
                    <option key={job} value={job} className="text-gray-500">
                      {job}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Work Mode <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <select
                  value={form.workplaceType}
                  onChange={set("workplaceType")}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-700"
                >
                  {WORK_MODES.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <ChevronDown />
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Job Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select value={form.jobType} onChange={set("jobType")}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-700">
                  {JOB_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <ChevronDown />
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Salary Range <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">$</span>
                <input value={form.salaryRange} onChange={set("salaryRange")}
                  placeholder="e.g. 15000 - 20000"
                  className="w-full border border-gray-200 rounded-lg pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400" />
              </div>
            </div>
          </div>
          </div>
          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea value={form.description} onChange={set("description")}
              placeholder="Provide a detailed description of the job"
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400" />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Requirements <span className="text-red-500">*</span>
            </label>
            <textarea value={form.requirements} onChange={set("requirements")}
              placeholder="List the requirements for this position"
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400" />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Responsibilities <span className="text-red-500">*</span>
            </label>
            <textarea value={form.responsibilities} onChange={set("responsibilities")}
              placeholder="List the responsibilities for this position"
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
            <button
              onClick={() => setForm(EMPTY)} 
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors hover:border-purple-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={submitting}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 transition-colors hover:border-purple-400 cursor-pointer"
            >
              Save As Draft
            </button>
            <button
              onClick={() => handleSubmit(false)}
              disabled={submitting}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-br from-teal-500 to-indigo-600 hover:opacity-90 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              {submitting ? "Publishing..." : "Publish Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}