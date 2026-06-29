from __future__ import annotations

import math
import shutil
import subprocess
from pathlib import Path

# pyrefly: ignore [missing-import]
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "projects"
TMP = ROOT / ".media-frames"
FFMPEG = Path("C:/tmp/portfolio-media-tools/node_modules/ffmpeg-static/ffmpeg.exe")

W, H = 1280, 720
FPS = 12
DURATION = 15
FRAMES = FPS * DURATION


PROJECTS = {
    "lapor-kos": {
        "name": "Lapor Kos",
        "colors": ("#071014", "#0f766e", "#5eead4"),
        "screens": [
            ("Owner Dashboard", "Rooms, billing, tickets, and tenant activity overview"),
            ("Room Inventory", "Room status, availability, occupancy, and pricing table"),
            ("Tenant Contract", "Tenant profile, active contract, and billing timeline"),
            ("Payment Tracking", "Paid, unpaid, overdue invoices, and reminder queue"),
            ("Complaint Ticket", "Facility complaint detail, status, and conversation trail"),
            ("Maintenance Board", "Issue priority, assigned technician, and resolution state"),
        ],
        "metrics": [("Rooms", "24"), ("Paid", "87%"), ("Tickets", "6")],
        "feed": ["New tenant added", "Invoice reminder sent", "Complaint moved to repair"],
    },
    "flowak": {
        "name": "Flowak",
        "colors": ("#0a0f1c", "#4f46e5", "#38bdf8"),
        "screens": [
            ("Project Overview", "Delivery progress, active sprint, blockers, and owner summary"),
            ("Flow Board", "Backlog, in-progress, review, QA, and deployment lanes"),
            ("Task Detail", "Assignee, checklist, priority, blocker, and discussion context"),
            ("AI Flow Audit", "Gemini-powered flow risk, missing task, and bottleneck insight"),
            ("Mock Payload", "Generated payload examples for frontend and backend alignment"),
            ("Sprint Analytics", "Velocity, blocked work, overdue task, and completion trend"),
        ],
        "metrics": [("Backlog", "18"), ("Progress", "7"), ("Blocked", "2")],
        "feed": ["API task moved to review", "AI audit generated", "Mock payload refreshed"],
    },
    "logia-log": {
        "name": "Logia Log",
        "colors": ("#12090b", "#e11d48", "#fbbf24"),
        "screens": [
            ("Log Stream", "VM and server log stream with severity classification"),
            ("Error Cluster", "Grouped stack traces, frequency, and impacted service"),
            ("Root Cause Analysis", "Gemini-assisted explanation of probable failure source"),
            ("Recommendation", "Suggested remediation steps and command checklist"),
            ("RabbitMQ Queue", "Async analysis jobs, retry count, and processing status"),
            ("Incident Report", "Readable summary, timeline, and exported investigation result"),
        ],
        "metrics": [("Errors", "14"), ("Severity", "High"), ("Fixes", "5")],
        "feed": ["Stack trace clustered", "Gemini summary ready", "RabbitMQ job completed"],
    },
    "sion-ministry": {
        "name": "Sion Ministry",
        "colors": ("#09070f", "#6d28d9", "#fbbf24"),
        "screens": [
            ("Dashboard", "Overview of upcoming services, announcements, and quick actions"),
            ("Jadwal Ibadah", "Worship schedule, sermon topics, and location details"),
            ("Pendaftaran Kegiatan", "Register for retreats, bible study, and fellowship events"),
            ("Kanal Doa", "Submit prayer requests, track active prayers, and assign intercessors"),
            ("Manajemen Konten", "Admin tools to publish new events, updates, and materials"),
            ("Laporan Absensi", "Attendance graphs, community growth charts, and activity summaries"),
        ],
        "filenames": [
            "01-dashboard.svg",
            "02-jadwal-ibadah.svg",
            "03-pendaftaran-kegiatan.svg",
            "04-kanal-doa.svg",
            "05-manajemen-konten.svg",
            "06-laporan-absensi.svg",
        ],
        "metrics": [("Services", "4/wk"), ("Members", "312"), ("Prayers", "18")],
        "feed": ["New prayer request approved", "Worship guide updated", "Youth retreat registration open"],
    },
}


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for candidate in [
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ]:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


FONTS = {
    "xs": font(18),
    "sm": font(22),
    "md": font(30),
    "lg": font(42),
    "xl": font(56),
}


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def blend(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def rr(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_dashboard(project_key: str, screen_index: int, progress: float = 0.0) -> Image.Image:
    project = PROJECTS[project_key]
    base, primary, accent = [hex_to_rgb(c) for c in project["colors"]]
    img = Image.new("RGB", (W, H), base)
    draw = ImageDraw.Draw(img)

    for y in range(H):
        color = blend(base, primary, y / H * 0.2)
        draw.line([(0, y), (W, y)], fill=color)

    grid = blend(base, accent, 0.16)
    for x in range(0, W, 48):
        draw.line([(x, 0), (x, H)], fill=grid)
    for y in range(0, H, 48):
        draw.line([(0, y), (W, y)], fill=grid)

    panel = blend(base, (255, 255, 255), 0.08)
    panel2 = blend(base, (255, 255, 255), 0.13)
    line = blend(base, (255, 255, 255), 0.24)

    rr(draw, (42, 38, W - 42, H - 38), 34, panel, outline=line, width=2)
    rr(draw, (78, 78, 294, H - 78), 26, panel2)
    rr(draw, (332, 78, W - 78, 174), 26, panel2)

    title, caption = project["screens"][screen_index]
    draw.text((118, 116), project["name"], fill=(255, 255, 255), font=FONTS["lg"])
    draw.text((118, 168), "Product workspace", fill=blend(accent, (255, 255, 255), 0.55), font=FONTS["xs"])

    for i, label in enumerate(["Dashboard", "Workspace", "Activity", "Reports", "Settings"]):
        y = 244 + i * 72
        fill = blend(primary, (255, 255, 255), 0.12 if i == screen_index % 5 else 0.03)
        rr(draw, (108, y, 264, y + 44), 14, fill)
        draw.text((128, y + 12), label, fill=(230, 238, 255), font=FONTS["xs"])

    draw.text((370, 100), title, fill=(255, 255, 255), font=FONTS["xl"])
    draw.text((372, 150), caption, fill=blend(accent, (255, 255, 255), 0.5), font=FONTS["sm"])
    rr(draw, (1030, 104, 1148, 144), 20, blend(primary, (255, 255, 255), 0.12), outline=blend(accent, (255, 255, 255), 0.2))
    draw.text((1052, 113), "LIVE", fill=(255, 255, 255), font=FONTS["sm"])

    for i, (label, value) in enumerate(project["metrics"]):
        x = 332 + i * 292
        rr(draw, (x, 214, x + 250, 334), 24, panel2, outline=line)
        draw.text((x + 28, 238), label.upper(), fill=blend(accent, (255, 255, 255), 0.35), font=FONTS["xs"])
        draw.text((x + 28, 272), value, fill=(255, 255, 255), font=FONTS["lg"])

    rr(draw, (332, 376, 792, 642), 28, panel2, outline=line)
    rr(draw, (832, 376, 1168, 642), 28, panel2, outline=line)

    wave = []
    for i in range(34):
        x = 370 + i * 12
        y = 550 - int((math.sin(i * 0.52 + progress * math.tau) + 1) * 58)
        wave.append((x, y))
    draw.line(wave, fill=accent, width=8, joint="curve")

    for i in range(5):
        y = 410 + i * 40
        rr(draw, (862, y, 1138, y + 26), 12, blend(primary, (255, 255, 255), 0.08 + i * 0.015))
        draw.rectangle((882, y + 9, 882 + 170 + i * 12, y + 14), fill=blend(accent, (255, 255, 255), 0.15))

    feed = project["feed"]
    for i, item in enumerate(feed):
        y = 660 + i * 0
    rr(draw, (332, 660, 1168, 694), 16, blend(primary, (255, 255, 255), 0.1))
    active = feed[int(progress * len(feed)) % len(feed)]
    draw.text((358, 667), active, fill=(255, 255, 255), font=FONTS["xs"])

    return img


def save_svg(project_key: str, screen_index: int) -> None:
    project = PROJECTS[project_key]
    title, caption = project["screens"][screen_index]
    base, primary, accent = project["colors"]
    if "filenames" in project:
        slug = project["filenames"][screen_index]
    else:
        slug = f"{screen_index + 1:02d}-dummy-{project_key}.svg"
    out = OUT / project_key / "screenshots" / slug
    out.parent.mkdir(parents=True, exist_ok=True)
    sidebar_items = "".join(
        f'<rect x="118" y="{240 + i * 68}" width="146" height="42" rx="13" fill="{primary}" opacity="{0.28 if i == screen_index % 5 else 0.12}"/>'
        for i in range(5)
    )
    cards = "".join(
        f'<rect x="{370 + i * 282}" y="226" width="242" height="112" rx="24" fill="{primary}" opacity="{0.2 + i * 0.07}"/>'
        f'<text x="{398 + i * 282}" y="270" fill="#fff" font-family="Arial" font-size="20" font-weight="700">{project["metrics"][i][0]}</text>'
        f'<text x="{398 + i * 282}" y="306" fill="#fff" font-family="Arial" font-size="34" font-weight="900">{project["metrics"][i][1]}</text>'
        for i in range(3)
    )
    rows = "".join(
        f'<rect x="862" y="{424 + i * 40}" width="{210 + i * 12}" height="16" rx="8" fill="{accent}" opacity="{0.32 + i * 0.08}"/>'
        for i in range(5)
    )
    svg = f'''<svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1280" height="720" rx="32" fill="{base}"/>
<rect x="42" y="38" width="1196" height="644" rx="34" fill="#ffffff" opacity=".06" stroke="#ffffff" stroke-opacity=".16" stroke-width="2"/>
<rect x="78" y="78" width="216" height="564" rx="26" fill="#ffffff" opacity=".08"/>
<text x="118" y="130" fill="#fff" font-family="Arial" font-size="40" font-weight="900">{project["name"]}</text>
<text x="118" y="166" fill="{accent}" font-family="Arial" font-size="18" font-weight="700">Product workspace</text>
{sidebar_items}
<rect x="332" y="78" width="870" height="96" rx="26" fill="#ffffff" opacity=".08"/>
<text x="370" y="128" fill="#fff" font-family="Arial" font-size="44" font-weight="900">{title}</text>
<text x="372" y="156" fill="{accent}" font-family="Arial" font-size="18">{caption}</text>
{cards}
<rect x="332" y="376" width="460" height="242" rx="28" fill="#ffffff" opacity=".08" stroke="#ffffff" stroke-opacity=".14"/>
<path d="M384 548 C438 452 504 574 562 482 C614 400 674 496 752 416" stroke="{accent}" stroke-width="10" stroke-linecap="round"/>
<rect x="832" y="376" width="370" height="242" rx="28" fill="#ffffff" opacity=".08" stroke="#ffffff" stroke-opacity=".14"/>
<text x="862" y="408" fill="#fff" font-family="Arial" font-size="22" font-weight="800">Activity &amp; Insight</text>
{rows}
<rect x="332" y="638" width="870" height="34" rx="17" fill="{primary}" opacity=".28"/>
<text x="360" y="661" fill="#fff" font-family="Arial" font-size="16" font-weight="700">{project["feed"][screen_index % len(project["feed"])]}</text>
</svg>'''
    out.write_text(svg, encoding="utf-8")


def render_video(project_key: str) -> None:
    frames_dir = TMP / project_key
    frames_dir.mkdir(parents=True, exist_ok=True)
    for frame in range(FRAMES):
        progress = frame / FRAMES
        screen = int(progress * 6) % 6
        img = draw_dashboard(project_key, screen, progress)
        img.save(frames_dir / f"frame_{frame:04d}.png")

    output = OUT / project_key / "videos" / "demo.mp4"
    output.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            str(FFMPEG),
            "-y",
            "-framerate",
            str(FPS),
            "-i",
            str(frames_dir / "frame_%04d.png"),
            "-t",
            str(DURATION),
            "-vf",
            "format=yuv420p",
            "-movflags",
            "+faststart",
            str(output),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def main() -> None:
    if not FFMPEG.exists():
        raise SystemExit(f"Missing ffmpeg at {FFMPEG}")

    OUT.mkdir(parents=True, exist_ok=True)
    if TMP.exists():
        shutil.rmtree(TMP)
    TMP.mkdir(parents=True)

    for project_key in PROJECTS:
        for index in range(6):
            save_svg(project_key, index)
        render_video(project_key)

    shutil.rmtree(TMP)
    print(f"Generated project media in {OUT}")


if __name__ == "__main__":
    main()
