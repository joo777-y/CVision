const STATUS_STYLES = {
  new: "bg-blue-100 text-blue-700",
  shortlisted: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-purple-100 text-purple-700",
  rejected: "bg-red-100 text-red-700",
  hired: "bg-green-100 text-green-700",
};

export default function StatusBadge({ status }) {
  const key = status?.toLowerCase();

  return (
    <span
      className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize shrink-0
      ${STATUS_STYLES[key] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}