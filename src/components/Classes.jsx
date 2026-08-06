import { useState } from 'react';

const Classes = () => {
  const [activeTab, setActiveTab] = useState('LGS');

  const classes = ['LGS', '7. Sınıf', '6. Sınıf', '5. Sınıf'];

  return (
    <section id="classes" className="container">
      <h2 className="section-title">Dersler & Kaynaklar</h2>
      
      <div className="classes-tabs reveal">
        {classes.map((cls) => (
          <button
            key={cls}
            className={`tab-btn ${activeTab === cls ? 'active' : ''}`}
            onClick={() => setActiveTab(cls)}
          >
            {cls}
          </button>
        ))}
      </div>

      <div className="tab-content glass reveal">
        <div className="pdf-list-empty">
          <p>Bu bölüme yakında ders materyalleri eklenecektir.</p>
        </div>
      </div>
    </section>
  );
};

export default Classes;
