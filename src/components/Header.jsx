import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <span className="text-gradient">Saim Ünsal</span>
      </div>
      <nav className="nav-links">
        <a href="#home">Ana Sayfa</a>
        <a href="#about">Hakkımda</a>
        <a href="#classes">Dersler</a>
        <a href="#faq">SSS</a>
        <a href="#contact">İletişim</a>
      </nav>
      <button className="mobile-menu-btn">
        <Menu size={24} />
      </button>
    </header>
  );
};

export default Header;
