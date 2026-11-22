# Style Project Assets

Panduan ini dipakai untuk menyiapkan gambar screenshot, cover project, dan video demo secara manual agar tampil rapi di section **Projects** dan modal **View Details / Lihat Detail Proyek**.

## Ringkasan Ukuran

| Kebutuhan asset | Lokasi tampil | Rasio UI | Ukuran saat ini | Rekomendasi export |
| --- | --- | --- | --- | --- |
| Cover project / preview image | Card project utama | 16:10 | 1280 x 800 px | 1280 x 800 px, 1600 x 1000 px, atau 1920 x 1200 px |
| Video demo project | Hover project card dan modal detail | 16:9 untuk video, dicrop di card 16:10 | 1280 x 720 px, 15 detik | 1920 x 1080 px, MP4 H.264, 15 detik |
| Screenshot aplikasi | Carousel screenshot di View Details | Fleksibel, default 16:9 | 1280 x 720 px; Lapor Kos 1920 x 901/902 px | 1280 x 720 px, 1920 x 1080 px, atau rasio natural screenshot |

## Struktur Folder Asset 5 Project

Seluruh asset media diletakkan di bawah `public/assets/projects/<project-id>/`:

```text
public/assets/projects/
├── lapor-kos/
│   ├── screenshots/
│   │   ├── 00-login.png
│   │   ├── 01-dashboard.png
│   │   └── ... (02 s/d 15)
│   └── videos/
│       └── demo.mp4
├── flowak/
│   ├── screenshots/
│   │   ├── 01-login.png
│   │   ├── 02-landing-page.png
│   │   └── ... (03 s/d 09)
│   └── videos/
│       └── demo.mp4
├── sion-ministry/
│   ├── screenshots/
│   │   ├── 01-login.png
│   │   ├── 02-dashboard.png
│   │   └── ... (03 s/d 08)
│   └── videos/
│       └── demo.mp4
├── ministry-scheduling/
│   ├── screenshots/
│   │   ├── 01-main-hall-denah.png
│   │   ├── 02-greeter-om-selector.png
│   │   ├── 03-tracker-kuota.png
│   │   ├── 04-shift-swap.png
│   │   ├── 05-dashboard-koordinator.png
│   │   └── 06-google-sso-roles.png
│   └── videos/
│       └── demo.mp4
└── logia-log/
    ├── screenshots/
    │   ├── 01-log-explorer.png
    │   ├── 02-api-testing-studio.png
    │   ├── 03-github-ai-audit.png
    │   ├── 04-target-profiles.png
    │   ├── 05-rabbitmq-redis-pipeline.png
    │   └── 06-tactical-ui.png
    └── videos/
        └── demo.mp4
```

## Status Media Saat Ini

| Project | Folder ID | Status Proyek | Status Media Saat Ini |
| --- | --- | --- | --- |
| **Lapor Kos** | `lapor-kos` | Rilis / Terbuka | 16 PNG screenshot & `demo.mp4` tersedia (siap diganti dengan rekaman manual terbaru) |
| **Flowak** | `flowak` | Rilis / Terbuka | 9 PNG screenshot & `demo.mp4` tersedia (siap diganti dengan rekaman manual terbaru) |
| **Sion Ministry v2** | `sion-ministry` | Rilis / Terbuka | 8 PNG screenshot & `demo.mp4` tersedia (siap diganti dengan rekaman manual terbaru) |
| **Ministry Scheduling** | `ministry-scheduling` | Rilis / Terbuka | Folder sudah disiapkan, menampilkan Interactive Architecture & Module Preview sambil menunggu upload gambar & video manual |
| **Logia Log** | `logia-log` | Rilis / Terbuka | Folder sudah disiapkan, menampilkan Interactive Architecture & Module Preview sambil menunggu upload gambar & video manual |

## Cara Memasukkan Gambar & Video Manual untuk `ministry-scheduling` dan `logia-log`

1. Simpan file video MP4 ke:
   - `public/assets/projects/ministry-scheduling/videos/demo.mp4`
   - `public/assets/projects/logia-log/videos/demo.mp4`
2. Simpan file screenshot PNG ke:
   - `public/assets/projects/ministry-scheduling/screenshots/`
   - `public/assets/projects/logia-log/screenshots/`
3. Pada `src/components/ProjectsSection.tsx`, ubah `hasVideoFile: true` dan tambahkan properti `image: "/assets/projects/<project-id>/screenshots/<nama-file>.png"` pada daftar `ministrySchedulingScreens` dan `logiaLogScreens`.
