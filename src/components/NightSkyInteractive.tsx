"use client";

import React, { useEffect, useRef, useState } from "react";

export interface LanternQuote {
  id: string;
  quote: string;
  attribution: string;
  theme: string;
  hue: "amber" | "gold" | "rose";
}

export const INSPIRATIONAL_LANTERNS: LanternQuote[] = [
  {
    id: "q-1",
    quote: "A journey of a thousand miles begins beneath one's feet.",
    attribution: "Laozi · Dao De Jing (Ch. 64)",
    theme: "Momentum",
    hue: "amber",
  },
  {
    id: "q-2",
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    attribution: "Will Durant · On Aristotle",
    theme: "Craft",
    hue: "gold",
  },
  {
    id: "q-3",
    quote: "The impediment to action advances action. What stands in the way becomes the way.",
    attribution: "Marcus Aurelius · Meditations (V.20)",
    theme: "Resilience",
    hue: "amber",
  },
  {
    id: "q-4",
    quote: "Still water runs deep; a calm mind sees the whole horizon.",
    attribution: "Classical Proverb",
    theme: "Clarity",
    hue: "rose",
  },
  {
    id: "q-5",
    quote: "Simplicity is about subtracting the obvious and adding the meaningful.",
    attribution: "John Maeda · The Laws of Simplicity",
    theme: "Focus",
    hue: "gold",
  },
  {
    id: "q-6",
    quote: "No wind favors him who has no destined port—set your course and enjoy the sail.",
    attribution: "Michel de Montaigne · Essays",
    theme: "Direction",
    hue: "amber",
  },
  {
    id: "q-7",
    quote: "Small daily improvements over time lead to stunning results.",
    attribution: "Kaizen Principle",
    theme: "Growth",
    hue: "gold",
  },
  {
    id: "q-8",
    quote: "Even the darkest night will end and the sun will rise.",
    attribution: "Victor Hugo · Les Misérables",
    theme: "Hope",
    hue: "rose",
  },
  {
    id: "q-9",
    quote: "He who has a why to live for can bear almost any how.",
    attribution: "Friedrich Nietzsche",
    theme: "Purpose",
    hue: "gold",
  },
  {
    id: "q-10",
    quote: "First, solve the problem. Then, write the code.",
    attribution: "John Johnson",
    theme: "Engineering",
    hue: "amber",
  },
  {
    id: "q-11",
    quote: "Do not hurry; do not rest. Persevere with quiet determination.",
    attribution: "Johann Wolfgang von Goethe",
    theme: "Patience",
    hue: "rose",
  },
  {
    id: "q-12",
    quote: "What we know is a drop, what we do not know is an ocean.",
    attribution: "Isaac Newton",
    theme: "Curiosity",
    hue: "gold",
  },
  {
    id: "q-13",
    quote: "To attain knowledge, add things every day. To attain wisdom, remove things every day.",
    attribution: "Laozi · Dao De Jing (Ch. 48)",
    theme: "Wisdom",
    hue: "gold",
  },
  {
    id: "q-14",
    quote: "The best way to predict the future is to invent it.",
    attribution: "Alan Kay",
    theme: "Creation",
    hue: "amber",
  },
  {
    id: "q-15",
    quote: "Be like water making its way through cracks—adjust to the object, and you shall find a way around or through it.",
    attribution: "Bruce Lee",
    theme: "Adaptability",
    hue: "rose",
  },
  {
    id: "q-16",
    quote: "Luck is what happens when preparation meets opportunity.",
    attribution: "Seneca · Letters from a Stoic",
    theme: "Readiness",
    hue: "gold",
  },
  {
    id: "q-17",
    quote: "Real generosity toward the future lies in giving all to the present.",
    attribution: "Albert Camus · The Rebel",
    theme: "Presence",
    hue: "amber",
  },
  {
    id: "q-18",
    quote: "Simplicity is prerequisite for reliability.",
    attribution: "Edsger W. Dijkstra",
    theme: "Architecture",
    hue: "gold",
  },
  {
    id: "q-19",
    quote: "Fall seven times, stand up eight.",
    attribution: "Japanese Proverb (Nanakorobi Yaoki)",
    theme: "Grit",
    hue: "rose",
  },
  {
    id: "q-20",
    quote: "It is not that we have a short time to live, but that we waste a lot of it.",
    attribution: "Seneca · On the Shortness of Life",
    theme: "Intent",
    hue: "amber",
  },
  {
    id: "q-21",
    quote: "Smooth seas do not make skillful sailors.",
    attribution: "Maritime Proverb",
    theme: "Mastery",
    hue: "gold",
  },
  {
    id: "q-22",
    quote: "The moon does not fight. It keeps to its course, and by its very nature, gently influences the tides.",
    attribution: "Deng Ming-Dao",
    theme: "Equanimity",
    hue: "rose",
  },
  {
    id: "q-23",
    quote: "Knowing others is intelligence; knowing yourself is true wisdom.",
    attribution: "Laozi · Dao De Jing (Ch. 33)",
    theme: "Insight",
    hue: "amber",
  },
  {
    id: "q-24",
    quote: "Make it work, make it right, make it fast.",
    attribution: "Kent Beck",
    theme: "Execution",
    hue: "gold",
  },
  {
    id: "q-25",
    quote: "When you arise in the morning, think of what a precious privilege it is to be alive—to breathe, to think, to enjoy.",
    attribution: "Marcus Aurelius · Meditations (II.1)",
    theme: "Gratitude",
    hue: "rose",
  },
  {
    id: "q-26",
    quote: "Trees that are slow to grow bear the best fruit.",
    attribution: "Molière",
    theme: "Endurance",
    hue: "amber",
  },
  {
    id: "q-27",
    quote: "In the midst of winter, I found there was, within me, an invincible summer.",
    attribution: "Albert Camus · Return to Tipasa",
    theme: "Warmth",
    hue: "gold",
  },
  {
    id: "q-28",
    quote: "Controlling complexity is the essence of computer programming.",
    attribution: "Brian Kernighan",
    theme: "Clarity",
    hue: "amber",
  },
  {
    id: "q-29",
    quote: "One who plants trees, knowing that he will never sit in their shade, has started to understand the meaning of life.",
    attribution: "Rabindranath Tagore",
    theme: "Stewardship",
    hue: "rose",
  },
  {
    id: "q-30",
    quote: "Waste no more time arguing about what a good person should be. Be one.",
    attribution: "Marcus Aurelius · Meditations (X.16)",
    theme: "Character",
    hue: "gold",
  },
  {
    id: "q-31",
    quote: "The bamboo that bends is stronger than the oak that resists.",
    attribution: "Japanese Proverb",
    theme: "Flexibility",
    hue: "amber",
  },
  {
    id: "q-32",
    quote: "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened.",
    attribution: "Dhammapada",
    theme: "Kindness",
    hue: "rose",
  },
];

interface EmberParticle {
  offsetX: number;
  offsetY: number;
  size: number;
  phase: number;
}

interface ActiveLantern {
  item: LanternQuote;
  x: number;
  y: number;
  baseX: number;
  scale: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  embers: EmberParticle[];
  fadeAlpha: number;
}

interface SakuraPetal {
  x: number;
  y: number;
  spawnXRatio: number;
  vy: number;
  baseVx: number;
  scale: number;
  alpha: number;
  yaw: number;
  yawSpeed: number;
  pitch: number;
  pitchSpeed: number;
  roll: number;
  rollSpeed: number;
  phase: number;
  variant: "blush" | "coral" | "mauve";
  plane: "far" | "mid" | "near";
  state: "falling" | "floating";
  waterTargetRatio: number;
  floatAge: number;
  maxFloatAge: number;
}

const HUE_PALETTES: Record<
  "amber" | "gold" | "rose",
  {
    outerGlow: string;
    canopyTop: string;
    canopyMid: string;
    canopyBot: string;
    rimStroke: string;
    flameCore: string;
    flameMid: string;
    emberColor: string;
    badgeClass: string;
  }
> = {
  amber: {
    outerGlow: "rgba(245, 158, 11, 0.36)",
    canopyTop: "rgba(124, 45, 18, 0.93)",
    canopyMid: "rgba(234, 88, 12, 0.93)",
    canopyBot: "rgba(254, 240, 138, 0.97)",
    rimStroke: "#fbbf24",
    flameCore: "#ffffff",
    flameMid: "#fde047",
    emberColor: "#fbbf24",
    badgeClass: "text-[#fde047]",
  },
  gold: {
    outerGlow: "rgba(251, 191, 36, 0.36)",
    canopyTop: "rgba(146, 64, 14, 0.93)",
    canopyMid: "rgba(245, 158, 11, 0.94)",
    canopyBot: "rgba(254, 249, 195, 0.98)",
    rimStroke: "#fde047",
    flameCore: "#ffffff",
    flameMid: "#fef08a",
    emberColor: "#fde047",
    badgeClass: "text-[#fde047]",
  },
  rose: {
    outerGlow: "rgba(251, 113, 133, 0.34)",
    canopyTop: "rgba(136, 19, 55, 0.92)",
    canopyMid: "rgba(225, 29, 72, 0.92)",
    canopyBot: "rgba(254, 205, 211, 0.97)",
    rimStroke: "#fda4af",
    flameCore: "#ffffff",
    flameMid: "#fecdd3",
    emberColor: "#fda4af",
    badgeClass: "text-[#fda4af]",
  },
};

function drawNotchedPetalPath(ctx: CanvasRenderingContext2D) {
  const w = 5.6;
  const h = 8.2;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.bezierCurveTo(-w * 1.15, h * 0.3, -w * 0.95, -h * 0.65, -w * 0.36, -h);
  ctx.lineTo(0, -h * 0.7);
  ctx.lineTo(w * 0.36, -h);
  ctx.bezierCurveTo(w * 0.95, -h * 0.65, w * 1.15, h * 0.3, 0, h);
  ctx.closePath();
}

function createPetalGradient(
  ctx: CanvasRenderingContext2D,
  variant: "blush" | "coral" | "mauve",
  warmProximity: number
) {
  const h = 8.2;
  const grad = ctx.createLinearGradient(0, -h, 0, h);
  if (warmProximity > 0.25 || variant === "coral") {
    grad.addColorStop(0, "#fff1f2");
    grad.addColorStop(0.55, "#fda4af");
    grad.addColorStop(1, "#fb7185");
  } else if (variant === "mauve") {
    grad.addColorStop(0, "#fdf2f8");
    grad.addColorStop(0.6, "#f472b6");
    grad.addColorStop(1, "#db2777");
  } else {
    grad.addColorStop(0, "#fff1f2");
    grad.addColorStop(0.55, "#fbcfe8");
    grad.addColorStop(1, "#f472b6");
  }
  return grad;
}

function drawFallingSakuraPetal(
  ctx: CanvasRenderingContext2D,
  p: SakuraPetal,
  warmProximity: number
) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.yaw);

  const rawCosPitch = Math.cos(p.pitch);
  const signPitch = rawCosPitch >= 0 ? 1 : -1;
  const clampedPitch = signPitch * Math.max(0.44, Math.abs(rawCosPitch));
  const rollScale = (0.82 + Math.sin(p.roll * 0.5 + 1.2) * 0.18) * p.scale;

  ctx.scale(clampedPitch * p.scale, rollScale);

  const edgeSpecular = (1 - Math.abs(rawCosPitch)) * 0.14;
  ctx.globalAlpha = Math.min(0.75, p.alpha + edgeSpecular + warmProximity * 0.18);

  if (warmProximity > 0.15) {
    ctx.shadowColor = "rgba(251, 191, 36, 0.38)";
    ctx.shadowBlur = 4;
  }

  drawNotchedPetalPath(ctx);
  ctx.fillStyle = createPetalGradient(ctx, p.variant, warmProximity);
  ctx.fill();
  ctx.restore();
}

function drawFloatingSakuraPetal(
  ctx: CanvasRenderingContext2D,
  p: SakuraPetal,
  warmProximity: number
) {
  const fadeIn = Math.min(1, p.floatAge / 45);
  const fadeStart = p.maxFloatAge * 0.72;
  const fadeOut =
    p.floatAge > fadeStart
      ? Math.max(0, 1 - (p.floatAge - fadeStart) / (p.maxFloatAge - fadeStart))
      : 1;
  const floatFade = Math.min(fadeIn, fadeOut);

  if (floatFade <= 0.01) return;

  // 1. Expanding foreshortened elliptical ripple rings on water touchdown + periodic gentle bobbing ripples
  const rippleCycle = p.floatAge < 130 ? p.floatAge / 130 : ((p.floatAge - 130) % 220) / 220;
  const isTouchdown = p.floatAge < 130;
  if (isTouchdown || rippleCycle < 0.75) {
    const progress = isTouchdown ? rippleCycle : rippleCycle / 0.75;
    const maxRadius = isTouchdown ? 18 : 11;
    const rx = (3.2 + progress * maxRadius) * p.scale;
    const ry = rx * 0.32;
    const baseOpacity = isTouchdown ? 0.42 : 0.22;
    const rippleAlpha = (1 - progress) * baseOpacity * floatFade;

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, rx, ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle =
      warmProximity > 0.12
        ? `rgba(253, 224, 71, ${rippleAlpha})`
        : `rgba(186, 230, 253, ${rippleAlpha})`;
    ctx.lineWidth = isTouchdown ? 0.95 : 0.75;
    ctx.stroke();

    if (isTouchdown && p.floatAge > 20) {
      const p2 = (p.floatAge - 20) / 110;
      const rx2 = (2.2 + p2 * 11.5) * p.scale;
      const ry2 = rx2 * 0.32;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, rx2, ry2, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(251, 207, 232, ${(1 - p2) * 0.28 * floatFade})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }
    ctx.restore();
  }

  // 2. Subtle Water Contact Reflection underneath the floating petal
  ctx.save();
  ctx.translate(p.x, p.y + 1.6 * p.scale);
  ctx.scale(p.scale * 1.0, p.scale * 0.45);
  ctx.rotate(p.yaw);
  ctx.globalAlpha = Math.min(0.45, p.alpha * 0.55) * floatFade;
  drawNotchedPetalPath(ctx);
  ctx.fillStyle = warmProximity > 0.18 ? "#fbbf24" : "#db2777";
  ctx.fill();
  ctx.restore();

  // 3. Foreshortened 2.5D Petal Resting Flat on the Lake Surface (Hana-Ikada)
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.scale(p.scale * 1.0, p.scale * 0.45);
  ctx.rotate(p.yaw);
  ctx.globalAlpha = Math.min(0.92, p.alpha + 0.32 + warmProximity * 0.2) * floatFade;
  drawNotchedPetalPath(ctx);
  ctx.fillStyle = createPetalGradient(ctx, p.variant, warmProximity);
  ctx.fill();
  ctx.restore();
}

function drawVolumetricLantern(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  hue: "amber" | "gold" | "rose",
  tick: number,
  phase: number,
  isHovered: boolean,
  fadeAlpha: number
) {
  if (fadeAlpha <= 0.01) return;
  const pal = HUE_PALETTES[hue] || HUE_PALETTES.amber;
  const flicker = 0.93 + Math.sin(tick * 6.5 + phase) * 0.07;
  const s = scale * (isHovered ? 1.16 : 1);

  ctx.save();
  ctx.translate(x, y);
  const tilt = isHovered ? 0 : Math.sin(tick * 1.1 + phase) * 0.065;
  ctx.rotate(tilt);
  ctx.globalAlpha = fadeAlpha;

  // 1. Sculpted Kongming Hot-Air Balloon Silhouette Path
  const wTop = 10.5 * s;
  const wShoulder = 18 * s;
  const wBase = 11 * s;
  const hTop = -21 * s;
  const hShoulder = -7 * s;
  const hBase = 14.5 * s;

  ctx.beginPath();
  ctx.moveTo(-wTop, hTop + 3 * s);
  ctx.quadraticCurveTo(0, hTop - 2.5 * s, wTop, hTop + 3 * s);
  ctx.bezierCurveTo(
    wShoulder * 1.05,
    hTop + 7 * s,
    wShoulder,
    hShoulder,
    wBase,
    hBase
  );
  ctx.quadraticCurveTo(0, hBase + 2.5 * s, -wBase, hBase);
  ctx.bezierCurveTo(
    -wShoulder,
    hShoulder,
    -wShoulder * 1.05,
    hTop + 7 * s,
    -wTop,
    hTop + 3 * s
  );
  ctx.closePath();

  // 2. Translucent Rice-Paper Vertical Gradient + Shape-Conforming Warm Shadow Blur
  ctx.save();
  ctx.shadowColor = pal.rimStroke;
  ctx.shadowBlur = (isHovered ? 22 : 14) * s * flicker;
  ctx.shadowOffsetY = 2 * s;
  const bodyGrad = ctx.createLinearGradient(0, hTop, 0, hBase);
  bodyGrad.addColorStop(0, pal.canopyTop);
  bodyGrad.addColorStop(0.52, pal.canopyMid);
  bodyGrad.addColorStop(1, pal.canopyBot);
  ctx.fillStyle = bodyGrad;
  ctx.fill();
  ctx.restore();

  // 3. Internal radial light bloom clipped strictly inside the paper walls
  ctx.save();
  ctx.clip();
  const innerBloom = ctx.createRadialGradient(
    0,
    hBase - 3 * s,
    1 * s,
    0,
    hBase - 5 * s,
    22 * s * flicker
  );
  innerBloom.addColorStop(0, pal.flameCore);
  innerBloom.addColorStop(0.38, pal.flameMid);
  innerBloom.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.globalAlpha = 0.85 * flicker * fadeAlpha;
  ctx.fillStyle = innerBloom;
  ctx.fillRect(
    -wShoulder * 1.2,
    hTop - 5 * s,
    wShoulder * 2.4,
    hBase - hTop + 10 * s
  );

  // Delicate curved bamboo paper seam ribs
  ctx.globalAlpha = 0.28 * fadeAlpha;
  ctx.strokeStyle = pal.canopyTop;
  ctx.lineWidth = 0.9 * s;
  for (const ribFactor of [-0.52, 0, 0.52]) {
    ctx.beginPath();
    ctx.moveTo(wTop * ribFactor * 0.7, hTop + 1 * s);
    ctx.quadraticCurveTo(
      wShoulder * ribFactor * 1.15,
      hShoulder,
      wBase * ribFactor * 0.85,
      hBase
    );
    ctx.stroke();
  }
  ctx.restore();

  // Silhouette rim highlight
  ctx.strokeStyle = pal.rimStroke;
  ctx.lineWidth = (isHovered ? 1.4 : 0.95) * s;
  ctx.globalAlpha = (isHovered ? 0.95 : 0.72) * fadeAlpha;
  ctx.stroke();

  // 4. Elliptical 3D Bamboo Base Ring
  ctx.globalAlpha = fadeAlpha;
  ctx.beginPath();
  ctx.ellipse(0, hBase, wBase, 3.2 * s, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#090d16";
  ctx.fill();
  ctx.strokeStyle = pal.rimStroke;
  ctx.lineWidth = 1.2 * s;
  ctx.stroke();

  // 5. Crisp Flickering Heart Flame inside the open base
  ctx.save();
  ctx.shadowColor = pal.flameMid;
  ctx.shadowBlur = 8 * s * flicker;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(0, hBase + 0.3 * s, 2.4 * s * flicker, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Hanging silk tassel
  ctx.beginPath();
  ctx.moveTo(0, hBase + 3 * s);
  ctx.quadraticCurveTo(
    Math.sin(tick * 2.5 + phase) * 2.5 * s,
    hBase + 7.5 * s,
    Math.sin(tick * 2.5 + phase) * 3.5 * s,
    hBase + 11.5 * s
  );
  ctx.strokeStyle = pal.rimStroke;
  ctx.lineWidth = 0.95 * s;
  ctx.globalAlpha = 0.75 * fadeAlpha;
  ctx.stroke();

  ctx.restore();
}

function drawMidnightLakeAndReflections(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  waterY: number,
  lakeHeight: number,
  tick: number,
  lanterns: ActiveLantern[],
  floatingPetals: SakuraPetal[]
) {
  // Only render when the lake at the bottom of the page is within the viewport
  if (waterY >= height + 24) return;
  const waterDepth = lakeHeight;

  // 1. Atmospheric Nocturnal Lake Gradient with a soft misty shoreline transition
  const featherTop = waterY - 48;
  const lakeGrad = ctx.createLinearGradient(0, featherTop, 0, waterY + waterDepth);
  lakeGrad.addColorStop(0, "rgba(9, 11, 15, 0)");
  lakeGrad.addColorStop(0.28, "rgba(18, 32, 50, 0.34)");
  lakeGrad.addColorStop(0.54, "rgba(21, 38, 60, 0.68)");
  lakeGrad.addColorStop(0.78, "rgba(14, 25, 42, 0.88)");
  lakeGrad.addColorStop(1, "rgba(8, 14, 24, 0.96)");
  ctx.fillStyle = lakeGrad;
  ctx.fillRect(0, featherTop, width, height - featherTop);

  // Soft moonlit water shimmer (feathered radial perspective bands + subtle off-center moon column)
  ctx.save();
  const moonCenterX = width * 0.68;
  for (let i = 0; i < 16; i++) {
    const t = (i + 0.5) / 16;
    const perspective = t * t; // Tighter near horizon, wider in foreground
    const ry = waterY + 8 + perspective * (waterDepth * 0.84);
    if (ry > height + 10) continue;

    // Alternate between a soft off-center moonlight shimmer column and wide ambient lake swells
    const inMoonColumn = i % 3 !== 0;
    const spread = inMoonColumn
      ? (Math.sin(i * 2.7) * 0.5) * (34 + perspective * 140)
      : (Math.sin(i * 4.1) * 0.5) * width * 0.72;
    const sway = Math.sin(tick * 0.55 + i * 1.4) * (6 + perspective * 14);
    const rx = (inMoonColumn ? moonCenterX : width * 0.5) + spread + sway;

    const rw = inMoonColumn
      ? (18 + (i % 4) * 10) * (0.55 + perspective * 1.25)
      : (55 + (i % 3) * 28) * (0.7 + perspective * 0.8);
    const rh = 1.2 + perspective * 2.2;

    const pulse = 0.72 + Math.sin(tick * 1.1 + i * 1.9) * 0.28;
    const baseAlpha = inMoonColumn ? 0.095 : 0.038;
    const alpha = baseAlpha * pulse * (1 - perspective * 0.35);

    ctx.save();
    ctx.translate(rx, ry);
    ctx.scale(rw, rh);
    const shimmer = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    shimmer.addColorStop(0, `rgba(196, 222, 248, ${alpha.toFixed(3)})`);
    shimmer.addColorStop(0.45, `rgba(162, 196, 232, ${(alpha * 0.45).toFixed(3)})`);
    shimmer.addColorStop(1, "rgba(162, 196, 232, 0)");
    ctx.fillStyle = shimmer;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();

  // 2. Cohesive Single-Lantern Water Reflections (1 lantern above = 1 soft mirrored reflection on the water)
  for (const l of lanterns) {
    if (l.fadeAlpha <= 0.02 || l.y > waterY - 14) continue;
    const pal = HUE_PALETTES[l.item.hue] || HUE_PALETTES.amber;
    const dy = Math.max(2, waterY - l.y);
    const maxReflectAltitude = Math.max(360, height * 0.52);
    if (dy >= maxReflectAltitude) continue;

    const altitudeFactor = Math.pow(1 - dy / maxReflectAltitude, 1.6);
    const reflAlpha = l.fadeAlpha * altitudeFactor * 0.56;
    if (reflAlpha <= 0.015) continue;

    const flicker = 0.93 + Math.sin(tick * 6.5 + l.phase) * 0.07;
    const normAlt = Math.min(1, dy / maxReflectAltitude);
    const swayOffset = Math.sin(tick * 1.8 + l.phase) * 1.6 * l.scale;
    const rx = l.x + swayOffset;
    const ry = waterY + 16 + normAlt * (waterDepth * 0.48);
    if (ry > height + 20) continue;

    // 2A. Single Mirrored Lantern Canopy Reflection Bloom
    ctx.save();
    ctx.translate(rx, ry);
    ctx.scale(1.15, 0.85);
    const outerR = 19 * l.scale * flicker;
    const subGlow = ctx.createRadialGradient(0, 0, 1, 0, 0, outerR);
    subGlow.addColorStop(0, pal.flameMid);
    subGlow.addColorStop(0.38, pal.canopyMid);
    subGlow.addColorStop(0.72, pal.outerGlow);
    subGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.globalAlpha = reflAlpha * 0.55;
    ctx.fillStyle = subGlow;
    ctx.beginPath();
    ctx.arc(0, 0, outerR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2B. Single Warm Heart-Flame Core + 2 Delicate Water Ripple Streaks
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(
      rx,
      ry,
      6.8 * l.scale * flicker,
      3.5 * l.scale * flicker,
      0,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = pal.flameMid;
    ctx.globalAlpha = reflAlpha * 0.42;
    ctx.fill();

    for (const offset of [-4.0, 4.0]) {
      const streakWave = Math.sin(tick * 2.2 + l.phase + offset) * 2.0 * l.scale;
      ctx.beginPath();
      ctx.ellipse(
        rx + streakWave,
        ry + offset * l.scale,
        9.0 * l.scale,
        0.9,
        0,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = pal.rimStroke;
      ctx.globalAlpha = reflAlpha * 0.28;
      ctx.fill();
    }
    ctx.restore();
  }
  ctx.globalAlpha = 1;

  // 3. Render Hana-Ikada (Sakura Petals Floating & Rippling on the Lake Surface)
  for (const p of floatingPetals) {
    if (p.y > height + 16) continue;
    let warmProx = 0;
    for (const l of lanterns) {
      const dx = Math.abs(p.x - l.x);
      if (dx < 52 && l.fadeAlpha > 0.1) {
        const prox = (1 - dx / 52) * l.fadeAlpha;
        if (prox > warmProx) warmProx = prox;
      }
    }
    drawFloatingSakuraPetal(ctx, p, warmProx);
  }
}

export function NightSkyInteractive({
  skyEnabled,
}: {
  skyEnabled: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const lanternsRef = useRef<ActiveLantern[]>([]);
  const fallingPetalsRef = useRef<SakuraPetal[]>([]);
  const floatingPetalsRef = useRef<SakuraPetal[]>([]);

  useEffect(() => {
    if (!skyEnabled) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const applyCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applyCanvasSize();

    // 22 horizontal lanes uniformly spanning the full width (4%..96% in ~4.3% steps),
    // interleaved so consecutive vertical slots alternate smoothly across outer, mid-inner, and center sky
    const SKY_LANES = [
      0.04, 0.52, 0.23, 0.77, 0.13, 0.87, 0.36, 0.64, 0.18, 0.82, 0.44, 0.58,
      0.085, 0.915, 0.31, 0.69, 0.155, 0.845, 0.40, 0.605, 0.27, 0.955,
    ];

    const ACTIVE_LANTERN_COUNT = SKY_LANES.length;
    let quoteQueueCursor = ACTIVE_LANTERN_COUNT;

    const getLakeHeight = (h: number) =>
      Math.min(140, Math.max(100, Math.round(h * 0.15)));
    // Keep the midnight lake permanently visible at the bottom of the viewport
    const getWaterY = (h: number) => h - getLakeHeight(h);

    const topLimit = -18;
    const initialLakeH = getLakeHeight(height);
    const initialBottomLimit = height - initialLakeH - 26;
    const totalSpan = initialBottomLimit - topLimit;

    lanternsRef.current = Array.from(
      { length: ACTIVE_LANTERN_COUNT },
      (_, idx) => {
        const item =
          INSPIRATIONAL_LANTERNS[idx % INSPIRATIONAL_LANTERNS.length];
        const lx = SKY_LANES[idx] * width;
        const depthScale =
          idx % 3 === 0 ? 1.14 : idx % 3 === 1 ? 0.98 : 0.88;
        const slotY =
          topLimit + ((idx + 0.5) / ACTIVE_LANTERN_COUNT) * totalSpan;
        return {
          item,
          baseX: lx,
          x: lx,
          y: slotY,
          scale: depthScale,
          swayAmp: 10 + (idx % 3) * 4,
          swayFreq: 0.35 + (idx % 4) * 0.09,
          phase: idx * 1.7,
          fadeAlpha: 1,
          embers: Array.from({ length: 4 }, (_, eIdx) => ({
            offsetX: (eIdx - 1.5) * 3,
            offsetY: 16 + eIdx * 6,
            size: 1.2 - eIdx * 0.2,
            phase: eIdx * 1.3,
          })),
        };
      }
    );

    // Separate phase-locked falling sky petals (26) from dedicated floating water petals (16)
    // so falling petals never clump into bursts or leave empty gaps in the sky.
    const PETAL_X_LANES = [
      0.02, 0.96, 0.05, 0.93, 0.09, 0.89, 0.13, 0.85, 0.035, 0.945, 0.07,
      0.91, 0.16, 0.82, 0.28, 0.72, 0.48, 0.52,
    ];

    const FALLING_PETAL_COUNT = 34;
    const FLOATING_PETAL_COUNT = 16;
    const petalTopLimit = -20;
    const petalSpan = height + 40;

    const fallingPetals: SakuraPetal[] = Array.from(
      { length: FALLING_PETAL_COUNT },
      (_, idx) => {
        const isNear = idx < 5;
        const isFar = idx >= 24;
        const plane: "far" | "mid" | "near" = isNear
          ? "near"
          : isFar
          ? "far"
          : "mid";
        const scale = isNear
          ? 0.98 + (idx % 2) * 0.05
          : isFar
          ? 0.74 + (idx % 3) * 0.04
          : 0.85 + (idx % 3) * 0.04;
        const alpha = isNear
          ? 0.44
          : isFar
          ? 0.34 + (idx % 3) * 0.04
          : 0.48 + (idx % 3) * 0.05;
        const variant: "blush" | "coral" | "mauve" = isFar
          ? "mauve"
          : idx % 3 === 0
          ? "coral"
          : "blush";
        const spawnXRatio =
          PETAL_X_LANES[idx % PETAL_X_LANES.length] +
          ((idx * 13) % 7 - 3) * 0.006;
        const slotY =
          petalTopLimit + ((idx + 0.5) / FALLING_PETAL_COUNT) * petalSpan;

        return {
          x: spawnXRatio * width,
          y: slotY,
          spawnXRatio,
          vy: 0.23,
          baseVx: (spawnXRatio > 0.5 ? -1 : 1) * (0.08 + (idx % 3) * 0.03),
          scale,
          alpha,
          yaw: (idx * 0.9) % (Math.PI * 2),
          yawSpeed: (idx % 2 === 0 ? 1 : -1) * (0.004 + (idx % 3) * 0.002),
          pitch: (idx * 1.3) % (Math.PI * 2),
          pitchSpeed: 0.012 + (idx % 4) * 0.004,
          roll: (idx * 0.7) % (Math.PI * 2),
          rollSpeed: 0.009 + (idx % 3) * 0.003,
          phase: idx * 1.1,
          variant,
          plane,
          state: "falling",
          waterTargetRatio: 0,
          floatAge: 0,
          maxFloatAge: 1000,
        };
      }
    );

    const floatingLakePetals: SakuraPetal[] = Array.from(
      { length: FLOATING_PETAL_COUNT },
      (_, idx) => {
        const isNear = idx < 3;
        const isFar = idx >= 11;
        const plane: "far" | "mid" | "near" = isNear
          ? "near"
          : isFar
          ? "far"
          : "mid";
        const scale = isNear ? 0.96 : isFar ? 0.74 : 0.85;
        const alpha = isNear ? 0.42 : isFar ? 0.3 : 0.44;
        const variant: "blush" | "coral" | "mauve" = isFar
          ? "mauve"
          : idx % 3 === 0
          ? "coral"
          : "blush";
        const waterTargetRatio = isFar
          ? 0.08 + ((idx * 17) % 14) * 0.01
          : isNear
          ? 0.3 + ((idx * 23) % 18) * 0.01
          : 0.16 + ((idx * 31) % 22) * 0.01;
        const maxFloatAge = 960 + (idx % 6) * 110;
        const spawnXRatio = 0.04 + ((idx + 0.5) / FLOATING_PETAL_COUNT) * 0.92;

        return {
          x: spawnXRatio * width,
          y: height - initialLakeH + waterTargetRatio * initialLakeH,
          spawnXRatio,
          vy: 0,
          baseVx: 0,
          scale,
          alpha,
          yaw: (idx * 1.1) % (Math.PI * 2),
          yawSpeed: 0,
          pitch: 0,
          pitchSpeed: 0,
          roll: 0,
          rollSpeed: 0,
          phase: idx * 1.4,
          variant,
          plane,
          state: "floating",
          waterTargetRatio,
          floatAge: Math.floor((idx / FLOATING_PETAL_COUNT) * maxFloatAge),
          maxFloatAge,
        };
      }
    );

    fallingPetalsRef.current = fallingPetals;
    floatingPetalsRef.current = floatingLakePetals;

    let tick = 0;
    let lastHoverId: string | null = null;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const UNIFORM_LANTERN_SPEED = 0.35;

    const paintScene = (stepPhysics: boolean) => {
      if (stepPhysics && !prefersReducedMotion) {
        tick += 0.016;
      }
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const lakeH = getLakeHeight(height);
      const waterY = getWaterY(height);
      // Lanterns launch well above the water surface (waterY - 28) when the lake is in view, or near the bottom of the screen when at the top of the page
      const curBottomLimit = Math.min(height - 16, waterY - 28);

      // 1. Velvet Midnight Sky Wash & Top-Corner Yozakura (Cherry Blossom Canopy) Glow
      const moonBeam = ctx.createRadialGradient(
        width * 0.82,
        height * 0.08,
        10,
        width * 0.75,
        height * 0.25,
        Math.max(width, height) * 0.55
      );
      moonBeam.addColorStop(0, "rgba(251, 191, 36, 0.055)");
      moonBeam.addColorStop(0.45, "rgba(16, 35, 71, 0.045)");
      moonBeam.addColorStop(1, "rgba(6, 11, 20, 0)");
      ctx.fillStyle = moonBeam;
      ctx.fillRect(0, 0, width, height);

      for (const canopyX of [width * 0.06, width * 0.94]) {
        const canopyGlow = ctx.createRadialGradient(
          canopyX,
          -10,
          10,
          canopyX,
          40,
          Math.min(width, height) * 0.36
        );
        canopyGlow.addColorStop(0, "rgba(244, 114, 182, 0.07)");
        canopyGlow.addColorStop(0.55, "rgba(251, 113, 133, 0.025)");
        canopyGlow.addColorStop(1, "rgba(6, 11, 20, 0)");
        ctx.fillStyle = canopyGlow;
        ctx.fillRect(0, 0, width, height * 0.45);
      }

      // Step floating water petals on the lake surface
      if (stepPhysics && !prefersReducedMotion) {
        for (const p of floatingPetalsRef.current) {
          p.y = waterY + p.waterTargetRatio * lakeH;
          p.floatAge += 1;
          p.x += (0.08 + Math.sin(tick * 0.4 + p.phase) * 0.05) * p.scale;
          p.yaw += Math.sin(tick * 0.6 + p.phase) * 0.0018;

          if (p.x > width + 20) p.x = -16;
          if (p.floatAge >= p.maxFloatAge) {
            p.floatAge = 0;
            p.x = p.spawnXRatio * width;
          }
        }
      } else {
        for (const p of floatingPetalsRef.current) {
          p.y = waterY + p.waterTargetRatio * lakeH;
        }
      }

      // Step falling sky petals (uniform vertical spacing, zero per-frame allocations)
      const UNIFORM_PETAL_FALL_SPEED = 0.23;
      const stepAndDrawFallingPetals = (targetPlane: "far" | "mid" | "near") => {
        for (const p of fallingPetalsRef.current) {
          if (p.plane !== targetPlane) continue;

          let maxLanternProximity = 0;
          let thermalVx = 0;

          for (const l of lanternsRef.current) {
            const dx = p.x - l.x;
            const dy = p.y - l.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 115) {
              const prox = 1 - dist / 115;
              if (prox > maxLanternProximity) maxLanternProximity = prox;
            }
            if (dy < 10 && dy > -65 && Math.abs(dx) < 38) {
              thermalVx = (dx >= 0 ? 1 : -1) * 0.09;
            }
          }

          if (stepPhysics && !prefersReducedMotion) {
            const breezeVx =
              p.baseVx +
              Math.sin(tick * 0.22) * 0.1 +
              Math.cos(tick * 0.95 + p.phase) * 0.22;
            const fallWave = Math.sin(tick * 0.9 + p.phase) * 0.03;
            p.x += breezeVx + thermalVx;
            p.y += UNIFORM_PETAL_FALL_SPEED + fallWave;
            p.yaw += p.yawSpeed;
            p.pitch += p.pitchSpeed;
            p.roll += p.rollSpeed;

            if (p.y > height + 20) {
              p.y = -20;
              p.x = p.spawnXRatio * width;
            }
            if (p.x > width + 24) {
              p.x = -18;
            } else if (p.x < -24) {
              p.x = width + 18;
            }
          }

          drawFallingSakuraPetal(ctx, p, maxLanternProximity);
        }
      };

      // 2A. Far-Plane Falling Sakura Petals
      stepAndDrawFallingPetals("far");

      // 2B. Step & Render Width-Proportional Kongming Lanterns (~1 per 128px, up to 22 on 2800px)
      const visibleLanternCount = Math.max(
        4,
        Math.min(lanternsRef.current.length, Math.round(width / 128))
      );
      const visibleLanterns = lanternsRef.current.slice(0, visibleLanternCount);
      let foundHover: { item: LanternQuote; x: number; y: number } | null =
        null;

      for (const l of visibleLanterns) {
        const distToMouse = mouseRef.current.active
          ? Math.hypot(l.x - mx, l.y - my)
          : 9999;
        const isHovered = distToMouse < 30 * l.scale + 12;

        if (!isHovered && stepPhysics && !prefersReducedMotion) {
          const harmonicBreath = Math.cos(tick * 0.8 + l.phase) * 0.038;
          l.y -= UNIFORM_LANTERN_SPEED + harmonicBreath;
          l.x = l.baseX + Math.sin(tick * l.swayFreq + l.phase) * l.swayAmp;
          if (l.y < topLimit) {
            l.y = curBottomLimit;
            l.item =
              INSPIRATIONAL_LANTERNS[
                quoteQueueCursor % INSPIRATIONAL_LANTERNS.length
              ];
            quoteQueueCursor =
              (quoteQueueCursor + 1) % INSPIRATIONAL_LANTERNS.length;
          }
        } else if (isHovered && !foundHover) {
          foundHover = { item: l.item, x: l.x, y: l.y };
        }

        const horizonFade = Math.max(
          0,
          Math.min(1, (curBottomLimit - l.y) / 52)
        );
        const topFade = Math.max(0, Math.min(1, (l.y + 14) / 44));
        const fadeAlpha = Math.min(horizonFade, topFade);
        l.fadeAlpha = fadeAlpha;

        const pal = HUE_PALETTES[l.item.hue] || HUE_PALETTES.amber;
        for (const emb of l.embers) {
          const driftY = ((tick * 18 + emb.phase * 10) % 24) + 14 * l.scale;
          const driftX =
            emb.offsetX * l.scale + Math.sin(tick * 3 + emb.phase) * 3;
          const emberAlpha =
            Math.max(0, 1 - driftY / (38 * l.scale)) * 0.75 * fadeAlpha;
          if (emberAlpha > 0.02 && l.y + driftY < waterY) {
            ctx.beginPath();
            ctx.arc(
              l.x + driftX,
              l.y + driftY,
              emb.size * l.scale,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = pal.emberColor;
            ctx.globalAlpha = emberAlpha;
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;

        drawVolumetricLantern(
          ctx,
          l.x,
          l.y,
          l.scale,
          l.item.hue,
          tick,
          l.phase,
          isHovered,
          fadeAlpha
        );
      }

      // 2C. Midnight Lake Surface, Single-Lantern Reflections & Floating Sakura Petals (anchored at bottom of page)
      drawMidnightLakeAndReflections(
        ctx,
        width,
        height,
        waterY,
        lakeH,
        tick,
        visibleLanterns,
        floatingPetalsRef.current
      );

      // 3. Mid-Plane & Near-Plane Falling Sakura Petals
      stepAndDrawFallingPetals("mid");
      stepAndDrawFallingPetals("near");

      const nextHoverId = foundHover?.item.id ?? null;
      if (nextHoverId !== lastHoverId) {
        lastHoverId = nextHoverId;
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const prevHeight = height;
      const prevWaterY = getWaterY(height);
      const prevSpan = Math.max(1, prevWaterY - 6 - topLimit);
      width = window.innerWidth;
      height = window.innerHeight;
      applyCanvasSize();
      const nextWaterY = getWaterY(height);
      const nextSpan = Math.max(1, nextWaterY - 6 - topLimit);
      const nextLakeH = getLakeHeight(height);

      lanternsRef.current.forEach((l, idx) => {
        l.baseX = SKY_LANES[idx % SKY_LANES.length] * width;
        const normY = (l.y - topLimit) / prevSpan;
        l.y = topLimit + normY * nextSpan;
        l.x = l.baseX + Math.sin(tick * l.swayFreq + l.phase) * l.swayAmp;
      });

      fallingPetalsRef.current.forEach((p) => {
        p.x = p.spawnXRatio * width;
        p.y = (p.y / Math.max(1, prevHeight)) * height;
      });

      floatingPetalsRef.current.forEach((p) => {
        p.x = p.spawnXRatio * width;
        p.y = nextWaterY + p.waterTargetRatio * nextLakeH;
      });

      paintScene(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Only activate lantern hover tooltips over open sky, never over foreground content cards/header/dialogs
      const overForegroundUi = Boolean(
        target?.closest("main, header, footer, [role='dialog']")
      );
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: !overForegroundUi,
      };
      if (prefersReducedMotion) {
        paintScene(false);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      lastHoverId = null;
    };

    const renderLoop = () => {
      if (document.hidden) {
        animId = 0;
        return;
      }
      paintScene(true);
      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = 0;
        }
      } else if (!prefersReducedMotion && !animId) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    renderLoop();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [skyEnabled]);

  if (!skyEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-35 sm:opacity-50 lg:opacity-65"
    />
  );
}
