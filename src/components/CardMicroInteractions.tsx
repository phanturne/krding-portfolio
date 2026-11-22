"use client";

import React, { useEffect, useRef, useState } from "react";

type EeveeAnimMode =
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
  minLoops: number;
  maxLoops: number;
  label: string;
}

const EEVEE_ANIMS: Record<EeveeAnimMode, EeveeAnimSpec> = {
  Run: {
    sheet: "Charge",
    w: 24,
    h: 40,
    frames: 10,
    fps: 17,
    singleRow: false,
    minLoops: 14,
    maxLoops: 24,
    label: "running",
  },
  Walk: {
    sheet: "Walk",
    w: 40,
    h: 48,
    frames: 7,
    fps: 11,
    singleRow: false,
    minLoops: 12,
    maxLoops: 20,
    label: "trotting",
  },
  Sit: {
    sheet: "Sit",
    w: 24,
    h: 32,
    frames: 3,
    fps: 4,
    singleRow: true,
    minLoops: 5,
    maxLoops: 9,
    label: "sitting",
  },
  TailWhip: {
    sheet: "TailWhip",
    w: 24,
    h: 32,
    frames: 12,
    fps: 13,
    singleRow: false,
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
    minLoops: 2,
    maxLoops: 3,
    label: "spinning",
  },
  Sleep: {
    sheet: "Sleep",
    w: 32,
    h: 24,
    frames: 2,
    fps: 1.5,
    singleRow: true,
    minLoops: 7,
    maxLoops: 12,
    label: "sleeping",
  },
  Wake: {
    sheet: "Wake",
    w: 32,
    h: 32,
    frames: 6,
    fps: 7,
    singleRow: false,
    minLoops: 1,
    maxLoops: 2,
    label: "waking up",
  },
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Weighted natural next-state picker (no combat jump or barking animations)
function pickNextNaturalMode(current: EeveeAnimMode): EeveeAnimMode {
  if (current === "Sleep") return "Wake";
  if (current === "Wake") return Math.random() < 0.65 ? "Walk" : "Run";

  if (current === "Sit" || current === "TailWhip" || current === "Rotate") {
    return Math.random() < 0.6 ? "Run" : "Walk";
  }

  const roll = Math.random();
  if (roll < 0.36) return current === "Run" ? "Walk" : "Run";
  if (roll < 0.58) return "Sit";
  if (roll < 0.74) return "TailWhip";
  if (roll < 0.84) return "Rotate";
  return "Sleep";
}

const NATURAL_CLICK_REACTIONS: EeveeAnimMode[] = [
  "TailWhip",
  "Rotate",
  "Sit",
  "Run",
];

// PMDCollab 8-directional row indices: 0=Down (towards viewer), 2=Right, 6=Left
export function PmdSpriteCompanion() {
  const [renderState, setRenderState] = useState<{
    mode: EeveeAnimMode;
    frame: number;
    posX: number;
    dir: "right" | "left";
  }>({
    mode: "Run",
    frame: 0,
    posX: 72,
    dir: "left",
  });

  const modeRef = useRef<EeveeAnimMode>("Run");
  const frameRef = useRef<number>(0);
  const loopCountRef = useRef<number>(0);
  const targetLoopsRef = useRef<number>(18);
  const posXRef = useRef<number>(72);
  const dirRef = useRef<"right" | "left">("left");
  const clickIdxRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      modeRef.current = "Sit";
      frameRef.current = 0;
      setRenderState({ mode: "Sit", frame: 0, posX: 72, dir: "left" });
      return;
    }

    let rafId = 0;
    let lastTime = performance.now();
    let accumulator = 0;

    const step = (now: number) => {
      const dt = Math.min(100, now - lastTime);
      lastTime = now;
      accumulator += dt;

      const spec = EEVEE_ANIMS[modeRef.current];
      const frameDuration = 1000 / spec.fps;

      if (accumulator >= frameDuration) {
        accumulator %= frameDuration;
        let nextFrame = frameRef.current + 1;

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
          }
        }
        frameRef.current = nextFrame;

        if (modeRef.current === "Walk" || modeRef.current === "Run") {
          const speedStep = modeRef.current === "Run" ? 0.92 : 0.62;
          const stepX = dirRef.current === "right" ? speedStep : -speedStep;
          let nextX = posXRef.current + stepX;
          if (nextX >= 92) {
            nextX = 92;
            dirRef.current = "left";
          } else if (nextX <= 8) {
            nextX = 8;
            dirRef.current = "right";
          }
          posXRef.current = nextX;
        }

        setRenderState({
          mode: modeRef.current,
          frame: frameRef.current,
          posX: posXRef.current,
          dir: dirRef.current,
        });
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleClickEevee = () => {
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

    setRenderState({
      mode: nextMode,
      frame: 0,
      posX: posXRef.current,
      dir: dirRef.current,
    });
  };

  const spec = EEVEE_ANIMS[renderState.mode];
  const isMoving = renderState.mode === "Walk" || renderState.mode === "Run";
  const rowIdx = spec.singleRow
    ? 0
    : isMoving
    ? renderState.dir === "right"
      ? 2
      : 6
    : 0;
  const sheetUrl = `/images/pmd/0133/${spec.sheet}-Anim.png`;

  return (
    <button
      type="button"
      onClick={handleClickEevee}
      style={{
        left: `${renderState.posX}%`,
      }}
      title="Click to interact with Eevee (Sprite: PMDCollab / Chunsoft)"
      aria-label={`Interactive Eevee pixel sprite (${spec.label}). Click to interact.`}
      className="absolute -bottom-3 -translate-x-1/2 min-w-[44px] min-h-[44px] flex items-end justify-center cursor-pointer group focus-visible:outline-primeCyan z-20"
    >
      {/* Sleep Zzz Bubble */}
      {renderState.mode === "Sleep" && (
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cardNavy/95 border border-skyLight/40 text-skyLight font-mono font-bold text-xs px-1.5 py-0.5 rounded-[4px] shadow-md whitespace-nowrap xray-bay-transition"
        >
          Zzz...
        </span>
      )}

      {/* 1.55x Scaled Eevee Sprite Positioned Cleanly Along the Bottom Border */}
      <div
        style={{
          width: `${spec.w}px`,
          height: `${spec.h}px`,
          backgroundImage: `url(${sheetUrl})`,
          backgroundPosition: `-${renderState.frame * spec.w}px -${
            rowIdx * spec.h
          }px`,
          imageRendering: "pixelated",
          transform: "scale(1.55)",
          transformOrigin: "bottom center",
        }}
        className="transition-transform group-hover:scale-[1.68] drop-shadow-[0_3px_8px_rgba(2,5,12,0.85)]"
      />
    </button>
  );
}
