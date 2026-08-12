import { useState, useCallback } from 'react';
import { ChevronDown, BookOpen, Download, Clock } from 'lucide-react';
import { curriculumData } from '../data/curriculumData';
import Toast from './Toast';

const CLASSES = ['LGS', '7. Sınıf', '6. Sınıf', '5. Sınıf'];
const SUBJECTS = ['Matematik', 'Fen Bilgisi'];

const Classes = () => {
  const [activeTab, setActiveTab] = useState('LGS');
  const [activeSubject, setActiveSubject] = useState('Matematik');
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [toast, setToast] = useState('');

  const dismissToast = useCallback(() => setToast(''), []);

  const toggleUnit = (unitId) => {
    setExpandedUnit((current) => (current === unitId ? null : unitId));
  };

  const currentData = curriculumData[activeTab]?.[activeSubject] || [];

  return (
    <section id="classes" className="container">
      <h2 className="section-title">Dersler &amp; Kaynaklar</h2>

      {/* Sınıf Seçimi */}
      <div className="classes-tabs reveal" role="tablist" aria-label="Sınıf seçimi">
        {CLASSES.map((cls) => (
          <button
            key={cls}
            type="button"
            role="tab"
            aria-selected={activeTab === cls}
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
        {/* Ders Seçimi */}
        <div className="subject-tabs" role="tablist" aria-label="Ders seçimi">
          {SUBJECTS.map((sub) => (
            <button
              key={sub}
              type="button"
              role="tab"
              aria-selected={activeSubject === sub}
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

        {/* Üniteler Akordeon Listesi */}
        <div className="curriculum-list">
          {currentData.length > 0 ? (
            currentData.map((unit) => {
              const isOpen = expandedUnit === unit.id;
              const panelId = `unit-panel-${activeTab}-${activeSubject}-${unit.id}`;
              const buttonId = `unit-button-${activeTab}-${activeSubject}-${unit.id}`;

              return (
                <div key={unit.id} className={`unit-card ${isOpen ? 'expanded' : ''}`}>
                  <div className="unit-header">
                    <button
                      type="button"
                      id={buttonId}
                      className="unit-toggle"
                      onClick={() => toggleUnit(unit.id)}
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

                    <div className="unit-actions">
                      {unit.pdfLink !== '#' ? (
                        <a
                          href={unit.pdfLink}
                          className="action-btn download-btn"
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${unit.title} konu anlatımı PDF indir (yeni sekmede açılır)`}
                        >
                          <Download size={16} aria-hidden="true" /> PDF İndir
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="action-btn download-btn is-pending"
                          onClick={() => setToast(`"${unit.title}" PDF'i hazırlanıyor, çok yakında eklenecek.`)}
                        >
                          <Clock size={16} aria-hidden="true" /> Yakında
                        </button>
                      )}
                    </div>
                  </div>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="unit-body-wrap"
                  >
                    <div className="unit-body">
                      <p className="unit-summary">{unit.summary}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="pdf-list-empty">
              <p>Bu bölüme yakında ders materyalleri eklenecektir.</p>
            </div>
          )}
        </div>
      </div>

      <Toast message={toast} onDismiss={dismissToast} />
    </section>
  );
};

export default Classes;
