# Aturan Proyek (Project Rules) - Photo Booth

Dokumen ini adalah aturan tetap yang wajib diikuti oleh AI Agent dan developer pada setiap perubahan di proyek ini.

---

## 1. Konfigurasi Lingkungan (Environment)

- **Node.js**:
  ```bash
  export PATH="/Users/early/.local/node-v22.12.0-darwin-arm64/bin:$PATH"
  ```
- **Port Dev Server**: `http://localhost:3000` (dikonfigurasi dengan `open: true` di `vite.config.ts`).

---

## 2. Alur Wajib Setiap Ada Perubahan (Workflow Rules)

Setiap kali melakukan perubahan kode (fitur baru, perbaikan bug, penyesuaian styling/aset, dsb.):

### 1. Jalankan di Localhost & Tampilkan di Browser
- Pastikan build tidak ada error:
  ```bash
  npm run build
  ```
- Jalankan server dev lokal (jika belum berjalan):
  ```bash
  npm run dev
  ```
- Pastikan halaman terbuka di browser:
  ```bash
  open http://localhost:3000
  ```
- Tinjau dan pastikan perubahan sudah bekerja sesuai ekspektasi pengguna.

### 2. Konfirmasi & Git Commit & Push
Setelah perubahan dipastikan sesuai:
- Stage semua perubahan:
  ```bash
  git add .
  ```
- Buat commit dengan pesan yang jelas:
  ```bash
  git commit -m "<tipe>: <penjelasan perubahan>"
  ```
- Push ke remote GitHub:
  ```bash
  git push origin main
  ```

### 3. Deploy ke Vercel
Setelah git push berhasil:
- Jalankan deployment Vercel Production:
  ```bash
  npx vercel --prod --yes
  ```
- Konfirmasi bahwa link production Vercel aktif dan berfungsi dengan baik.

---

## 3. Ringkasan Checklist
1. 🛠️ Edit / Buat perubahan kode.
2. 💻 Jalankan dev server & buka browser (`npm run dev` & `open http://localhost:3000`).
3. ✅ Verifikasi tampilan & fitur di browser.
4. 📦 `git add .` dan `git commit -m "..."`.
5. 🚀 `git push origin main`.
6. 🌐 `npx vercel --prod --yes`.
