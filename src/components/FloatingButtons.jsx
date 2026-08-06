import { MessageCircle, Phone } from 'lucide-react';

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <div className="float-wrapper">
        <span className="float-tooltip">Hemen Ara</span>
        <a 
          href="tel:+905548557040" 
          className="float-btn float-phone btn-call"
        >
          <Phone size={28} />
        </a>
      </div>
      
      <div className="float-wrapper">
        <span className="float-tooltip">WhatsApp</span>
        <a 
          href="https://wa.me/905548557040" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="float-btn float-whatsapp"
        >
          <MessageCircle size={28} />
        </a>
      </div>

      <div className="float-wrapper">
        <span className="float-tooltip">Instagram</span>
        <a 
          href="https://www.instagram.com/sunsal_sa?igsh=MTZwOG9vZXFpYzNzMQ==" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="float-btn float-instagram"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default FloatingButtons;
