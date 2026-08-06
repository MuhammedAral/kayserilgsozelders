import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Classes from './components/Classes';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import useScrollReveal from './hooks/useScrollReveal';
import './App.css';

function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Classes />
        <FAQ />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

export default App;
