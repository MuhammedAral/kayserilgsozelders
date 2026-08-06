import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Classes from './components/Classes';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
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
