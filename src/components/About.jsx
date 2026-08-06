import { Award } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="container">
      <h2 className="section-title">Hakkımda</h2>
      <div className="about-grid">
        <div className="teacher-card glass">
          <div className="teacher-image">
            <img src="/saim-photo.jpeg" alt="Saim Ünsal" />
          </div>
          <h3>Saim Ünsal</h3>
          <h4>Fen Bilgisi Öğretmeni</h4>
          <p>
            Erciyes Üniversitesi mezunu. 10 yıllık eğitim tecrübesiyle, yeni nesil soru çözüm teknikleri
            ve analitik düşünme becerilerini öğrencilere kazandırmayı hedefler.
          </p>
        </div>
        
        <div className="teacher-card glass">
          <div className="teacher-image placeholder">
            <Award size={40} color="var(--primary-color)" />
          </div>
          <h3>Matematik Öğretmeni</h3>
          <h4>Matematik Öğretmeni</h4>
          <p>
            Erciyes Üniversitesi mezunu. 10 yıllık deneyimiyle, matematiği ezberden uzak,
            mantıksal temellere oturtarak ve Maarif modeline uygun şekilde öğretir.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
