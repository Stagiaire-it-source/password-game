import React, { useState, useEffect, useRef } from 'react';
import InfoPanel from './InfoPanel';
import InteractiveVisual from './InteractiveVisual';

const PortfolioSection = ({ person }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15, // Trigger when 15% of the section is visible
        rootMargin: '0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const sectionStyle = {
    '--section-bg': person.theme.background,
    '--section-text': person.theme.textColor,
    '--section-accent': person.theme.accentColor,
    '--section-font': person.theme.fontFamily,
  };

  return (
    <section 
      ref={sectionRef}
      className={`exhibition-section theme-${person.id} ${isVisible ? 'is-visible' : 'is-hidden'}`}
      style={sectionStyle}
    >
      <div className="section-container">
        <div className="section-info-panel-container">
          <InfoPanel person={person} />
        </div>
        <div className="section-visual-panel-container">
          <InteractiveVisual id={person.id} />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
