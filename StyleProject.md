# Style Project Assets

Panduan ini dipakai untuk membuat gambar screenshot, cover project, dan video demo agar tampil rapi di section Project dan modal View Details.

## Ringkasan Ukuran

| Kebutuhan asset | Lokasi tampil | Rasio UI | Ukuran saat ini | Rekomendasi export |
| --- | --- | --- | --- | --- |
| Cover project / preview image | Card project utama | 16:10 | 1280 x 800 px | 1280 x 800 px, 1600 x 1000 px, atau 1920 x 1200 px |
| Video demo project | Hover project card dan modal detail | 16:9 untuk video, dicrop di card 16:10 | 1280 x 720 px, 15 detik | 1920 x 1080 px, MP4 H.264, 15 detik |
| Screenshot aplikasi | Carousel screenshot di View Details | Fleksibel, default 16:9 | 1280 x 720 px; Lapor Kos terbaru 1920 x 901/902 px | 1280 x 720 px, 1920 x 1080 px, atau rasio natural screenshot |

## Rasio Yang Dipakai Di UI

| Area UI | Rasio | Catatan |
| --- | --- | --- |
| Project card preview | 16:10 | Ada di `src/components/ProjectsSection.tsx`, class `aspect-[16/10]`. Cocok untuk cover project. |
| Modal video demo | 16:9 | Ada di `src/app/page.tsx`, class `aspect-[16/9]`. Video memakai `object-cover`. |
| Modal screenshot aplikasi | Fleksibel | Carousel memakai rasio natural jika `aspectRatio` tersedia. Gambar memakai `object-contain` agar tidak terpotong. |

## Inventory Asset Saat Ini

### Cover Project

Semua cover project saat ini berukuran 1280 x 800 px, rasio 16:10.

| Project | File | Ukuran |
| --- | --- | --- |
| Lapor Kos | `public/assets/projects/lapor-kos/cover.svg` | 1280 x 800 px |
| Flowak | `public/assets/projects/flowak/cover.svg` | 1280 x 800 px |
| Logia Log | `public/assets/projects/logia-log/cover.svg` | 1280 x 800 px |

### Screenshot Aplikasi

Screenshot dummy Flowak dan Logia Log masih berukuran 1280 x 720 px, rasio 16:9. Screenshot Lapor Kos terbaru memakai ukuran sekitar 1920 x 901/902 px, dan tetap aman karena carousel sekarang mengikuti rasio natural gambar.

| Project | Pattern file | Jumlah | Ukuran |
| --- | --- | --- | --- |
| Lapor Kos | `public/assets/projects/lapor-kos/screenshots/00-login.png` sampai `15-tagihan-penghuni.png` | 16 gambar | 1920 x 901/902 px |
| Flowak | `public/assets/projects/flowak/screenshots/01-project-flow-board.svg` sampai `06-project-overview.svg` | 6 gambar | 1280 x 720 px |
| Logia Log | `public/assets/projects/logia-log/screenshots/01-log-stream.svg` sampai `06-incident-report.svg` | 6 gambar | 1280 x 720 px |

### Video Demo

Semua video demo saat ini berukuran 1280 x 720 px, rasio 16:9, durasi 15 detik, 12 fps.

| Project | File | Ukuran | Durasi |
| --- | --- | --- | --- |
| Lapor Kos | `public/assets/projects/lapor-kos/videos/demo.mp4` | 1280 x 720 px | 15 detik |
| Flowak | `public/assets/projects/flowak/videos/demo.mp4` | 1280 x 720 px | 15 detik |
| Logia Log | `public/assets/projects/logia-log/videos/demo.mp4` | 1280 x 720 px | 15 detik |

## Rekomendasi Pembuatan Screenshot

Gunakan rasio 16:9 untuk screenshot baru jika memungkinkan. Jika screenshot asli lebih lebar seperti Lapor Kos terbaru, tetap bisa dipakai tanpa crop karena tampilan aplikasi sudah memakai `object-contain` dan rasio natural per gambar.

Ukuran aman:

- Minimal: 1280 x 720 px.
- Ideal: 1920 x 1080 px.
- Format: PNG atau JPG untuk screenshot asli, SVG boleh untuk wireframe/dummy.
- Buat minimal 6 screenshot untuk setiap project.

Nama file yang disarankan:

```text
public/assets/projects/lapor-kos/screenshots/00-login.png
public/assets/projects/lapor-kos/screenshots/01-dashboard.png
public/assets/projects/lapor-kos/screenshots/02-manajemen-kamar.png
public/assets/projects/lapor-kos/screenshots/03-penghuni-kontrak.png
public/assets/projects/lapor-kos/screenshots/04-manajemen-pembayaran.png
public/assets/projects/lapor-kos/screenshots/05-laporan.png

public/assets/projects/flowak/screenshots/01-project-flow-board.png
public/assets/projects/flowak/screenshots/02-task-detail.png
public/assets/projects/flowak/screenshots/03-delivery-analytics.png
public/assets/projects/flowak/screenshots/04-ai-flow-audit.png
public/assets/projects/flowak/screenshots/05-mock-payload.png
public/assets/projects/flowak/screenshots/06-project-overview.png

public/assets/projects/logia-log/screenshots/01-log-stream.png
public/assets/projects/logia-log/screenshots/02-root-cause.png
public/assets/projects/logia-log/screenshots/03-recommendation.png
public/assets/projects/logia-log/screenshots/04-error-cluster.png
public/assets/projects/logia-log/screenshots/05-rabbitmq-queue.png
public/assets/projects/logia-log/screenshots/06-incident-report.png
```

Jika mengganti dari `.svg` ke `.png`, update path screenshot di `src/components/ProjectsSection.tsx` agar mengarah ke ekstensi baru.

## Rekomendasi Pembuatan Video

Gunakan rasio 16:9 agar cocok dengan modal View Details.

Ukuran aman:

- Minimal: 1280 x 720 px.
- Ideal: 1920 x 1080 px.
- Durasi: 15 detik.
- Format: MP4.
- Codec: H.264.
- FPS: 24 atau 30 fps lebih halus; 12 fps masih bisa dipakai untuk dummy/simple motion.
- Audio tidak wajib karena video di UI berjalan `muted`.

Nama file yang dipakai aplikasi:

```text
public/assets/projects/lapor-kos/videos/demo.mp4
public/assets/projects/flowak/videos/demo.mp4
public/assets/projects/logia-log/videos/demo.mp4
```

## Area Aman Desain

Project card preview memakai rasio 16:10, sementara video asli 16:9. Karena video memakai `object-cover`, sisi kiri dan kanan video 16:9 bisa sedikit ter-crop saat tampil di card project.

Gunakan aturan aman ini:

- Letakkan konten penting di area tengah video.
- Hindari teks penting terlalu dekat kiri dan kanan, sisakan margin sekitar 8-10 persen.
- Hindari konten penting di area bawah sekitar 80 px, karena ada label `Hover to Play` / `Playing Demo` dan progress bar kecil.
- Untuk screenshot detail 16:9, konten boleh memenuhi layar lebih lebar karena tidak ada overlay di tengah gambar.

## Prioritas Per Project

Urutan project di aplikasi:

1. Lapor Kos
2. Flowak
3. Logia Log

Setiap project idealnya punya:

- 1 cover project rasio 16:10.
- 1 video demo rasio 16:9 durasi 15 detik.
- Minimal 6 screenshot aplikasi rasio 16:9.
