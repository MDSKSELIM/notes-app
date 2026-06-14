import { Trash2 } from "lucide-react";

export function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-ink-900/40 backdrop-blur-[2px] z-50 animate-fade-in"
        onClick={onCancel}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-2xl shadow-2xl p-6 animate-slide-in">
        <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-4">
          <Trash2 size={20} className="text-red-500" />
        </div>
        <h3 className="text-base font-semibold text-ink-900 mb-1.5">
          Delete this note?
        </h3>
        <p className="text-sm text-ink-500 mb-5">
          This can't be undone. The note will be permanently removed from your browser.
        </p>
        <div className="flex gap-2">
          <button
            className="flex-1 py-2 text-sm font-medium text-ink-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
