import { Briefcase, Code2, FileText, Mail, MapPin, UserRound } from "lucide-react";

const snapshotItems = [
  {
    icon: <Briefcase className="w-4 h-4" />,
    label: "Target Role",
    value: "Fullstack / Backend Engineer"
  },
  {
    icon: <Code2 className="w-4 h-4" />,
    label: "Core Stack",
    value: "Java, Spring Boot, Golang, React, Angular"
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: "Location",
    value: "Bandung, Indonesia"
  },
  {
    icon: <FileText className="w-4 h-4" />,
    label: "Availability",
    value: "Open to full-time and freelance opportunities"
  }
];

export default function RecruiterSnapshot() {
  return (
    <section className="scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch rounded-3xl border border-white/10 bg-[#0d0f18]/45 p-5 sm:p-7">
        <div className="space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400">
              Recruiter Quick View
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Software engineer focused on reliable business systems.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
              I build production-facing web and mobile applications with practical strength in backend services, database workflows, dashboard interfaces, and cross-platform delivery.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="/cv/Yosua Reynaldi Manurun-resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0a0a0a] transition-colors hover:bg-slate-200">
              <FileText className="w-4 h-4" />
              View CV
            </a>
            <a href="https://github.com/Yosua13" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-white">
              <Code2 className="w-4 h-4" />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/yosua-reynaldi-manurun/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-white">
              <UserRound className="w-4 h-4" />
              LinkedIn
            </a>
            <a href="mailto:reyyosua29@gmail.com" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-white">
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {snapshotItems.map((item) => (
            <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <span className="mt-0.5 text-indigo-400">{item.icon}</span>
              <div className="space-y-1">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  {item.label}
                </span>
                <span className="block text-sm font-semibold leading-snug text-slate-200">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
