import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/faqData';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faq" className="container">
      <h2 className="section-title">Sıkça Sorulan Sorular</h2>
      <div className="faq-list reveal">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <div key={faq.question} className={`faq-item ${isOpen ? 'active' : ''}`}>
              <h3 className="faq-heading">
                <button
                  type="button"
                  id={buttonId}
                  className="faq-question"
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={20} className="faq-chevron" aria-hidden="true" />
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-answer-wrap">
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
