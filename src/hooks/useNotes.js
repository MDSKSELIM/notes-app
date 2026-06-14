import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "notes-app-v1";

// Generate a simple unique ID without external deps
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// Load from localStorage safely
function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Persist to localStorage
function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error("Could not save notes:", err);
  }
}

export function useNotes() {
  const [notes, setNotes] = useState(() => loadNotes());

  // Keep localStorage in sync whenever notes change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const createNote = useCallback(() => {
    const newNote = {
      id: generateId(),
      title: "",
      content: "",
      color: "default",
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote.id;
  }, []);

  const updateNote = useCallback((id, changes) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...changes, updatedAt: new Date().toISOString() }
          : note
      )
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  const togglePin = useCallback((id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  }, []);

  // Pinned notes float to the top
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return {
    notes: sortedNotes,
    totalCount: notes.length,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
  };
}
