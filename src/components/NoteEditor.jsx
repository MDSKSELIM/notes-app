import { useState, useEffect, useRef } from "react";
import { X, Pin, Trash2, Check } from "lucide-react";
import { formatDate } from "../utils/formatDate";

const COLOR_BG = {
  default: "bg-white",
  yellow:  "bg-amber-50",
  green:   "bg-emerald-50",
  blue:    "bg-sky-50",
  pink:    "bg-pink-50",
  purple:  "bg-violet-50",
};

export function NoteEditor({ note, onUpdate, onDelete, onClose, onTogglePin }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const titleRef = useRef(null);
  const hasContent = title.trim() || content.trim();

  // Auto-focus: title if empty, otherwise content area
  useEffect(() => {
    if (!note.title) {
      titleRef.current?.focus();
    }
  }, [note.title]);

  // Autosave: sync back to state on every keystroke
  useEffect(() => {
    onUpdate(note.id, { title, content });
  }, [title, content]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const bg = COLOR_BG[note.color] || COLOR_BG.default;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-900/40 backdrop-blur-[2px] z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          fixed z-50
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-full max-w-lg max-h-[85vh]
          ${bg} rounded-2xl shadow-2xl
          flex flex-col
          animate-slide-in
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <button
              className={`p-1.5 rounded-lg transition-colors ${
                note.pinned
                  ? "text-amber-500 bg-amber-50 hover:bg-amber-100"
                  : "text-ink-300 hover:text-ink-600 hover:bg-stone-100"
              }`}
              onClick={() => onTogglePin(note.id)}
              title={note.pinned ? "Unpin" : "Pin"}
            >
              <Pin size={15} />
            </button>
            <span className="text-xs text-ink-300 font-mono">
              {formatDate(note.updatedAt)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              className="p-1.5 rounded-lg text-ink-300 hover:text-red-500 hover:bg-red-50 transition-colors"
              onClick={() => {
                onDelete(note.id);
                onClose();
              }}
              title="Delete note"
            >
              <Trash2 size={15} />
            </button>
            <button
              className="p-1.5 rounded-lg text-ink-300 hover:text-ink-700 hover:bg-stone-100 transition-colors"
              onClick={onClose}
              title="Done (Esc)"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Title input */}
        <div className="px-5 pt-1">
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className={`
              w-full text-lg font-semibold text-ink-900
              placeholder:text-ink-300
              bg-transparent border-none outline-none
              resize-none
            `}
          />
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-stone-100 my-2" />

        {/* Content textarea */}
        <div className="px-5 pb-2 flex-1 overflow-y-auto">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something..."
            className={`
              w-full h-full min-h-[200px] text-sm text-ink-700 leading-relaxed
              placeholder:text-ink-300
              bg-transparent border-none outline-none
              resize-none
            `}
          />
        </div>

        {/* Bottom bar */}
        <div className="px-5 py-3 flex items-center justify-between border-t border-stone-100">
          <span className="text-xs text-ink-300">
            {hasContent
              ? `${content.trim().split(/\s+/).filter(Boolean).length} words`
              : "Start typing…"}
          </span>
          <button
            className="flex items-center gap-1.5 text-xs font-medium text-white bg-ink-900 hover:bg-ink-700 px-3 py-1.5 rounded-lg transition-colors"
            onClick={onClose}
          >
            <Check size={13} />
            Done
          </button>
        </div>
      </div>
    </>
  );
}
