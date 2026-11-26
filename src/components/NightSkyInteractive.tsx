"use client";

import React, { memo, useEffect, useRef } from "react";

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
  speedFactor: number;
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
    outerGlow: "rgba(251, 146, 60, 0.36)",
    canopyTop: "rgba(180, 74, 24, 0.92)",
    canopyMid: "rgba(249, 130, 42, 0.94)",
    canopyBot: "rgba(255, 224, 166, 0.98)",
    rimStroke: "#fdba74",
    flameCore: "#ffffff",
    flameMid: "#fde68a",
    emberColor: "#fbbf24",
    badgeClass: "text-[#fde68a]",
  },
  gold: {
    outerGlow: "rgba(253, 186, 116, 0.36)",
    canopyTop: "rgba(194, 92, 30, 0.92)",
    canopyMid: "rgba(251, 162, 64, 0.94)",
    canopyBot: "rgba(255, 238, 194, 0.98)",
    rimStroke: "#fed7aa",
    flameCore: "#ffffff",
    flameMid: "#fef3c7",
    emberColor: "#fde68a",
    badgeClass: "text-[#fef3c7]",
  },
  rose: {
    outerGlow: "rgba(234, 118, 52, 0.34)",
    canopyTop: "rgba(164, 62, 22, 0.92)",
    canopyMid: "rgba(236, 110, 38, 0.93)",
    canopyBot: "rgba(254, 212, 152, 0.98)",
    rimStroke: "#fb923c",
    flameCore: "#ffffff",
    flameMid: "#fed7aa",
    emberColor: "#fb923c",
    badgeClass: "text-[#fed7aa]",
  },
};

type PetalGradients = Record<"blush" | "coral" | "mauve", CanvasGradient>;

function createNotchedPetalPath(): Path2D {
  const w = 5.6;
  const h = 8.2;
  const path = new Path2D();
  path.moveTo(0, h);
  path.bezierCurveTo(-w * 1.15, h * 0.3, -w * 0.95, -h * 0.65, -w * 0.36, -h);
  path.lineTo(0, -h * 0.7);
  path.lineTo(w * 0.36, -h);
  path.bezierCurveTo(w * 0.95, -h * 0.65, w * 1.15, h * 0.3, 0, h);
  path.closePath();
  return path;
}

function createPetalGradients(ctx: CanvasRenderingContext2D): PetalGradients {
  const h = 8.2;

  const coral = ctx.createLinearGradient(0, -h, 0, h);
  coral.addColorStop(0, "#fff1f2");
  coral.addColorStop(0.55, "#fda4af");
  coral.addColorStop(1, "#fb7185");

  const mauve = ctx.createLinearGradient(0, -h, 0, h);
  mauve.addColorStop(0, "#fdf2f8");
  mauve.addColorStop(0.6, "#f472b6");
  mauve.addColorStop(1, "#db2777");

  const blush = ctx.createLinearGradient(0, -h, 0, h);
  blush.addColorStop(0, "#fff1f2");
  blush.addColorStop(0.55, "#fbcfe8");
  blush.addColorStop(1, "#f472b6");

  return { blush, coral, mauve };
}

function drawFallingSakuraPetal(
  ctx: CanvasRenderingContext2D,
  p: SakuraPetal,
  warmProximity: number,
  petalPath: Path2D,
  petalGrads: PetalGradients
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

  ctx.fillStyle = warmProximity > 0.25 ? petalGrads.coral : petalGrads[p.variant];
  ctx.fill(petalPath);
  ctx.restore();
}

function drawFloatingSakuraPetal(
  ctx: CanvasRenderingContext2D,
  p: SakuraPetal,
  warmProximity: number,
  petalPath: Path2D,
  petalGrads: PetalGradients
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
    ctx.globalAlpha = rippleAlpha;
    ctx.strokeStyle = warmProximity > 0.12 ? "#fde047" : "#bae6fd";
    ctx.lineWidth = isTouchdown ? 0.95 : 0.75;
    ctx.stroke();

    if (isTouchdown && p.floatAge > 20) {
      const p2 = (p.floatAge - 20) / 110;
      const rx2 = (2.2 + p2 * 11.5) * p.scale;
      const ry2 = rx2 * 0.32;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, rx2, ry2, 0, 0, Math.PI * 2);
      ctx.globalAlpha = (1 - p2) * 0.28 * floatFade;
      ctx.strokeStyle = "#fbcfe8";
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
  ctx.fillStyle = warmProximity > 0.18 ? "#fbbf24" : "#db2777";
  ctx.fill(petalPath);
  ctx.restore();

  // 3. Foreshortened 2.5D Petal Resting Flat on the Lake Surface (Hana-Ikada)
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.scale(p.scale * 1.0, p.scale * 0.45);
  ctx.rotate(p.yaw);
  ctx.globalAlpha = Math.min(0.92, p.alpha + 0.32 + warmProximity * 0.2) * floatFade;
  ctx.fillStyle = warmProximity > 0.25 ? petalGrads.coral : petalGrads[p.variant];
  ctx.fill(petalPath);
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
  const s = scale * 1.48 * (isHovered ? 1.12 : 1);

  ctx.save();
  ctx.translate(x, y);
  const tilt = isHovered ? 0 : Math.sin(tick * 1.1 + phase) * 0.065;
  ctx.rotate(tilt);
  ctx.globalAlpha = fadeAlpha;

  // 1. Faceted Kongming Wish-Lantern Silhouette (wider upper shoulder, flat-ish crown, tapered mouth)
  const wTop = 13.2 * s;
  const wShoulder = 16.8 * s;
  const wBase = 10.4 * s;
  const hTop = -21 * s;
  const hShoulder = -11 * s;
  const hBase = 15.5 * s;

  ctx.beginPath();
  ctx.moveTo(-wTop, hTop + 1.8 * s);
  ctx.quadraticCurveTo(0, hTop - 1.8 * s, wTop, hTop + 1.8 * s);
  ctx.quadraticCurveTo(wShoulder * 1.03, hTop + 5 * s, wShoulder, hShoulder);
  ctx.quadraticCurveTo(wShoulder * 0.92, hBase - 9 * s, wBase, hBase);
  ctx.quadraticCurveTo(0, hBase + 3.6 * s, -wBase, hBase);
  ctx.quadraticCurveTo(-wShoulder * 0.92, hBase - 9 * s, -wShoulder, hShoulder);
  ctx.quadraticCurveTo(-wShoulder * 1.03, hTop + 5 * s, -wTop, hTop + 1.8 * s);
  ctx.closePath();

  // 2. Rich Warm Rice-Paper Vertical Gradient + Soft Edge Aura (no cartoon outline)
  ctx.save();
  ctx.shadowColor = pal.outerGlow;
  ctx.shadowBlur = (isHovered ? 14 : 9) * s * flicker;
  ctx.shadowOffsetY = 1 * s;
  const bodyGrad = ctx.createLinearGradient(0, hTop, 0, hBase);
  bodyGrad.addColorStop(0, pal.canopyTop);
  bodyGrad.addColorStop(0.42, pal.canopyMid);
  bodyGrad.addColorStop(1, pal.canopyBot);
  ctx.fillStyle = bodyGrad;
  ctx.fill();
  ctx.restore();

  // 3. Internal Candle Bloom & Subtle Warm Facet Step (no muddy gray)
  ctx.save();
  ctx.clip();

  const innerBloom = ctx.createRadialGradient(
    0,
    hBase - 3 * s,
    1 * s,
    0,
    hBase - 5 * s,
    24 * s * flicker
  );
  innerBloom.addColorStop(0, pal.flameCore);
  innerBloom.addColorStop(0.42, pal.flameMid);
  innerBloom.addColorStop(1, "rgba(255, 180, 90, 0)");
  ctx.globalAlpha = 0.78 * flicker * fadeAlpha;
  ctx.fillStyle = innerBloom;
  ctx.fillRect(
    -wShoulder * 1.2,
    hTop - 5 * s,
    wShoulder * 2.4,
    hBase - hTop + 10 * s
  );

  // Subtle warm-amber facet contrast (no dark gray/brown wash)
  const facetShade = ctx.createLinearGradient(-wShoulder, 0, wShoulder, 0);
  facetShade.addColorStop(0, "rgba(154, 52, 18, 0.20)");
  facetShade.addColorStop(0.52, "rgba(154, 52, 18, 0.05)");
  facetShade.addColorStop(0.56, "rgba(255, 244, 214, 0.09)");
  facetShade.addColorStop(1, "rgba(154, 52, 18, 0.08)");
  ctx.globalAlpha = fadeAlpha;
  ctx.fillStyle = facetShade;
  ctx.fillRect(
    -wShoulder * 1.2,
    hTop - 5 * s,
    wShoulder * 2.4,
    hBase - hTop + 10 * s
  );
  ctx.restore();

  // 4. Glowing Open Mouth + Delicate Bamboo Rim & Wires
  ctx.globalAlpha = fadeAlpha;
  ctx.beginPath();
  ctx.ellipse(0, hBase, wBase, 3.6 * s, 0, 0, Math.PI * 2);
  const mouthGrad = ctx.createRadialGradient(
    0,
    hBase - 0.5 * s,
    0.5 * s,
    0,
    hBase,
    wBase * 1.05
  );
  mouthGrad.addColorStop(0, "#fffdf5");
  mouthGrad.addColorStop(0.42, pal.flameMid);
  mouthGrad.addColorStop(1, pal.canopyMid);
  ctx.fillStyle = mouthGrad;
  ctx.fill();

  ctx.strokeStyle = "rgba(38, 16, 6, 0.48)";
  ctx.lineWidth = 0.85 * s;
  ctx.stroke();

  ctx.save();
  ctx.strokeStyle = "rgba(38, 16, 6, 0.38)";
  ctx.globalAlpha = 0.8 * fadeAlpha;
  ctx.lineWidth = 0.55 * s;
  ctx.beginPath();
  ctx.moveTo(-wBase * 0.94, hBase);
  ctx.lineTo(wBase * 0.94, hBase);
  ctx.moveTo(-wBase * 0.32, hBase - 3.1 * s);
  ctx.lineTo(wBase * 0.32, hBase + 3.1 * s);
  ctx.stroke();
  ctx.restore();

  // 5. Soft Camera-Exposed Flame Core at Center of Open Mouth
  ctx.save();
  const flameGlow = ctx.createRadialGradient(
    0,
    hBase - 0.4 * s,
    0.2 * s,
    0,
    hBase - 0.4 * s,
    4.2 * s * flicker
  );
  flameGlow.addColorStop(0, "#ffffff");
  flameGlow.addColorStop(0.45, "rgba(255, 248, 220, 0.85)");
  flameGlow.addColorStop(1, "rgba(255, 220, 140, 0)");
  ctx.fillStyle = flameGlow;
  ctx.beginPath();
  ctx.arc(0, hBase - 0.4 * s, 4.2 * s * flicker, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

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
  visibleLanternCount: number,
  floatingPetals: SakuraPetal[],
  shimmerGrad: CanvasGradient,
  petalPath: Path2D,
  petalGrads: PetalGradients
) {
  // Only render when the lake at the bottom of the page is within the viewport
  if (waterY >= height + 24) return;
  const waterDepth = lakeHeight;

  // Soft moonlit water shimmer (feathered radial perspective bands + subtle off-center moon column)
  ctx.save();
  ctx.fillStyle = shimmerGrad;
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
    ctx.globalAlpha = baseAlpha * pulse * (1 - perspective * 0.35);

    ctx.save();
    ctx.translate(rx, ry);
    ctx.scale(rw, rh);
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();

  // 2. Cohesive Single-Lantern Water Reflections (1 lantern above = 1 soft mirrored reflection on the water)
  for (let i = 0; i < visibleLanternCount; i++) {
    const l = lanterns[i];
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
    for (let i = 0; i < visibleLanternCount; i++) {
      const l = lanterns[i];
      const dx = Math.abs(p.x - l.x);
      if (dx < 52 && l.fadeAlpha > 0.1) {
        const prox = (1 - dx / 52) * l.fadeAlpha;
        if (prox > warmProx) warmProx = prox;
      }
    }
    drawFloatingSakuraPetal(ctx, p, warmProx, petalPath, petalGrads);
  }
}

export const NightSkyInteractive = memo(function NightSkyInteractive({
  skyEnabled,
  paused = false,
}: {
  skyEnabled: boolean;
  paused?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pausedRef = useRef(paused);
  const resumeLoopRef = useRef<(() => void) | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const lanternsRef = useRef<ActiveLantern[]>([]);
  const fallingPetalsRef = useRef<SakuraPetal[]>([]);
  const floatingPetalsRef = useRef<SakuraPetal[]>([]);

  useEffect(() => {
    pausedRef.current = paused;
    if (!paused) {
      resumeLoopRef.current?.();
    }
  }, [paused]);

  useEffect(() => {
    if (!skyEnabled) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getLakeHeight = (h: number) =>
      Math.min(140, Math.max(100, Math.round(h * 0.15)));
    // Keep the midnight lake permanently visible at the bottom of the viewport
    const getWaterY = (h: number) => h - getLakeHeight(h);

    const petalPath = createNotchedPetalPath();
    const petalGrads = createPetalGradients(ctx);
    const shimmerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    shimmerGrad.addColorStop(0, "rgba(196, 222, 248, 1)");
    shimmerGrad.addColorStop(0.45, "rgba(162, 196, 232, 0.45)");
    shimmerGrad.addColorStop(1, "rgba(162, 196, 232, 0)");

    const backdropCanvas = document.createElement("canvas");
    const backdropCtx = backdropCanvas.getContext("2d");

    let animId = 0;
    let resizeRafId = 0;
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

      if (backdropCtx) {
        backdropCanvas.width = canvas.width;
        backdropCanvas.height = canvas.height;
        backdropCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        backdropCtx.clearRect(0, 0, width, height);

        const moonBeam = backdropCtx.createRadialGradient(
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
        backdropCtx.fillStyle = moonBeam;
        backdropCtx.fillRect(0, 0, width, height);

        for (const canopyX of [width * 0.06, width * 0.94]) {
          const canopyGlow = backdropCtx.createRadialGradient(
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
          backdropCtx.fillStyle = canopyGlow;
          backdropCtx.fillRect(0, 0, width, height * 0.45);
        }

        const lakeH = getLakeHeight(height);
        const waterY = getWaterY(height);
        const featherTop = waterY - 48;
        const lakeGrad = backdropCtx.createLinearGradient(
          0,
          featherTop,
          0,
          waterY + lakeH
        );
        lakeGrad.addColorStop(0, "rgba(9, 11, 15, 0)");
        lakeGrad.addColorStop(0.28, "rgba(18, 32, 50, 0.34)");
        lakeGrad.addColorStop(0.54, "rgba(21, 38, 60, 0.68)");
        lakeGrad.addColorStop(0.78, "rgba(14, 25, 42, 0.88)");
        lakeGrad.addColorStop(1, "rgba(8, 14, 24, 0.96)");
        backdropCtx.fillStyle = lakeGrad;
        backdropCtx.fillRect(0, featherTop, width, height - featherTop);
      }
    };
    applyCanvasSize();

    // 22 horizontal lanes: balanced on mobile/tablet, margin-weighted on wide screens (>= 1024px)
    // so most lanterns frame the left/right margins instead of crowding the center content column.
    const SKY_LANES = [
      0.08, 0.92, 0.24, 0.76, 0.14, 0.86, 0.36, 0.64, 0.18, 0.82, 0.44, 0.58,
      0.04, 0.96, 0.31, 0.69, 0.155, 0.845, 0.40, 0.605, 0.27, 0.955,
    ];
    const WIDE_SKY_LANES = [
      0.04, 0.96, 0.10, 0.90, 0.16, 0.84, 0.22, 0.78, 0.38, 0.62, 0.28, 0.72,
    ];
    const getLaneX = (idx: number, w: number) => {
      const lanes = w >= 1024 ? WIDE_SKY_LANES : SKY_LANES;
      return lanes[idx % lanes.length] * w;
    };

    const ACTIVE_LANTERN_COUNT = SKY_LANES.length;
    let quoteQueueCursor = ACTIVE_LANTERN_COUNT;

    const topLimit = -18;
    const initialLakeH = getLakeHeight(height);
    const initialBottomLimit = height - initialLakeH - 26;
    const totalSpan = initialBottomLimit - topLimit;

    const initialVisibleCount = Math.max(
      2,
      Math.min(ACTIVE_LANTERN_COUNT, Math.round(width / 220))
    );
    const initialInSkyCount = Math.max(1, Math.ceil(initialVisibleCount * 0.6));
    const isSideLane = (normX: number, w = width) => {
      const marginNorm =
        w >= 1024 ? Math.max(0.11, ((w - 1200) * 0.5 + 32) / w) : 0.24;
      return normX <= marginNorm || normX >= 1 - marginNorm;
    };
    const initLanes = width >= 1024 ? WIDE_SKY_LANES : SKY_LANES;
    const usedInitLaneIndices = new Set<number>();
    const placedInitCoords: Array<{ x: number; y: number }> = [];

    lanternsRef.current = Array.from(
      { length: ACTIVE_LANTERN_COUNT },
      (_, idx) => {
        const item =
          INSPIRATIONAL_LANTERNS[idx % INSPIRATIONAL_LANTERNS.length];
        const depthScale = idx % 2 === 0 ? 1.14 : 0.98;
        let slotY: number;
        if (idx < initialInSkyCount) {
          const baseNorm = (idx + 0.5) / initialInSkyCount;
          const jitter = (Math.random() - 0.5) * (0.35 / initialInSkyCount);
          slotY =
            topLimit +
            Math.max(0.06, Math.min(0.88, baseNorm + jitter)) * totalSpan;
        } else {
          // Park remaining lanterns off-screen so they enter cleanly via GLOBAL_SPAWN_COOLDOWN_MS
          slotY = -300;
        }

        let lx = getLaneX(idx, width);
        if (idx < initialInSkyCount) {
          const sideIndices = initLanes
            .map((norm, c) => (isSideLane(norm) ? c : -1))
            .filter((c) => c !== -1);
          const firstPool =
            sideIndices.length > 0
              ? sideIndices
              : initLanes.map((_, c) => c);
          let bestLaneIdx = -1;
          if (placedInitCoords.length === 0) {
            bestLaneIdx =
              firstPool[Math.floor(Math.random() * firstPool.length)];
          } else {
            let bestScore = -Infinity;
            for (let c = 0; c < initLanes.length; c++) {
              if (width >= 1024 && !isSideLane(initLanes[c])) continue;
              if (usedInitLaneIndices.has(c)) continue;
              const candX = Math.max(
                32,
                Math.min(width - 32, initLanes[c] * width)
              );
              let minDist = Infinity;
              for (const p of placedInitCoords) {
                const d = Math.hypot(p.x - candX, (p.y - slotY) * 0.85);
                if (d < minDist) minDist = d;
              }
              const centerPenalty = isSideLane(initLanes[c]) ? 0 : 320;
              const score = minDist - centerPenalty;
              if (score > bestScore) {
                bestScore = score;
                bestLaneIdx = c;
              }
            }
          }

          if (bestLaneIdx === -1) {
            // No unused side lane left (e.g. ultrawide); park off-screen until a lane clears
            slotY = -300;
          } else {
            usedInitLaneIndices.add(bestLaneIdx);
            lx = Math.max(
              32,
              Math.min(width - 32, initLanes[bestLaneIdx] * width)
            );
            placedInitCoords.push({ x: lx, y: slotY });
          }
        }

        return {
          item,
          baseX: lx,
          x: lx,
          y: slotY,
          scale: depthScale,
          speedFactor: 0.95 + Math.random() * 0.1,
          swayAmp: 6 + (idx % 3) * 2.5,
          swayFreq: 0.22 + (idx % 4) * 0.05,
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
    const farPetals = fallingPetals.filter((p) => p.plane === "far");
    const midPetals = fallingPetals.filter((p) => p.plane === "mid");
    const nearPetals = fallingPetals.filter((p) => p.plane === "near");

    let tick = 0;
    let lastFrameTime = performance.now();
    let lastParkedCheckBucket = -1;
    let lastSpawnHalf: "left" | "right" | null = null;
    let lastGlobalSpawnMs = performance.now();
    const GLOBAL_SPAWN_COOLDOWN_MS = 7_500;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const UNIFORM_LANTERN_SPEED = 0.24;
    const UNIFORM_PETAL_FALL_SPEED = 0.23;

    const stepAndDrawFallingPetals = (
      petals: SakuraPetal[],
      visibleLanternCount: number,
      stepPhysics: boolean,
      dtScale: number
    ) => {
      const lanterns = lanternsRef.current;
      for (let pi = 0; pi < petals.length; pi++) {
        const p = petals[pi];
        let maxLanternProximity = 0;
        let thermalVx = 0;

        for (let li = 0; li < visibleLanternCount; li++) {
          const l = lanterns[li];
          if (l.fadeAlpha <= 0.02) continue;
          const dx = p.x - l.x;
          const dy = p.y - l.y;
          if (dy < 10 && dy > -65 && Math.abs(dx) < 38) {
            thermalVx = (dx >= 0 ? 1 : -1) * 0.09;
          }
          if (Math.abs(dx) >= 115 || Math.abs(dy) >= 115) continue;
          const distSq = dx * dx + dy * dy;
          if (distSq < 13225) {
            const prox = 1 - Math.sqrt(distSq) / 115;
            if (prox > maxLanternProximity) maxLanternProximity = prox;
          }
        }

        if (stepPhysics && !prefersReducedMotion) {
          const breezeVx =
            p.baseVx +
            Math.sin(tick * 0.22) * 0.1 +
            Math.cos(tick * 0.95 + p.phase) * 0.22;
          const fallWave = Math.sin(tick * 0.9 + p.phase) * 0.03;
          p.x += (breezeVx + thermalVx) * dtScale;
          p.y += (UNIFORM_PETAL_FALL_SPEED + fallWave) * dtScale;
          p.yaw += p.yawSpeed * dtScale;
          p.pitch += p.pitchSpeed * dtScale;
          p.roll += p.rollSpeed * dtScale;

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

        drawFallingSakuraPetal(ctx, p, maxLanternProximity, petalPath, petalGrads);
      }
    };

    const paintScene = (stepPhysics: boolean, dtScale = 1) => {
      if (stepPhysics && !prefersReducedMotion) {
        tick += 0.016 * dtScale;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(backdropCanvas, 0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const lakeH = getLakeHeight(height);
      const waterY = getWaterY(height);
      // Lanterns launch well above the water surface (waterY - 28) when the lake is in view, or near the bottom of the screen when at the top of the page
      const curBottomLimit = Math.min(height - 16, waterY - 28);
      const visibleLanternCount = Math.max(
        2,
        Math.min(lanternsRef.current.length, Math.round(width / 220))
      );

      // Step floating water petals on the lake surface
      if (stepPhysics && !prefersReducedMotion) {
        for (const p of floatingPetalsRef.current) {
          p.y = waterY + p.waterTargetRatio * lakeH;
          p.floatAge += dtScale;
          p.x +=
            (0.08 + Math.sin(tick * 0.4 + p.phase) * 0.05) * p.scale * dtScale;
          p.yaw += Math.sin(tick * 0.6 + p.phase) * 0.0018 * dtScale;

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

      // 2A. Far-Plane Falling Sakura Petals
      stepAndDrawFallingPetals(farPetals, visibleLanternCount, stepPhysics, dtScale);

      // 2B. Step & Render Width-Proportional Kongming Lanterns (~1 per 220px for larger, detailed lanterns)
      const visibleLanterns = lanternsRef.current;

      const parkedCheckBucket = Math.floor(tick * 2.5);
      const canCheckParked = parkedCheckBucket !== lastParkedCheckBucket;
      if (canCheckParked) lastParkedCheckBucket = parkedCheckBucket;

      for (let i = 0; i < visibleLanternCount; i++) {
        const l = visibleLanterns[i];
        let isHovered = false;
        if (mouseRef.current.active && l.fadeAlpha > 0.1) {
          const dx = l.x - mx;
          const dy = l.y - my;
          const hoverR = 30 * l.scale + 12;
          isHovered = dx * dx + dy * dy < hoverR * hoverR;
        }

        if (!isHovered && stepPhysics && !prefersReducedMotion) {
          const harmonicBreath = Math.cos(tick * 0.6 + l.phase) * 0.02;
          l.y -= (UNIFORM_LANTERN_SPEED * l.speedFactor + harmonicBreath) * dtScale;
          l.x = l.baseX + Math.sin(tick * l.swayFreq + l.phase) * l.swayAmp;
          if (l.y < topLimit) {
            const nowMs = performance.now();
            if (
              (l.y <= -250 && !canCheckParked) ||
              nowMs - lastGlobalSpawnMs < GLOBAL_SPAWN_COOLDOWN_MS
            ) {
              l.y = -300;
            } else {
              const activeLanes = width >= 1024 ? WIDE_SKY_LANES : SKY_LANES;
              let bestLaneIdx = -1;
              let bestX = l.baseX;
              let bestY = curBottomLimit + 24;
              let bestScore = -Infinity;

              const candY = curBottomLimit + 24;
              const minColGap = 28;
              const colClearY = curBottomLimit * 0.6;
              for (
                let candLaneIdx = 0;
                candLaneIdx < activeLanes.length;
                candLaneIdx++
              ) {
                const laneNorm = activeLanes[candLaneIdx];
                // On wide screens, only spawn in side margin lanes so text stays readable
                if (width >= 1024 && !isSideLane(laneNorm)) continue;

                const candX = Math.max(
                  32,
                  Math.min(width - 32, laneNorm * width)
                );
                let minDistSq = Infinity;
                let columnBlocked = false;
                for (let j = 0; j < visibleLanternCount; j++) {
                  if (j === i) continue;
                  const other = visibleLanterns[j];
                  if (other.y < topLimit) continue;
                  const dx = other.baseX - candX;
                  if (Math.abs(dx) < minColGap && other.y > colClearY) {
                    columnBlocked = true;
                    break;
                  }
                  const dy = other.y - candY;
                  const dSq = dx * dx + dy * dy;
                  if (dSq < minDistSq) minDistSq = dSq;
                }
                if (columnBlocked || minDistSq < 22500) continue;

                const centerPenalty = isSideLane(laneNorm) ? 0 : 320;
                const candHalf = laneNorm < 0.5 ? "left" : "right";
                const oppositeBonus =
                  lastSpawnHalf !== null && candHalf !== lastSpawnHalf
                    ? 120
                    : 0;
                const score =
                  Math.sqrt(minDistSq) - centerPenalty + oppositeBonus;
                if (score > bestScore) {
                  bestScore = score;
                  bestLaneIdx = candLaneIdx;
                  bestX = candX;
                  bestY = candY;
                }
              }

              if (bestLaneIdx === -1) {
                // Hold off-screen until a clean side-lane spawn point opens up
                l.y = -300;
              } else {
                lastGlobalSpawnMs = nowMs;
                lastSpawnHalf =
                  activeLanes[bestLaneIdx] < 0.5 ? "left" : "right";
                l.baseX = bestX;
                l.y = bestY;
                l.speedFactor = 0.95 + Math.random() * 0.1;
                l.item =
                  INSPIRATIONAL_LANTERNS[
                    quoteQueueCursor % INSPIRATIONAL_LANTERNS.length
                  ];
                quoteQueueCursor =
                  (quoteQueueCursor + 1) % INSPIRATIONAL_LANTERNS.length;
              }
            }
          }
        }

        const introRaw = prefersReducedMotion
          ? 1
          : Math.max(0, Math.min(1, (tick - i * 0.06) / 0.75));
        const introFade = 1 - (1 - introRaw) * (1 - introRaw);
        const horizonFade = Math.max(
          0,
          Math.min(1, (curBottomLimit - l.y) / 52)
        );
        const topFade = Math.max(0, Math.min(1, (l.y + 14) / 44));
        const fadeAlpha = Math.min(horizonFade, topFade) * introFade;
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
        visibleLanternCount,
        floatingPetalsRef.current,
        shimmerGrad,
        petalPath,
        petalGrads
      );

      // 3. Mid-Plane & Near-Plane Falling Sakura Petals
      stepAndDrawFallingPetals(midPetals, visibleLanternCount, stepPhysics, dtScale);
      stepAndDrawFallingPetals(nearPetals, visibleLanternCount, stepPhysics, dtScale);
    };

    const runResize = () => {
      resizeRafId = 0;
      if (!canvas) return;
      const prevWidth = width;
      const prevHeight = height;
      const prevWaterY = getWaterY(height);
      const prevSpan = Math.max(1, prevWaterY - 6 - topLimit);
      width = window.innerWidth;
      height = window.innerHeight;
      applyCanvasSize();
      const nextWaterY = getWaterY(height);
      const nextSpan = Math.max(1, nextWaterY - 6 - topLimit);
      const nextLakeH = getLakeHeight(height);

      lanternsRef.current.forEach((l) => {
        const normX = l.baseX / Math.max(1, prevWidth);
        if (width >= 1024 && !isSideLane(normX, width)) {
          l.y = -300;
        } else {
          l.baseX = Math.max(32, Math.min(width - 32, normX * width));
          if (l.y >= topLimit) {
            const normY = (l.y - topLimit) / prevSpan;
            l.y = topLimit + normY * nextSpan;
          }
        }
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

    const handleResize = () => {
      if (resizeRafId) return;
      resizeRafId = requestAnimationFrame(runResize);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Only activate lantern hover over open sky, never over foreground content cards/header/dialogs
      const overForegroundUi = Boolean(
        target?.closest("main, header, footer, [role='dialog']")
      );
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = !overForegroundUi;
      if (prefersReducedMotion) {
        paintScene(false);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const renderLoop = (now = performance.now()) => {
      if (document.hidden || pausedRef.current) {
        animId = 0;
        return;
      }
      const elapsedMs = Math.max(0, now - lastFrameTime);
      lastFrameTime = now;
      const dtScale = Math.min(2.5, elapsedMs / 16.6667);
      paintScene(true, dtScale);
      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const resumeIfActive = () => {
      if (!document.hidden && !pausedRef.current && !prefersReducedMotion && !animId) {
        lastFrameTime = performance.now();
        animId = requestAnimationFrame(renderLoop);
      }
    };
    resumeLoopRef.current = resumeIfActive;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = 0;
        }
      } else {
        resumeIfActive();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    renderLoop();
    return () => {
      resumeLoopRef.current = null;
      cancelAnimationFrame(animId);
      cancelAnimationFrame(resizeRafId);
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
});
