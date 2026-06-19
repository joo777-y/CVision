import { useState, useEffect } from "react";
import RejectDialog from "../components/DialogMessage/Rejectdialog";
import ShortlistDialog from "../components/DialogMessage/Shortlistdialog";
import { apiGet, apiPatch, apiPost } from "../services/api";
import { toast } from "react-hot-toast";

// ─── ICONS ─────────────────────────────────────────────────────────────────────
const Ico = ({ size = 16, children }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    {children}
  </svg>
);
const BagIcon = ({ s = 16 }) => (
  <Ico size={s}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </Ico>
);
const MailIcon = () => (
  <Ico size={15}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </Ico>
);
const PhoneIcon = () => (
  <Ico size={15}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.1 2.18 2 2 0 012.09 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
  </Ico>
);
const PinIcon = () => (
  <Ico size={15}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </Ico>
);
const GlobeIcon = () => (
  <Ico size={15}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </Ico>
);
const FileIcon = () => (
  <Ico size={15}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </Ico>
);
const GradCapIcon = () => (
  <Ico size={18}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3.33 1.67 6.67 1.67 10 0v-5" />
  </Ico>
);
const ArrowLeft = () => (
  <Ico size={15}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </Ico>
);
const XIcon = () => (
  <Ico size={14}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Ico>
);
const CheckIcon = () => (
  <Ico size={14}>
    <polyline points="20 6 9 17 4 12" />
  </Ico>
);

const mapStatus = (status) => {
  const map = {
    pending: "new",
    processed: "shortlisted",
    rejected: "rejected",
  };

  return map[status] || status?.toLowerCase();
};

// ─── STATUS BADGE ──────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  new: "bg-blue-100 text-blue-700",
  shortlisted: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-purple-100 text-purple-700",
  rejected: "bg-red-100 text-red-700",
  hired: "bg-green-100 text-green-700",
};

function StatusBadge({ status }) {
  const key = status?.toLowerCase();

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium capitalize 
      ${STATUS_STYLES[key] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}

// ─── AVATAR ────────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-teal-500",
];
function Avatar({ name = "", size = "w-14 h-14", textSize = "text-lg" }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "NA";

  const color = AVATAR_COLORS[name?.charCodeAt(0) % AVATAR_COLORS.length];

  return (
    <div
      className={`${size} ${color} rounded-full flex items-center justify-center text-white font-bold ${textSize} shrink-0`}
    >
      {initials}
    </div>
  );
}

// ─── SCORE RING ────────────────────────────────────────────────────────────────
function ScoreRing({ score }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="flex items-center justify-center my-4">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke="#e8f0fe"
            strokeWidth="10"
          />
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="10"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-600">{score} %</span>
        </div>
      </div>
    </div>
  );
}

// ─── PROGRESS BAR ──────────────────────────────────────────────────────────────
function ProgressBar({ label, value }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
        <span>{label}</span>
        <span className="font-semibold text-gray-700">{value} %</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// ─── EXPERIENCE ITEM ───────────────────────────────────────────────────────────
function ExperienceItem({ item }) {
  return (
    <div className="flex gap-4">
      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
        <BagIcon s={16} />
      </div>
      <div className="flex-1 min-w-0 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
        <p className="text-sm font-semibold text-gray-800">{item.title}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-400 mt-0.5 mb-2">
          <span>{item.company}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
          <span>{item.location}</span>
        </div>
        <p className="text-xs text-gray-400 mb-2">
          {item.from} — {item.to}
        </p>
        <p className="text-xs text-gray-500 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

// ─── EDUCATION ITEM ────────────────────────────────────────────────────────────
function EducationItem({ item }) {
  return (
    <div className="flex gap-4">
      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 text-blue-500">
        <GradCapIcon />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{item.degree}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-400 mt-0.5 mb-1">
          <span>{item.school}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
          <span>{item.location}</span>
        </div>
        <p className="text-xs text-gray-400">
          {item.from} — {item.to}
        </p>
      </div>
    </div>
  );
}

// ─── CANDIDATE DETAIL PAGE ─────────────────────────────────────────────────────
export default function CandidateDetailPage({
  candidateId,
  onBack,
  onStatusChange,
}) {
  // ─────────────────────────────────────────────────────────────────────────────
  const [candidate, setCandidate] = useState(null);

  const [status, setStatus] = useState("new");

  const [updating, setUpdating] = useState(false);
  const [confirmType, setConfirm] = useState(null); // "rejected" | "shortlisted" | null

  // Reset to null first so switching between dialogs forces a clean
  // unmount → remount, preventing the wrong dialog from staying open.
  const openConfirm = (type) => {
    setConfirm(type);
  };

  const handleStatusChange = async () => {
    if (!confirmType) return;

    setUpdating(true);

    try {
      const endpoint =
        confirmType === "rejected"
          ? `/cvs/${candidateId}/reject`
          : `/cvs/${candidateId}/accept`;

      await apiPost(endpoint);

      setStatus(confirmType);

      onStatusChange?.(candidateId, confirmType);

      // ✅ Toast Success
      if (confirmType === "rejected") {
        toast.error("Candidate rejected successfully", {
          style: {
            background: "#fee2e2",
            color: "#b91c1c",
          },
          icon: "✕",
        });
      } else {
        toast.success("Candidate shortlisted successfully");
      }
    } catch (err) {
      console.error("Failed to update status:", err);

      // ❌ Toast Error
      toast.error("Failed to update candidate status");
    } finally {
      setUpdating(false);
      setConfirm(null);
    }
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await apiGet(`/candidates/${candidateId}`);

const cv = res.data;
        console.log("DETAIL CV =>", cv);

        console.log("RAW CV DATA =>", cv);
        console.log("PARSED =>", cv.parsedData);
        console.log("AI =>", cv.aiAnalysis);

        const formattedCandidate = {
          id: cv.id,

  name: cv.name || "Unknown",

  job: cv.job || "Unknown Job",

  email: cv.email,

  phoneNumber: cv.phoneNumber,

  status: cv.status,

          cvScore: cv.cvScore || 0,

          skillMatch: cv.skillMatch || 0,

          experienceMatch: cv.experienceMatch || 0,

          educationMatch: cv.educationMatch || 0,

          skills: cv.skills || [],

          experience: cv.experience || [],

          education: [
            {
              degree: cv.education || "No education data",
              school: "",
              location: "",
              from: "",
              to: "",
            },
          ],

          aiMatching: cv.aiMatching || {
            matchedSkills: [],
            missingSkills: [],
            explanation: "",
          },
        };

        setCandidate(formattedCandidate);
        setStatus(mapStatus(cv.status));
      } catch (err) {
        console.error(err);
      }
    };

    fetchCandidate();
  }, [candidateId]);

  const handleViewCV = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cvs/${candidate.id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to download CV");
      }

      const blob = await response.blob();

      const fileURL = window.URL.createObjectURL(blob);

      window.open(fileURL, "_blank");

      // ✅ Success Toast
      toast.success("CV downloaded successfully");
    } catch (error) {
      console.error(error);

      // ❌ Error Toast
      toast.error("Failed to download CV");
    }
  };

  if (!candidate) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400">Loading candidate...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ── Confirm Dialogs ── */}
      {confirmType === "rejected" && (
        <RejectDialog
          loading={updating}
          onConfirm={handleStatusChange}
          onCancel={() => setConfirm(null)}
        />
      )}
      {confirmType === "shortlisted" && (
        <ShortlistDialog
          loading={updating}
          onConfirm={handleStatusChange}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-5 border-b border-gray-200">
        {/* Left: avatar + name */}
        <div className="flex items-center gap-4">
          <Avatar name={candidate.name} size="w-14 h-14" textSize="text-lg" />
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-bold text-gray-800">
                {candidate.name}
              </h2>
              <StatusBadge status={status} />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
              <BagIcon s={13} />
              <span>{candidate.job}</span>
            </div>
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowLeft /> Back to List
          </button>

          <button
            onClick={() => openConfirm("rejected")}
            disabled={status === "rejected"}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-colors cursor-pointer
              ${
                status === "rejected"
                  ? "bg-red-50 border-red-200 text-red-400 cursor-default"
                  : "border-red-200 text-red-500 hover:bg-red-50"
              }`}
          >
            <XIcon /> Reject
          </button>

          <button
            onClick={() => openConfirm("shortlisted")}
            disabled={status === "shortlisted"}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer
              ${
                status === "shortlisted"
                  ? "bg-emerald-400 border-2 border-purple-200 text-black cursor-default"
                  : "bg-gradient-to-br from-teal-500 to-indigo-600 hover:opacity-90 hover:bg-blue-700 text-white"
              }`}
          >
            <CheckIcon /> Shortlist
          </button>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-5 w-full lg:w-80 shrink-0">
          {/* CV Score Card */}
          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-5">
            <h3 className="text-sm font-bold text-gray-700 mb-1">CV Score</h3>
            <ScoreRing score={candidate.cvScore} />
            <div className="mt-3">
              <ProgressBar label="Skill Match" value={candidate.skillMatch} />
              <ProgressBar
                label="Experience Match"
                value={candidate.experienceMatch}
              />
              <ProgressBar
                label="Education Match"
                value={candidate.educationMatch}
              />
            </div>
            <button
              onClick={handleViewCV}
              className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <FileIcon />
              View Full CV
            </button>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-5">
            <h3 className="text-sm font-bold text-gray-700 mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="text-gray-400">
                  <MailIcon />
                </span>
                <a
                  href={`mailto:${candidate.email}`}
                  className="hover:text-blue-600 transition-colors truncate"
                >
                  {candidate.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="text-gray-400">
                  <PhoneIcon />
                </span>
                <a
                  href={`tel:${candidate.phoneNumber}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {candidate.phoneNumber}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="text-gray-400">
                  <PinIcon />
                </span>
                <span>{candidate.contact?.location || "Not provided"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="text-gray-400">
                  <GlobeIcon />
                </span>
                <a
                  href={
                    candidate.contact?.website
                      ? `https://${candidate.contact.website}`
                      : "#"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition-colors truncate"
                >
                  {candidate.contact?.location || "Not provided"}
                </a>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-5">
            <h3 className="text-sm font-bold text-gray-700 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {(candidate.skills || []).map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* AI Matching */}
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col gap-5 flex-1 min-w-0">
          {/* Work Experience */}
          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-5">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-gray-400">
                <BagIcon s={16} />
              </span>
              <h3 className="text-sm font-bold text-gray-700">
                Work Experience
              </h3>
            </div>
            <div className="space-y-5">
              {(candidate.experience || []).map((item) => (
                <ExperienceItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-5">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-gray-400">
                <GradCapIcon />
              </span>
              <h3 className="text-sm font-bold text-gray-700">Education</h3>
            </div>
            <div className="space-y-5">
              {Array.isArray(candidate.education) ? (
                candidate.education.map((item, index) => (
                  <EducationItem key={index} item={item} />
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  {candidate.education || "No education data"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
