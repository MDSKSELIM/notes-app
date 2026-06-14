import { useState } from "react";
import { Pin, Trash2, PenLine } from "lucide-react";
import { formatDate } from "../utils/formatDate";

// Each color option has a card bg and a subtle border
const COLOR_MAP = {
  default: { card: "bg-white border-stone-200", dot: "bg-stone-300" },
  yellow:  { card: "bg-amber-50 border-amber-200", dot: "bg-amber-400" },
  green:   { card: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-400" },
  blue:    { card: "bg-sky-50 border-sky-200", dot: "bg-sky-400" },
  pink:    { card: "bg-pink-50 border-pink-200", dot: "bg-pink-400" },
  purple:  { card: "bg-violet-50 border-violet-200", dot: "bg-violet-400" },
};

const COLOR_OPTIONS = Object.entries(COLOR_MAP);

export function NoteCard({ note, onEdit, onDelete, onTogglePin, onColorChange }) {
  const [showColors, setShowColors] = useState(false);
  const colors = COLOR_MAP[note.color] || COLOR_MAP.default;

  return (
    <div
      className={`
        group relative rounded-xl border ${colors.card}
        shadow-sm hover:shadow-md transition-all duration-200
        animate-slide-in cursor-pointer
        ${note.pinned ? "ring-1 ring-amber-300" : ""}
      `}
      onClick={() => onEdit(note)}
    >
      {/* Pin indicator */}
      {note.pinned && (
        <div className="absolute -top-1.5 left-3 flex items-center gap-1 bg-amber-400 text-white text-xs font-medium px-2 py-0.5 rounded-full">
          <Pin size={10} />
          Pinned
        </div>
      )}

      <div className="p-4 pt-5">
        {/* Title */}
        {note.title && (
          <h3 className="font-semibold text-ink-900 text-sm mb-1.5 line-clamp-2 leading-snug">
            {note.title}
          </h3>
        )}

        {/* Content preview */}
        <p
          className={`text-sm text-ink-500 leading-relaxed ${
            note.title ? "line-clamp-3" : "line-clamp-4"
          }`}
        >
          {note.content || (
            <span className="italic text-ink-300">Empty note</span>
          )}
        </p>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-ink-300 font-mono">
            {formatDate(note.updatedAt)}
          </span>

          {/* Color dot */}
          <div
            className={`w-2.5 h-2.5 rounded-full ${colors.dot} opacity-60`}
          />
        </div>
      </div>

      {/* Action bar — shown on hover */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          flex items-center justify-between
          px-3 py-2
          bg-white/80 backdrop-blur-sm rounded-b-xl
          border-t border-stone-100
          opacity-0 group-hover:opacity-100
          transition-opacity duration-150
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color picker */}
        <div className="relative">
          <button
            className="flex items-center gap-1.5 text-xs text-ink-500 hover:text-ink-700 transition-colors"
            onClick={() => setShowColors((v) => !v)}
            title="Change color"
          >
            <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
            <span>Color</span>
          </button>

          {showColors && (
            <div className="absolute bottom-7 left-0 flex gap-1.5 bg-white border border-stone-200 rounded-lg p-2 shadow-lg z-10 animate-fade-in">
              {COLOR_OPTIONS.map(([key, val]) => (
                <button
                  key={key}
                  className={`w-5 h-5 rounded-full ${val.dot} hover:scale-110 transition-transform ring-offset-1 ${
                    note.color === key ? "ring-2 ring-ink-700" : ""
                  }`}
                  onClick={() => {
                    onColorChange(note.id, key);
                    setShowColors(false);
                  }}
                  title={key}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Edit */}
          <button
            className="p-1.5 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-stone-100 transition-colors"
            onClick={() => onEdit(note)}
            title="Edit note"
          >
            <PenLine size={14} />
          </button>

          {/* Pin */}
          <button
            className={`p-1.5 rounded-lg transition-colors ${
              note.pinned
                ? "text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                : "text-ink-400 hover:text-ink-700 hover:bg-stone-100"
            }`}
            onClick={() => onTogglePin(note.id)}
            title={note.pinned ? "Unpin" : "Pin note"}
          >
            <Pin size={14} />
          </button>

          {/* Delete */}
          <button
            className="p-1.5 rounded-lg text-ink-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            onClick={() => onDelete(note.id)}
            title="Delete note"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
