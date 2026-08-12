import { Star } from 'lucide-react';
import { reviews } from '../data/reviewsData';

const Reviews = () => {
  // Gerçek yorum yoksa bölüm hiç basılmaz. Yorum eklendiğinde kendiliğinden görünür.
  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="container">
      <h2 className="section-title">Veli ve Öğrenci Yorumları</h2>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-card glass reveal">
            <div className="review-stars" role="img" aria-label="5 üzerinden 5 yıldız">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} fill="currentColor" size={20} aria-hidden="true" />
              ))}
            </div>
            <blockquote className="review-text">{review.text}</blockquote>
            <div className="review-author">
              <div className="author-avatar" aria-hidden="true">
                {review.initial}
              </div>
              <div>
                <strong className="review-author-name">{review.author}</strong>
                <span className="review-author-role">{review.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
