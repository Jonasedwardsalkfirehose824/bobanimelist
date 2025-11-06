# Prompt untuk Agent: Analisis dan Rekomendasi Improvement Project BobaAnimeList

## Konteks Project

Kamu adalah AI assistant yang bertugas menganalisis project **BobaAnimeList** - sebuah aplikasi web React + TypeScript yang menggunakan Jikan REST API v4 untuk menampilkan informasi anime dan manga dari MyAnimeList. Nanti hasil analisis akan merevisi @improvement_recommendations.

## Informasi Project yang Sudah Diimplementasi

### Teknologi Stack:
- **Frontend**: React 19.1.0, TypeScript 5.8.3, Vite 6.3.5
- **State Management**: Redux Toolkit 2.8.2, Redux Persist
- **Routing**: React Router 7.9.5
- **Styling**: SASS, Motion (animations)
- **API**: Jikan REST API v4 (https://api.jikan.moe/v4)
- **Internationalization**: i18next (Bahasa Indonesia, English, Japanese)

### Fitur yang Sudah Diimplementasi:

#### Anime Features:

- `GET /top/anime` - Daftar anime teratas dengan filter (popularity, favorites, rating)
- `GET /anime/{id}/full` - Detail lengkap anime by ID
- `GET /seasons/now` - Anime musim ini (sedang tayang)
- `GET /seasons/upcoming` - Anime yang akan tayang
- `GET /anime` - Search anime dengan berbagai parameter
- `GET /recommendations/anime` - Rekomendasi anime terbaru
- `GET /anime/{id}/recommendations` - Rekomendasi anime spesifik
- `GET /anime/{id}/statistics` - Statistik anime
- `GET /anime/{id}/reviews` - Review anime
- `GET /anime/{id}/characters` - Karakter dalam anime
- `GET /genres/anime` - Daftar genre anime

#### Manga Features:
- `GET /top/manga` - Daftar manga teratas dengan filter
- `GET /manga/{id}/full` - Detail lengkap manga by ID
- `GET /genres/manga` - Daftar genre manga
- `GET /manga` - Search manga

#### Character & People Features:
- `GET /top/people` - Daftar orang/seiyuu teratas
- `GET /top/characters` - Daftar karakter teratas
- `GET /characters/{id}/full` - Detail lengkap karakter
- `GET /people/{id}/full` - Detail lengkap person/seiyuu
- `GET /characters` - Search karakter
- `GET /people` - Search people

### Struktur File Project:
```
src/
├── components/        # Komponen UI (atoms, widgets)
├── pages/            # Halaman utama (home, anime, manga, character, person, search)
├── services/jikan/   # API service dengan RTK Query
│   ├── animeApi.ts
│   ├── mangaApi.ts
│   ├── entityApi.ts
│   └── models/       # TypeScript models
├── router/           # React Router configuration
├── store/            # Redux store
├── hooks/            # Custom hooks
├── locales/          # Translations (id, en, jp)
└── docs/             # Dokumentasi
```

## Tugas Kamu

Berdasarkan **dokumentasi lengkap Jikan API v4** yang tersedia di file `src/docs/jikanapi_docs.md`, lakukan analisis mendalam dan buat rekomendasi improvement dengan detail berikut:

### 1. Identifikasi Endpoint yang Belum Diimplementasi

Analisis file `jikanapi_docs.md` dan bandingkan dengan implementasi yang sudah ada. Identifikasi endpoint-endpoint yang:
- **Belum sama sekali digunakan** dalam project
- **Bisa menambah value** untuk user experience
- **Relevan** dengan tujuan aplikasi anime/manga listing

Untuk setiap endpoint yang belum diimplementasi, berikan:
- **Nama endpoint** dan path API-nya
- **Deskripsi fungsi** endpoint tersebut
- **Use case konkret** bagaimana endpoint ini bisa digunakan
- **Prioritas** (High/Medium/Low) berdasarkan impact ke user

### 2. Rekomendasi Fitur Baru

Berdasarkan endpoint yang tersedia di Jikan API, rekomendasikan fitur-fitur baru yang bisa ditambahkan:

#### Kategori Fitur:
- **User Engagement Features**: Fitur yang meningkatkan interaksi user
- **Content Discovery Features**: Fitur yang membantu user menemukan anime/manga baru
- **Information Enhancement**: Fitur yang memperkaya informasi yang ditampilkan
- **Social Features**: Fitur yang memanfaatkan data komunitas

Untuk setiap rekomendasi fitur, jelaskan:
- **Nama fitur** dan tujuannya
- **Endpoint API** yang dibutuhkan
- **UI/UX flow** singkat (bagaimana user menggunakannya)
- **Data yang ditampilkan** dan strukturnya
- **Benefit untuk user**
- **Kompleksitas implementasi** (Easy/Medium/Hard)

### 3. Analisis Endpoint Kategori

Jikan API v4 memiliki beberapa kategori endpoint. Analisis setiap kategori dan berikan insight:

#### Anime Endpoints:
- Endpoint yang sudah digunakan vs belum
- Endpoint mana yang paling valuable untuk ditambahkan
- Contoh: `/anime/{id}/staff`, `/anime/{id}/episodes`, `/anime/{id}/videos`, `/anime/{id}/news`, `/anime/{id}/forum`, `/anime/{id}/themes`, dll

#### Manga Endpoints:
- Coverage implementasi manga vs anime
- Gap fitur manga yang perlu diisi
- Contoh: `/manga/{id}/news`, `/manga/{id}/forum`, `/manga/{id}/statistics`, dll

#### Character & People Endpoints:
- Fitur detail karakter/people yang bisa ditambah
- Contoh: `/characters/{id}/anime`, `/characters/{id}/manga`, `/characters/{id}/voices`, `/people/{id}/anime`, `/people/{id}/voices`, dll

#### Additional Endpoints:
- **Schedules**: `/schedules` - jadwal tayang anime
- **Seasons**: `/seasons/{year}/{season}` - anime per musim dan tahun
- **Random**: `/random/anime`, `/random/manga` - random entry
- **Reviews**: `/reviews/anime`, `/reviews/manga` - review terbaru
- **Watch**: Promo dan episode videos
- **Clubs**: `/clubs/{id}` - klub komunitas
- **Producers**: `/producers/{id}` - studio produksi
- **Magazines**: `/magazines` - majalah manga

### 4. Prioritas Implementasi

Buat roadmap prioritas implementasi berdasarkan:
1. **Quick Wins** (Easy + High Impact): Fitur yang mudah diimplementasi tapi punya impact besar
2. **Strategic Priorities** (Medium/Hard + High Impact): Fitur penting yang butuh effort lebih
3. **Nice to Have** (Any complexity + Medium/Low Impact): Fitur pelengkap

Format roadmap:
```
Phase 1 (Quick Wins - 1-2 minggu):
- [Fitur 1] - Endpoint yang digunakan - Estimasi effort

Phase 2 (Strategic - 3-4 minggu):
- [Fitur 2] - Endpoint yang digunakan - Estimasi effort

Phase 3 (Enhancement - ongoing):
- [Fitur 3] - Endpoint yang digunakan - Estimasi effort
```

### 5. Technical Recommendations

Berikan rekomendasi teknis:
- **API service structure**: Apakah perlu menambah file API baru? (scheduleApi.ts, reviewApi.ts, dll)
- **State management**: Strategi caching untuk data baru
- **TypeScript models**: Model interface yang perlu ditambahkan
- **Component architecture**: Komponen baru yang diperlukan
- **Routing**: Route baru yang perlu ditambah

### 6. Data Enrichment Opportunities

Identifikasi peluang untuk memperkaya data yang sudah ditampilkan:
- Halaman anime detail bisa ditambah: staff, episode list, videos, news, forum discussions, themes, streaming links
- Halaman manga detail bisa ditambah: news, forum, user updates
- Halaman character bisa ditambah: anime/manga appearances, voice actors
- Halaman person bisa ditambah: anime/manga works, voice acting roles

### 7. Potential Pain Points & Solutions

Identifikasi potential issues dan solusinya:
- **Rate limiting**: Jikan API limit 60 req/min, 3 req/sec - bagaimana mengatasinya?
- **Caching strategy**: Data mana yang perlu di-cache lebih lama?
- **Error handling**: Bagaimana handle 404, 429, 500 errors?
- **Loading states**: Strategi untuk banyak API calls

## Format Output

Buat dokumen markdown lengkap dengan struktur:

```markdown
# Rekomendasi Improvement BobaAnimeList - Analisis Jikan API v4

## Executive Summary
[Ringkasan singkat temuan dan rekomendasi utama]

## 1. Analisis Coverage API Saat Ini
[Tabel atau list endpoint yang sudah vs belum diimplementasi]

## 2. Rekomendasi Fitur Prioritas Tinggi
[Detail fitur-fitur prioritas dengan endpoint dan use case]

## 3. Rekomendasi Fitur Prioritas Medium
[Detail fitur-fitur medium priority]

## 4. Rekomendasi Fitur Prioritas Low (Nice to Have)
[Detail fitur-fitur optional]

## 5. Breakdown per Kategori
### 5.1 Anime Features
### 5.2 Manga Features
### 5.3 Character & People Features
### 5.4 Additional Features (Schedules, Reviews, Clubs, etc)

## 6. Roadmap Implementasi
[Phase-based implementation plan]

## 7. Technical Architecture Recommendations
[Rekomendasi struktur kode dan arsitektur]

## 8. Code Examples
[Contoh implementasi untuk beberapa endpoint prioritas]

## 9. Potential Challenges & Mitigations
[Identifikasi masalah dan solusinya]

## 10. Metrics & Success Criteria
[KPI untuk mengukur success dari improvement]
```

## Guidelines Penulisan

1. **Gunakan Bahasa Indonesia** yang profesional dan jelas
2. **Berikan contoh konkret** untuk setiap rekomendasi
3. **Fokus pada value untuk user**, bukan hanya technical specs
4. **Prioritaskan implementasi** yang realistic dan achievable
5. **Include code snippets** jika membantu (TypeScript/React)
6. **Referensi dokumentasi Jikan API** untuk setiap endpoint
7. **Pertimbangkan UX/UI** dalam setiap rekomendasi fitur

## Referensi

- **Jikan API Documentation**: `src/docs/jikanapi_docs.md` (OpenAPI 3.0 spec lengkap)
- **Jikan API Base URL**: `https://api.jikan.moe/v4`
- **Project Repository**: Cek struktur file di `src/` untuk memahami arsitektur

## Output File

Simpan analisis dan rekomendasi lengkap dalam file:
**`src/docs/improvement_recommendations.md`**

---

**Selamat menganalisis! Buat rekomendasi yang comprehensive, actionable, dan berfokus pada peningkatan user experience! 🚀**
