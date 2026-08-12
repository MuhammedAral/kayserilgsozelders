// Veli ve öğrenci yorumları.
//
// Bu liste BOŞ olduğu sürece Reviews bölümü siteye hiç basılmaz (Reviews.jsx null döner)
// ve Header'daki "Yorumlar" menü bağlantısı da otomatik olarak gizlenir.
//
// KURAL: Buraya yalnızca GERÇEK, izin alınmış yorumlar girilir.
// Uydurma yorum hem tüketici mevzuatı hem itibar açısından risklidir.
//
// Önce Google İşletme Profili'nde yorum toplamak daha değerlidir: harita
// sıralamasını doğrudan besler ve doğrulanabilir olur. Buraya ancak
// oradaki gerçek yorumların bir seçkisi taşınmalıdır.
//
// Gerçek yorumlar eklendikten SONRA index.html'e Review / AggregateRating
// şeması eklenebilir. Öncesinde ASLA eklemeyin.
//
// Biçim:
// { id: 1, author: 'Ad Soyad', role: 'Öğrenci Velisi', text: '...', initial: 'A' }

export const reviews = [];
