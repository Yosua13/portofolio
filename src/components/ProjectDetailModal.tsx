"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  CheckCircle2,
  Layers,
  X
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechIcon } from "@/components/ui/tech-icon";
import type { ProjectData, ProjectScreen } from "./ProjectsSection";
import type { Language } from "@/context/LanguageContext";

function ModalCarousel({
  project,
  language
}: {
  project: ProjectData;
  language: Language;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomedScreen, setZoomedScreen] = useState<ProjectScreen | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const screens = project.screens;
  const activeScreen = screens[activeIndex] ?? screens[0];
  if (!activeScreen) return null;

  const selectIndex = (index: number) => {
    setActiveIndex(index);
    const container = thumbsRef.current;
    const child = container?.children[index] as HTMLElement | undefined;
    if (container && child) {
      container.scrollTo({
        left: child.offsetLeft - container.clientWidth / 2 + child.clientWidth / 2,
        behavior: "smooth"
      });
    }
  };

  const prev = () => selectIndex(activeIndex === 0 ? screens.length - 1 : activeIndex - 1);
  const next = () => selectIndex(activeIndex === screens.length - 1 ? 0 : activeIndex + 1);

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-text)]">
            {String(activeIndex + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
          </span>
          <h4 className="text-base font-semibold tracking-tight text-[var(--foreground)] mt-0.5">
            {activeScreen.title}
          </h4>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
            {activeScreen.caption}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={prev}
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={next}
            aria-label="Next screenshot"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Slide */}
      {activeScreen.image ? (
        <button
          type="button"
          onClick={() => setZoomedScreen(activeScreen)}
          className="group relative block w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[#0e0e10] text-left cursor-pointer"
          aria-label={`Zoom ${activeScreen.title}`}
        >
          <div
            className="relative w-full"
            style={{ aspectRatio: activeScreen.aspectRatio ?? "16 / 9" }}
          >
            <Image
              src={activeScreen.image}
              alt={activeScreen.title}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-contain"
            />
          </div>
          <span className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
          </span>
        </button>
      ) : (
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[#111113] p-6 sm:p-8 text-left">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="accent">
                <Layers className="h-3 w-3" />
                {activeScreen.moduleTag ?? `${language === "id" ? "MODUL" : "MODULE"} ${activeIndex + 1}`}
              </Badge>
              <span className="font-mono text-[10px] text-neutral-400">
                {language === "id"
                  ? `Slot Foto: public/assets/projects/${project.id}/screenshots/`
                  : `Screenshot Slot: public/assets/projects/${project.id}/screenshots/`}
              </span>
            </div>
            <h5 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              {activeScreen.title}
            </h5>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
              {activeScreen.caption}
            </p>
          </div>
        </div>
      )}

      {/* Thumbnails */}
      <div
        ref={thumbsRef}
        className="flex gap-2 overflow-x-auto pb-1 scroll-smooth"
      >
        {screens.map((screen, index) => (
          <button
            key={`${screen.title}-${index}`}
            type="button"
            onClick={() => selectIndex(index)}
            className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition-all cursor-pointer ${
              activeIndex === index
                ? "border-[var(--accent)] opacity-100 ring-1 ring-[var(--accent)]/50"
                : "border-[var(--border)] opacity-55 hover:opacity-100"
            }`}
            aria-label={screen.title}
          >
            {screen.image ? (
              <Image
                src={screen.image}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-end bg-[#151518] p-1.5 text-left">
                <span className="line-clamp-2 text-[8px] font-bold text-neutral-200 leading-tight">
                  {screen.title}
                </span>
              </div>
            )}
            <span className="absolute left-1.5 top-1 rounded bg-black/75 px-1.5 py-0.5 text-[8px] font-bold text-white">
              {index + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {zoomedScreen?.image && (
        <div
          onClick={() => setZoomedScreen(null)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setZoomedScreen(null)}
            aria-label="Close preview"
            className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white hover:bg-white hover:text-black cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
          <div
            className="relative w-full max-w-6xl"
            style={{ aspectRatio: zoomedScreen.aspectRatio ?? "16 / 9" }}
          >
            <Image
              src={zoomedScreen.image}
              alt={zoomedScreen.title}
              fill
              sizes="95vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface ProjectDetailModalProps {
  project: ProjectData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: Language;
}

export default function ProjectDetailModal({
  project,
  open,
  onOpenChange,
  language
}: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        {/* Sticky Editorial Header */}
        <DialogHeader className="border-b border-[var(--border)] p-5 sm:p-6 pr-14">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <Badge variant="accent">{project.category}</Badge>
            <Badge variant="outline">{project.role}</Badge>
            <Badge variant="emerald">
              <CheckCircle2 className="h-3 w-3" />
              {language === "id" ? "Rilis" : "Released"}
            </Badge>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <DialogTitle className="tracking-tight">{project.title}</DialogTitle>
              <DialogDescription className="mt-1">{project.headline}</DialogDescription>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {project.githubLink && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.link && (
                <Button variant="accent" size="sm" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Live Website
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Body with Tabs */}
        <div className="overflow-y-auto p-5 sm:p-6">
          <Tabs key={project.id} defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">
                {language === "id" ? "Ringkasan" : "Overview"}
              </TabsTrigger>
              <TabsTrigger value="gallery">
                {language === "id"
                  ? `Galeri & Modul (${project.screens.length})`
                  : `Gallery & Modules (${project.screens.length})`}
              </TabsTrigger>
              <TabsTrigger value="stack">
                {language === "id" ? "Tech Stack" : "Tech Stack"}
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Overview */}
            <TabsContent value="overview" className="space-y-5">
              {project.hasVideoFile && project.video ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[#0e0e10]">
                  <video
                    src={project.video}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                  />
                </div>
              ) : (
                <div className="rounded-xl border border-[var(--border)] bg-[#111113] p-5 sm:p-6 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                        {language === "id" ? "Status: Rilis & Terbuka" : "Status: Released & Open"}
                      </span>
                      <p className="text-xs text-neutral-300 mt-1">
                        {language === "id"
                          ? `Siap dipasangkan video demo manual di public/assets/projects/${project.id}/videos/demo.mp4`
                          : `Ready for manual demo video at public/assets/projects/${project.id}/videos/demo.mp4`}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-neutral-300 border-white/15 shrink-0">
                      {project.screens.length} {language === "id" ? "Modul Siap" : "Modules"}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Architectural 3-Column Hairline Split: Problem / Solution / Impact */}
              <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--border)] rounded-xl divide-y md:divide-y-0 md:divide-x divide-[var(--border)] bg-[var(--surface-elevated)] text-left">
                <div className="p-4 sm:p-5 space-y-1.5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--rose-text)]">
                    01 · {language === "id" ? "Tantangan" : "Challenge"}
                  </span>
                  <p className="text-xs leading-relaxed text-[var(--foreground)]/85">
                    {project.problem}
                  </p>
                </div>

                <div className="p-4 sm:p-5 space-y-1.5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-text)]">
                    02 · {language === "id" ? "Solusi & Peran" : "Solution & Role"}
                  </span>
                  <p className="text-xs leading-relaxed text-[var(--foreground)]/85">
                    {project.contribution}
                  </p>
                </div>

                <div className="p-4 sm:p-5 space-y-1.5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--emerald-text)]">
                    03 · {language === "id" ? "Dampak" : "Impact"}
                  </span>
                  <p className="text-xs leading-relaxed text-[var(--foreground)] font-medium">
                    {project.impact}
                  </p>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2.5 text-left pt-1">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                  {language === "id" ? "Poin Utama" : "Key Highlights"}
                </span>
                <ul className="space-y-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--foreground)]"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent-text)] mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            {/* Tab 2: Gallery & Modules */}
            <TabsContent value="gallery">
              <ModalCarousel key={project.id} project={project} language={language} />
            </TabsContent>

            {/* Tab 3: Categorized Tech Stack */}
            <TabsContent value="stack" className="space-y-4 text-left">
              {[
                {
                  label: "Frontend",
                  items: project.stackGroups.frontend
                },
                {
                  label: "Backend & API",
                  items: project.stackGroups.backend
                },
                {
                  label: language === "id" ? "Database & Infrastruktur" : "Database & Infrastructure",
                  items: project.stackGroups.infra
                }
              ].map((group) => (
                <div
                  key={group.label}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 space-y-2.5"
                >
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-text)]">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tech) => (
                      <Badge key={tech} variant="default" className="text-[11px] py-1 px-3">
                        <TechIcon name={tech} className="h-3.5 w-3.5" />
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
