# 🕷️ GitGhoul: The Haunted Codebase & Zombie Code Exorcist

> **"Where dead code rests, and clean commits rise."**  
> Built for **Hacktoberfest 2026 Open-Source AI Challenge: Week 4 — Ghost in the Machine**.  
> Powered by **Google Gemma 2** running 100% locally via **Ollama**.

---

## 👻 Overview

Every codebase accumulates ghosts:
- 🧟 **Zombie Code**: Dead functions and unreachable execution paths that slow down comprehension and bundle size.
- 🕯️ **Spectral TODOs**: Forgotten comments from 2021 like `// TODO: Temporary fix until next sprint` that haunt pull requests for years.
- ⚰️ **Comment-Cloth Corpses**: Old implementations commented out instead of deleted because developers fear losing history.
- 🌀 **Cursed Complexity**: Deep callback abysses and tangled logic that consume developer souls.

**GitGhoul** inspects codebases, renders a visual cemetery of dead code tombstones, and uses **Google Gemma 2** running on-device via Ollama to perform an **Exorcism**: generating clean refactors and unified git diffs ready for pull requests.

---

## 🔒 Why Open Innovation Matters

In the spirit of Hacktoberfest Week 4:
1. **Total Code Sovereignty & Privacy**: Source code contains trade secrets, unreleased features, internal keys, and IP. Cloud LLM APIs expose sensitive code to third-party servers. GitGhoul runs 100% on your laptop.
2. **Runs Offline with the Lights (and Internet) Off**: Works without an internet connection in air-gapped environments or remote retreats.
3. **Zero Token Tax**: Exorcise millions of lines of dead code without paying cloud API subscription fees.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Local AI Inference**: [Google Gemma 2](https://ollama.com/library/gemma2) running via [Ollama](https://ollama.com)
- **Styling**: Tailwind CSS (Gothic / Retro 8-bit dark aesthetic)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

---

## 🚀 Getting Started

### 1. Ensure Ollama & Gemma 2 are running locally
```bash
# Make sure Ollama is installed and running
ollama run gemma2
```

### 2. Install dependencies & run development server
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 License
MIT License. Built with 💜 for Hacktoberfest 2026.
