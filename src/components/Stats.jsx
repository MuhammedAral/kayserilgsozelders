import { GraduationCap, Users, BookOpen } from 'lucide-react';

const Stats = () => {
  return (
    <section className="stats-section reveal">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item glass">
            <div className="stat-icon">
              <GraduationCap size={32} color="var(--primary-color)" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">10+</h3>
              <p className="stat-label">Yıllık Tecrübe</p>
            </div>
          </div>
          
          <div className="stat-item glass">
            <div className="stat-icon">
              <Users size={32} color="var(--primary-color)" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">250+</h3>
              <p className="stat-label">Başarılı Öğrenci</p>
            </div>
          </div>
          
          <div className="stat-item glass">
            <div className="stat-icon">
              <BookOpen size={32} color="var(--primary-color)" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">2</h3>
              <p className="stat-label">Temel Branş (Fen & Mat)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
