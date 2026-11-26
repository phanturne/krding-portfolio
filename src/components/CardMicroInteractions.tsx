"use client";

import React, { useEffect, useRef, useState } from "react";

type EeveeAnimMode =
  | "Idle"
  | "Walk"
  | "Run"
  | "Sleep"
  | "Wake"
  | "Sit"
  | "TailWhip"
  | "Rotate";

interface EeveeAnimSpec {
  sheet: string;
  w: number;
  h: number;
  frames: number;
  fps: number;
  singleRow: boolean;
  directional: boolean;
  offsetY: number;
  minLoops: number;
  maxLoops: number;
  label: string;
}

const EEVEE_ANIMS: Record<EeveeAnimMode, EeveeAnimSpec> = {
  Idle: {
    sheet: "Idle",
    w: 24,
    h: 32,
    frames: 2,
    fps: 2.5,
    singleRow: false,
    directional: true,
    offsetY: 0,
    minLoops: 3,
    maxLoops: 6,
    label: "idling",
  },
  Run: {
    sheet: "Walk",
    w: 40,
    h: 48,
    frames: 7,
    fps: 16,
    singleRow: false,
    directional: true,
    offsetY: 6,
    minLoops: 10,
    maxLoops: 18,
    label: "running",
  },
  Walk: {
    sheet: "Walk",
    w: 40,
    h: 48,
    frames: 7,
    fps: 10,
    singleRow: false,
    directional: true,
    offsetY: 6,
    minLoops: 8,
    maxLoops: 15,
    label: "trotting",
  },
  Sit: {
    sheet: "Sit",
    w: 24,
    h: 32,
    frames: 3,
    fps: 3.5,
    singleRow: true,
    directional: false,
    offsetY: 0,
    minLoops: 4,
    maxLoops: 7,
    label: "sitting",
  },
  TailWhip: {
    sheet: "TailWhip",
    w: 24,
    h: 32,
    frames: 12,
    fps: 13,
    singleRow: false,
    directional: true,
    offsetY: 0,
    minLoops: 2,
    maxLoops: 3,
    label: "wagging tail",
  },
  Rotate: {
    sheet: "Rotate",
    w: 24,
    h: 32,
    frames: 9,
    fps: 14,
    singleRow: false,
    directional: false,
    offsetY: 0,
    minLoops: 1,
    maxLoops: 2,
    label: "spinning",
  },
  Sleep: {
    sheet: "Sleep",
    w: 32,
    h: 24,
    frames: 2,
    fps: 1.5,
    singleRow: true,
    directional: false,
    offsetY: -2,
    minLoops: 6,
    maxLoops: 10,
    label: "sleeping",
  },
  Wake: {
    sheet: "Wake",
    w: 32,
    h: 32,
    frames: 6,
    fps: 7,
    singleRow: false,
    directional: true,
    offsetY: 0,
    minLoops: 1,
    maxLoops: 1,
    label: "waking up",
  },
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Weighted natural next-state picker (pauses in Idle between movement and rest)
function pickNextNaturalMode(current: EeveeAnimMode): EeveeAnimMode {
  if (current === "Sleep") return "Wake";
  if (current === "Wake") return "Idle";

  if (current === "Idle") {
    const roll = Math.random();
    if (roll < 0.55) return "Walk";
    if (roll < 0.75) return "Run";
    if (roll < 0.9) return "Sit";
    return "TailWhip";
  }

  if (current === "Sit") {
    const roll = Math.random();
    if (roll < 0.5) return "Idle";
    if (roll < 0.85) return "Walk";
    return "Sleep";
  }

  if (current === "TailWhip" || current === "Rotate") {
    return Math.random() < 0.6 ? "Idle" : "Walk";
  }

  // Currently Walk or Run
  const roll = Math.random();
  if (roll < 0.45) return "Idle";
  if (roll < 0.7) return current === "Run" ? "Walk" : "Run";
  if (roll < 0.88) return "Sit";
  return "Sleep";
}

const NATURAL_CLICK_REACTIONS: EeveeAnimMode[] = [
  "TailWhip",
  "Sit",
  "Rotate",
  "Run",
];

// PMDCollab 8-directional row indices: 0=Down (towards viewer), 2=Right, 6=Left
export function PmdSpriteCompanion() {
  const [mode, setMode] = useState<EeveeAnimMode>("Walk");

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const spriteRef = useRef<HTMLDivElement | null>(null);
  const modeRef = useRef<EeveeAnimMode>("Walk");
  const frameRef = useRef<number>(0);
  const loopCountRef = useRef<number>(0);
  const targetLoopsRef = useRef<number>(10);
  const posXRef = useRef<number>(72);
  const dirRef = useRef<"right" | "left">("left");
  const clickIdxRef = useRef<number>(0);
  const reducedMotionRef = useRef<boolean>(false);

  const syncSpritePosition = () => {
    if (!spriteRef.current) return;
    const spec = EEVEE_ANIMS[modeRef.current];
    const rowIdx = spec.singleRow
      ? 0
      : spec.directional
      ? dirRef.current === "right"
        ? 2
        : 6
      : 0;
    spriteRef.current.style.backgroundPosition = `-${
      frameRef.current * spec.w
    }px -${rowIdx * spec.h}px`;
  };

  useEffect(() => {
    const uniqueSheets = new Set(
      Object.values(EEVEE_ANIMS).map((s) => `/images/pmd/0133/${s.sheet}-Anim.png`)
    );
    uniqueSheets.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = prefersReducedMotion;

    if (prefersReducedMotion) {
      modeRef.current = "Sit";
      frameRef.current = 0;
      setMode("Sit");
      return;
    }

    let rafId = 0;
    let lastTime = performance.now();
    let accumulator = 0;

    const step = (now: number) => {
      if (document.hidden) {
        rafId = 0;
        return;
      }
      const dt = Math.min(100, now - lastTime);
      lastTime = now;
      accumulator += dt;

      // Smooth 60fps horizontal movement independent of sprite frame rate
      if (modeRef.current === "Walk" || modeRef.current === "Run") {
        const speedPerSec = modeRef.current === "Run" ? 11.5 : 6.2;
        const stepX =
          (dirRef.current === "right" ? 1 : -1) * speedPerSec * (dt / 1000);
        let nextX = posXRef.current + stepX;
        let flipped = false;
        if (nextX >= 92) {
          nextX = 92;
          dirRef.current = "left";
          flipped = true;
        } else if (nextX <= 8) {
          nextX = 8;
          dirRef.current = "right";
          flipped = true;
        }
        posXRef.current = nextX;
        if (buttonRef.current) {
          buttonRef.current.style.left = `${nextX}%`;
        }
        if (flipped) {
          syncSpritePosition();
        }
      }

      const spec = EEVEE_ANIMS[modeRef.current];
      const frameDuration = 1000 / spec.fps;

      if (accumulator >= frameDuration) {
        accumulator %= frameDuration;
        let nextFrame = frameRef.current + 1;
        let modeChanged = false;

        if (nextFrame >= spec.frames) {
          nextFrame = 0;
          loopCountRef.current += 1;
          if (loopCountRef.current >= targetLoopsRef.current) {
            loopCountRef.current = 0;
            const nextMode = pickNextNaturalMode(modeRef.current);
            modeRef.current = nextMode;
            const nextSpec = EEVEE_ANIMS[nextMode];
            targetLoopsRef.current = randomInt(
              nextSpec.minLoops,
              nextSpec.maxLoops
            );
            modeChanged = true;
          }
        }
        frameRef.current = nextFrame;
        syncSpritePosition();
        if (modeChanged) {
          setMode(modeRef.current);
        }
      }

      rafId = requestAnimationFrame(step);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      } else if (!rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(step);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleClickEevee = () => {
    if (reducedMotionRef.current) {
      const nextStatic: EeveeAnimMode =
        modeRef.current === "Sit" ? "Sleep" : "Sit";
      modeRef.current = nextStatic;
      frameRef.current = 0;
      setMode(nextStatic);
      syncSpritePosition();
      return;
    }
    const nextMode: EeveeAnimMode =
      modeRef.current === "Sleep"
        ? "Wake"
        : NATURAL_CLICK_REACTIONS[
            clickIdxRef.current % NATURAL_CLICK_REACTIONS.length
          ];
    clickIdxRef.current += 1;
    const nextSpec = EEVEE_ANIMS[nextMode];
    modeRef.current = nextMode;
    frameRef.current = 0;
    loopCountRef.current = 0;
    targetLoopsRef.current = randomInt(nextSpec.minLoops, nextSpec.maxLoops);

    setMode(nextMode);
    syncSpritePosition();
  };

  const spec = EEVEE_ANIMS[mode];
  const rowIdx = spec.singleRow
    ? 0
    : spec.directional
    ? dirRef.current === "right"
      ? 2
      : 6
    : 0;
  const sheetUrl = `/images/pmd/0133/${spec.sheet}-Anim.png`;

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClickEevee}
      style={{
        left: `${posXRef.current}%`,
      }}
      title="Click to interact with Eevee (Sprite: PMDCollab / Chunsoft)"
      aria-label={`Interactive Eevee pixel sprite (${spec.label}). Click to interact.`}
      className="absolute -bottom-9 -translate-x-1/2 min-w-[44px] min-h-[44px] flex items-end justify-center cursor-pointer group focus-visible:outline-accent z-20"
    >
      {/* Sleep Zzz Bubble */}
      {mode === "Sleep" && (
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-surface/95 border border-rule text-accent font-mono font-bold text-xs px-1.5 py-0.5 rounded-[4px] whitespace-nowrap bay-transition"
        >
          Zzz...
        </span>
      )}

      {/* 1.55x Scaled Eevee Sprite Positioned Cleanly Along the Bottom Border */}
      <div
        ref={spriteRef}
        style={{
          width: `${spec.w}px`,
          height: `${spec.h}px`,
          backgroundImage: `url(${sheetUrl})`,
          backgroundPosition: `-${frameRef.current * spec.w}px -${
            rowIdx * spec.h
          }px`,
          imageRendering: "pixelated",
          transform: `translateY(${spec.offsetY}px) scale(1.55)`,
          transformOrigin: "bottom center",
        }}
        className="transition-transform group-hover:scale-[1.68] drop-shadow-[0_3px_8px_rgba(2,5,12,0.85)]"
      />
    </button>
  );
}
