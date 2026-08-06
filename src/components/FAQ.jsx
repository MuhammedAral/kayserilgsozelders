import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Özel dersler nerede yapılıyor?',
      answer: 'Derslerimiz öğrencinin kendi evinde veya belirlenen uygun bir çalışma ortamında (kütüphane, eğitim ofisi) yapılabilmektedir.'
    },
    {
      question: 'Ders süreleri ve programı nasıl ayarlanıyor?',
      answer: 'Her bir ders 1 saat olarak planlanmaktadır. Program, öğrencinin okul saatlerine ve seviyesine göre tamamen kişiye özel olarak ayarlanır.'
    },
    {
      question: 'Maarif eğitim modelinin normal eğitimden farkı nedir?',
      answer: 'Maarif modeli; öğrenciyi sadece akademik olarak değil, ahlaki, kültürel ve sosyal yönlerden de geliştirmeyi hedefleyen bütüncül bir eğitim yaklaşımıdır.'
    },
    {
      question: 'Grup dersleriniz var mı?',
      answer: 'Önceliğimiz birebir (özel) derslerdir; ancak talep doğrultusunda 2-3 kişilik seviye grupları da oluşturulabilmektedir.'
    }
  ];

  return (
    <section id="faq" className="container">
      <h2 className="section-title">Sıkça Sorulan Sorular</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item reveal ${activeIndex === index ? 'active' : ''}`}
          >
            <button 
              className="faq-question"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              {faq.question}
              <ChevronDown 
                size={20} 
                style={{ 
                  transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease'
                }} 
              />
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
