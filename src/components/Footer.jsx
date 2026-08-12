import { MapPin, Phone } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import {
  SITE_NAME,
  TEL_HREF,
  PHONE_DISPLAY,
  INSTAGRAM_URL,
  SERVICE_AREAS_TEXT,
  SERVICE_AREAS,
} from '../data/site';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="text-gradient">{SITE_NAME}</h3>
            <p className="footer-intro">
              LGS ve ortaokul seviyesinde birebir özel ders. Her öğrenciyle seviye tespitiyle
              başlanır, program okuldaki konuya göre kurulur.
            </p>
          </div>

          <div className="footer-col">
            <h3>İletişim Bilgileri</h3>
            <p>
              <Phone size={20} aria-hidden="true" />
              <a href={TEL_HREF} className="footer-link">
                {PHONE_DISPLAY}
              </a>
            </p>
            <p>
              <MapPin size={20} aria-hidden="true" />
              <span>{SERVICE_AREAS_TEXT}</span>
            </p>
          </div>

          <div className="footer-col">
            <h3>Sosyal Medya</h3>
            <div className="footer-social">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram sayfamız (yeni sekmede açılır)"
              >
                <InstagramIcon size={28} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Tüm Hakları Saklıdır.</p>
          <p className="footer-keywords">
            Kayseri özel ders | LGS hazırlık | Matematik özel ders | Fen Bilgisi özel ders |{' '}
            {SERVICE_AREAS.join(', ')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
