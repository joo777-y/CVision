import { Trash2 } from "lucide-react";
import { BagIcon, PinIcon, UsersIcon } from "../ui/Icons";

// ─── JOB ROW ───────────────────────────────────────────────────────────────────
export default function JobRow({ job, onViewApplicants, onDelete }) {
  const getJobStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";

      case "draft":
        return "bg-gray-200 text-gray-600";

      case "paused":
        return "bg-yellow-100 text-yellow-700";

      case "closed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-1 rounded-lg transition-colors gap-2 sm:gap-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-1 flex-wrap">
          <span className="text-sm font-semibold text-blue-600 truncate">{job.title}</span>
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0 
            ${getJobStatusStyle(job.status)}`}
          >
            {job.status}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
          <span className="flex items-center gap-1"><BagIcon s={12} />{job.department || "No Department"}</span>
          <span className="flex items-center gap-1"><PinIcon />{job.location}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 shrink-0 sm:ml-4">
        <button
  onClick={() => onDelete(job.id)}
  className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
>
  <Trash2 size={20} />
</button>

        <button
          onClick={() => onViewApplicants(job)}
          className="text-xs px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 font-medium transition-all cursor-pointer"
        >
          View Applicants
        </button>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <UsersIcon s={12} />
          {job.applicationsCount || 0} Applicants
        </span>
      </div>
    </div>
  );
}