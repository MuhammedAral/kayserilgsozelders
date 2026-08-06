import { MessageCircle, Phone } from 'lucide-react';

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <a 
        href="tel:+905548557040" 
        className="float-btn float-phone"
        title="Hemen Ara"
      >
        <Phone size={28} />
      </a>
      <a 
        href="https://wa.me/905548557040" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="float-btn float-whatsapp"
        title="WhatsApp'tan İletişime Geç"
      >
        <MessageCircle size={28} />
      </a>
      <a 
        href="https://www.instagram.com/sunsal_sa?igsh=MTZwOG9vZXFpYzNzMQ==" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="float-btn float-instagram"
        title="Instagram'da Takip Et"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>
    </div>
  );
};

export default FloatingButtons;
