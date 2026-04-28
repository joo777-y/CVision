// ─── STAT CARD ─────────────────────────────────────────────────────────────────
export default function StatCard({ label, value, Icon, bg }) {
  return (
    <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 border border-gray-100">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 ${bg}`}>
        <Icon s={20} />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-gray-800 leading-none">{value}</p>
      </div>
    </div>
  );
}