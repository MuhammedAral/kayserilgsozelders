import { MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="text-gradient">Kayseri LGS Özel Ders</h3>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
              LGS ve Ortaokul seviyesinde uzman kadroyla profesyonel eğitim desteği. Geleceğinizi şansa bırakmayın.
            </p>
          </div>
          
          <div className="footer-col">
            <h3>İletişim Bilgileri</h3>
            <p>
              <Phone size={20} />
              <a href="tel:+905548557040" style={{ color: 'var(--text-secondary)' }}>0554 855 70 40</a>
            </p>
            <p>
              <MapPin size={20} />
              <span>Melikgazi, Kocasinan, Talas, Hacılar, İncesu / Kayseri</span>
            </p>
          </div>

          <div className="footer-col">
            <h3>Sosyal Medya</h3>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="https://www.instagram.com/sunsal_sa?igsh=MTZwOG9vZXFpYzNzMQ==" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Kayseri LGS Özel Ders. Tüm Hakları Saklıdır.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.6 }}>
            Kayseri özel ders | LGS hazırlık | Matematik özel ders | Fen Bilgisi özel ders | Melikgazi, Kocasinan, Talas, Hacılar, İncesu
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
