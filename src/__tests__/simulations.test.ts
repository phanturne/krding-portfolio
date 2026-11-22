import { describe, expect, it } from "vitest";
import {
  STOCK_PRESETS,
  computeStressedDcf,
  findShortestPath,
} from "../lib/simulations";

describe("StressAlpha deterministic DCF engine", () => {
  it("returns baseline intrinsic value matching preset when shocks are zero", () => {
    const nvda = STOCK_PRESETS[0];
    const res = computeStressedDcf(nvda, 0, 0, 0);
    expect(res.baselineIv).toBe(nvda.basePrice);
    expect(res.stressedIv).toBeCloseTo(nvda.basePrice, 1);
    expect(res.deltaPct).toBe(0);
    expect(res.baselineCurve).toHaveLength(5);
  });

  it("reduces stressed intrinsic value when WACC shock increases", () => {
    const nvda = STOCK_PRESETS[0];
    const shocked = computeStressedDcf(nvda, 175, -4, -3);
    expect(shocked.stressedIv).toBeLessThan(shocked.baselineIv);
    expect(shocked.deltaPct).toBeLessThan(0);
  });
});

describe("PokéBastion A* / BFS shortest path engine", () => {
  it("finds a valid path around placed walls and returns empty if blocked", () => {
    const walls = new Set<string>(["0,2", "1,2", "2,2"]);
    const path = findShortestPath(6, 10, walls, { r: 1, c: 0 }, { r: 1, c: 5 });
    expect(path.length).toBeGreaterThan(5);
    expect(path.some((p) => walls.has(`${p.r},${p.c}`))).toBe(false);

    // Completely wall off column 2
    for (let r = 0; r < 6; r++) walls.add(`${r},2`);
    const blocked = findShortestPath(6, 10, walls, { r: 1, c: 0 }, { r: 1, c: 5 });
    expect(blocked).toHaveLength(0);
  });
});
