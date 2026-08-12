import { useState } from 'react';
import { ChevronDown, BookOpen, Download } from 'lucide-react';
import { curriculumData } from '../data/curriculumData';

const CLASSES = ['LGS', '7. Sınıf', '6. Sınıf', '5. Sınıf'];
const SUBJECTS = ['Matematik', 'Fen Bilgisi'];

// curriculumData içinde pdfLink "#" olan üniteler için indirme butonu HİÇ basılmaz.
// Gerçek bir PDF yolu yazıldığı anda buton kendiliğinden görünür.
const hasPdf = (unit) => Boolean(unit.pdfLink) && unit.pdfLink !== '#';

const UnitCard = ({ unit, isOpen, onToggle }) => {
  const panelId = `unit-panel-${unit.id}`;
  const buttonId = `unit-button-${unit.id}`;

  return (
    <div className={`unit-card ${isOpen ? 'expanded' : ''}`}>
      <div className="unit-header">
        <h3 className="unit-heading">
          <button
            type="button"
            id={buttonId}
            className="unit-toggle"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={panelId}
          >
            <span className="unit-title">{unit.title}</span>
            <span className="unit-toggle-hint">
              <BookOpen size={16} aria-hidden="true" />
              {isOpen ? 'Gizle' : 'Konuyu Oku'}
              <ChevronDown size={18} className="unit-chevron" aria-hidden="true" />
            </span>
          </button>
        </h3>

        {hasPdf(unit) && (
          <div className="unit-actions">
            <a
              href={unit.pdfLink}
              className="action-btn download-btn"
              target="_blank"
              rel="noreferrer"
              aria-label={`${unit.title} konu anlatımı PDF indir (yeni sekmede açılır)`}
            >
              <Download size={16} aria-hidden="true" /> PDF İndir
            </a>
          </div>
        )}
      </div>

      <div id={panelId} role="region" aria-labelledby={buttonId} className="unit-body-wrap">
        <div className="unit-body">
          <p className="unit-summary">{unit.summary}</p>
        </div>
      </div>
    </div>
  );
};

const Classes = () => {
  const [activeTab, setActiveTab] = useState('LGS');
  const [activeSubject, setActiveSubject] = useState('Matematik');
  const [expandedUnit, setExpandedUnit] = useState(null);

  const toggleUnit = (unitId) => {
    setExpandedUnit((current) => (current === unitId ? null : unitId));
  };

  return (
    <section id="classes" className="container">
      <h2 className="section-title">Dersler &amp; Konular</h2>
      <p className="section-intro">
        Her sınıf seviyesi için MEB müfredatındaki üniteleri ve bu ünitelerde neyi nasıl
        çalıştığımızı aşağıda bulabilirsiniz. Başlığa dokunarak ünitenin içeriğini okuyabilirsiniz.
      </p>

      {/* Sınıf seçimi — sekme değil filtre grubu: aria-pressed doğru semantiktir */}
      <div className="classes-tabs reveal" role="group" aria-label="Sınıf seçimi">
        {CLASSES.map((cls) => (
          <button
            key={cls}
            type="button"
            aria-pressed={activeTab === cls}
            className={`tab-btn ${activeTab === cls ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(cls);
              setExpandedUnit(null);
            }}
          >
            {cls}
          </button>
        ))}
      </div>

      <div className="tab-content glass reveal">
        <div className="subject-tabs" role="group" aria-label="Ders seçimi">
          {SUBJECTS.map((sub) => (
            <button
              key={sub}
              type="button"
              aria-pressed={activeSubject === sub}
              className={`subject-btn ${activeSubject === sub ? 'active' : ''}`}
              onClick={() => {
                setActiveSubject(sub);
                setExpandedUnit(null);
              }}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Sınıf x ders kombinasyonlarının TAMAMI DOM'a basılır, aktif olmayan
            liste CSS ile gizlenir. Böylece build sırasında üretilen statik HTML
            56 ünite özetinin hepsini içerir; yalnızca aktif sekme basılsaydı
            arama motoru bunların ancak 11'ini görebilirdi. */}
        {CLASSES.map((cls) =>
          SUBJECTS.map((sub) => {
            const units = curriculumData[cls]?.[sub] || [];
            const isActive = cls === activeTab && sub === activeSubject;
            const listId = `konular-${cls}-${sub}`.replace(/[.\s]/g, '-').toLowerCase();

            return (
              <div
                key={listId}
                id={listId}
                className={`curriculum-list ${isActive ? '' : 'is-hidden'}`}
              >
                {units.length > 0 ? (
                  units.map((unit) => (
                    <UnitCard
                      key={unit.id}
                      unit={unit}
                      isOpen={expandedUnit === unit.id}
                      onToggle={() => toggleUnit(unit.id)}
                    />
                  ))
                ) : (
                  <div className="pdf-list-empty">
                    <p>
                      {cls} {sub} için ünite listesi yakında eklenecektir.
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Classes;
