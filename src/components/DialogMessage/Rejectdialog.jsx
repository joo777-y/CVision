// ─── REJECT DIALOG ─────────────────────────────────────────────────────────────
export default function RejectDialog({ onConfirm, onCancel, loading }) {
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
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-1">Reject Candidate</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Are you sure you want to reject this candidate? They will no longer be considered for this position.
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
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Saving..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}