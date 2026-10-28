export type GhoulSeverity = "haunted" | "cursed" | "possessed";

export type GhoulCategory = 
  | "zombie_code"        // Dead functions, unreachable paths
  | "spectral_todo"       // Forgotten ancient TODOs / FIXMEs
  | "decayed_dependency"  // Abandoned / vulnerable packages
  | "cursed_complexity";  // Nested callback hell, spaghetti code

export interface SpectralAnomaly {
  id: string;
  category: GhoulCategory;
  severity: GhoulSeverity;
  filePath: string;
  lineRange: string;
  symbolOrSnippet: string;
  ghoulName: string; // e.g. "Count VoidReturns", "The Ghost of Dead Imports"
  spectralLament: string; // Eerie lore / what this zombie says
  suggestedExorcism: string; // Action to take
}

export interface ExorcismResult {
  exorcisedCode: string;
  gitDiff: string;
  ghoulBanished: string;
  reposeBlessing: string;
  technicalSummary: string;
  modelUsed: string;
}

export interface RepoGraveyardStats {
  totalZombies: number;
  hauntedScore: number; // 0 - 100 (100 is completely possessed)
  decayedDepsCount: number;
  ancientTodosCount: number;
  unreachableCodeCount: number;
  tombstonesCount: number;
}
