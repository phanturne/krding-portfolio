export interface DcfStockPreset {
  ticker: string;
  name: string;
  basePrice: number;
  baseFcfPerShare: number;
  baseWaccPct: number;
  baseMarginPct: number;
  baseGrowthPct: number;
  sector: string;
}

export const STOCK_PRESETS: DcfStockPreset[] = [
  {
    ticker: "NVDA",
    name: "NVIDIA Corp.",
    basePrice: 184.2,
    baseFcfPerShare: 6.45,
    baseWaccPct: 9.2,
    baseMarginPct: 54.0,
    baseGrowthPct: 24.0,
    sector: "AI Compute // Semiconductors",
  },
  {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    basePrice: 218.5,
    baseFcfPerShare: 8.1,
    baseWaccPct: 8.8,
    baseMarginPct: 24.5,
    baseGrowthPct: 16.5,
    sector: "Cloud & Prime Video // Hyperscale",
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corp.",
    basePrice: 448.0,
    baseFcfPerShare: 14.2,
    baseWaccPct: 8.5,
    baseMarginPct: 44.0,
    baseGrowthPct: 15.0,
    sector: "Enterprise Cloud // AI Foundry",
  },
  {
    ticker: "META",
    name: "Meta Platforms",
    basePrice: 592.4,
    baseFcfPerShare: 21.8,
    baseWaccPct: 9.0,
    baseMarginPct: 38.5,
    baseGrowthPct: 17.5,
    sector: "Social Graph // Open Weights",
  },
];

export interface DcfStressResult {
  baselineIv: number;
  stressedIv: number;
  deltaPct: number;
  baselineCurve: number[];
  stressedCurve: number[];
}

export function computeStressedDcf(
  preset: DcfStockPreset,
  waccShockBps: number,
  marginDeltaPct: number,
  growthDeltaPct: number
): DcfStressResult {
  const terminalGrowth = 0.032;
  const years = 5;

  const projectTrajectory = (waccPct: number, marginPct: number, growthPct: number) => {
    const wacc = Math.max(0.055, waccPct / 100);
    const marginRatio = Math.max(0.25, marginPct / preset.baseMarginPct);
    const g = growthPct / 100;

    let pvSum = 0;
    const curve: number[] = [];
    let currentFcf = preset.baseFcfPerShare * marginRatio;

    for (let t = 1; t <= years; t++) {
      const yearG = g * (1 - (t - 1) * 0.08);
      currentFcf = currentFcf * (1 + yearG);
      const pv = currentFcf / Math.pow(1 + wacc, t);
      pvSum += pv;
      curve.push(Number((pvSum * 2.8 + preset.basePrice * 0.35).toFixed(2)));
    }

    const terminalValue =
      (currentFcf * (1 + terminalGrowth)) / Math.max(0.025, wacc - terminalGrowth);
    const pvTerminal = terminalValue / Math.pow(1 + wacc, years);
    const rawIv = pvSum + pvTerminal;
    return { rawIv, curve };
  };

  const baseRun = projectTrajectory(
    preset.baseWaccPct,
    preset.baseMarginPct,
    preset.baseGrowthPct
  );
  const scaleFactor = preset.basePrice / baseRun.rawIv;

  const stressedRun = projectTrajectory(
    preset.baseWaccPct + waccShockBps / 100,
    preset.baseMarginPct + marginDeltaPct,
    preset.baseGrowthPct + growthDeltaPct
  );

  const baselineIv = Number(preset.basePrice.toFixed(2));
  const stressedIv = Number((stressedRun.rawIv * scaleFactor).toFixed(2));
  const deltaPct = Number((((stressedIv - baselineIv) / baselineIv) * 100).toFixed(1));

  return {
    baselineIv,
    stressedIv,
    deltaPct,
    baselineCurve: baseRun.curve.map((v) => Number((v * scaleFactor * 0.55).toFixed(1))),
    stressedCurve: stressedRun.curve.map((v) => Number((v * scaleFactor * 0.55).toFixed(1))),
  };
}

export interface GridCoord {
  r: number;
  c: number;
}

/**
 * Deterministic shortest-path solver (BFS/A* on uniform 4-connected grid)
 * matching PokéBastion TD's open-map wall pathfinding invariant.
 */
export function findShortestPath(
  rows: number,
  cols: number,
  walls: Set<string>,
  start: GridCoord,
  goal: GridCoord
): GridCoord[] {
  const key = (r: number, c: number) => `${r},${c}`;
  if (walls.has(key(start.r, start.c)) || walls.has(key(goal.r, goal.c))) {
    return [];
  }

  const queue: GridCoord[] = [start];
  const parent = new Map<string, GridCoord | null>();
  parent.set(key(start.r, start.c), null);

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  while (queue.length > 0) {
    const curr = queue.shift()!;
    if (curr.r === goal.r && curr.c === goal.c) {
      const path: GridCoord[] = [];
      let trace: GridCoord | null = curr;
      while (trace) {
        path.push(trace);
        trace = parent.get(key(trace.r, trace.c)) ?? null;
      }
      return path.reverse();
    }

    for (const [dr, dc] of dirs) {
      const nr = curr.r + dr;
      const nc = curr.c + dc;
      const nk = key(nr, nc);
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        !walls.has(nk) &&
        !parent.has(nk)
      ) {
        parent.set(nk, curr);
        queue.push({ r: nr, c: nc });
      }
    }
  }

  return [];
}
