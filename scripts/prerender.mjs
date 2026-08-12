/**
 * Build sonrası adımı: uygulamayı statik HTML'e basar, yapılandırılmış veriyi
 * ve site haritasını tek kaynaktan üretir.
 *
 * Neden: Vite'ın ürettiği index.html boş bir <div id="root"> içerir. Arama
 * motorlarının bir kısmı ve yapay zekâ tarayıcılarının neredeyse tamamı
 * JavaScript çalıştırmadığı için o hâliyle sayfa "boş" görünür.
 *
 * Çalışma sırası (package.json > build):
 *   1. vite build                 -> dist/            (tarayıcı paketi)
 *   2. vite build --ssr           -> dist-ssr/        (Node tarafı render)
 *   3. node scripts/prerender.mjs -> dist/index.html  (birleştirme)
 */
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distHtml = resolve(root, 'dist/index.html');

const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);
const site = await import(pathToFileURL(resolve(root, 'src/data/site.js')).href);
const { faqs } = await import(pathToFileURL(resolve(root, 'src/data/faqData.js')).href);
const { curriculumData } = await import(
  pathToFileURL(resolve(root, 'src/data/curriculumData.js')).href
);

const {
  SITE_URL,
  SITE_NAME,
  TEACHER_NAME,
  TEACHER_TITLE,
  TEACHER_UNIVERSITY,
  PHONE_E164,
  INSTAGRAM_URL,
  SERVICE_AREAS,
  OPENING_HOURS,
  PAGE_DESCRIPTION,
} = site;

/* ------------------------------------------------------------------ *
 *  1) Yapılandırılmış veri (JSON-LD)
 *     Tamamı src/data/* dosyalarından üretilir; elle senkron gerekmez.
 * ------------------------------------------------------------------ */

const teacher = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#ogretmen`,
  name: TEACHER_NAME,
  jobTitle: TEACHER_TITLE,
  worksFor: { '@id': `${SITE_URL}/#isletme` },
  alumniOf: { '@type': 'CollegeOrUniversity', name: TEACHER_UNIVERSITY },
  knowsAbout: ['LGS hazırlık', 'Fen Bilimleri', 'Matematik', 'Maarif modeli'],
  sameAs: [INSTAGRAM_URL],
};

// Sınıf x ders kombinasyonlarını müfredat verisinden türet.
const offers = Object.entries(curriculumData).flatMap(([grade, subjects]) =>
  Object.keys(subjects).map((subject) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'EducationalOccupationalProgram',
      name: `${grade} ${subject} Özel Ders`,
      educationalLevel: grade,
      provider: { '@id': `${SITE_URL}/#isletme` },
    },
  }))
);

const business = {
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  '@id': `${SITE_URL}/#isletme`,
  name: `${SITE_NAME} - ${TEACHER_NAME}`,
  description: PAGE_DESCRIPTION,
  url: SITE_URL,
  telephone: PHONE_E164,
  image: `${SITE_URL}/og-image.jpg`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kayseri',
    addressRegion: 'Kayseri',
    addressCountry: 'TR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 38.7312, longitude: 35.4787 },
  areaServed: [
    { '@type': 'City', name: 'Kayseri' },
    ...SERVICE_AREAS.map((name) => ({ '@type': 'AdministrativeArea', name })),
  ],
  openingHoursSpecification: OPENING_HOURS.map(({ days, opens, closes }) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: days,
    opens,
    closes,
  })),
  founder: { '@id': `${SITE_URL}/#ogretmen` },
  employee: { '@id': `${SITE_URL}/#ogretmen` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Özel Ders Hizmetleri',
    itemListElement: offers,
  },
  sameAs: [INSTAGRAM_URL],
};

// NOT: Review / AggregateRating BİLEREK yok. Gerçek, doğrulanabilir yorum
// toplanmadan eklenmesi Google'ın politikalarını ihlal eder.
const faqPage = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#sss`,
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#site`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'tr-TR',
  publisher: { '@id': `${SITE_URL}/#isletme` },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [business, teacher, website, faqPage],
};

/* ------------------------------------------------------------------ *
 *  2) HTML'i birleştir
 * ------------------------------------------------------------------ */

const appHtml = render();
let html = await readFile(distHtml, 'utf8');

if (!html.includes('<div id="root"></div>')) {
  throw new Error('prerender: index.html içinde boş <div id="root"></div> bulunamadı.');
}
if (!html.includes('<!--json-ld-->')) {
  throw new Error('prerender: index.html içinde <!--json-ld--> yer tutucusu bulunamadı.');
}

// index.html'deki meta açıklama ile site.js'teki tek kaynak ayrışmasın.
const metaDescription = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
if (metaDescription !== PAGE_DESCRIPTION) {
  throw new Error(
    'prerender: index.html meta description ile site.js > PAGE_DESCRIPTION farklı.\n' +
      `  index.html : ${metaDescription}\n` +
      `  site.js    : ${PAGE_DESCRIPTION}`
  );
}

html = html
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  .replace(
    '<!--json-ld-->',
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  );

await writeFile(distHtml, html, 'utf8');

/* ------------------------------------------------------------------ *
 *  3) Site haritası
 * ------------------------------------------------------------------ */

const today = new Date().toISOString().slice(0, 10);
const urls = [{ loc: `${SITE_URL}/`, priority: '1.0' }];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

await writeFile(resolve(root, 'dist/sitemap.xml'), sitemap, 'utf8');

// Sunucuya gitmesine gerek yok.
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });

const words = appHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
console.log(`prerender: ${(appHtml.length / 1024).toFixed(1)} kB HTML, ~${words} kelime basıldı.`);
console.log(`prerender: JSON-LD ${jsonLd['@graph'].length} varlık, ${offers.length} ders programı.`);
