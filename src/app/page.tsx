"use client";

import React, { useState, useEffect, useRef } from "react";
import { NightSkyInteractive } from "@/components/NightSkyInteractive";
import { PmdSpriteCompanion } from "@/components/CardMicroInteractions";

const STRESSALPHA_SCENES = [
  {
    id: "cockpit",
    label: "Dual-Pane Cockpit",
    src: "/images/stress-alpha/cockpit-preview.png",
    alt: "StressAlpha Dual-Pane Valuation & Scenario Cockpit",
    caption:
      "Decouples server-streamed reports from client state via TanStack Query for sub-millisecond client-side modeling of operating leverage and FCF conversion.",
  },
  {
    id: "screener",
    label: "Universe Screener",
    src: "/images/stress-alpha/screener-preview.png",
    alt: "StressAlpha Equity Universe Screener",
    caption:
      "Hybrid relational and JSONB data layer in PostgreSQL (Neon) with Drizzle ORM for cross-ticker time-series SQL screening and scenario dispersion ranking.",
  },
  {
    id: "memo",
    label: "IC Audit Memo",
    src: "/images/stress-alpha/memo-preview.png",
    alt: "StressAlpha Investment Committee Memo & Footnote Audit",
    caption:
      "Supply-chain dependency DAG propagating upstream shocks into downstream earnings revisions, backed by isolated CI integration tests via Neon ephemeral branching.",
  },
];

const POKEBASTION_SCENES = [
  {
    id: "combat",
    label: "Live Wave Combat",
    src: "/images/pokebastion/combat.png",
    alt: "PokéBastion TD Live Wave Combat on 28x18 Open Grid",
    caption:
      "Real-time Phaser 3 wave combat across a 28×18 open grid where enemies dynamically pathfind around player-built maze walls and defensive towers.",
  },
  {
    id: "prep",
    label: "Maze & Pathfinding",
    src: "/images/pokebastion/prep.png",
    alt: "PokéBastion TD Prep Phase & Dynamic A* Path Preview",
    caption:
      "Open-map wall placement with zero-latency flow-field / A* route recalculation, live unit repositioning, and anti-block path validation.",
  },
  {
    id: "draft",
    label: "Roguelike Draft",
    src: "/images/pokebastion/draft.png",
    alt: "PokéBastion TD Roguelike Unit & Evolution Draft",
    caption:
      "Branching roguelike starter drafts, evolution trees, and elemental synergy specialization verified with Vitest unit suites and Playwright E2E tests.",
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
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function GitHubIcon() {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon() {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
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
      strokeWidth="2.2"
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
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
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
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function LanternIcon() {
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
      <path d="M6 6c0-2.5 3-4 6-4s6 1.5 6 4l1.5 11c0 2.5-3.5 4-7.5 4s-7.5-1.5-7.5-4L6 6Z" />
      <circle cx="12" cy="14" r="2" />
      <line x1="12" y1="21" x2="12" y2="23" />
    </svg>
  );
}

export default function MidnightCinemaPortfolio() {
  const [stressSceneIdx, setStressSceneIdx] = useState<number>(0);
  const [pokeSceneIdx, setPokeSceneIdx] = useState<number>(0);

  const [expandedGallery, setExpandedGallery] = useState<
    "stress" | "poke" | null
  >(null);

  const [skyEnabled, setSkyEnabled] = useState<boolean>(true);
  const [headerVisible, setHeaderVisible] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const lastScrollYRef = useRef<number>(0);
  const navLockUntilRef = useRef<number>(0);

  const handleHeaderNavClick = () => {
    navLockUntilRef.current = Date.now() + 1100;
    setHeaderVisible(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const prevY = lastScrollYRef.current;
      const delta = currentY - prevY;

      setIsScrolled(currentY > 36);

      if (Date.now() < navLockUntilRef.current) {
        setHeaderVisible(true);
        lastScrollYRef.current = currentY;
        return;
      }

      if (currentY < 60) {
        setHeaderVisible(true);
      } else if (delta > 8) {
        setHeaderVisible(false);
      } else if (delta < -6) {
        setHeaderVisible(true);
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Lock body scroll and focus Close button ONLY when lightbox transitions open (never on slide changes)
  useEffect(() => {
    if (!isLightboxOpen) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  // Keyboard navigation (Escape, ArrowLeft/ArrowRight, and Tab focus trap)
  useEffect(() => {
    if (!isLightboxOpen || !activeGalleryScenes) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft" && activeGalleryIdx > 0) {
        e.preventDefault();
        setActiveGalleryIdx(activeGalleryIdx - 1);
      } else if (
        e.key === "ArrowRight" &&
        activeGalleryIdx < activeGalleryScenes.length - 1
      ) {
        e.preventDefault();
        setActiveGalleryIdx(activeGalleryIdx + 1);
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
  }, [
    isLightboxOpen,
    activeGalleryIdx,
    activeGalleryScenes,
    setActiveGalleryIdx,
  ]);

  const activeStressScene = STRESSALPHA_SCENES[stressSceneIdx];
  const activePokeScene = POKEBASTION_SCENES[pokeSceneIdx];

  return (
    <div className="min-h-screen relative flex flex-col justify-between">
      {/* Keyboard Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-[6px] focus:bg-primeCyan focus:text-theaterBg focus:font-mono focus:text-xs focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Midnight Sky, Drifting Inspirational Lanterns & Reflective Water */}
      <NightSkyInteractive skyEnabled={skyEnabled} />

      {/* Smart Scroll-Aware Editorial Header (Glides back into view on upward scroll and stays visible on nav click) */}
      <header
        inert={!headerVisible ? true : undefined}
        className={`sticky top-0 z-50 transition-[transform,opacity] duration-300 ${
          headerVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-10 pt-3 sm:pt-4 pb-2">
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4 rounded-2xl sm:rounded-full border transition-[background-color,border-color,box-shadow,padding] duration-300 ${
              isScrolled
                ? "px-4 py-2.5 sm:px-6 sm:py-2.5 bg-screenDark/95 backdrop-blur-xl border-primeCyan/20 shadow-[0_16px_36px_rgba(2,5,12,0.92)]"
                : "px-3.5 py-2.5 sm:px-4 sm:py-2 bg-theaterBg/70 backdrop-blur-md border-transparent shadow-none"
            }`}
          >
            <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-iceWhite leading-none">
                <a
                  href="#"
                  onClick={handleHeaderNavClick}
                  className="hover:text-skyLight transition-colors"
                >
                  Kevin Ding
                </a>
              </h1>
              <span
                className="hidden sm:inline text-borderNavy font-mono"
                aria-hidden="true"
              >
                /
              </span>
              <p className="font-sans text-xs sm:text-sm text-slateMuted">
                Software Engineer at
                <span className="ml-1 text-iceWhite font-medium">Amazon</span>
                <span className="mx-1.5 text-slateMuted/60">·</span>
                M.S. CS at
                <span className="ml-1 text-iceWhite font-medium">
                  Georgia Tech
                </span>
              </p>
            </div>

            <nav
              aria-label="Primary navigation and social links"
              className="flex flex-wrap items-center justify-between sm:justify-end gap-1 sm:gap-1.5 font-mono text-xs"
            >
              <div className="flex items-center gap-1 sm:gap-1.5">
                <a
                  href="#projects"
                  onClick={handleHeaderNavClick}
                  className="px-2 sm:px-2.5 py-1 rounded-full text-slateMuted hover:text-iceWhite hover:bg-cardNavy transition-colors whitespace-nowrap"
                >
                  Projects
                </a>
                <a
                  href="#experience"
                  onClick={handleHeaderNavClick}
                  className="px-2 sm:px-2.5 py-1 rounded-full text-slateMuted hover:text-iceWhite hover:bg-cardNavy transition-colors whitespace-nowrap"
                >
                  Experience
                </a>
              </div>

              <div
                className="hidden sm:block h-3.5 w-[1px] bg-borderNavy mx-0.5"
                aria-hidden="true"
              />

              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  type="button"
                  aria-pressed={skyEnabled}
                  onClick={() => setSkyEnabled((v) => !v)}
                  title="Toggle Yozakura petals, wishing lanterns, and midnight lake"
                  className={`px-2 sm:px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 transition-colors ${
                    skyEnabled
                      ? "bg-primeCyan/15 text-skyLight border-primeCyan/40"
                      : "border-transparent text-slateMuted hover:text-iceWhite"
                  }`}
                >
                  <LanternIcon />
                  <span>{skyEnabled ? "Sky: On" : "Sky: Off"}</span>
                </button>

                <div
                  className="hidden sm:block h-3.5 w-[1px] bg-borderNavy mx-0.5"
                  aria-hidden="true"
                />

                <a
                  href="https://github.com/phanturne"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub (@phanturne)"
                  title="GitHub (@phanturne)"
                  className="w-7 h-7 rounded-full text-slateMuted hover:text-skyLight hover:bg-cardNavy inline-flex items-center justify-center transition-colors"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/krding"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn (Kevin Ding)"
                  title="LinkedIn"
                  className="w-7 h-7 rounded-full text-slateMuted hover:text-skyLight hover:bg-cardNavy inline-flex items-center justify-center transition-colors"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main
        id="main-content"
        className="relative z-10 flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-10 pt-8 pb-20"
      >
        {/* FIRST VIEWPORT: 50/50 Dual Flagship Showcase */}
        <div
          id="projects"
          className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch"
        >
          {/* FLAGSHIP 1: STRESSALPHA (Tier-1 theater-elevation) */}
          <section className="bg-cardNavy/90 rounded-[14px] p-5 sm:p-8 flex flex-col justify-start theater-elevation">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display font-bold text-xl sm:text-3xl text-iceWhite">
                  StressAlpha
                </h2>
                <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                  <a
                    href="https://github.com/phanturne/stress-alpha"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="StressAlpha GitHub Repository"
                    title="View Source on GitHub"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-[6px] bg-screenDark border border-borderNavy text-slateMuted hover:text-iceWhite hover:border-primeCyan inline-flex items-center justify-center transition-colors"
                  >
                    <GitHubIcon />
                  </a>
                  <a
                    href="https://stressalpha.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="h-8 sm:h-9 bg-primeCyan text-theaterBg font-bold px-3 sm:px-3.5 rounded-[6px] inline-flex items-center gap-1.5 hover:bg-iceWhite transition-colors whitespace-nowrap"
                  >
                    LAUNCH APP <ExternalArrowIcon />
                  </a>
                </div>
              </div>
              <p className="text-slateMuted text-sm sm:text-[15px] mt-3 leading-relaxed">
                Equity earnings and scenario stress-testing web app. Combines
                sub-millisecond client-side valuation modeling and custom SVG
                charts with automated SEC EDGAR &amp; Yahoo Finance ingestion.
              </p>

              {/* Editorial Architecture Spec Strip (Clean typography without nested boxes) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2.5 mt-4 pt-4 border-t border-borderNavy/60 font-mono text-xs">
                <div className="flex sm:block items-baseline justify-between gap-2">
                  <span className="text-primeCyan font-bold block">
                    Client-Side DCF
                  </span>
                  <span className="text-slateMuted">TanStack Query State</span>
                </div>
                <div className="flex sm:block items-baseline justify-between gap-2">
                  <span className="text-mintTeal font-bold block">
                    Supply-Chain Graph
                  </span>
                  <span className="text-slateMuted">Upstream Shock DAG</span>
                </div>
                <div className="flex sm:block items-baseline justify-between gap-2">
                  <span className="text-skyLight font-bold block">
                    PostgreSQL + JSONB
                  </span>
                  <span className="text-slateMuted">Drizzle ORM &amp; Neon</span>
                </div>
              </div>
            </div>

            {/* Widescreen 16:10 Viewport: Compact Segmented Toolbar + Animated Tabpanel */}
            <div className="relative bg-screenDark rounded-[10px] p-3.5 sm:p-4 my-5 flex flex-col justify-start gap-3.5 projection-screen-frame">
              <div className="flex items-center justify-between gap-2">
                <div
                  className="inline-flex items-center gap-1 overflow-x-auto max-w-full bg-cardNavy/70 p-1 rounded-[7px] font-mono text-xs"
                  role="tablist"
                  aria-label="StressAlpha scenes"
                >
                  {STRESSALPHA_SCENES.map((scene, idx) => (
                    <button
                      key={scene.id}
                      id={`stress-tab-${scene.id}`}
                      type="button"
                      role="tab"
                      tabIndex={stressSceneIdx === idx ? 0 : -1}
                      aria-selected={stressSceneIdx === idx}
                      aria-controls={`stress-panel-${scene.id}`}
                      onClick={() => setStressSceneIdx(idx)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                          e.preventDefault();
                          const next =
                            e.key === "ArrowRight"
                              ? (idx + 1) % STRESSALPHA_SCENES.length
                              : (idx - 1 + STRESSALPHA_SCENES.length) %
                                STRESSALPHA_SCENES.length;
                          setStressSceneIdx(next);
                          document
                            .getElementById(
                              `stress-tab-${STRESSALPHA_SCENES[next].id}`
                            )
                            ?.focus();
                        }
                      }}
                      className={`whitespace-nowrap px-2.5 py-1 rounded-[5px] transition-colors ${
                        stressSceneIdx === idx
                          ? "bg-primeCyan text-theaterBg font-bold"
                          : "text-slateMuted hover:text-iceWhite"
                      }`}
                    >
                      {scene.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => openLightbox("stress")}
                  aria-label="Expand StressAlpha screenshot"
                  title="Expand screenshot"
                  className="w-8 h-8 rounded-[6px] text-slateMuted hover:text-primeCyan hover:bg-cardNavy inline-flex items-center justify-center transition-colors shrink-0"
                >
                  <ExpandIcon />
                </button>
              </div>

              <div
                key={activeStressScene.id}
                id={`stress-panel-${activeStressScene.id}`}
                role="tabpanel"
                aria-labelledby={`stress-tab-${activeStressScene.id}`}
                className="xray-bay-transition flex flex-col gap-3"
              >
                <button
                  type="button"
                  onClick={() => openLightbox("stress")}
                  className="group relative rounded-[8px] overflow-hidden ring-1 ring-white/10 bg-screenDark aspect-[16/10] flex items-center justify-center cursor-zoom-in text-left w-full"
                  aria-label={`Expand ${activeStressScene.label} screenshot`}
                >
                  <img
                    src={activeStressScene.src}
                    alt={activeStressScene.alt}
                    width={1600}
                    height={1000}
                    loading="eager"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.015]"
                  />
                </button>

                <p className="font-mono text-xs text-slateMuted leading-relaxed pb-8 sm:pb-7">
                  {activeStressScene.caption}
                </p>
              </div>
            </div>

            {/* Footer Tech Stack Strip */}
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 font-mono text-xs text-skyLight/85 mt-auto pt-4 border-t border-borderNavy/60">
              <span>Next.js</span>
              <span>React</span>
              <span>TypeScript</span>
              <span>TanStack Query</span>
              <span>PostgreSQL</span>
              <span>Drizzle ORM</span>
            </div>
          </section>

          {/* FLAGSHIP 2: POKÉBASTION TD (Tier-1 theater-elevation) */}
          <section className="bg-cardNavy/90 rounded-[14px] p-5 sm:p-8 flex flex-col justify-start theater-elevation">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display font-bold text-xl sm:text-3xl text-iceWhite">
                  PokéBastion TD
                </h2>
                <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                  <a
                    href="https://github.com/phanturne/pokebastion"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="PokéBastion TD GitHub Repository"
                    title="View Source on GitHub"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-[6px] bg-screenDark border border-borderNavy text-slateMuted hover:text-iceWhite hover:border-primeCyan inline-flex items-center justify-center transition-colors"
                  >
                    <GitHubIcon />
                  </a>
                  <a
                    href="https://phanturne.github.io/pokebastion/"
                    target="_blank"
                    rel="noreferrer"
                    className="h-8 sm:h-9 bg-primeCyan text-theaterBg font-bold px-3 sm:px-3.5 rounded-[6px] inline-flex items-center gap-1.5 hover:bg-iceWhite transition-colors whitespace-nowrap"
                  >
                    PLAY LIVE <ExternalArrowIcon />
                  </a>
                </div>
              </div>
              <p className="text-slateMuted text-sm sm:text-[15px] mt-3 leading-relaxed">
                Open-map roguelike tower defense game for the browser. Enemies
                dynamically pathfind around player-built walls across a 28×18
                grid, with 152 playable units, specialization trees, and live
                repositioning.
              </p>

              {/* Editorial Architecture Spec Strip (Clean typography without nested boxes) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2.5 mt-4 pt-4 border-t border-borderNavy/60 font-mono text-xs">
                <div className="flex sm:block items-baseline justify-between gap-2">
                  <span className="text-primeCyan font-bold block tabular-cell">
                    Dynamic A* Pathing
                  </span>
                  <span className="text-slateMuted">28×18 Open-Grid Maze</span>
                </div>
                <div className="flex sm:block items-baseline justify-between gap-2">
                  <span className="text-mintTeal font-bold block tabular-cell">
                    152 Playable Units
                  </span>
                  <span className="text-slateMuted">Branching Evolutions</span>
                </div>
                <div className="flex sm:block items-baseline justify-between gap-2">
                  <span className="text-skyLight font-bold block">
                    Automated Testing
                  </span>
                  <span className="text-slateMuted">Vitest &amp; Playwright</span>
                </div>
              </div>
            </div>

            {/* Widescreen 16:10 Viewport: Compact Segmented Toolbar + Animated Tabpanel */}
            <div className="relative bg-screenDark rounded-[10px] p-3.5 sm:p-4 my-5 flex flex-col justify-start gap-3.5 projection-screen-frame">
              <div className="flex items-center justify-between gap-2">
                <div
                  className="inline-flex items-center gap-1 overflow-x-auto max-w-full bg-cardNavy/70 p-1 rounded-[7px] font-mono text-xs"
                  role="tablist"
                  aria-label="PokéBastion scenes"
                >
                  {POKEBASTION_SCENES.map((scene, idx) => (
                    <button
                      key={scene.id}
                      id={`poke-tab-${scene.id}`}
                      type="button"
                      role="tab"
                      tabIndex={pokeSceneIdx === idx ? 0 : -1}
                      aria-selected={pokeSceneIdx === idx}
                      aria-controls={`poke-panel-${scene.id}`}
                      onClick={() => setPokeSceneIdx(idx)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                          e.preventDefault();
                          const next =
                            e.key === "ArrowRight"
                              ? (idx + 1) % POKEBASTION_SCENES.length
                              : (idx - 1 + POKEBASTION_SCENES.length) %
                                POKEBASTION_SCENES.length;
                          setPokeSceneIdx(next);
                          document
                            .getElementById(
                              `poke-tab-${POKEBASTION_SCENES[next].id}`
                            )
                            ?.focus();
                        }
                      }}
                      className={`whitespace-nowrap px-2.5 py-1 rounded-[5px] transition-colors ${
                        pokeSceneIdx === idx
                          ? "bg-primeCyan text-theaterBg font-bold"
                          : "text-slateMuted hover:text-iceWhite"
                      }`}
                    >
                      {scene.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => openLightbox("poke")}
                  aria-label="Expand PokéBastion screenshot"
                  title="Expand screenshot"
                  className="w-8 h-8 rounded-[6px] text-slateMuted hover:text-primeCyan hover:bg-cardNavy inline-flex items-center justify-center transition-colors shrink-0"
                >
                  <ExpandIcon />
                </button>
              </div>

              <div
                key={activePokeScene.id}
                id={`poke-panel-${activePokeScene.id}`}
                role="tabpanel"
                aria-labelledby={`poke-tab-${activePokeScene.id}`}
                className="xray-bay-transition flex flex-col gap-3"
              >
                <button
                  type="button"
                  onClick={() => openLightbox("poke")}
                  className="group relative rounded-[8px] overflow-hidden ring-1 ring-white/10 bg-screenDark aspect-[16/10] flex items-center justify-center cursor-zoom-in text-left w-full"
                  aria-label={`Expand ${activePokeScene.label} screenshot`}
                >
                  <img
                    src={activePokeScene.src}
                    alt={activePokeScene.alt}
                    width={1600}
                    height={1000}
                    loading="eager"
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.015]"
                  />
                </button>

                <div className="relative pb-8 sm:pb-7">
                  <p className="font-mono text-xs text-slateMuted leading-relaxed">
                    {activePokeScene.caption}
                  </p>
                  {/* Interactive Roaming PMDCollab Eevee Sprite Below Description Text */}
                  <PmdSpriteCompanion />
                </div>
              </div>
            </div>

            {/* Footer Tech Stack Strip */}
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 font-mono text-xs text-skyLight/85 mt-auto pt-4 border-t border-borderNavy/60">
              <span>TypeScript</span>
              <span>Phaser 3</span>
              <span>Vite</span>
              <span>HTML5 Canvas</span>
              <span>Vitest</span>
              <span>Playwright</span>
            </div>
          </section>
        </div>

        {/* SECTION 2: PROFESSIONAL EXPERIENCE, EDUCATION & SKILLS */}
        <section
          id="experience"
          className="scroll-mt-24 mt-16 pt-12 pb-8 border-t border-primeCyan/25"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-iceWhite">
                Experience, Education &amp; Skills
              </h2>
              <p className="text-slateMuted text-base mt-1.5 max-w-[72ch]">
                Full-stack software engineering, distributed backend services,
                and machine learning systems.
              </p>
            </div>
          </div>

          {/* 2-Column Experience Row: Equal 50/50 Split for Amazon Prime Video + Peraton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Amazon Prime Video */}
            <article className="rounded-[14px] p-5 sm:p-7 flex flex-col justify-between theater-elevation">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-borderNavy/60">
                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-iceWhite leading-none">
                      Amazon Prime Video
                    </h3>
                    <p className="font-mono text-xs text-skyLight mt-2">
                      Software Engineer · Seattle, WA
                    </p>
                  </div>
                  <span className="font-mono text-xs text-skyLight/85">
                    2025 – Present
                  </span>
                </div>

                <ul className="mt-5 space-y-3.5 text-sm text-slateMuted leading-relaxed">
                  <li className="flex gap-2.5">
                    <span className="text-primeCyan font-mono font-bold shrink-0">
                      +
                    </span>
                    <span>
                      <strong className="text-iceWhite">
                        ML-Driven Notification Targeting:
                      </strong>{" "}
                      Launched Prime Video&apos;s new-title email notification
                      service and migrated push targeting workflows to online
                      machine learning inference using Apache Spark and AWS Step
                      Functions.
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-primeCyan font-mono font-bold shrink-0">
                      +
                    </span>
                    <span>
                      <strong className="text-iceWhite">
                        Low-Latency Campaign Config Store:
                      </strong>{" "}
                      Migrated static campaign configuration pipelines to a
                      cached DynamoDB store with automated JSON payload
                      validation to eliminate rollout bottlenecks.
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-primeCyan font-mono font-bold shrink-0">
                      +
                    </span>
                    <span>
                      <strong className="text-iceWhite">
                        On-Call AI Agents &amp; A/B Reporting:
                      </strong>{" "}
                      Built AI agent workflows for automated on-call incident
                      triage, log investigation, and CloudWatch alarm tuning,
                      alongside an internal A/B experiment reporting tool.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 font-mono text-xs text-skyLight/85 mt-6 pt-4 border-t border-borderNavy/60">
                <span>AWS</span>
                <span>Apache Spark</span>
                <span>DynamoDB</span>
                <span>Java</span>
                <span>TypeScript / React</span>
                <span>AI Agents</span>
              </div>
            </article>

            {/* Peraton */}
            <article className="rounded-[14px] p-5 sm:p-7 flex flex-col justify-between theater-elevation">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-borderNavy/60">
                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-iceWhite leading-none">
                      Peraton
                    </h3>
                    <p className="font-mono text-xs text-skyLight mt-2">
                      Software Engineer II · Santa Clara, CA
                    </p>
                  </div>
                  <span className="font-mono text-xs text-skyLight/85">
                    2023 – 2025
                  </span>
                </div>

                <ul className="mt-5 space-y-3.5 text-sm text-slateMuted leading-relaxed">
                  <li className="flex gap-2.5">
                    <span className="text-mintTeal font-mono font-bold shrink-0">
                      +
                    </span>
                    <span>
                      <strong className="text-iceWhite">
                        Enterprise Angular Dashboards:
                      </strong>{" "}
                      Built interactive Angular dashboards and reactive form
                      workflows with client-side state management and
                      asynchronous data binding.
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-mintTeal font-mono font-bold shrink-0">
                      +
                    </span>
                    <span>
                      <strong className="text-iceWhite">
                        C# / .NET Microservices &amp; SQL:
                      </strong>{" "}
                      Optimized C#/.NET backend microservices and relational SQL
                      queries while standardizing RESTful API contracts across
                      engineering teams.
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-mintTeal font-mono font-bold shrink-0">
                      +
                    </span>
                    <span>
                      <strong className="text-iceWhite">
                        Code Quality &amp; Mentorship:
                      </strong>{" "}
                      Introduced SonarQube static analysis checks and clean-code
                      standards across the team while mentoring incoming
                      engineers and standardizing onboarding docs.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 font-mono text-xs text-skyLight/85 mt-6 pt-4 border-t border-borderNavy/60">
                <span>Angular</span>
                <span>TypeScript</span>
                <span>C# / .NET</span>
                <span>SQL</span>
                <span>SonarQube</span>
              </div>
            </article>
          </div>

          {/* 3-Column Row: Education + Additional Projects + Skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-8">
            {/* Education */}
            <article className="rounded-[14px] p-5 sm:p-7 theater-elevation">
              <h3 className="font-display font-bold text-2xl text-iceWhite mb-4">
                Education
              </h3>

              <div className="space-y-4">
                <div className="pb-4 border-b border-borderNavy/60">
                  <h4 className="font-display font-bold text-lg text-iceWhite">
                    Georgia Institute of Technology
                  </h4>
                  <p className="font-mono text-xs text-skyLight mt-1">
                    M.S. in Computer Science (Machine Learning)
                  </p>
                  <p className="text-sm text-slateMuted mt-2 leading-relaxed">
                    Graduate focus in machine learning, deep learning,
                    reinforcement learning, and distributed computing.
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-bold text-lg text-iceWhite">
                    University of California, Santa Cruz
                  </h4>
                  <p className="font-mono text-xs text-skyLight mt-1">
                    B.S. in Computer Science
                  </p>
                  <p className="text-sm text-slateMuted mt-2 leading-relaxed">
                    Core coursework in algorithms, systems architecture,
                    relational databases, and software engineering.
                  </p>
                </div>
              </div>
            </article>

            {/* Additional Projects */}
            <article className="rounded-[14px] p-5 sm:p-7 flex flex-col justify-between theater-elevation">
              <div>
                <h3 className="font-display font-bold text-2xl text-iceWhite mb-4">
                  Additional Projects
                </h3>

                <div className="space-y-4 text-sm text-slateMuted">
                  <div className="pb-4 border-b border-borderNavy/60">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-semibold text-iceWhite block">
                          Webex AI Speech Assistant
                        </span>
                        <span className="inline-block font-mono text-xs text-primeCyan mt-1">
                          1st Place · 2024 Cisco HackAIthon @Catalyst
                        </span>
                      </div>
                      <a
                        href="https://github.com/phanturne/webex_ai_assistant"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Webex AI Speech Assistant GitHub Repository"
                        title="View on GitHub"
                        className="w-8 h-8 rounded-[6px] text-slateMuted hover:text-primeCyan hover:bg-screenDark inline-flex items-center justify-center transition-colors shrink-0"
                      >
                        <GitHubIcon />
                      </a>
                    </div>
                    <p className="text-sm text-slateMuted mt-2 leading-relaxed">
                      AI-driven Webex assistant delivering real-time feedback on
                      speech clarity, pacing, and tone across the university
                      track.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-iceWhite">
                        Metadachi
                      </span>
                      <a
                        href="https://github.com/phanturne/metadachi-old"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Metadachi GitHub Repository"
                        title="View on GitHub"
                        className="w-8 h-8 rounded-[6px] text-slateMuted hover:text-primeCyan hover:bg-screenDark inline-flex items-center justify-center transition-colors shrink-0"
                      >
                        <GitHubIcon />
                      </a>
                    </div>
                    <p className="text-sm text-slateMuted mt-2 leading-relaxed">
                      Canvas-style AI knowledge workspace combining
                      Speech-to-Text workflows with LLM intent inference and
                      automated semantic card organization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-skyLight mt-6 pt-4 border-t border-borderNavy/60">
                <span>View all repositories on GitHub</span>
                <a
                  href="https://github.com/phanturne?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="All GitHub Repositories"
                  title="All GitHub Repositories"
                  className="w-8 h-8 rounded-[6px] text-slateMuted hover:text-primeCyan hover:bg-screenDark inline-flex items-center justify-center transition-colors"
                >
                  <ExternalArrowIcon />
                </a>
              </div>
            </article>

            {/* Skills */}
            <article className="rounded-[14px] p-5 sm:p-7 theater-elevation">
              <h3 className="font-display font-bold text-2xl text-iceWhite mb-4">
                Skills
              </h3>
              <dl className="space-y-4">
                <div>
                  <dt className="block font-mono text-xs font-semibold tracking-wider uppercase text-primeCyan mb-1">
                    Languages
                  </dt>
                  <dd className="block font-sans text-sm text-slateMuted leading-relaxed">
                    Python · TypeScript · JavaScript · Java · C# · SQL · Scala ·
                    C++
                  </dd>
                </div>
                <div>
                  <dt className="block font-mono text-xs font-semibold tracking-wider uppercase text-mintTeal mb-1">
                    Frontend
                  </dt>
                  <dd className="block font-sans text-sm text-slateMuted leading-relaxed">
                    React · Next.js · Angular · TanStack Query · Tailwind CSS ·
                    Phaser 3
                  </dd>
                </div>
                <div>
                  <dt className="block font-mono text-xs font-semibold tracking-wider uppercase text-skyLight mb-1">
                    Backend &amp; Data
                  </dt>
                  <dd className="block font-sans text-sm text-slateMuted leading-relaxed">
                    .NET · Node.js · PostgreSQL · DynamoDB · Apache Spark ·
                    Drizzle ORM · Supabase
                  </dd>
                </div>
                <div>
                  <dt className="block font-mono text-xs font-semibold tracking-wider uppercase text-primeCyan mb-1">
                    Machine Learning
                  </dt>
                  <dd className="block font-sans text-sm text-slateMuted leading-relaxed">
                    PyTorch · TensorFlow · scikit-learn · Pandas · NumPy
                  </dd>
                </div>
                <div>
                  <dt className="block font-mono text-xs font-semibold tracking-wider uppercase text-mintTeal mb-1">
                    Cloud &amp; Testing
                  </dt>
                  <dd className="block font-sans text-sm text-slateMuted leading-relaxed">
                    AWS · Docker · Linux · Git · Vitest · Playwright · SonarQube
                  </dd>
                </div>
              </dl>
            </article>
          </div>
        </section>
      </main>

      {/* Widescreen High-Resolution Screenshot Lightbox with Previous / Next Navigation */}
      {expandedScene && activeGalleryScenes && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={expandedScene.alt}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-theaterBg/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full bg-cardNavy border border-primeCyan/40 rounded-[14px] p-4 sm:p-6 theater-elevation"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-borderNavy font-mono text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-skyLight font-bold tabular-cell">
                  {activeGalleryIdx + 1} / {activeGalleryScenes.length}
                </span>
                <span className="text-borderNavy">·</span>
                <span className="text-iceWhite font-bold">
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
                    className="h-9 px-3 rounded-[6px] bg-screenDark border border-borderNavy text-slateMuted hover:text-iceWhite hover:border-primeCyan inline-flex items-center gap-1.5 transition-colors"
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
                    className="h-9 px-3 rounded-[6px] bg-screenDark border border-borderNavy text-slateMuted hover:text-iceWhite hover:border-primeCyan inline-flex items-center gap-1.5 transition-colors"
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
                  className="w-9 h-9 rounded-[6px] bg-screenDark border border-borderNavy text-slateMuted hover:text-iceWhite hover:border-primeCyan inline-flex items-center justify-center transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className="rounded-[8px] overflow-hidden border border-borderNavy bg-screenDark max-h-[75vh] flex items-center justify-center">
              <img
                key={expandedScene.id}
                src={expandedScene.src}
                alt={expandedScene.alt}
                width={1600}
                height={1000}
                className="w-full h-auto max-h-[75vh] object-contain xray-bay-transition"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
              <p className="font-mono text-xs text-slateMuted">
                {expandedScene.caption}
              </p>

              <div className="flex items-center gap-1.5 font-mono text-xs shrink-0">
                {activeGalleryScenes.map((scene, idx) => (
                  <button
                    key={scene.id}
                    type="button"
                    aria-current={idx === activeGalleryIdx ? "true" : undefined}
                    onClick={() => setActiveGalleryIdx(idx)}
                    className={`px-2.5 py-1 rounded-[4px] border transition-colors ${
                      idx === activeGalleryIdx
                        ? "bg-primeCyan text-theaterBg border-primeCyan font-bold"
                        : "bg-screenDark text-slateMuted border-borderNavy hover:text-iceWhite"
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

      {/* Minimal Open Lakeside Colophon (No opaque full-width box blocking the water) */}
      <footer className="relative z-10 pointer-events-none">
        <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-10 pt-4 pb-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans sm:font-mono text-xs text-slateMuted/85">
          <div className="pointer-events-auto inline-flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-2.5 gap-y-1 rounded-2xl sm:rounded-full bg-screenDark/65 backdrop-blur-md border border-borderNavy/80 px-4 py-1.5">
            <span className="text-iceWhite font-semibold">Kevin Ding</span>
            <span className="text-slateMuted/70">·</span>
            <a
              href="https://github.com/phanturne"
              target="_blank"
              rel="noreferrer"
              className="hover:text-skyLight transition-colors"
            >
              GitHub
            </a>
            <span className="text-slateMuted/70">·</span>
            <a
              href="https://www.linkedin.com/in/krding"
              target="_blank"
              rel="noreferrer"
              className="hover:text-skyLight transition-colors"
            >
              LinkedIn
            </a>
            <span className="hidden sm:inline text-slateMuted/70">·</span>
            <a
              href="https://sprites.pmdcollab.org/#/0133"
              target="_blank"
              rel="noreferrer"
              className="hover:text-skyLight transition-colors"
            >
              Eevee: PMDCollab / Chunsoft
            </a>
          </div>

          <span className="text-slateMuted/85 hidden sm:inline font-mono">
            Hover any lantern to read its quote
          </span>
        </div>
      </footer>
    </div>
  );
}
