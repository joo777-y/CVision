// ─── SHORTLIST DIALOG ──────────────────────────────────────────────────────────
export default function ShortlistDialog({ onConfirm, onCancel, loading }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Icon + Text */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-1">Shortlist Candidate</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Are you sure you want to shortlist this candidate? They will be moved to the shortlisted candidates pool.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Saving..." : "Shortlist"}
          </button>
        </div>
      </div>
    </div>
  );
}