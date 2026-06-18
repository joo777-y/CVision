import { BagIcon, CalIcon } from "../ui/Icons";
import StatusBadge from "../ui/StatusBadge";

// ─── APP ROW (dashboard) ───────────────────────────────────────────────────────
export default function AppRow({ app }) {
  const scoreColor =
    app.cvScore >= 85 ? "bg-green-100 text-green-700" :
    app.cvScore >= 70 ? "bg-blue-100 text-blue-700"   :
    "bg-yellow-100 text-yellow-700";


  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-1 rounded-lg transition-colors gap-2 sm:gap-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-blue-600 truncate">
            {app.name || app.applicantName || "Unknown Candidate"}
          </span>

          <StatusBadge status={"processed"} />
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <BagIcon s={12} />{app.job || app.jobTitle}
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0 sm:ml-4 text-xs text-gray-400 flex-wrap">
        <span className={`px-2.5 py-1 rounded-full font-semibold ${scoreColor}`}>
          CV Score: {app.cvScore}%
        </span>
        <span className="flex items-center gap-1">
          <CalIcon />Applied on {app.appliedOn || app.appliedAt}
        </span>
      </div>
    </div>
  );
}
