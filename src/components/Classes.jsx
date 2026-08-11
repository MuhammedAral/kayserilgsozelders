import { useState } from 'react';
import { curriculumData } from '../data/curriculumData';

const Classes = () => {
  const [activeTab, setActiveTab] = useState('LGS');
  const [activeSubject, setActiveSubject] = useState('Matematik');
  const [expandedUnit, setExpandedUnit] = useState(null);

  const classes = ['LGS', '7. Sınıf', '6. Sınıf', '5. Sınıf'];
  const subjects = ['Matematik', 'Fen Bilgisi'];

  const toggleUnit = (unitId) => {
    if (expandedUnit === unitId) {
      setExpandedUnit(null);
    } else {
      setExpandedUnit(unitId);
    }
  };

  const currentData = curriculumData[activeTab]?.[activeSubject] || [];

  return (
    <section id="classes" className="container">
      <h2 className="section-title">Dersler & Kaynaklar</h2>
      
      {/* Sınıf Seçimi */}
      <div className="classes-tabs reveal">
        {classes.map((cls) => (
          <button
            key={cls}
            className={`tab-btn ${activeTab === cls ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(cls);
              setExpandedUnit(null); // Sınıf değiştiğinde akordeonu kapat
            }}
          >
            {cls}
          </button>
        ))}
      </div>

      <div className="tab-content glass reveal">
        {/* Ders Seçimi */}
        <div className="subject-tabs">
          {subjects.map((sub) => (
            <button
              key={sub}
              className={`subject-btn ${activeSubject === sub ? 'active' : ''}`}
              onClick={() => {
                setActiveSubject(sub);
                setExpandedUnit(null); // Ders değiştiğinde akordeonu kapat
              }}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Üniteler Akordeon Listesi */}
        <div className="curriculum-list">
          {currentData.length > 0 ? (
            currentData.map((unit) => (
              <div key={unit.id} className={`unit-card ${expandedUnit === unit.id ? 'expanded' : ''}`}>
                <div className="unit-header" onClick={() => toggleUnit(unit.id)}>
                  <h3 className="unit-title">{unit.title}</h3>
                  <div className="unit-actions">
                    <button 
                      className="action-btn read-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleUnit(unit.id);
                      }}
                    >
                      {expandedUnit === unit.id ? 'Gizle' : '📖 Konuyu Oku'}
                    </button>
                    <a 
                      href={unit.pdfLink} 
                      className="action-btn download-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      📥 PDF İndir
                    </a>
                  </div>
                </div>
                
                {expandedUnit === unit.id && (
                  <div className="unit-body">
                    <p className="unit-summary">{unit.summary}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="pdf-list-empty">
              <p>Bu bölüme yakında ders materyalleri eklenecektir.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Classes;
