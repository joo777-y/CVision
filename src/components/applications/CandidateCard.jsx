import { BagIcon, CalIcon } from "../ui/Icons";
import StatusBadge from "../ui/StatusBadge";
import Avatar from "../ui/Avatar";

// ─── CANDIDATE CARD ────────────────────────────────────────────────────────────
export default function CandidateCard({ app }) {
  const scoreColor =
    app.cvScore >= 85 ? "bg-green-100 text-green-700" :
    app.cvScore >= 70 ? "bg-blue-100 text-blue-700"   :
    "bg-yellow-100 text-yellow-700";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-4 sm:px-5 py-4 hover:shadow-md transition-shadow">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={app.name} />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-800 truncate">{app.name}</span>
              <StatusBadge status={app.status} />
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
              <BagIcon s={11} />
              <span className="truncate">{app.job}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${scoreColor}`}>
            CV Score: {app.cvScore}%
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
            <CalIcon />Applied on {app.appliedOn}
          </span>
        </div>
      </div>

      {/* Experience */}
      <p className="text-xs text-gray-400 mb-2.5">
        Experience: <span className="text-gray-600 font-medium">{app.experience}</span>
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {app.skills.map(skill => (
          <span key={skill}
            className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}