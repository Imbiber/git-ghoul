import { SpectralAnomaly } from "@/types";

export interface ScanResult {
  anomalies: SpectralAnomaly[];
  summary: {
    totalZombies: number;
    hauntedScore: number;
    spectralTodos: number;
    deadFunctions: number;
    cursedPatterns: number;
  };
}

/**
 * Local heuristic scanner for detecting zombie code, ancient TODOs, 
 * unreachable code, and commented-out tombstones.
 */
export function scanCodebaseForGhosts(
  files: { path: string; content: string }[]
): ScanResult {
  const anomalies: SpectralAnomaly[] = [];
  let todoCount = 0;
  let deadFuncCount = 0;
  let cursedCount = 0;

  files.forEach((file) => {
    const lines = file.content.split("\n");

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // 1. Check for Ancient Spectral TODOs & FIXMEs
      const todoMatch = trimmed.match(/\/\/\s*(TODO|FIXME|HACK|XXX|DEPRECATED|TEMP)[:\s]*(.*)/i);
      if (todoMatch) {
        todoCount++;
        const tag = todoMatch[1].toUpperCase();
        const msg = todoMatch[2] || "Unfinished business left behind";
        anomalies.push({
          id: `todo-${file.path}-${lineNum}`,
          category: "spectral_todo",
          severity: tag === "FIXME" || tag === "HACK" ? "cursed" : "haunted",
          filePath: file.path,
          lineRange: `L${lineNum}`,
          symbolOrSnippet: line.slice(0, 80),
          ghoulName: tag === "FIXME" ? "The Weeping Patch" : "The Phantom of Unfinished Tasks",
          spectralLament: `I was penned ages ago with promises of future refactoring... yet here I linger in eternal limbo: "${msg.slice(0, 60)}"`,
          suggestedExorcism: `Fulfill the vow or purge this ancient ${tag} note into oblivion.`
        });
      }

      // 2. Unreachable code after return / throw
      if (
        (trimmed.startsWith("return ") || trimmed === "return;" || trimmed.startsWith("throw ")) &&
        index < lines.length - 1
      ) {
        const nextLine = lines[index + 1].trim();
        if (
          nextLine &&
          !nextLine.startsWith("}") &&
          !nextLine.startsWith("case ") &&
          !nextLine.startsWith("default:") &&
          !nextLine.startsWith("//") &&
          !nextLine.startsWith("/*")
        ) {
          deadFuncCount++;
          anomalies.push({
            id: `unreachable-${file.path}-${lineNum}`,
            category: "zombie_code",
            severity: "possessed",
            filePath: file.path,
            lineRange: `L${lineNum + 1}`,
            symbolOrSnippet: nextLine.slice(0, 80),
            ghoulName: "The Nether-Reach Zombie",
            spectralLament: `Code condemned to walk in darkness: execution halted at line ${lineNum}, yet this spirit remains physically manifested on line ${lineNum + 1}!`,
            suggestedExorcism: "Excise the unreachable statements post-return to grant them final rest."
          });
        }
      }

      // 3. Commented-out Code Graveyard (Zombie code chunks)
      if (
        trimmed.startsWith("//") &&
        (trimmed.includes("function ") ||
          trimmed.includes("const ") ||
          trimmed.includes("let ") ||
          trimmed.includes("var ") ||
          trimmed.includes("import ") ||
          trimmed.includes("export "))
      ) {
        deadFuncCount++;
        anomalies.push({
          id: `commented-${file.path}-${lineNum}`,
          category: "zombie_code",
          severity: "haunted",
          filePath: file.path,
          lineRange: `L${lineNum}`,
          symbolOrSnippet: line.slice(0, 80),
          ghoulName: "The Corpse in Comment-Cloth",
          spectralLament: `A slain implementation embalmed inside double-slashes instead of deleted into Git's underworld.`,
          suggestedExorcism: "Banish the commented-out corpse. Git history remembers all; your live file needs no mausoleum."
        });
      }

      // 4. Cursed Complexity (Deep nesting / Callback abyss)
      const indent = line.search(/\S|$/);
      if (indent >= 24 && (trimmed.startsWith("if") || trimmed.startsWith("for") || trimmed.startsWith("while") || trimmed.includes(".then("))) {
        cursedCount++;
        anomalies.push({
          id: `abyss-${file.path}-${lineNum}`,
          category: "cursed_complexity",
          severity: "cursed",
          filePath: file.path,
          lineRange: `L${lineNum}`,
          symbolOrSnippet: line.slice(0, 80),
          ghoulName: "The Leviathan of Indentation",
          spectralLament: `Trapped 6 tiers deep in the abyss of nested callbacks. Souls enter, but readable control flow never leaves.`,
          suggestedExorcism: "Flatten with guard clauses or decompose into separate pure functions."
        });
      }
    });
  });

  const totalZombies = anomalies.length;
  // Calculate haunted score 0 - 100
  const hauntedScore = Math.min(100, Math.round(totalZombies * 12));

  return {
    anomalies,
    summary: {
      totalZombies,
      hauntedScore,
      spectralTodos: todoCount,
      deadFunctions: deadFuncCount,
      cursedPatterns: cursedCount
    }
  };
}
