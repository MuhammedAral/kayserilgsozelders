import { GraduationCap, Users } from 'lucide-react';

const STATS = [
  { Icon: GraduationCap, number: '10+', label: 'Yıllık Tecrübe' },
  { Icon: Users, number: '250+', label: 'Başarılı Öğrenci' },
];

const Stats = () => {
  return (
    <section className="stats-section reveal" aria-label="Öne çıkan rakamlar">
      <div className="container">
        <div className="stats-grid">
          {STATS.map(({ Icon, number, label }) => (
            <div key={label} className="stat-item glass">
              <div className="stat-icon">
                <Icon size={32} color="var(--primary-color)" aria-hidden="true" />
              </div>
              <div className="stat-content">
                <p className="stat-number">{number}</p>
                <p className="stat-label">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
