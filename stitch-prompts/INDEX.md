# TrialFit — Google Stitch Per-Screen Prompts

> **Gunakan satu file per screen untuk hasil maksimal.**
> Jangan upload semuanya sekaligus — kerjakan satu per satu.

---

## Cara Pakai

1. Buka [stitch.with.google.com](https://stitch.with.google.com)
2. Untuk setiap screen:
   - Klik **New Design**
   - Upload prompt file screen-nya (contoh: `01-splash.json`)
   - Stitch akan generate layout berdasarkan prompt
   - **Ulangi** untuk screen berikutnya (jangan semua dalam satu project)

---

## Urutan Pengerjaan (Rekomendasi)

| Urutan | File | Screen | Prioritas |
|--------|------|--------|-----------|
| 1 | `01-splash.json` | Splash & Role Selection | **Mulai dari sini** — first impression |
| 2 | `04-home-feed.json` | Home Feed (Matched Buddies) | **Screen terpenting** — inti pengguna |
| 3 | `05-buddy-profile.json` | Buddy Profile + Schedule | **Kedua terpenting** — konversi |
| 4 | `06-booking.json` | Booking (Slot Selection) | Core transaction flow |
| 5 | `07-payment.json` | Payment (Method Selection) | Revenue flow |
| 6 | `08-booking-confirmation.json` | Booking Confirmation | Post-purchase experience |
| 7 | `02-signup.json` | Sign Up (Seeker) | Onboarding |
| 8a | `03a-onboarding-goal.json` | Onboarding — Pilih Goal | Step 1 of 3 |
| 8b | `03b-onboarding-location.json` | Onboarding — Lokasi Gym | Step 2 of 3 |
| 8c | `03c-onboarding-schedule.json` | Onboarding — Jadwal & Waktu | Step 3 of 3 |
| 9 | `09-post-session-review.json` | Post-Session Rating & Review | Retention loop |
| 10 | `10-seeker-dashboard.json` | Seeker Dashboard | Retention & progress |
| 11a | `11a-buddy-reg-step1.json` | Buddy Reg — Personal Info | Step 1 of 4 |
| 11b | `11b-buddy-reg-step2.json` | Buddy Reg — Professional Info | Step 2 of 4 |
| 11c | `11c-buddy-reg-step3.json` | Buddy Reg — Documents | Step 3 of 4 |
| 11d | `11d-buddy-reg-step4.json` | Buddy Reg — Review & Submit | Step 4 of 4 |
| 12 | `12-buddy-schedule.json` | Buddy Schedule Setup | Supply side |
| 13 | `13-buddy-pending.json` | Buddy Pending Verification | Supply side |
| 14 | `14-buddy-dashboard.json` | Buddy Dashboard | **Retention & earnings** — hub buddy |

---

## Tips untuk Hasil Lebih Baik

1. **Satu screen per Stitch project** — jangan gabung
2. **Copy gambar dari screen sebelumnya** kalau butuh referensi visual
3. **Icon bisa kamu ganti sendiri** setelah generate — aku sengaja pake icon generic
4. **Warna CTA orange (#FF8A34)** konsisten di semua screen
5. **Mobile-first** — desain untuk HP dulu baru desktop

---

## Referensi

- **Design System:** `_design-system.json` — warna, font, komponen shared
- **Prompt JSON lengkap (master):** `../GoogleStitch_Prompt.json` — referensi semua screen dalam 1 file
- **Memory Document:** `../AGENTS.md` — semua keputusan produk & desain

---

## Kontrol Kualitas (Ceklist per Screen)

Setelah Stitch generate, cek:

- [ ] Warna sesuai palette? (navy #0B1B3B, orange #FF8A34, blue #003F8C)
- [ ] Font terbaca jelas? (min 16px body, 14px caption)
- [ ] Touch targets cukup besar? (min 48px height)
- [ ] Ada hierarchy visual yang jelas?
- [ ] CTA button menonjol? (orange, cukup besar)
- [ ] Badge tier (Silver/Gold/Pro) terbaca?
- [ ] Empty state/error state terbayang?
