import React from 'react';

const InfoPanel = ({ person }) => {
  return (
    <div className="info-panel">
      <div className="info-header">
        <span className="info-tag">{person.tag}</span>
        <h2 className="info-name">{person.name}</h2>
        <p className="info-title">{person.title}</p>
        <p className="info-role">Current role: <strong>{person.role}</strong></p>
      </div>

      <div className="info-body">
        <div className="info-section">
          <h3>Personal Story</h3>
          <p>{person.story}</p>
        </div>

        <div className="info-section">
          <h3>Design Philosophy</h3>
          <blockquote className="info-quote">
            “{person.philosophy}”
          </blockquote>
        </div>

        <div className="info-section">
          <h3>Why They Inspire</h3>
          <p>{person.inspiration}</p>
        </div>

        <div className="info-grid">
          <div className="info-sub-section">
            <h3>Expertise & Skills</h3>
            <div className="info-tags">
              {person.expertise.map((exp, index) => (
                <span key={index} className="info-pill">{exp}</span>
              ))}
            </div>
          </div>

          <div className="info-sub-section">
            <h3>Disciplines & Stack</h3>
            <div className="info-tags info-tags-accent">
              {person.disciplines.map((disc, index) => (
                <span key={index} className="info-pill">{disc}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="info-section info-achievements-container">
          <h3>Notable Projects & Achievements</h3>
          <ul className="info-achievements-list">
            {person.achievements.map((ach, index) => (
              <li key={index}>{ach}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="info-footer">
        <a 
          href={person.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="info-portfolio-link"
        >
          Explore {person.site} →
        </a>
      </div>
    </div>
  );
};

export default InfoPanel;
