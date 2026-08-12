import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { TEACHER_NAME, TEACHER_TITLE } from '../data/site';

const NAV_ITEMS = [
  { href: '#home', label: 'Ana Sayfa' },
  { href: '#about', label: 'Hakkımda' },
  { href: '#classes', label: 'Dersler' },
  { href: '#reviews', label: 'Yorumlar' },
  { href: '#faq', label: 'SSS' },
  { href: '#contact', label: 'İletişim' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobil menü açıkken Escape ile kapansın
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="logo" onClick={closeMenu}>
        <span className="logo-name text-gradient">{TEACHER_NAME}</span>
        <span className="logo-sub">{TEACHER_TITLE}</span>
      </a>

      <nav
        id="primary-navigation"
        className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}
        aria-label="Ana menü"
      >
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen((open) => !open)}
        aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="primary-navigation"
      >
        {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
      </button>
    </header>
  );
};

export default Header;
