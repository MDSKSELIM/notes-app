# Notes App

A clean, fast notes app built with **React + Vite + Tailwind CSS**. All data is stored in the browser's **localStorage** — no backend, no signup, no data leaving your device.

---

## Links

URL  
**Live Demo** https://notes-app-six-swart-69.vercel.app/  
**GitHub Repo** https://github.com/MDSKSELIM/notes-app

---

## Features

- **Create** notes with a title and body
- **Edit** notes inline with autosave
- **Delete** notes (with confirmation for non-empty notes)
- **Pin** important notes to the top
- **Color-code** notes (6 color options)
- **Search** across titles and content in real time
- **Word count** shown while editing
- Keyboard shortcut: Esc to close editor
- Fully responsive (mobile to desktop)
- Data persists across page refreshes via localStorage

---

## Tech Stack

| Layer | Choice |
|---|---|
| UI framework | React 18 (Vite) |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| Storage | Browser localStorage |
| Hosting | Vercel |

---

## Getting Started

```bash
git clone https://github.com/MDSKSELIM/notes-app.git
cd notes-app
npm install
npm run dev
```

---

## Notes on Design Decisions

- **No Bootstrap** — styled entirely with Tailwind utility classes
- **No external state library** — React useState + a custom hook is enough here
- **Autosave** — every keystroke syncs to localStorage via a useEffect in the editor
- **Empty note cleanup** — closing an untouched new note silently removes it
- **Pinned notes** sort to the top, then by last-edited timestamp