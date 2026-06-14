import { PenLine } from "lucide-react";

export function EmptyState({ isSearch, onNewNote }) {
  if (isSearch) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
          <PenLine size={22} className="text-ink-300" />
        </div>
        <p className="text-sm font-medium text-ink-700 mb-1">No notes match</p>
        <p className="text-sm text-ink-300">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-soft border border-amber-200 flex items-center justify-center mb-5">
        <PenLine size={26} className="text-amber-accent" />
      </div>
      <h3 className="text-base font-semibold text-ink-900 mb-1.5">
        Your notes live here
      </h3>
      <p className="text-sm text-ink-400 mb-6 max-w-xs">
        Capture ideas, to-dos, or anything worth remembering. Everything stays in your browser.
      </p>
      <button
        onClick={onNewNote}
        className="text-sm font-medium text-white bg-ink-900 hover:bg-ink-700 px-4 py-2 rounded-xl transition-colors"
      >
        Write your first note
      </button>
    </div>
  );
}
