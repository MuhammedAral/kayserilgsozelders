import { ArrowRight, Phone } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1>
            Sınavlara Değil,<br />
            <span className="text-gradient">Geleceğe Hazırlıyoruz</span>
          </h1>
          <p>
            Kayseri'de 10 yıllık tecrübemiz ve Maarif modeli yaklaşımımızla; LGS, 7, 6 ve 5. sınıflar için yeni nesil Fen Bilgisi ve Matematik özel dersleri.
          </p>
          <div className="cta-buttons">
            <a href="#classes" className="btn btn-primary">
              Dersleri İncele <ArrowRight size={20} />
            </a>
            <a href="tel:+905548557040" className="btn btn-call">
              <Phone size={20} /> Hemen Ara
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img src="/saim-photo.jpeg" alt="Saim Ünsal" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
