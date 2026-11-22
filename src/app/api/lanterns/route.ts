import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface LanternWish {
  id: string;
  author: string;
  message: string;
  createdAt: string;
  hue: "amber" | "cyan" | "rose";
}

const DATA_FILE = path.join(process.cwd(), ".impeccable", "lanterns.json");

const SEED_LANTERNS: LanternWish[] = [
  {
    id: "seed-1",
    author: "Kevin",
    message: "Welcome to the midnight sky — click any stars to draw constellations or release a lantern!",
    createdAt: "Tonight",
    hue: "amber",
  },
  {
    id: "seed-2",
    author: "GT OMSCS Alum",
    message: "Go Jackets! Good luck with ML & distributed systems at Prime Video.",
    createdAt: "2h ago",
    hue: "cyan",
  },
  {
    id: "seed-3",
    author: "Seattle Builder",
    message: "StressAlpha's supply-chain DAG and scenario tree are super clean.",
    createdAt: "5h ago",
    hue: "amber",
  },
  {
    id: "seed-4",
    author: "TD Fan",
    message: "Made it to Wave 30 in PokéBastion TD with a Charizard + Gengar maze!",
    createdAt: "1d ago",
    hue: "rose",
  },
  {
    id: "seed-5",
    author: "Wuxia Watcher",
    message: "May all your deployments be zero-downtime and your drama endings satisfying.",
    createdAt: "2d ago",
    hue: "amber",
  },
];

function readLanterns(): LanternWish[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(SEED_LANTERNS, null, 2));
      return SEED_LANTERNS;
    }
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_LANTERNS;
  } catch {
    return SEED_LANTERNS;
  }
}

export async function GET() {
  return NextResponse.json({ lanterns: readLanterns() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = String(body?.message || "")
      .trim()
      .slice(0, 120);
    const author = String(body?.author || "Anonymous Traveler")
      .trim()
      .slice(0, 28) || "Anonymous Traveler";
    const hue: "amber" | "cyan" | "rose" = ["amber", "cyan", "rose"].includes(
      body?.hue
    )
      ? body.hue
      : "amber";

    if (!message) {
      return NextResponse.json(
        { error: "Please write a short wish before releasing your lantern." },
        { status: 400 }
      );
    }

    const current = readLanterns();
    const newLantern: LanternWish = {
      id: `lantern-${Date.now()}`,
      author,
      message,
      createdAt: "Just now",
      hue,
    };

    // shortcut: local JSON store capped at 50 lanterns, upgrade to Neon Postgres table if multi-region persistence is needed
    const updated = [newLantern, ...current].slice(0, 50);
    try {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2));
    } catch {
      // Read-only filesystem fallback (e.g. serverless runtime)
    }

    return NextResponse.json({ lantern: newLantern, lanterns: updated });
  } catch {
    return NextResponse.json(
      { error: "Could not release lantern." },
      { status: 400 }
    );
  }
}
