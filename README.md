# Kayseri LGS Özel Ders

[kayserilgsozelders.com](https://kayserilgsozelders.com) — Saim Ünsal'ın LGS ve ortaokul
Fen Bilgisi / Matematik özel ders tanıtım sitesi.

React 19 + Vite. `main` dalına atılan her push, GitHub Actions üzerinden Hostinger'a
FTP ile otomatik yayınlanır (`.github/workflows/deploy.yml`).

## Komutlar

```bash
npm install      # bağımlılıklar
npm run dev      # geliştirme sunucusu (http://localhost:5173)
npm run build    # üretim derlemesi -> dist/
npm run preview  # dist/ çıktısını yerelde sunar
npm run lint     # oxlint
```

## Build nasıl çalışıyor — ÖNEMLİ

`npm run build` üç adımdır ve sıra bozulmamalıdır:

| # | Komut | Ne yapar |
|---|---|---|
| 1 | `vite build` | Tarayıcı paketi + `public/` kopyası → `dist/` |
| 2 | `vite build --ssr src/entry-server.jsx` | Uygulamanın Node tarafında çalışan sürümü → `dist-ssr/` |
| 3 | `node scripts/prerender.mjs` | İkisini birleştirir → `dist/index.html` |

**Neden:** Vite tek başına boş bir `<div id="root">` üretir. Arama motorlarının bir
kısmı ve yapay zekâ tarayıcılarının (ChatGPT, Perplexity, Gemini) neredeyse tamamı
JavaScript çalıştırmaz; o hâliyle sayfayı boş görürler. Prerender adımı, sayfanın
tamamını build sırasında statik HTML'e basar (~94 kB, ~2.200 kelime). Tarayıcıda
React bu HTML'i `hydrateRoot` ile devralır.

`scripts/prerender.mjs` ayrıca şunları üretir:

- **JSON-LD yapılandırılmış verisi** — `src/data/` dosyalarından türetilir
- **`dist/sitemap.xml`** — güncel `lastmod` ile

CI, `dist/index.html` içinde uygulama metni ve JSON-LD var mı diye kontrol eder;
yoksa deploy etmeden build'i kırar.

## İçerik nerede düzenlenir

| Ne | Dosya |
|---|---|
| Telefon, Instagram, hizmet bölgeleri, çalışma saatleri, meta açıklama | `src/data/site.js` |
| Ünite başlıkları ve konu özetleri | `src/data/curriculumData.js` |
| Sıkça sorulan sorular | `src/data/faqData.js` |
| Veli yorumları | `src/data/reviewsData.js` |

Bu dosyalar tek gerçek kaynaktır — JSON-LD şeması build sırasında bunlardan üretilir,
elle senkron gerekmez.

### Dikkat edilecek üç kural

**1. Meta açıklama iki yerde durur.** `index.html` içindeki `<meta name="description">`
ile `site.js > PAGE_DESCRIPTION` birebir aynı olmalıdır. Ayrışırsa build hata verip
durur — sessizce yanlış yayınlanmaz.

**2. Yorumlar gerçek olmalı.** `reviewsData.js` boş olduğu sürece Yorumlar bölümü
siteye hiç basılmaz ve menüdeki bağlantısı da gizlenir. Uydurma yorum girmeyin;
`Review` / `AggregateRating` şeması ancak gerçek, doğrulanabilir yorumlar
toplandıktan sonra eklenebilir — öncesinde eklemek Google'ın politikalarını ihlal eder.

**3. PDF butonları kendiliğinden görünür.** `curriculumData.js` içinde bir ünitenin
`pdfLink` değeri `"#"` olduğu sürece o ünitede indirme butonu basılmaz. Gerçek bir
yol (`/pdf/lgs-carpanlar.pdf` gibi) yazıldığı anda buton görünür. "Yakında" durumu
bilerek kaldırıldı: 56 boş vaat, bir tanesinin bile olmamasından daha kötüydü.

## Yapılacaklar (SEO yol haritası)

Faz 1 tamamlandı. Sıradaki adımlar:

- [ ] Çok sayfalı yapıya geçiş — 56 ünitenin her biri kendi URL'ine
      (`/konular/lgs/matematik/carpanlar-ve-katlar`)
- [ ] Ders × sınıf iniş sayfaları (`/kayseri-lgs-matematik-ozel-ders`)
- [ ] Fiyatlandırma sayfası
- [ ] İlçe sayfaları — şablondan çoğaltmadan, her birine özgün içerikle
- [ ] Outfit yazı tipini kendi sunucumuza alma (render'ı bloke eden iki
      üçüncü taraf bağlantısı kalkar; `.htaccess`'te font cache kuralı hazır)
- [ ] Analytics (Plausible / Umami — çerez banneri gerektirmez)
- [ ] İletişim formu
