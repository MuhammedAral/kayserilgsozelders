import { MessageCircle, Phone } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import { TEL_HREF, PHONE_DISPLAY, WHATSAPP_URL, INSTAGRAM_URL } from '../data/site';

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <div className="float-wrapper">
        <span className="float-tooltip" aria-hidden="true">
          Hemen Ara
        </span>
        <a
          href={TEL_HREF}
          className="float-btn float-phone btn-call"
          aria-label={`Telefonla ara: ${PHONE_DISPLAY}`}
        >
          <Phone size={28} aria-hidden="true" />
        </a>
      </div>

      <div className="float-wrapper">
        <span className="float-tooltip" aria-hidden="true">
          WhatsApp
        </span>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn float-whatsapp"
          aria-label="WhatsApp üzerinden mesaj gönder (yeni sekmede açılır)"
        >
          <MessageCircle size={28} aria-hidden="true" />
        </a>
      </div>

      <div className="float-wrapper">
        <span className="float-tooltip" aria-hidden="true">
          Instagram
        </span>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn float-instagram"
          aria-label="Instagram sayfamız (yeni sekmede açılır)"
        >
          <InstagramIcon size={28} />
        </a>
      </div>
    </div>
  );
};

export default FloatingButtons;
