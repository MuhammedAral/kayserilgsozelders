import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
        <span className="text-gradient" style={{ lineHeight: '1.2' }}>Saim Ünsal</span>
        <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-secondary)', marginTop: '2px', letterSpacing: '0.5px' }}>
          Fen Bilgisi Öğretmeni
        </span>
      </div>
      <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="#home" onClick={closeMenu}>Ana Sayfa</a>
        <a href="#about" onClick={closeMenu}>Hakkımda</a>
        <a href="#classes" onClick={closeMenu}>Dersler</a>
        <a href="#faq" onClick={closeMenu}>SSS</a>
        <a href="#contact" onClick={closeMenu}>İletişim</a>
      </nav>
      <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
};

export default Header;
