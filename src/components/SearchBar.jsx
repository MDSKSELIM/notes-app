import { Search, X } from "lucide-react";

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes…"
        className="
          w-full pl-9 pr-8 py-2.5
          bg-white border border-stone-200 rounded-xl
          text-sm text-ink-700 placeholder:text-ink-300
          focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent
          transition-shadow
        "
      />
      {value && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-600 transition-colors"
          onClick={() => onChange("")}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
