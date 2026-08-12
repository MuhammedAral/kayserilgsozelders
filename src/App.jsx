import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Classes from './components/Classes';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import useScrollReveal from './hooks/useScrollReveal';
import './App.css';

function App() {
  useScrollReveal();

  return (
    <>
      <a href="#main" className="skip-link">
        İçeriğe geç
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Classes />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

export default App;
