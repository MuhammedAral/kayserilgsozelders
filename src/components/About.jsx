import { Award } from 'lucide-react';
import { TEACHER_NAME, TEACHER_TITLE } from '../data/site';

const About = () => {
  return (
    <section id="about" className="container">
      <h2 className="section-title">Hakkımda</h2>
      <div className="about-grid">
        <div className="teacher-card glass reveal">
          <div className="teacher-image">
            <picture>
              <source
                type="image/webp"
                srcSet="/saim-avatar-120.webp 1x, /saim-avatar-240.webp 2x"
              />
              <img
                src="/saim-avatar-240.jpg"
                width="100"
                height="100"
                alt={TEACHER_NAME}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
          <h3>{TEACHER_NAME}</h3>
          <h4>{TEACHER_TITLE}</h4>
          <p>
            Erciyes Üniversitesi mezunu. 10 yıllık eğitim tecrübesiyle, yeni nesil soru çözüm
            teknikleri ve analitik düşünme becerilerini öğrencilere kazandırmayı hedefler.
          </p>
        </div>

        <div className="teacher-card glass reveal">
          <div className="teacher-image placeholder">
            <Award size={40} color="var(--primary-color)" aria-hidden="true" />
          </div>
          <h3>Matematik Öğretmeni</h3>
          <h4>Matematik Öğretmeni</h4>
          <p>
            Erciyes Üniversitesi mezunu. 10 yıllık deneyimiyle, matematiği ezberden uzak, mantıksal
            temellere oturtarak ve Maarif modeline uygun şekilde öğretir.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
