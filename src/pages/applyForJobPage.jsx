import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ============================================================
// MOCK DATA — replace with fetch from API
// ============================================================
const MOCK_JOBS = [
  { id: 1, title: "Senior Frontend Developer", company: "Acme Inc.",      type: "Remote", employment: "Full-time", postedDays: 2, initials: "A", color: "bg-blue-500"   },
  { id: 2, title: "Product Manager",           company: "Tech Solutions", type: "Onsite", employment: "Full-time", postedDays: 3, initials: "T", color: "bg-yellow-500" },
  { id: 3, title: "UI/UX Designer",            company: "Creative Studio",type: "Remote", employment: "Full-time", postedDays: 5, initials: "C", color: "bg-orange-400" },
  { id: 4, title: "Marketing Specialist",      company: "GrowCo.",        type: "Hybrid", employment: "Full-time", postedDays: 6, initials: "G", color: "bg-green-500"  },
  { id: 5, title: "Backend Developer",         company: "Data Systems",   type: "Remote", employment: "Full-time", postedDays: 7, initials: "D", color: "bg-purple-500" },
];

const JOB_TYPES = ["All Types", "Remote", "Onsite", "Hybrid"];

// ============================================================
// JobCard Component
// ============================================================
function JobCard({ job}) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-md px-5 py-4 flex items-center justify-between hover:shadow-md transition-shadow">
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className={`w-9 h-9 rounded-full ${job.color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
          {job.initials}
        </div>

        <div className="min-w-0">
          <p className="text-blue-600 font-semibold text-sm truncate hover:underline cursor-pointer">
            {job.title}
          </p>
          <p className="text-gray-500 text-xs mt-0.5">{job.company}</p>

          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {job.type}
            </span>

            <span className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2"/>
              </svg>
              {job.employment}
            </span>

            <span className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {job.postedDays}d ago
            </span>
          </div>

          {/* Expanded Details */}
          {expanded && (
            <div className="mt-3 text-xs text-gray-500 border-t pt-3">
              <p>Job description goes here. Fetch full details from <code>/api/jobs/{job.id}</code>.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        <button
          onClick={() => navigate('/job-application')}
          className="bg-gradient-to-br from-teal-500 to-indigo-600 hover:opacity-90 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded transition-colors cursor-pointer"
        >
          Apply Now
        </button>
        <button
          onClick={() => setExpanded(!expanded)}
          className="border border-gray-300 hover:bg-gray-50 text-gray-500 p-2 rounded transition-colors cursor-pointer"
        >
          <svg
            className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Main JobBoard Component
// ============================================================
export default function JobBoard() {
  const navigate = useNavigate();

  const [jobs]                  = useState(MOCK_JOBS);
  const [keyword, setKeyword]   = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType]   = useState("All Types");
  const [loading]               = useState(false);

  // ----------------------------------------------------------
  // Fetch jobs from backend — uncomment when ready
  // ----------------------------------------------------------
  // useEffect(() => {
  //   setLoading(true);
  //   const params = new URLSearchParams();
  //   if (keyword)  params.set("keyword",  keyword);
  //   if (location) params.set("location", location);
  //   if (jobType !== "All Types") params.set("type", jobType);
  //   fetch(`/api/jobs?${params.toString()}`)
  //     .then(r => r.json())
  //     .then(data => setJobs(data))
  //     .catch(console.error)
  //     .finally(() => setLoading(false));
  // }, [keyword, location, jobType]);

  // Client-side filtering — remove when using backend filtering
  const filtered = jobs.filter(job => {
    const matchKeyword  = job.title.toLowerCase().includes(keyword.toLowerCase())
                       || job.company.toLowerCase().includes(keyword.toLowerCase());
    const matchLocation = !location || job.type.toLowerCase().includes(location.toLowerCase());
    const matchType     = jobType === "All Types" || job.type === jobType;
    return matchKeyword && matchLocation && matchType;
  });

  // Navigate to apply page, passing job data via router state
  const handleApply = (job) => {
    navigate("/apply", { state: { job } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ── Navbar ── */}
      <header className="bg-gradient-to-br from-teal-500 to-indigo-600 fixed top-0 left-0 w-full z-30">
        <div className="max-w-6xl mx-auto px-6 py-12 flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold leading-tight">Find Your Dream Job</h1>
            <p className="text-blue-200 text-xs mt-0.5">Browse the latest opportunities</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="border border-white text-white text-sm px-4 py-1.5 rounded hover:bg-white hover:text-blue-600 transition-colors">
              Browse Jobs
            </button>
            <button
              onClick={() => navigate("/login-page")}
              className="bg-white text-blue-600 text-sm font-medium px-4 py-1.5 rounded hover:bg-blue-50 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 mt-32">

        {/* Search Filters */}
        <div className="bg-white border border-gray-200 rounded-md p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Job Title or Keyword</label>
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Remote, Cairo"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="w-full md:w-48">
              <label className="block text-xs text-gray-500 mb-1">Job Type</label>
              <select
                value={jobType}
                onChange={e => setJobType(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        {loading ? (
          <div className="text-center py-10 text-gray-400 text-sm">Loading jobs…</div>
        ) : filtered.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filtered.map(job => (
              <JobCard key={job.id} job={job} onApply={handleApply} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-md p-10 text-center text-gray-400 text-sm">
            No jobs found matching your criteria.
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-gray-400">© {new Date().getFullYear()} TalentHub. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.13 2.25h6.802l4.258 5.632 5.054-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}