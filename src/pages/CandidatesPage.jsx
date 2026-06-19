import { useState, useEffect } from "react";
import { ChevronDown, SearchIcon } from "../components/ui/Icons";
import CandidateCard from "../components/applications/CandidateCard";
import CandidateDetailPage from "./Candidatedetailpage";
import { apiGet, apiDelete } from "../services/api";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

// ─── CANDIDATES PAGE ───────────────────────────────────────────────────────────
export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState("All status");
  const [scoreFilter, setScore] = useState("All Scores");
  const [selectedId, setSelectedId] = useState(null); // null = list view
  const [candidates, setCandidates] = useState([]);
  const [statusOverrides, setStatusOverrides] = useState({});

  const handleStatusChange = (id, newStatus) => {
    setStatusOverrides((prev) => ({ ...prev, [id]: newStatus }));
  };

  // Merge mock data with any local overrides
  const candidatesWithStatus = candidates.map((a) => ({
    ...a,
    status: statusOverrides[a.id] ?? a.status,
  }));

  const filtered = candidatesWithStatus.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.job.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All status" || a.status === statusFilter.toLowerCase();
    const matchScore =
      scoreFilter === "All Scores" ||
      (scoreFilter === "90+" && a.cvScore >= 90) ||
      (scoreFilter === "80-89" && a.cvScore >= 80 && a.cvScore < 90) ||
      (scoreFilter === "70-79" && a.cvScore >= 70 && a.cvScore < 80) ||
      (scoreFilter === "Below 70" && a.cvScore < 70);
    return matchSearch && matchStatus && matchScore;
  });

  const statuses = [
    "All status",
    "New",
    "Shortlisted",
    "Reviewed",
    "Rejected",
    "Hired",
  ];
  const scoreRanges = ["All Scores", "90+", "80-89", "70-79", "Below 70"];

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await apiGet("/candidates");

        setCandidates(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCandidates();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this candidate?",
    );

    if (!confirmDelete) return;

    try {
  await apiDelete(`/cvs/${id}`);

  setCandidates((prev) =>
    prev.filter((candidate) => candidate.id !== id)
  );

  toast.success("Candidate deleted successfully");

  window.dispatchEvent(
    new Event("candidateDeleted")
  );

} catch (err) {
  console.error(err);
  toast.error("Failed to delete candidate");
}
  };

  // ── Detail view ──────────────────────────────────────────────────────────────
  if (selectedId !== null) {
    return (
      <CandidateDetailPage
        candidateId={selectedId}
        onBack={() => setSelectedId(null)}
        onStatusChange={handleStatusChange}
      />
    );
  }

  // ── List view ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">ALL Candidates</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          {filtered.length} Candidate{filtered.length !== 1 ? "s" : ""} Found
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates..."
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 bg-white"
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatus(e.target.value)}
            className="appearance-none border border-gray-200 rounded-xl px-4 pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-600 w-full sm:w-auto"
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <ChevronDown />
          </span>
        </div>

        {/* Score filter */}
        <div className="relative">
          <select
            value={scoreFilter}
            onChange={(e) => setScore(e.target.value)}
            className="appearance-none border border-gray-200 rounded-xl px-4 pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-600 w-full sm:w-auto"
          >
            {scoreRanges.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <ChevronDown />
          </span>
        </div>
      </div>

      {/* Cards grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((app) => (
            <div key={app.id} className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(app.id);
                }}
                className="absolute top-20 right-3 z-10 text-red-500 hover:text-red-700 cursor-pointer"
              >
                <Trash2 size={20} />
              </button>

              <div
                onClick={() => setSelectedId(app.id)}
                className="cursor-pointer"
              >
                <CandidateCard app={app} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 px-6 py-16 text-center">
          <p className="text-gray-300 text-sm">
            No candidates found matching your filters.
          </p>
        </div>
      )}
    </div>
  );
}
