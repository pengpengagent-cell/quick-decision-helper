import { NextRequest, NextResponse } from "next/server";

const OPTIONS: Record<string, string[]> = {
  breakfast: [
    "Kaya toast + soft-boiled eggs",
    "Overnight oats with banana",
    "Nasi lemak",
    "Avocado toast",
    "Prata with curry",
  ],
  learning: [
    "Prompt engineering techniques",
    "Next.js App Router deep-dive",
    "LangGraph multi-agent patterns",
    "TypeScript advanced types",
    "Redis caching strategies",
  ],
  activity: [
    "30-min walk, no phone",
    "Build a side project prototype",
    "Read 20 pages of a book",
    "Meditate for 10 minutes",
    "Cook something new",
  ],
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "learning";
  const daily = searchParams.get("daily") === "true";

  const options = OPTIONS[category] || OPTIONS.learning;

  let idx: number;
  if (daily) {
    const now = new Date();
    const seed =
      now.getFullYear() * 10000 +
      (now.getMonth() + 1) * 100 +
      now.getDate() +
      Object.keys(OPTIONS).indexOf(category);
    idx = Math.floor(seededRandom(seed) * options.length);
  } else {
    idx = Math.floor(Math.random() * options.length);
  }

  return NextResponse.json({
    category,
    result: options[idx],
    daily,
    generatedAt: new Date().toISOString(),
  });
}
