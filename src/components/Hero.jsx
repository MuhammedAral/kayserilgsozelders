import { ArrowRight, Phone } from 'lucide-react';
import { TEACHER_NAME, TEL_HREF, PHONE_DISPLAY } from '../data/site';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1>
            Sınavlara Değil,
            <br />
            <span className="text-gradient">Geleceğe Hazırlıyoruz</span>
          </h1>
          <p>
            Kayseri&apos;de 10 yıllık tecrübemiz ve Maarif modeli yaklaşımımızla; LGS, 7, 6 ve 5.
            sınıflar için yeni nesil Fen Bilgisi ve Matematik özel dersleri.
          </p>
          <div className="cta-buttons">
            <a href="#classes" className="btn btn-primary">
              Dersleri İncele <ArrowRight size={20} aria-hidden="true" />
            </a>
            <a href={TEL_HREF} className="btn btn-call" aria-label={`Hemen ara: ${PHONE_DISPLAY}`}>
              <Phone size={20} aria-hidden="true" /> Hemen Ara
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <picture>
            <source
              type="image/webp"
              srcSet="/saim-photo-320.webp 320w, /saim-photo-480.webp 480w, /saim-photo-640.webp 640w, /saim-photo-960.webp 960w, /saim-photo-1200.webp 1200w"
              sizes="(max-width: 768px) 88vw, 45vw"
            />
            <img
              src="/saim-photo-640.jpg"
              srcSet="/saim-photo-640.jpg 640w, /saim-photo-1200.jpg 1200w"
              sizes="(max-width: 768px) 88vw, 45vw"
              width="1200"
              height="1600"
              alt={`${TEACHER_NAME}, Kayseri'de LGS ve ortaokul Fen Bilgisi özel ders öğretmeni`}
              className="hero-image"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default Hero;
