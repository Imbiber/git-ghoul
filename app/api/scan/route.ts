import { NextRequest, NextResponse } from "next/server";
import { scanCodebaseForGhosts } from "@/lib/scanner";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { files } = body;

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: "No code files provided to summon the ghoul scanner." },
        { status: 400 }
      );
    }

    const scanResult = scanCodebaseForGhosts(files);

    return NextResponse.json(scanResult);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Graveyard scan ritual failed." },
      { status: 500 }
    );
  }
}
