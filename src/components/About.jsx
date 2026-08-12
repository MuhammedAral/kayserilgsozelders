import { GraduationCap, Target, BookOpenCheck, MapPin } from 'lucide-react';
import { TEACHER_NAME, TEACHER_TITLE, SERVICE_AREAS_TEXT } from '../data/site';

const CREDENTIALS = [
  {
    Icon: GraduationCap,
    title: 'Erciyes Üniversitesi mezunu',
    text: 'Fen Bilgisi Öğretmenliği lisans eğitimi ve 10 yıllık aktif öğretmenlik tecrübesi.',
  },
  {
    Icon: BookOpenCheck,
    title: 'Maarif modeline uygun program',
    text: 'Dersler güncel MEB müfredatı ve Maarif modeli kazanımları üzerine kurgulanır; okuldaki konuyla birebir ilerler.',
  },
  {
    Icon: Target,
    title: 'Yeni nesil soru odaklı',
    text: 'Ezber yerine okuduğunu anlama, veri yorumlama ve analitik düşünme; LGS’nin son yıllardaki soru tipine göre çalışma.',
  },
  {
    Icon: MapPin,
    title: 'Öğrencinin kendi ortamında',
    text: `Dersler öğrencinin evinde veya belirlenen uygun bir çalışma ortamında yapılır. ${SERVICE_AREAS_TEXT}.`,
  },
];

const About = () => {
  return (
    <section id="about" className="container">
      <h2 className="section-title">Hakkımda</h2>

      <div className="about-layout">
        <div className="about-intro reveal">
          <div className="about-portrait">
            <picture>
              <source type="image/webp" srcSet="/saim-avatar-120.webp 1x, /saim-avatar-240.webp 2x" />
              <img
                src="/saim-avatar-240.jpg"
                width="140"
                height="140"
                alt={`${TEACHER_NAME}, Kayseri'de LGS ve ortaokul Fen Bilgisi özel ders öğretmeni`}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
          <h3 className="about-name">{TEACHER_NAME}</h3>
          <p className="about-role">{TEACHER_TITLE}</p>
          <p className="about-text">
            2016’dan bu yana ortaokul öğrencileriyle çalışıyorum. Bu süre boyunca gördüğüm en
            belirleyici şey şu: LGS’de netleri belirleyen, öğrencinin ne kadar çok soru çözdüğü
            değil, konuyu <strong>nereden yakaladığı</strong>. Bu yüzden her öğrenciyle önce bir
            seviye tespiti yapıyor, eksiğin başladığı sınıf seviyesine kadar geri gidip oradan
            ilerliyorum.
          </p>
          <p className="about-text">
            Derslerimiz birebir yürür; program öğrencinin okul saatlerine ve temposuna göre
            kurulur. Her ünitenin sonunda kazanım kontrolü, düzenli aralıklarla da deneme analizi
            yapılır — böylece veli de öğrenci de sürecin neresinde olduğunu rakamla görür.
          </p>
        </div>

        <ul className="about-credentials">
          {CREDENTIALS.map(({ Icon, title, text }) => (
            <li key={title} className="credential-card glass reveal">
              <span className="credential-icon">
                <Icon size={24} color="var(--primary-color)" aria-hidden="true" />
              </span>
              <div>
                <h3 className="credential-title">{title}</h3>
                <p className="credential-text">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
