"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { PmdSpriteCompanion } from "@/components/CardMicroInteractions";

const NightSkyInteractive = dynamic(
  () =>
    import("@/components/NightSkyInteractive").then(
      (mod) => mod.NightSkyInteractive
    ),
  { ssr: false }
);

interface SceneItem {
  id: string;
  label: string;
  src: string;
  alt: string;
  caption: string;
}

const STRESSALPHA_SCENES: SceneItem[] = [
  {
    id: "cockpit",
    label: "Dual-Pane Cockpit",
    src: "/images/stress-alpha/cockpit-preview.png",
    alt: "StressAlpha Dual-Pane Valuation & Scenario Cockpit",
    caption:
      "Decouples server-streamed reports from client state via TanStack Query for sub-millisecond modeling of operating leverage and FCF conversion.",
  },
  {
    id: "screener",
    label: "Universe Screener",
    src: "/images/stress-alpha/screener-preview.png",
    alt: "StressAlpha Equity Universe Screener",
    caption:
      "Hybrid relational and JSONB schema in PostgreSQL (Neon) with Drizzle ORM for cross-ticker time-series screening and scenario dispersion.",
  },
  {
    id: "memo",
    label: "IC Audit Memo",
    src: "/images/stress-alpha/memo-preview.png",
    alt: "StressAlpha Investment Committee Memo & Footnote Audit",
    caption:
      "Supply-chain dependency DAG propagating upstream shocks into downstream revisions, verified by isolated CI tests on Neon ephemeral branches.",
  },
];

const POKEBASTION_SCENES: SceneItem[] = [
  {
    id: "combat",
    label: "Live Wave Combat",
    src: "/images/pokebastion/combat.png",
    alt: "PokéBastion TD Live Wave Combat on 28x18 Open Grid",
    caption:
      "Real-time Phaser 3 wave combat across a 28×18 open grid where waves dynamically pathfind around player-built maze walls and towers.",
  },
  {
    id: "prep",
    label: "Maze & Pathfinding",
    src: "/images/pokebastion/prep.png",
    alt: "PokéBastion TD Prep Phase & Dynamic A* Path Preview",
    caption:
      "Open-map wall placement with instant flow-field and A* route recalculation, live unit repositioning, and anti-block path validation.",
  },
  {
    id: "draft",
    label: "Roguelike Draft",
    src: "/images/pokebastion/draft.png",
    alt: "PokéBastion TD Roguelike Unit & Evolution Draft",
    caption:
      "Branching roguelike starter drafts, evolution trees, and elemental synergy specialization tested with Vitest and Playwright.",
  },
];

function ExternalArrowIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

interface ProjectStageProps {
  idPrefix: string;
  scenes: SceneItem[];
  activeIdx: number;
  onSelectIdx: (idx: number) => void;
  onOpenLightbox: () => void;
  objectPosition?: "object-top" | "object-center";
}

function ProjectStage({
  idPrefix,
  scenes,
  activeIdx,
  onSelectIdx,
  onOpenLightbox,
  objectPosition = "object-center",
}: ProjectStageProps) {
  const activeScene = scenes[activeIdx];

  return (
    <div className="bg-surface border border-rule rounded-[8px] p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-rule">
        <div
          className="flex flex-wrap items-center gap-1 font-mono text-xs"
          role="tablist"
          aria-label={`${idPrefix} scenes`}
        >
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              id={`${idPrefix}-tab-${scene.id}`}
              type="button"
              role="tab"
              tabIndex={activeIdx === idx ? 0 : -1}
              aria-selected={activeIdx === idx}
              aria-controls={`${idPrefix}-panel-${scene.id}`}
              onClick={() => onSelectIdx(idx)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const next =
                    e.key === "ArrowRight"
                      ? (idx + 1) % scenes.length
                      : (idx - 1 + scenes.length) % scenes.length;
                  onSelectIdx(next);
                  document
                    .getElementById(`${idPrefix}-tab-${scenes[next].id}`)
                    ?.focus();
                }
              }}
              className={`px-2.5 py-1 rounded-[4px] transition-colors ${
                activeIdx === idx
                  ? "bg-ink text-ground font-semibold"
                  : "text-inkMuted hover:text-ink hover:bg-surfaceHover"
              }`}
            >
              {scene.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onOpenLightbox}
          aria-label={`Expand ${activeScene.label} screenshot`}
          title="Expand screenshot"
          className="w-8 h-8 rounded-[4px] text-inkMuted hover:text-accent hover:bg-surfaceHover inline-flex items-center justify-center transition-colors shrink-0"
        >
          <ExpandIcon />
        </button>
      </div>

      <div
        key={activeScene.id}
        id={`${idPrefix}-panel-${activeScene.id}`}
        role="tabpanel"
        aria-labelledby={`${idPrefix}-tab-${activeScene.id}`}
        className="bay-transition"
      >
        <button
          type="button"
          onClick={onOpenLightbox}
          className="group relative rounded-[6px] overflow-hidden border border-rule bg-ground aspect-[16/10] flex items-center justify-center cursor-zoom-in text-left w-full"
          aria-label={`Expand ${activeScene.label} screenshot`}
        >
          <img
            src={activeScene.src}
            alt={activeScene.alt}
            width={1600}
            height={1000}
            loading="eager"
            className={`w-full h-full object-cover ${objectPosition} transition-transform duration-300 group-hover:scale-[1.01]`}
          />
        </button>

        <p className="font-mono text-xs text-inkMuted leading-relaxed mt-3">
          {activeScene.caption}
        </p>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [stressSceneIdx, setStressSceneIdx] = useState<number>(0);
  const [pokeSceneIdx, setPokeSceneIdx] = useState<number>(0);
  const [skyEnabled, setSkyEnabled] = useState<boolean>(true);
  const [expandedGallery, setExpandedGallery] = useState<
    "stress" | "poke" | null
  >(null);

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openLightbox = (gallery: "stress" | "poke") => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setExpandedGallery(gallery);
  };

  const closeLightbox = () => {
    setExpandedGallery(null);
    setTimeout(() => {
      lastFocusedRef.current?.focus();
    }, 0);
  };

  const activeGalleryScenes =
    expandedGallery === "stress"
      ? STRESSALPHA_SCENES
      : expandedGallery === "poke"
      ? POKEBASTION_SCENES
      : null;
  const activeGalleryIdx =
    expandedGallery === "stress"
      ? stressSceneIdx
      : expandedGallery === "poke"
      ? pokeSceneIdx
      : 0;
  const setActiveGalleryIdx =
    expandedGallery === "stress" ? setStressSceneIdx : setPokeSceneIdx;
  const expandedScene = activeGalleryScenes
    ? activeGalleryScenes[activeGalleryIdx]
    : null;
  const prevScene =
    activeGalleryScenes && activeGalleryIdx > 0
      ? activeGalleryScenes[activeGalleryIdx - 1]
      : null;
  const nextScene =
    activeGalleryScenes && activeGalleryIdx < activeGalleryScenes.length - 1
      ? activeGalleryScenes[activeGalleryIdx + 1]
      : null;

  const isLightboxOpen = expandedGallery !== null;

  useEffect(() => {
    if (!isLightboxOpen) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen || !activeGalleryScenes) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveGalleryIdx((idx) => Math.max(0, idx - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveGalleryIdx((idx) =>
          Math.min(activeGalleryScenes.length - 1, idx + 1)
        );
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, activeGalleryScenes, setActiveGalleryIdx]);

  return (
    <div className="min-h-screen relative flex flex-col">
      <NightSkyInteractive
        skyEnabled={skyEnabled}
        paused={Boolean(expandedScene && activeGalleryScenes)}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[60] focus:px-3 focus:py-1.5 focus:rounded-[4px] focus:bg-accent focus:text-ground focus:font-mono focus:text-xs focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Quiet Editorial Top Bar */}
      <header className="border-b border-rule bg-ground/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
          <a
            href="#"
            className="font-display text-xl sm:text-2xl font-medium tracking-tight text-ink hover:text-accent transition-colors"
          >
            Kevin Ding
          </a>

          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-4 sm:gap-6 font-mono text-xs text-inkMuted"
          >
            <a href="#projects" className="hover:text-ink transition-colors">
              Projects
            </a>
            <a href="#experience" className="hover:text-ink transition-colors">
              Experience
            </a>
            <button
              type="button"
              aria-pressed={skyEnabled}
              onClick={() => setSkyEnabled((v) => !v)}
              className={`px-2 py-1 rounded-[4px] border transition-colors ${
                skyEnabled
                  ? "border-rule text-ink hover:border-inkMuted"
                  : "border-transparent text-inkMuted hover:text-ink"
              }`}
            >
              {skyEnabled ? "Sky: On" : "Sky: Off"}
            </button>
            <span className="hidden sm:inline text-rule" aria-hidden="true">
              /
            </span>
            <a
              href="https://github.com/phanturne"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 hover:text-accent transition-colors"
            >
              GitHub <ExternalArrowIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/krding"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 hover:text-accent transition-colors"
            >
              LinkedIn <ExternalArrowIcon />
            </a>
          </nav>
        </div>
      </header>

      <main
        id="main-content"
        className="relative z-10 flex-1 max-w-[1200px] w-full mx-auto px-5 sm:px-8"
      >
        {/* Concise Intro */}
        <section className="pt-8 pb-8 sm:pt-10 sm:pb-9 border-b border-rule">
          <h1 className="font-display text-3xl sm:text-5xl font-normal tracking-[-0.02em] text-ink leading-[1.12]">
            Software Engineer
          </h1>
          <p className="mt-3 text-sm sm:text-base text-inkMuted leading-relaxed max-w-[65ch]">
            <span className="text-ink font-medium">Amazon Prime Video</span> in
            Seattle · M.S. CS (Machine Learning) at{" "}
            <span className="text-ink font-medium">Georgia Tech</span>.
          </p>
        </section>

        {/* FLAGSHIP WORK: Asymmetric Editorial Spreads */}
        <section id="projects" className="scroll-mt-20">
          {/* StressAlpha */}
          <article className="py-12 sm:py-16 border-b border-rule grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-ink">
                  StressAlpha
                </h2>
                <p className="mt-4 text-sm sm:text-[15px] text-inkMuted leading-relaxed">
                  Equity earnings and scenario stress-testing web app covering
                  521 tickers. Server-streamed SEC EDGAR and market filings are
                  cached via TanStack Query so users can shock WACC, margins,
                  and supply-chain dependencies in the browser with zero
                  round-trip latency.
                </p>
                <p className="mt-3 text-sm sm:text-[15px] text-inkMuted leading-relaxed">
                  Backed by a hybrid relational and JSONB schema in Neon
                  PostgreSQL with Drizzle ORM, plus automated CI integration
                  tests running against ephemeral database branches.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
                  <a
                    href="https://stressalpha.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-[5px] bg-accent text-ground font-semibold inline-flex items-center gap-1.5 hover:bg-ink transition-colors"
                  >
                    Launch App <ExternalArrowIcon />
                  </a>
                  <a
                    href="https://github.com/phanturne/stress-alpha"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-[5px] border border-rule text-ink hover:border-inkMuted inline-flex items-center gap-1.5 transition-colors"
                  >
                    Source <ExternalArrowIcon />
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-rule font-mono text-xs text-inkMuted leading-relaxed">
                Next.js · React · TypeScript · TanStack Query · PostgreSQL ·
                Drizzle ORM
              </div>
            </div>

            <div className="lg:col-span-8">
              <ProjectStage
                idPrefix="stress"
                scenes={STRESSALPHA_SCENES}
                activeIdx={stressSceneIdx}
                onSelectIdx={setStressSceneIdx}
                onOpenLightbox={() => openLightbox("stress")}
                objectPosition="object-top"
              />
            </div>
          </article>

          {/* PokéBastion TD */}
          <article className="py-12 sm:py-16 border-b border-rule grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-ink">
                  PokéBastion TD
                </h2>
                <p className="mt-4 text-sm sm:text-[15px] text-inkMuted leading-relaxed">
                  Open-map roguelike tower defense game running at 60fps in the
                  browser. Enemies compute live A* and flow-field routes across
                  a 28×18 grid around player-placed maze walls, with anti-block
                  validation before every placement.
                </p>
                <p className="mt-3 text-sm sm:text-[15px] text-inkMuted leading-relaxed">
                  Features 152 playable units, branching evolution trees, live
                  repositioning during waves, and deterministic simulation
                  coverage in Vitest alongside Playwright E2E checks.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
                  <a
                    href="https://phanturne.github.io/pokebastion/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-[5px] bg-accent text-ground font-semibold inline-flex items-center gap-1.5 hover:bg-ink transition-colors"
                  >
                    Play Live <ExternalArrowIcon />
                  </a>
                  <a
                    href="https://github.com/phanturne/pokebastion"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-[5px] border border-rule text-ink hover:border-inkMuted inline-flex items-center gap-1.5 transition-colors"
                  >
                    Source <ExternalArrowIcon />
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-rule">
                <div className="font-mono text-xs text-inkMuted leading-relaxed">
                  TypeScript · Phaser 3 · Vite · HTML5 Canvas · Vitest ·
                  Playwright
                </div>
                <div className="relative h-10 mt-3">
                  <PmdSpriteCompanion />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ProjectStage
                idPrefix="poke"
                scenes={POKEBASTION_SCENES}
                activeIdx={pokeSceneIdx}
                onSelectIdx={setPokeSceneIdx}
                onOpenLightbox={() => openLightbox("poke")}
                objectPosition="object-center"
              />
            </div>
          </article>
        </section>

        {/* EXPERIENCE & BACKGROUND: Clean Typographic Index (No Boxes) */}
        <section id="experience" className="scroll-mt-20 py-14 sm:py-16">
          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-ink mb-10">
            Experience &amp; Background
          </h2>

          {/* Experience Rows */}
          <div className="border-t border-rule">
            <div className="py-8 border-b border-rule grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-4">
                <h3 className="text-lg font-semibold text-ink">
                  Amazon Prime Video
                </h3>
                <p className="font-mono text-xs text-inkMuted mt-1">
                  Software Engineer · Seattle, WA
                </p>
                <p className="font-mono text-xs text-accent mt-1 tabular-cell">
                  2025 – Present
                </p>
              </div>
              <div className="md:col-span-8 space-y-3 text-sm sm:text-[15px] text-inkMuted leading-relaxed">
                <p>
                  Launched Prime Video&apos;s new-title email notification
                  service and migrated push targeting workflows to online
                  machine learning inference with Apache Spark and AWS Step
                  Functions.
                </p>
                <p>
                  Replaced static campaign configuration pipelines with a cached
                  DynamoDB store and automated JSON payload validation to speed
                  up rollouts. Built AI agent workflows for automated on-call
                  incident triage, log investigation, and CloudWatch alarm
                  tuning, alongside an internal A/B experiment reporting tool.
                </p>
                <p className="font-mono text-xs text-ink/75 pt-1">
                  AWS · Apache Spark · DynamoDB · Java · TypeScript / React · AI
                  Agents
                </p>
              </div>
            </div>

            <div className="py-8 border-b border-rule grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-4">
                <h3 className="text-lg font-semibold text-ink">Peraton</h3>
                <p className="font-mono text-xs text-inkMuted mt-1">
                  Software Engineer II · Santa Clara, CA
                </p>
                <p className="font-mono text-xs text-inkMuted mt-1 tabular-cell">
                  2023 – 2025
                </p>
              </div>
              <div className="md:col-span-8 space-y-3 text-sm sm:text-[15px] text-inkMuted leading-relaxed">
                <p>
                  Built interactive Angular dashboards and reactive form
                  workflows with client-side state management, paired with C# /
                  .NET backend microservices and tuned relational SQL queries.
                </p>
                <p>
                  Standardized RESTful API contracts across engineering teams,
                  introduced SonarQube static analysis checks, and mentored
                  incoming engineers.
                </p>
                <p className="font-mono text-xs text-ink/75 pt-1">
                  Angular · TypeScript · C# / .NET · SQL · SonarQube
                </p>
              </div>
            </div>
          </div>

          {/* 3-Column Typographic Index: Education, Other Projects, Stack */}
          <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-inkMuted mb-5">
                Education
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-semibold text-ink">
                    Georgia Institute of Technology
                  </h4>
                  <p className="font-mono text-xs text-accent mt-0.5">
                    M.S. in Computer Science (Machine Learning)
                  </p>
                  <p className="text-sm text-inkMuted mt-2 leading-relaxed">
                    Graduate coursework in machine learning, deep learning,
                    reinforcement learning, and distributed computing.
                  </p>
                </div>
                <div className="pt-5 border-t border-rule">
                  <h4 className="text-base font-semibold text-ink">
                    University of California, Santa Cruz
                  </h4>
                  <p className="font-mono text-xs text-inkMuted mt-0.5">
                    B.S. in Computer Science
                  </p>
                  <p className="text-sm text-inkMuted mt-2 leading-relaxed">
                    Algorithms, systems architecture, relational databases, and
                    software engineering.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-inkMuted mb-5">
                Other Projects
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-base font-semibold text-ink">
                      Webex AI Speech Assistant
                    </h4>
                    <a
                      href="https://github.com/phanturne/webex_ai_assistant"
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-inkMuted hover:text-accent inline-flex items-center gap-1 shrink-0 transition-colors"
                    >
                      GitHub <ExternalArrowIcon />
                    </a>
                  </div>
                  <p className="font-mono text-xs text-accent mt-0.5">
                    1st Place · 2024 Cisco HackAIthon @Catalyst
                  </p>
                  <p className="text-sm text-inkMuted mt-2 leading-relaxed">
                    Real-time speech clarity, pacing, and tone feedback for
                    Webex meetings.
                  </p>
                </div>

                <div className="pt-5 border-t border-rule">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-base font-semibold text-ink">
                      Metadachi
                    </h4>
                    <a
                      href="https://github.com/phanturne/metadachi-old"
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-inkMuted hover:text-accent inline-flex items-center gap-1 shrink-0 transition-colors"
                    >
                      GitHub <ExternalArrowIcon />
                    </a>
                  </div>
                  <p className="text-sm text-inkMuted mt-2 leading-relaxed">
                    Canvas knowledge workspace combining Speech-to-Text with LLM
                    intent inference and semantic card grouping.
                  </p>
                </div>

                <div className="pt-4 border-t border-rule">
                  <a
                    href="https://github.com/phanturne?tab=repositories"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-inkMuted hover:text-accent inline-flex items-center gap-1.5 transition-colors"
                  >
                    All repositories on GitHub <ExternalArrowIcon />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-inkMuted mb-5">
                Technical Stack
              </h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-xs text-ink mb-1">Languages</dt>
                  <dd className="text-inkMuted leading-relaxed">
                    Python · TypeScript · JavaScript · Java · C# · SQL · Scala ·
                    C++
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink mb-1">Frontend</dt>
                  <dd className="text-inkMuted leading-relaxed">
                    React · Next.js · Angular · TanStack Query · Tailwind CSS ·
                    Phaser 3
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink mb-1">
                    Backend &amp; Data
                  </dt>
                  <dd className="text-inkMuted leading-relaxed">
                    .NET · Node.js · PostgreSQL · DynamoDB · Apache Spark ·
                    Drizzle ORM · Supabase
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink mb-1">
                    Machine Learning
                  </dt>
                  <dd className="text-inkMuted leading-relaxed">
                    PyTorch · TensorFlow · scikit-learn · Pandas · NumPy
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink mb-1">
                    Cloud &amp; Testing
                  </dt>
                  <dd className="text-inkMuted leading-relaxed">
                    AWS · Docker · Linux · Git · Vitest · Playwright · SonarQube
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {expandedScene && activeGalleryScenes && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={expandedScene.alt}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-ground/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full bg-surface border border-rule rounded-[8px] p-4 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-rule font-mono text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-accent font-semibold tabular-cell">
                  {activeGalleryIdx + 1} / {activeGalleryScenes.length}
                </span>
                <span className="text-rule">·</span>
                <span className="text-ink font-medium">
                  {expandedScene.alt}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {prevScene && (
                  <button
                    type="button"
                    onClick={() => setActiveGalleryIdx(activeGalleryIdx - 1)}
                    aria-label={`Previous image: ${prevScene.label}`}
                    title={`Previous: ${prevScene.label} (←)`}
                    className="h-8 px-2.5 rounded-[4px] bg-ground border border-rule text-inkMuted hover:text-ink hover:border-inkMuted inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ChevronLeftIcon />
                    <span className="hidden sm:inline">{prevScene.label}</span>
                  </button>
                )}
                {nextScene && (
                  <button
                    type="button"
                    onClick={() => setActiveGalleryIdx(activeGalleryIdx + 1)}
                    aria-label={`Next image: ${nextScene.label}`}
                    title={`Next: ${nextScene.label} (→)`}
                    className="h-8 px-2.5 rounded-[4px] bg-ground border border-rule text-inkMuted hover:text-ink hover:border-inkMuted inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span className="hidden sm:inline">{nextScene.label}</span>
                    <ChevronRightIcon />
                  </button>
                )}
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close expanded view"
                  title="Close (ESC)"
                  className="w-8 h-8 rounded-[4px] bg-ground border border-rule text-inkMuted hover:text-ink hover:border-inkMuted inline-flex items-center justify-center transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className="rounded-[6px] overflow-hidden border border-rule bg-ground max-h-[75vh] flex items-center justify-center">
              <img
                key={expandedScene.id}
                src={expandedScene.src}
                alt={expandedScene.alt}
                width={1600}
                height={1000}
                className="w-full h-auto max-h-[75vh] object-contain bay-transition"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
              <p className="font-mono text-xs text-inkMuted">
                {expandedScene.caption}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs shrink-0">
                {activeGalleryScenes.map((scene, idx) => (
                  <button
                    key={scene.id}
                    type="button"
                    aria-current={idx === activeGalleryIdx ? "true" : undefined}
                    onClick={() => setActiveGalleryIdx(idx)}
                    className={`px-2.5 py-1 rounded-[4px] border transition-colors ${
                      idx === activeGalleryIdx
                        ? "bg-ink text-ground border-ink font-semibold"
                        : "bg-ground text-inkMuted border-rule hover:text-ink"
                    }`}
                  >
                    {scene.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 border-t border-rule">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-inkMuted">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="text-ink font-medium">Kevin Ding</span>
            <span>·</span>
            <a
              href="https://github.com/phanturne"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="https://www.linkedin.com/in/krding"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a
              href="https://sprites.pmdcollab.org/#/0133"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              Eevee: PMDCollab / Chunsoft
            </a>
          </div>
          <span>Seattle, WA</span>
        </div>
      </footer>
    </div>
  );
}
