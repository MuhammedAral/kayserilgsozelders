// Sitenin tek gerçek kaynağı (single source of truth).
// İletişim bilgisi değişince SADECE burayı güncelleyin.
// Not: index.html içindeki JSON-LD şeması statik olduğu için orayı da elle güncelleyin.

export const SITE_URL = 'https://kayserilgsozelders.com';
export const SITE_NAME = 'Kayseri LGS Özel Ders';
export const TEACHER_NAME = 'Saim Ünsal';
export const TEACHER_TITLE = 'Fen Bilgisi Öğretmeni';

export const PHONE_E164 = '+905548557040';
export const PHONE_DISPLAY = '0554 855 70 40';
export const TEL_HREF = `tel:${PHONE_E164}`;

const WHATSAPP_TEXT = 'Merhaba, LGS özel ders hakkında bilgi almak istiyorum.';
export const WHATSAPP_URL = `https://wa.me/905548557040?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

export const INSTAGRAM_URL = 'https://www.instagram.com/sunsal_sa';

export const SERVICE_AREAS = ['Melikgazi', 'Kocasinan', 'Talas', 'Hacılar', 'İncesu'];
export const SERVICE_AREAS_TEXT = `${SERVICE_AREAS.join(', ')} / Kayseri`;
