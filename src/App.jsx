import { useState, useMemo } from "react";
import { Plus, StickyNote } from "lucide-react";
import { useNotes } from "./hooks/useNotes";
import { NoteCard } from "./components/NoteCard";
import { NoteEditor } from "./components/NoteEditor";
import { SearchBar } from "./components/SearchBar";
import { EmptyState } from "./components/EmptyState";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";

export default function App() {
  const { notes, totalCount, createNote, updateNote, deleteNote, togglePin } = useNotes();

  const [activeNoteId, setActiveNoteId] = useState(null);
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Filter notes by search term (title or content)
  const filteredNotes = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
  }, [notes, search]);

  const activeNote = notes.find((n) => n.id === activeNoteId);

  function handleNewNote() {
    const id = createNote();
    setActiveNoteId(id);
  }

  function handleDeleteRequest(id) {
    // If the note is empty, just delete without confirmation
    const note = notes.find((n) => n.id === id);
    if (!note?.title.trim() && !note?.content.trim()) {
      deleteNote(id);
      if (activeNoteId === id) setActiveNoteId(null);
    } else {
      setConfirmDeleteId(id);
    }
  }

  function handleConfirmDelete() {
    deleteNote(confirmDeleteId);
    if (activeNoteId === confirmDeleteId) setActiveNoteId(null);
    setConfirmDeleteId(null);
  }

  function handleColorChange(id, color) {
    updateNote(id, { color });
  }

  // Separate pinned from regular for section headers
  const pinnedNotes = filteredNotes.filter((n) => n.pinned);
  const otherNotes = filteredNotes.filter((n) => !n.pinned);

  return (
    <div className="min-h-screen bg-cream-100">
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 bg-cream-100/90 backdrop-blur-md border-b border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5 mr-auto">
            <div className="w-8 h-8 rounded-xl bg-ink-900 flex items-center justify-center flex-shrink-0">
              <StickyNote size={15} className="text-amber-400" />
            </div>
            <span className="font-semibold text-ink-900 text-sm tracking-tight">
              Notes
            </span>
            {totalCount > 0 && (
              <span className="text-xs text-ink-300 font-mono bg-stone-100 px-2 py-0.5 rounded-full">
                {totalCount}
              </span>
            )}
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xs">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* New note button */}
          <button
            onClick={handleNewNote}
            className="
              flex items-center gap-1.5 text-sm font-medium
              text-white bg-ink-900 hover:bg-ink-700
              px-3.5 py-2 rounded-xl
              transition-colors whitespace-nowrap
              shadow-sm
            "
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New note</span>
          </button>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {filteredNotes.length === 0 ? (
          <div className="grid grid-cols-1">
            <EmptyState
              isSearch={search.length > 0}
              onNewNote={handleNewNote}
            />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Pinned section */}
            {pinnedNotes.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-300 mb-3 px-1">
                  Pinned
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pinnedNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onEdit={(n) => setActiveNoteId(n.id)}
                      onDelete={handleDeleteRequest}
                      onTogglePin={togglePin}
                      onColorChange={handleColorChange}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* All / Other notes */}
            {otherNotes.length > 0 && (
              <section>
                {pinnedNotes.length > 0 && (
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-300 mb-3 px-1">
                    Other
                  </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onEdit={(n) => setActiveNoteId(n.id)}
                      onDelete={handleDeleteRequest}
                      onTogglePin={togglePin}
                      onColorChange={handleColorChange}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* ── Note editor modal ── */}
      {activeNote && (
        <NoteEditor
          note={activeNote}
          onUpdate={updateNote}
          onDelete={handleDeleteRequest}
          onClose={() => {
            // Clean up empty notes when closing
            if (!activeNote.title.trim() && !activeNote.content.trim()) {
              deleteNote(activeNote.id);
            }
            setActiveNoteId(null);
          }}
          onTogglePin={togglePin}
        />
      )}

      {/* ── Delete confirmation modal ── */}
      {confirmDeleteId && (
        <DeleteConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
}
