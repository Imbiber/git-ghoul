import { NextRequest, NextResponse } from "next/server";

const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
const GEMMA_MODEL = process.env.GEMMA_MODEL || "gemma2";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filePath, code, anomaly } = body;

    if (!code) {
      return NextResponse.json(
        { error: "No cursed code provided for the exorcism ritual." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are GitGhoul, the Supreme Code Exorcist and protector of developer repos in the realm of open-source AI.
A developer has brought you a cursed, possessed codebase with zombie code, ancient forgotten TODOs, or unreachable paths.
Your mission:
1. Conduct an exorcism to cleanly purify the code: remove dead branches, satisfy or purge ancient TODOs, eliminate unreachable returns, and improve clarity.
2. Produce a clean, production-grade refactored version of the code.
3. Formulate a standard git diff showing lines purged (-) and clean lines introduced (+).
4. Provide a witty, spooky "Repose Blessing" honoring the theme "Ghost in the Machine" (Día de los Muertos / Halloween).
5. Explain technical improvements concisely.

Return strictly a valid JSON object matching this schema without markdown fences:
{
  "ghoulBanished": "<Name of the banished entity, e.g. Count VoidReturns>",
  "technicalSummary": "<What specific lines or logic were refactored and why>",
  "reposeBlessing": "<Poetic, spooky, humorous epitaph sending the dead code to rest in peace>",
  "gitDiff": "<A realistic git diff block with --- a/file +++ b/file and +/- lines>",
  "exorcisedCode": "<The complete cleansed source code>"
}`;

    const userPrompt = `Target File: ${filePath || "unknown.ts"}
Anomaly Identified:
- Category: ${anomaly?.category || "zombie_code"}
- Ghoul Name: ${anomaly?.ghoulName || "Unnamed Specter"}
- Lament: ${anomaly?.spectralLament || "I haunt these lines."}

Cursed Code to Exorcise:
\`\`\`
${code}
\`\`\`

Perform the exorcism now. Return ONLY the raw JSON object.`;

    let exorcismData: any = null;

    try {
      // Call local Ollama running Gemma 2
      const ollamaRes = await fetch(`${OLLAMA_HOST}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: GEMMA_MODEL,
          prompt: `${systemPrompt}\n\n${userPrompt}`,
          stream: false,
          format: "json",
          options: {
            temperature: 0.3,
            top_p: 0.9,
          },
        }),
      });

      if (ollamaRes.ok) {
        const ollamaJson = await ollamaRes.json();
        const rawResponse = ollamaJson.response?.trim() || "";
        try {
          exorcismData = JSON.parse(rawResponse);
          exorcismData.modelUsed = `Google Gemma 2 (${GEMMA_MODEL}) via Ollama [100% Local Inference]`;
        } catch {
          // Fallback parsing if JSON was wrapped in markdown
          const cleaned = rawResponse.replace(/```json/g, "").replace(/```/g, "").trim();
          exorcismData = JSON.parse(cleaned);
          exorcismData.modelUsed = `Google Gemma 2 (${GEMMA_MODEL}) via Ollama [100% Local Inference]`;
        }
      }
    } catch (ollamaErr) {
      console.warn("Local Ollama connection failed or timed out:", ollamaErr);
    }

    // Fallback heuristic exorcism if Ollama is paused/busy
    if (!exorcismData) {
      const cleansed = code
        .split("\n")
        .filter((l: string) => {
          const t = l.trim();
          return (
            !t.match(/\/\/\s*(TODO|FIXME|HACK|XXX):/i) &&
            !t.startsWith("// function ") &&
            !t.startsWith("// const ")
          );
        })
        .join("\n");

      exorcismData = {
        ghoulBanished: anomaly?.ghoulName || "The Phantom of Stale Branches",
        technicalSummary: "Purged orphaned commented-out tokens, resolved dead code barriers, and consecrated pure execution paths.",
        reposeBlessing: "May these banished lines rest quietly in Git's eternal commit log. In the spirit of Día de los Muertos, we remember them, but keep our repository light.",
        gitDiff: `--- a/${filePath || "cursed.ts"}\n+++ b/${filePath || "cursed.ts"}\n@@ -1,5 +1,4 @@\n-${anomaly?.symbolOrSnippet || "// TODO: Ancient legacy artifact"}\n+/* Purified by GitGhoul */`,
        exorcisedCode: cleansed,
        modelUsed: "GitGhoul Pure Heuristics Engine (Offline Sanctum)",
      };
    }

    return NextResponse.json(exorcismData);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Exorcism ritual interrupted by an unknown specter." },
      { status: 500 }
    );
  }
}
