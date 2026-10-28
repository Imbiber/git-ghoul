"use client";

import React, { useState } from "react";
import {
  Skull,
  Ghost,
  Flame,
  ShieldCheck,
  Terminal,
  FileCode2,
  AlertTriangle,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";
import { CURSED_REPOSITORIES_SAMPLES } from "@/lib/samples";
import { SpectralAnomaly, ExorcismResult } from "@/types";

export default function GitGhoulPage() {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
  const [customPath, setCustomPath] = useState("src/hauntedLogic.ts");
  const [customCode, setCustomCode] = useState(
    CURSED_REPOSITORIES_SAMPLES[0].files[0].content
  );
  const [isScanning, setIsScanning] = useState(false);
  const [anomalies, setAnomalies] = useState<SpectralAnomaly[]>([]);
  const [scanSummary, setScanSummary] = useState<{
    totalZombies: number;
    hauntedScore: number;
    spectralTodos: number;
    deadFunctions: number;
    cursedPatterns: number;
  } | null>(null);

  const [selectedAnomaly, setSelectedAnomaly] = useState<SpectralAnomaly | null>(null);
  const [isExorcising, setIsExorcising] = useState(false);
  const [exorcismResult, setExorcismResult] = useState<ExorcismResult | null>(null);

  // Trigger scanning ritual
  const handleScan = async (codeToScan = customCode, filePath = customPath) => {
    setIsScanning(true);
    setAnomalies([]);
    setScanSummary(null);
    setExorcismResult(null);
    setSelectedAnomaly(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          files: [{ path: filePath, content: codeToScan }],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setAnomalies(data.anomalies || []);
        setScanSummary(data.summary || null);
        if (data.anomalies && data.anomalies.length > 0) {
          setSelectedAnomaly(data.anomalies[0]);
        }
      }
    } catch (err) {
      console.error("Scan error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  // Perform Exorcism using local Gemma 2
  const handleExorcise = async () => {
    if (!selectedAnomaly) return;

    setIsExorcising(true);
    setExorcismResult(null);

    try {
      const res = await fetch("/api/exorcise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filePath: selectedAnomaly.filePath,
          code: customCode,
          anomaly: selectedAnomaly,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setExorcismResult(data);
        // Trigger celebratory confetti in Halloween purple/gold
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#a855f7", "#eab308", "#10b981", "#ffffff"],
        });
      }
    } catch (err) {
      console.error("Exorcism error:", err);
    } finally {
      setIsExorcising(false);
    }
  };

  // Load a preset sample
  const handleSelectSample = (idx: number) => {
    setSelectedSampleIndex(idx);
    const sample = CURSED_REPOSITORIES_SAMPLES[idx];
    const file = sample.files[0];
    setCustomPath(file.path);
    setCustomCode(file.content);
    handleScan(file.content, file.path);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <header className="relative border border-purple-900/60 bg-gradient-to-r from-purple-950/40 via-black to-indigo-950/40 rounded-2xl p-6 md:p-8 backdrop-blur shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Skull className="w-64 h-64 text-purple-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/50 text-purple-300 border border-purple-700/50">
              <Ghost className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
              <span>Hacktoberfest 2026: Ghost in the Machine</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>GitGhoul</span>
              <span className="text-purple-400 text-2xl md:text-3xl font-mono">🕷️</span>
            </h1>
            <p className="text-sm md:text-base text-gray-300 max-w-2xl leading-relaxed">
              The Haunted Codebase Exorcist. Detects dead functions, ancient 2021 TODO spirits,
              and zombie execution paths. Exorcises code into clean refactor PRs powered by
              <strong className="text-purple-300 ml-1">Google Gemma 2 (100% Local on-device via Ollama)</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 bg-black/60 border border-purple-800/40 p-4 rounded-xl text-xs text-gray-300 min-w-[220px]">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Lock className="w-4 h-4" />
              <span>100% On-Premise Privacy</span>
            </div>
            <p className="text-gray-400 leading-tight">
              Proprietary code never leaves your machine. $0 token fees.
            </p>
            <div className="flex items-center gap-1.5 text-purple-300 pt-1 border-t border-purple-900/40">
              <Cpu className="w-3.5 h-3.5" />
              <span>Model: Google Gemma 2 (Ollama)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Preset Cursed Samples Bar */}
      <section className="bg-black/40 border border-purple-900/40 rounded-xl p-4 flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-amber-500" /> Cursed Repositories:
        </span>
        {CURSED_REPOSITORIES_SAMPLES.map((sample, idx) => (
          <button
            key={sample.name}
            onClick={() => handleSelectSample(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedSampleIndex === idx
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "bg-purple-950/30 text-gray-300 hover:bg-purple-900/40 border border-purple-800/30"
            }`}
          >
            {sample.name}
          </button>
        ))}
      </section>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Code Editor & Cemetery Graveyard Stats (7 cols) */}
        <section className="lg:col-span-7 space-y-6">
          <div className="bg-black/60 border border-purple-900/50 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/30">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-purple-400" />
                <input
                  type="text"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                  className="bg-transparent text-sm font-mono text-purple-200 focus:outline-none border-b border-dashed border-purple-600/50 px-1"
                />
              </div>

              <button
                onClick={() => handleScan(customCode, customPath)}
                disabled={isScanning}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-xs font-semibold transition-all shadow-md shadow-purple-900/40 disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Summoning Scanner...</span>
                  </>
                ) : (
                  <>
                    <Skull className="w-3.5 h-3.5" />
                    <span>Scan for Ghosts</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Input Area */}
            <div className="relative">
              <textarea
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                rows={16}
                spellCheck={false}
                className="w-full bg-[#0a0a12] border border-purple-950 rounded-xl p-4 font-mono text-xs md:text-sm text-gray-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-purple-500/60 resize-y"
                placeholder="// Paste suspect codebase code here to detect ghosts..."
              />
            </div>
          </div>

          {/* Haunted Graveyard Tombstones Visualization */}
          {scanSummary && (
            <div className="border border-purple-900/60 bg-gradient-to-b from-purple-950/20 to-black/80 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🪦 Repository Graveyard</span>
                  <span className="text-xs font-normal text-purple-300">
                    ({scanSummary.totalZombies} restless spirits discovered)
                  </span>
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Possession Score:</span>
                  <span
                    className={`text-sm font-black px-2.5 py-0.5 rounded-full ${
                      scanSummary.hauntedScore > 50
                        ? "bg-red-950 text-red-400 border border-red-700/50"
                        : "bg-amber-950 text-amber-400 border border-amber-700/50"
                    }`}
                  >
                    {scanSummary.hauntedScore}% Haunted
                  </span>
                </div>
              </div>

              {/* Tombstone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {anomalies.map((ghoul) => (
                  <button
                    key={ghoul.id}
                    onClick={() => setSelectedAnomaly(ghoul)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      selectedAnomaly?.id === ghoul.id
                        ? "bg-purple-900/40 border-purple-400 shadow-md shadow-purple-500/20"
                        : "bg-black/40 border-purple-900/30 hover:border-purple-700/50 hover:bg-purple-950/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                        <Ghost className="w-3.5 h-3.5 text-purple-400" />
                        {ghoul.ghoulName}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 bg-purple-950/60 px-1.5 py-0.5 rounded">
                        {ghoul.lineRange}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 line-clamp-2 italic mb-2">
                      &quot;{ghoul.spectralLament}&quot;
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-400">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{ghoul.category.replace("_", " ").toUpperCase()}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Right Column: Exorcist Sanctum & Unified Git Diff (5 cols) */}
        <section className="lg:col-span-5 space-y-6">
          {selectedAnomaly ? (
            <div className="border border-purple-900/60 bg-black/70 rounded-2xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
                <div className="space-y-0.5">
                  <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                    Target for Exorcism
                  </span>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Skull className="w-4 h-4 text-purple-400" />
                    {selectedAnomaly.ghoulName}
                  </h3>
                </div>

                <button
                  onClick={handleExorcise}
                  disabled={isExorcising}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-700/30 disabled:opacity-50"
                >
                  {isExorcising ? (
                    <>
                      <Flame className="w-4 h-4 text-amber-300 animate-spin" />
                      <span>Exorcising via Gemma 2...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Exorcise Spirit</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-purple-950/20 border border-purple-900/30 rounded-xl p-3.5 space-y-2">
                <div className="text-xs text-purple-300 font-semibold">Spectral Lament:</div>
                <p className="text-xs text-gray-300 italic leading-relaxed">
                  &quot;{selectedAnomaly.spectralLament}&quot;
                </p>
                <div className="pt-2 border-t border-purple-900/30 text-[11px] text-gray-400">
                  <span className="text-gray-300 font-medium">Offending Snippet:</span>
                  <code className="block mt-1 font-mono text-[10px] text-red-300 bg-red-950/30 p-2 rounded border border-red-900/30 overflow-x-auto">
                    {selectedAnomaly.symbolOrSnippet}
                  </code>
                </div>
              </div>

              {/* Exorcism Result */}
              {exorcismResult && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Spirit Banished: {exorcismResult.ghoulBanished}</span>
                    </div>
                    <p className="text-gray-300">{exorcismResult.technicalSummary}</p>
                    <div className="text-[11px] text-purple-300 italic pt-1 border-t border-emerald-900/40">
                      &quot;{exorcismResult.reposeBlessing}&quot;
                    </div>
                  </div>

                  {/* Git Diff Output */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
                        <GitPullRequest className="w-3.5 h-3.5" /> Clean Refactor Git Diff
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {exorcismResult.modelUsed}
                      </span>
                    </div>
                    <pre className="p-3.5 rounded-xl bg-[#07070d] border border-purple-900/40 text-[11px] font-mono text-gray-200 overflow-x-auto max-h-60">
                      {exorcismResult.gitDiff}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-purple-900/40 border-dashed rounded-2xl p-10 text-center space-y-3 bg-black/30">
              <Ghost className="w-10 h-10 text-purple-600/60 mx-auto animate-pulse" />
              <h4 className="text-sm font-semibold text-gray-300">No Ghoul Selected</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Scan your code or select a cursed sample to locate spirits and begin the exorcism ritual.
              </p>
            </div>
          )}

          {/* Open-Source AI Architectural Manifest */}
          <div className="bg-black/40 border border-purple-900/30 rounded-2xl p-5 space-y-3 text-xs text-gray-400">
            <div className="flex items-center gap-2 text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Why Open Innovation Matters for GitGhoul</span>
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-gray-300 leading-relaxed">
              <li>
                <strong>Total Data Sovereignty:</strong> Source code, proprietary logic, and company secrets are never sent to commercial cloud AI vendors.
              </li>
              <li>
                <strong>Runs Offline in the Dark:</strong> Fully operates on your local machine via Ollama and Gemma 2 without internet connection.
              </li>
              <li>
                <strong>Zero Per-Token Toll:</strong> Refactor millions of lines of zombie code without recurring API bills.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
