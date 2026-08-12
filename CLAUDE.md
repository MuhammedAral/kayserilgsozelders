# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

kayserilgsozelders.com — Saim Ünsal'ın Kayseri LGS / ortaokul Fen Bilgisi ve Matematik
özel ders tanıtım sitesi. Tek sayfa (single-page), React 19 + Vite 8, JSX, düz CSS.
Router yok, state kütüphanesi yok, test altyapısı yok, TypeScript yok.
Arayüz metinleri ve kod yorumları Türkçe — aynı dilde devam et.

## Komutlar

```bash
npm run dev      # http://localhost:5173
npm run build    # 3 adımlı üretim derlemesi -> dist/
npm run preview  # dist/ çıktısını yerelde sunar (4173)
npm run lint     # oxlint (CI'da build'den önce çalışır)
```

Test yok — doğrulama `npm run build` + `npm run lint` ile yapılır.
Tarayıcıda kontrol için `.claude/launch.json` içinde `dev` ve `preview` konfigürasyonları hazır.

## Mimari

### En kritik nokta: 3 adımlı build

`npm run build` üç komuttur, **sıra bozulmamalıdır**:

| # | Komut | Çıktı |
|---|---|---|
| 1 | `vite build` | tarayıcı paketi + `public/` kopyası → `dist/` |
| 2 | `vite build --ssr src/entry-server.jsx --outDir dist-ssr` | Node tarafı render → `dist-ssr/` |
| 3 | `node scripts/prerender.mjs` | ikisini birleştirir → `dist/index.html` |

**Neden:** Vite tek başına boş bir `<div id="root">` üretir. Arama motorlarının bir kısmı ve
yapay zekâ tarayıcılarının (ChatGPT, Perplexity, Gemini) neredeyse tamamı JS çalıştırmaz;
sayfayı boş görürler. Prerender adımı sayfanın tamamını statik HTML'e basar (~94 kB, ~2.200 kelime).

Tarayıcı tarafında `src/main.jsx` bunu fark eder: kap doluysa `hydrateRoot`, boşsa (vite dev)
`createRoot`. Bu yüzden **hydration uyumsuzluğu yaratacak kod yazma** — render sırasında
`window`, `document`, rastgele değer veya SSR'da farklı sonuç verecek `Date` kullanma.
(`Footer.jsx` içindeki `new Date().getFullYear()` yılda bir gün riskli, bilinçli kabul edilmiş.)

### `scripts/prerender.mjs` ne yapar

Bu dosya build'in beyni. Üç iş yapar:

1. **JSON-LD yapılandırılmış verisi üretir** — `src/data/site.js`, `faqData.js`,
   `curriculumData.js` dosyalarından türetir ve `index.html`'deki `<!--json-ld-->`
   yer tutucusuna basar. **JSON-LD elle yazılmaz.** Sınıf × ders `Offer` listesi bile
   `curriculumData` üzerinden otomatik çıkar.
2. **`dist/sitemap.xml`** üretir (güncel `lastmod` ile).
3. **`dist-ssr/` klasörünü siler** — sunucuya gitmesine gerek yok.

Ayrıca üç doğrulama yapar ve tutmazsa **build'i hata ile durdurur**:
- `index.html` içinde `<div id="root"></div>` var mı
- `<!--json-ld-->` yer tutucusu var mı
- `index.html`'deki `<meta name="description">` ile `site.js > PAGE_DESCRIPTION` **birebir aynı mı**

Bu üçüncüsü sık karşılaşılan tuzak: meta açıklamayı iki yerde de aynı anda güncelle.

### CI / deploy

`.github/workflows/deploy.yml` — `main`'e her push'ta: `npm ci` → `npm run lint` →
`npm run build` → **prerender doğrulaması** → Hostinger'a FTP ile `dist/` senkronu.

Doğrulama adımı `dist/index.html` içinde `"Geleceğe Hazırlıyoruz"` metnini ve
`application/ld+json` string'ini arar. Hero başlığını (`src/components/Hero.jsx`)
değiştirirsen **deploy.yml'deki grep'i de güncelle**, yoksa CI kırılır.

`package-lock.json` `package.json` ile senkron olmalı — `npm ci` aksi halde patlar.

### Veri katmanı — tek gerçek kaynak

Tüm içerik `src/data/` altında, bileşenlerin içinde hard-code metin bırakma:

| Ne | Dosya |
|---|---|
| Telefon, WhatsApp, Instagram, hizmet bölgeleri, çalışma saatleri, başlık/açıklama | `src/data/site.js` |
| 56 ünite: başlık, özet, `pdfLink` (sınıf → ders → ünite dizisi) | `src/data/curriculumData.js` |
| Sıkça sorulan sorular | `src/data/faqData.js` |
| Veli/öğrenci yorumları | `src/data/reviewsData.js` |

`site.js` içindeki türetilmiş değerler (`TEL_HREF`, `WHATSAPP_URL`, `SERVICE_AREAS_TEXT`,
`PAGE_DESCRIPTION`) sabitlerden hesaplanır — iletişim bilgisi değişince sadece kaynağı güncelle.

### Veriye bağlı görünürlük (üç davranış)

Veri dosyaları sadece içerik değil, **hangi UI'ın basılacağını da** belirler:

1. **Yorumlar** — `reviews` dizisi boşken `Reviews.jsx` `null` döner *ve* `Header.jsx`
   menüsündeki "Yorumlar" bağlantısı listeden düşer. Uydurma yorum girme;
   `Review` / `AggregateRating` şeması ancak gerçek, doğrulanabilir yorum toplandıktan
   sonra eklenebilir — öncesinde Google politikası ihlali.
2. **PDF butonları** — `curriculumData` içinde bir ünitenin `pdfLink` değeri `"#"` olduğu
   sürece o ünitede indirme butonu basılmaz; gerçek bir yol yazılınca kendiliğinden görünür.
   "Yakında" rozeti bilerek kaldırıldı (56 boş vaat, sıfırdan kötüydü).
3. **Ünite listeleri** — `Classes.jsx` sınıf × ders kombinasyonlarının **tamamını** DOM'a
   basar, aktif olmayanı CSS ile gizler (`.is-hidden`). Sebep: statik HTML'de 56 ünite
   özetinin hepsi bulunsun. Bunu "optimize edip" sadece aktif sekmeyi render etme —
   SEO içeriğinin %80'i kaybolur.

### Bileşenler ve stil

`App.jsx` sabit bir dikey akış kurar: Header → main(Hero, Stats, About, Classes, Reviews, FAQ)
→ Footer → FloatingButtons. Bileşenler `src/components/` altında düz, iç içe klasör yok.
İkonlar `lucide-react`'ten; Instagram ikonu markada olmadığı için `components/icons/` altında elle çizili.

Stil iki dosyada, CSS Modules veya utility framework yok:
- `src/index.css` — CSS değişkenleri (`--bg-color`, `--primary-color`, `--accent-color` …),
  reset, `.glass`, `.container`, `.text-gradient` gibi paylaşılan sınıflar
- `src/App.css` (~1100 satır) — bölüme özel tüm kurallar

Renk veya boşluk değeri hard-code etme, `index.css`'teki değişkenleri kullan.
`.glass` üzerinde `backdrop-filter` **bilerek yok** — orta segment Android'de her kart ayrı
kompozit katman açıp kaydırmayı yavaşlatıyordu. Blur sadece içeriğin altından aktığı yerlerde
(header, mobil menü) kaldı.

`useScrollReveal` hook'u `.reveal` elemanlarını görünürken açar. `.reveal` CSS'te
**varsayılan olarak görünür**; hook `<html>`'e `.js-reveal` ekleyerek animasyonu devreye alır.
Böylece JS çalışmazsa (veya prerender HTML hydrate olmadan önce) içerik gizli kalmaz.
`prefers-reduced-motion` varsa hook tamamen atlanır.

### Erişilebilirlik (mevcut standart — düşürme)

Kodda tutarlı biçimde: dekoratif ikonlarda `aria-hidden="true"`, açılır panellerde
`aria-expanded` + `aria-controls`, filtre butonlarında (sekme değil) `aria-pressed`,
yeni sekmede açılan bağlantılarda "(yeni sekmede açılır)" içeren `aria-label`,
sayfa başında `.skip-link`. Yeni bileşende aynı seviyeyi koru.

### `public/` ve statik varlıklar

`public/` içeriği `dist/` köküne kopyalanır. Burada `.htaccess` (Hostinger/Apache: MIME,
brotli/deflate, cache stratejisi), `robots.txt`, favicon seti, `site.webmanifest`,
ve fotoğrafların çok boyutlu `webp` + `jpg` srcset varyantları var.

Cache stratejisi bilinçli: hash'li JS/CSS 1 yıl immutable, **sabit isimli** dosyalar
(favicon, manifest, görseller, `index.html`) kısa süre + zorunlu doğrulama — aksi halde
güncelleme kullanıcıya günlerce ulaşmıyor.

Hero fotoğrafı LCP görseli; `index.html`'de `preload` + `fetchpriority="high"` ile erkenden
indiriliyor. Görsel yolu/boyut setini değiştirirsen `index.html`'deki preload'u da güncelle.

## SEO yol haritası (README'de takip ediliyor)

Faz 1 (prerender + JSON-LD + tek öğretmen yapısı) bitti. Sıradakiler: 56 ünitenin kendi
URL'ine taşındığı çok sayfalı yapı, ders × sınıf iniş sayfaları, fiyatlandırma sayfası,
ilçe sayfaları (şablondan çoğaltmadan), Outfit fontunu kendi sunucumuza alma
(`.htaccess`'te cache kuralı hazır), çerezsiz analytics, iletişim formu.
