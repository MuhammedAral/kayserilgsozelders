import { Star } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      author: 'Ayşe Yılmaz',
      text: 'Saim Hoca ve matematik öğretmenimiz sayesinde kızımın LGS netleri inanılmaz arttı. Emekleri için çok teşekkürler.',
      initial: 'A'
    },
    {
      id: 2,
      author: 'Mehmet Demir',
      text: 'Maarif modeli yaklaşımıyla çocuklara sadece ders değil, çalışma disiplini de kazandırdılar. Kesinlikle tavsiye ederim.',
      initial: 'M'
    },
    {
      id: 3,
      author: 'Zeynep Kaya',
      text: 'Matematik korkusu olan oğlum, dersleri iple çeker oldu. İki hocamız da alanında gerçekten uzmanlar.',
      initial: 'Z'
    }
  ];

  return (
    <section id="reviews" className="container">
      <h2 className="section-title">Veli ve Öğrenci Yorumları</h2>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-card glass">
            <div className="review-stars">
              <Star fill="#fbbf24" size={20} />
              <Star fill="#fbbf24" size={20} />
              <Star fill="#fbbf24" size={20} />
              <Star fill="#fbbf24" size={20} />
              <Star fill="#fbbf24" size={20} />
            </div>
            <p className="review-text">"{review.text}"</p>
            <div className="review-author">
              <div className="author-avatar">{review.initial}</div>
              <div>
                <strong style={{ display: 'block' }}>{review.author}</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Öğrenci Velisi</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
