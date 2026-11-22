"use client";

import * as React from "react";
import {
  SiAngular,
  SiRabbitmq,
  SiGooglegemini,
  SiSpringboot,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFlutter,
  SiNestjs,
  SiFastify,
  SiPostgresql,
  SiRedis,
  SiSupabase,
  SiFirebase,
  SiDocker,
  SiKubernetes,
  SiPrisma,
  SiVite,
  SiMysql,
  SiGit,
  SiGitlab,
  SiPostman,
  SiSentry,
  SiNodedotjs,
  SiReactrouter,
  SiReactquery,
  SiZod,
  SiJsonwebtokens,
  SiGraphql
} from "react-icons/si";
import { FaJava, FaGithub, FaWhatsapp } from "react-icons/fa6";
import { DiMsqlServer } from "react-icons/di";
import { RiOpenaiFill } from "react-icons/ri";
import { Code2, CreditCard, Radio, ShieldCheck, Layers, FileText, Mail } from "lucide-react";

interface TechBrandMeta {
  renderIcon: (className?: string) => React.ReactNode;
  color: string;
  tintBg: string;
}

function OracleBrandSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7.5 6.5h9a5.5 5.5 0 0 1 0 11h-9a5.5 5.5 0 0 1 0-11zm0 2.6a2.9 2.9 0 0 0 0 5.8h9a2.9 2.9 0 0 0 0-5.8h-9z" />
    </svg>
  );
}

function AntigravityBrandSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.5L4.5 19.5L8.2 19.5L12 10.6L15.8 19.5L19.5 19.5L12 2.5Z"
        fill="currentColor"
      />
      <circle cx="12" cy="17.5" r="2.1" fill="#22D3EE" />
    </svg>
  );
}

export function getTechBrandMeta(name: string): TechBrandMeta {
  const key = name.toLowerCase();

  if (key.includes("angular")) {
    return {
      renderIcon: (cls) => <SiAngular className={cls} />,
      color: "#DD0031",
      tintBg: "rgba(221, 0, 49, 0.13)"
    };
  }
  if (key.includes("rabbitmq")) {
    return {
      renderIcon: (cls) => <SiRabbitmq className={cls} />,
      color: "#FF6600",
      tintBg: "rgba(255, 102, 0, 0.13)"
    };
  }
  if (key.includes("oracle")) {
    return {
      renderIcon: (cls) => <OracleBrandSvg className={cls} />,
      color: "#F80000",
      tintBg: "rgba(248, 0, 0, 0.12)"
    };
  }
  if (key.includes("openai") || key.includes("codex")) {
    return {
      renderIcon: (cls) => <RiOpenaiFill className={cls} />,
      color: "#10A37F",
      tintBg: "rgba(16, 163, 127, 0.13)"
    };
  }
  if (key.includes("antigravity")) {
    return {
      renderIcon: (cls) => <AntigravityBrandSvg className={cls} />,
      color: "#6366F1",
      tintBg: "rgba(99, 102, 241, 0.15)"
    };
  }
  if (key.includes("gemini")) {
    return {
      renderIcon: (cls) => <SiGooglegemini className={cls} />,
      color: "#4E8CFF",
      tintBg: "rgba(78, 140, 255, 0.14)"
    };
  }
  if (key.includes("spring")) {
    return {
      renderIcon: (cls) => <SiSpringboot className={cls} />,
      color: "#6DB33F",
      tintBg: "rgba(109, 179, 63, 0.14)"
    };
  }
  if (key.includes("java")) {
    return {
      renderIcon: (cls) => <FaJava className={cls} />,
      color: "#F89820",
      tintBg: "rgba(248, 152, 32, 0.14)"
    };
  }
  if (key.includes("golang") || key.startsWith("go ") || key === "go") {
    return {
      renderIcon: (cls) => <SiGo className={cls} />,
      color: "#00ADD8",
      tintBg: "rgba(0, 173, 216, 0.14)"
    };
  }
  if (key.includes("next.js") || key.includes("nextjs")) {
    return {
      renderIcon: (cls) => <SiNextdotjs className={cls} />,
      color: "var(--foreground)",
      tintBg: "rgba(148, 163, 184, 0.14)"
    };
  }
  if (key.includes("react router")) {
    return {
      renderIcon: (cls) => <SiReactrouter className={cls} />,
      color: "#F44250",
      tintBg: "rgba(244, 66, 80, 0.13)"
    };
  }
  if (key.includes("tanstack") || key.includes("react query")) {
    return {
      renderIcon: (cls) => <SiReactquery className={cls} />,
      color: "#FF4154",
      tintBg: "rgba(255, 65, 84, 0.13)"
    };
  }
  if (key.includes("react")) {
    return {
      renderIcon: (cls) => <SiReact className={cls} />,
      color: "#38BDF8",
      tintBg: "rgba(56, 189, 248, 0.14)"
    };
  }
  if (key.includes("typescript")) {
    return {
      renderIcon: (cls) => <SiTypescript className={cls} />,
      color: "#3178C6",
      tintBg: "rgba(49, 120, 198, 0.14)"
    };
  }
  if (key.includes("tailwind")) {
    return {
      renderIcon: (cls) => <SiTailwindcss className={cls} />,
      color: "#06B6D4",
      tintBg: "rgba(6, 182, 212, 0.14)"
    };
  }
  if (key.includes("vite")) {
    return {
      renderIcon: (cls) => <SiVite className={cls} />,
      color: "#A855F7",
      tintBg: "rgba(168, 85, 247, 0.14)"
    };
  }
  if (key.includes("flutter")) {
    return {
      renderIcon: (cls) => <SiFlutter className={cls} />,
      color: "#38BDF8",
      tintBg: "rgba(56, 189, 248, 0.14)"
    };
  }
  if (key.includes("nestjs")) {
    return {
      renderIcon: (cls) => <SiNestjs className={cls} />,
      color: "#E0234E",
      tintBg: "rgba(224, 35, 78, 0.14)"
    };
  }
  if (key.includes("fastify")) {
    return {
      renderIcon: (cls) => <SiFastify className={cls} />,
      color: "var(--foreground)",
      tintBg: "rgba(148, 163, 184, 0.14)"
    };
  }
  if (key.includes("node")) {
    return {
      renderIcon: (cls) => <SiNodedotjs className={cls} />,
      color: "#5FA04E",
      tintBg: "rgba(95, 160, 78, 0.14)"
    };
  }
  if (key.includes("postgresql") || key.includes("pgx")) {
    return {
      renderIcon: (cls) => <SiPostgresql className={cls} />,
      color: "#4169E1",
      tintBg: "rgba(65, 105, 225, 0.14)"
    };
  }
  if (key.includes("sql server")) {
    return {
      renderIcon: (cls) => <DiMsqlServer className={cls} />,
      color: "#EF4444",
      tintBg: "rgba(239, 68, 68, 0.13)"
    };
  }
  if (key.includes("mysql")) {
    return {
      renderIcon: (cls) => <SiMysql className={cls} />,
      color: "#4479A1",
      tintBg: "rgba(68, 121, 161, 0.14)"
    };
  }
  if (key.includes("redis") || key.includes("upstash")) {
    return {
      renderIcon: (cls) => <SiRedis className={cls} />,
      color: "#DC382D",
      tintBg: "rgba(220, 56, 45, 0.14)"
    };
  }
  if (key.includes("supabase")) {
    return {
      renderIcon: (cls) => <SiSupabase className={cls} />,
      color: "#3ECF8E",
      tintBg: "rgba(62, 207, 142, 0.14)"
    };
  }
  if (key.includes("firebase")) {
    return {
      renderIcon: (cls) => <SiFirebase className={cls} />,
      color: "#F59E0B",
      tintBg: "rgba(245, 158, 11, 0.14)"
    };
  }
  if (key.includes("prisma")) {
    return {
      renderIcon: (cls) => <SiPrisma className={cls} />,
      color: "#2DD4BF",
      tintBg: "rgba(45, 212, 191, 0.14)"
    };
  }
  if (key.includes("docker")) {
    return {
      renderIcon: (cls) => <SiDocker className={cls} />,
      color: "#2496ED",
      tintBg: "rgba(36, 150, 237, 0.14)"
    };
  }
  if (key.includes("kubernetes")) {
    return {
      renderIcon: (cls) => <SiKubernetes className={cls} />,
      color: "#326CE5",
      tintBg: "rgba(50, 108, 229, 0.14)"
    };
  }
  if (key.includes("github")) {
    return {
      renderIcon: (cls) => <FaGithub className={cls} />,
      color: "var(--foreground)",
      tintBg: "rgba(148, 163, 184, 0.14)"
    };
  }
  if (key.includes("gitlab")) {
    return {
      renderIcon: (cls) => <SiGitlab className={cls} />,
      color: "#FC6D26",
      tintBg: "rgba(252, 109, 38, 0.14)"
    };
  }
  if (key.includes("git")) {
    return {
      renderIcon: (cls) => <SiGit className={cls} />,
      color: "#F05032",
      tintBg: "rgba(240, 80, 50, 0.14)"
    };
  }
  if (key.includes("postman")) {
    return {
      renderIcon: (cls) => <SiPostman className={cls} />,
      color: "#FF6C37",
      tintBg: "rgba(255, 108, 55, 0.14)"
    };
  }
  if (key.includes("sentry")) {
    return {
      renderIcon: (cls) => <SiSentry className={cls} />,
      color: "#8B5CF6",
      tintBg: "rgba(139, 92, 246, 0.14)"
    };
  }
  if (key.includes("whatsapp") || key.includes("fonnte")) {
    return {
      renderIcon: (cls) => <FaWhatsapp className={cls} />,
      color: "#25D366",
      tintBg: "rgba(37, 211, 102, 0.14)"
    };
  }
  if (key.includes("midtrans")) {
    return {
      renderIcon: (cls) => <CreditCard className={cls} />,
      color: "#0EA5E9",
      tintBg: "rgba(14, 165, 233, 0.14)"
    };
  }
  if (key.includes("zod")) {
    return {
      renderIcon: (cls) => <SiZod className={cls} />,
      color: "#3E67B1",
      tintBg: "rgba(62, 103, 177, 0.14)"
    };
  }
  if (key.includes("jwt") || key.includes("oauth") || key.includes("rbac")) {
    return {
      renderIcon: (cls) => (key.includes("jwt") ? <SiJsonwebtokens className={cls} /> : <ShieldCheck className={cls} />),
      color: "#D946EF",
      tintBg: "rgba(217, 70, 239, 0.14)"
    };
  }
  if (key.includes("graphql")) {
    return {
      renderIcon: (cls) => <SiGraphql className={cls} />,
      color: "#E10098",
      tintBg: "rgba(225, 0, 152, 0.14)"
    };
  }
  if (key.includes("sse") || key.includes("websocket")) {
    return {
      renderIcon: (cls) => <Radio className={cls} />,
      color: "#22D3EE",
      tintBg: "rgba(34, 211, 238, 0.14)"
    };
  }
  if (key.includes("pdf")) {
    return {
      renderIcon: (cls) => <FileText className={cls} />,
      color: "#F43F5E",
      tintBg: "rgba(244, 63, 94, 0.14)"
    };
  }
  if (key.includes("smtp") || key.includes("mail")) {
    return {
      renderIcon: (cls) => <Mail className={cls} />,
      color: "#F59E0B",
      tintBg: "rgba(245, 158, 11, 0.14)"
    };
  }
  if (key.includes("zustand") || key.includes("motion") || key.includes("fsd") || key.includes("clean") || key.includes("hexagonal")) {
    return {
      renderIcon: (cls) => <Layers className={cls} />,
      color: "#818CF8",
      tintBg: "rgba(129, 140, 248, 0.14)"
    };
  }

  return {
    renderIcon: (cls) => <Code2 className={cls} />,
    color: "var(--accent-text)",
    tintBg: "var(--accent-soft)"
  };
}

export function TechIcon({
  name,
  className = "h-4 w-4"
}: {
  name: string;
  className?: string;
}) {
  const meta = getTechBrandMeta(name);
  return (
    <span style={{ color: meta.color }} className="inline-flex items-center justify-center shrink-0">
      {meta.renderIcon(className)}
    </span>
  );
}
