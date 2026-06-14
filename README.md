# 📝 Notes App

A clean, fast notes app built with **React + Vite + Tailwind CSS**. All data is stored in the browser's `localStorage` — no backend, no signup, no data leaving your device.

---

## 🔗 Links

| | URL |
|---|---|
| **Live Demo** | `https://your-app.vercel.app` ← replace after deploying |
| **GitHub Repo** | `https://github.com/your-username/notes-app` ← replace |

---

## ✨ Features

- **Create** notes with a title and body
- **Edit** notes inline with autosave
- **Delete** notes (with confirmation for non-empty notes)
- **Pin** important notes to the top
- **Color-code** notes (6 color options)
- **Search** across titles and content in real time
- **Word count** shown while editing
- Keyboard shortcut: `Esc` to close editor
- Fully responsive (mobile → desktop)
- Data persists across page refreshes via `localStorage`

---

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| UI framework | React 18 (Vite) |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| Storage | Browser `localStorage` |
| Hosting | Vercel (recommended) |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/notes-app.git
cd notes-app

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build
```

---

## 📁 Project Structure

```
notes-app/
├── src/
│   ├── components/
│   │   ├── NoteCard.jsx          # Card shown in the grid
│   │   ├── NoteEditor.jsx        # Full-screen edit modal
│   │   ├── SearchBar.jsx         # Search input
│   │   ├── EmptyState.jsx        # Shown when no notes exist
│   │   └── DeleteConfirmModal.jsx # Safety dialog before deleting
│   ├── hooks/
│   │   └── useNotes.js           # All CRUD logic + localStorage sync
│   ├── utils/
│   │   └── formatDate.js         # Human-friendly timestamps
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind directives + base styles
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow the prompts)
vercel

# Paste the URL into README above ↑
```

---

## 📝 Notes on Design Decisions

- **No Bootstrap** — styled entirely with Tailwind utility classes
- **No external state library** — React `useState` + a custom hook is enough here
- **Autosave** — every keystroke syncs to `localStorage` via a `useEffect` in the editor
- **Empty note cleanup** — closing an untouched new note silently removes it
- **Pinned notes** sort to the top, then by last-edited timestamp
