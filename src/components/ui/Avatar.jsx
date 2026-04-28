// ─── AVATAR ────────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-blue-500", "bg-purple-500", "bg-green-500",
  "bg-orange-500", "bg-pink-500", "bg-teal-500",
];
export default function Avatar({ name, size = "w-10 h-10", textSize = "text-sm" }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  return (
    <div className={`${size} ${color} rounded-full flex items-center justify-center text-white font-bold ${textSize} shrink-0`}>
      {initials}
    </div>
  );
}