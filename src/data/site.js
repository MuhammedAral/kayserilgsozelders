// Sitenin tek gerçek kaynağı (single source of truth).
// İletişim bilgisi değişince SADECE burayı güncelleyin.
//
// index.html içindeki JSON-LD yapılandırılmış verisi artık ELLE yazılmıyor:
// scripts/prerender.mjs bu dosyadan ve faqData.js'ten build sırasında üretiyor.
// Yani burayı güncellemek şemayı da günceller.

export const SITE_URL = 'https://kayserilgsozelders.com';
export const SITE_NAME = 'Kayseri LGS Özel Ders';
export const TEACHER_NAME = 'Saim Ünsal';
export const TEACHER_TITLE = 'Fen Bilgisi Öğretmeni';
export const TEACHER_UNIVERSITY = 'Erciyes Üniversitesi';

export const PHONE_E164 = '+905548557040';
export const PHONE_DISPLAY = '0554 855 70 40';
export const TEL_HREF = `tel:${PHONE_E164}`;

const WHATSAPP_TEXT = 'Merhaba, LGS özel ders hakkında bilgi almak istiyorum.';
export const WHATSAPP_URL = `https://wa.me/905548557040?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

export const INSTAGRAM_URL = 'https://www.instagram.com/sunsal_sa';

export const SERVICE_AREAS = ['Melikgazi', 'Kocasinan', 'Talas', 'Hacılar', 'İncesu'];
export const SERVICE_AREAS_TEXT = `${SERVICE_AREAS.join(', ')} / Kayseri`;

// Google İşletme Profili'ndeki saatlerle AYNI olmalı; tutarsızlık yerel sıralamaya zarar verir.
export const OPENING_HOURS = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
  { days: ['Saturday'], opens: '10:00', closes: '18:00' },
];

// Sayfa başlığı ve açıklaması — hem index.html hem şema buradan beslenir.
export const PAGE_TITLE = `Kayseri LGS Özel Ders | Fen Bilgisi ve Matematik | ${TEACHER_NAME}`;
export const PAGE_DESCRIPTION =
  "Kayseri'de LGS, 5, 6 ve 7. sınıf öğrencilerine birebir Fen Bilgisi ve Matematik özel dersi. " +
  `${TEACHER_UNIVERSITY} mezunu, 10 yıllık tecrübeli öğretmenle Maarif modeline uygun eğitim. ` +
  `${SERVICE_AREAS.join(', ')} bölgelerinde hizmet.`;
