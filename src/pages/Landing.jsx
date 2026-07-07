import React from 'react';
import { featuredPeople } from '../logic/featuredPeople';
import PortfolioSection from '../components/PortfolioSection';
import '../assets/portfolio-exhibition.css';

function Landing() {
  const handleScrollToStart = () => {
    const firstSec = document.querySelector('.exhibition-section');
    if (firstSec) {
      firstSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-exhibition">
      {/* Immersive Digital Museum Hero */}
      <header className="exhibition-hero">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        
        <span className="exhibition-eyebrow">Interactive Exhibition</span>
        <h1>Curated Digital Museum of Exceptional Portfolios</h1>
        <p className="exhibition-sub">
          Explore seven legendary web designers and creative developers who treat their own personal websites as the ultimate canvas of self-expression. 
        </p>

        <button onClick={handleScrollToStart} className="exhibition-scroll-btn">
          Enter Exhibition
          <span className="scroll-arrow-anim">↓</span>
        </button>
      </header>

      {/* Main Exhibition Sections */}
      <main>
        {featuredPeople.map((person) => (
          <PortfolioSection key={person.id} person={person} />
        ))}
      </main>

      {/* Premium Exhibition Footer */}
      <footer className="exhibition-footer">
        <p>Built with admiration for the open web and creative front-end craft.</p>
        <p className="footer-sub">CEF643B7 · ADMISSION GRANTED</p>
      </footer>
    </div>
  );
}

export default Landing;
