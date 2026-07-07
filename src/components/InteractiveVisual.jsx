import React, { useState, useEffect, useRef } from 'react';

// --- WIDGET 1: Lynn Fisher (Playful Blobs & Single Div CSS Drawing) ---
const LynnWidget = () => {
  const [borderRadius, setBorderRadius] = useState('60% 40% 30% 70% / 60% 30% 70% 40%');
  const [colorScheme, setColorScheme] = useState(0);

  const colors = [
    { primary: '#e8598a', secondary: '#ffb703', bg: '#ffe9d6' },
    { primary: '#6ec6ca', secondary: '#e8598a', bg: '#e0f7f4' },
    { primary: '#ffb703', secondary: '#6ec6ca', bg: '#fff7f0' }
  ];

  const morphBlob = () => {
    const r1 = Math.floor(Math.random() * 40) + 40;
    const r2 = Math.floor(Math.random() * 40) + 30;
    const r3 = Math.floor(Math.random() * 40) + 30;
    const r4 = Math.floor(Math.random() * 40) + 40;
    const r5 = Math.floor(Math.random() * 40) + 30;
    const r6 = Math.floor(Math.random() * 40) + 40;
    const r7 = Math.floor(Math.random() * 40) + 30;
    const r8 = Math.floor(Math.random() * 40) + 40;
    setBorderRadius(`${r1}% ${100-r1}% ${r2}% ${100-r2}% / ${r3}% ${r4}% ${100-r4}% ${100-r3}%`);
  };

  const nextScheme = () => {
    setColorScheme((prev) => (prev + 1) % colors.length);
  };

  const scheme = colors[colorScheme];

  return (
    <div className="visual-widget widget-lynn" style={{ backgroundColor: scheme.bg }}>
      <p className="widget-instructions">Click the blob to morph / Click scheme to color</p>
      
      <div 
        className="lynn-css-art"
        onClick={morphBlob}
        style={{ 
          borderRadius: borderRadius,
          background: `linear-gradient(135deg, ${scheme.primary}, ${scheme.secondary})`
        }}
      >
        {/* CSS Drawing layers inside a Single-Div Container */}
        <div className="lynn-eye lynn-eye-left"></div>
        <div className="lynn-eye lynn-eye-right"></div>
        <div className="lynn-smile"></div>
      </div>

      <div className="lynn-controls">
        <button onClick={nextScheme} className="lynn-btn" style={{ borderColor: scheme.primary, color: scheme.primary }}>
          Switch Aesthetic
        </button>
      </div>
    </div>
  );
};


// --- WIDGET 2: Josh Comeau (Squishy UI & Web Audio Soundboard) ---
const JoshWidget = () => {
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [frequency, setFrequency] = useState(440);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 150, y: 150 });
  const containerRef = useRef(null);

  // Simple Web Audio bloop generator
  const playBloop = (freq, duration = 0.15) => {
    if (!audioEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context failed", e);
    }
  };

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    setFrequency(val);
    
    // Squish effect based on value
    const squashFactor = 1 + (val - 440) / 1000;
    const stretchFactor = 1 - (val - 440) / 1500;
    setScaleX(squashFactor);
    setScaleY(stretchFactor);

    playBloop(val, 0.08);
  };

  const resetSquish = () => {
    setScaleX(1);
    setScaleY(1);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      className="visual-widget widget-josh"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="josh-custom-cursor"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      <div className="josh-header">
        <label className="josh-toggle">
          <input 
            type="checkbox" 
            checked={audioEnabled}
            onChange={(e) => setAudioEnabled(e.target.checked)} 
          />
          <span>🔊 Enable Interactive Sounds</span>
        </label>
      </div>

      <div className="josh-playground">
        <div 
          className="josh-character"
          onClick={() => {
            playBloop(frequency * 1.5, 0.25);
            setScaleX(1.3);
            setScaleY(0.7);
            setTimeout(resetSquish, 200);
          }}
          style={{ transform: `scale(${scaleX}, ${scaleY})` }}
        >
          <div className="josh-face">
            <div className="josh-eyes">
              <span className="josh-eye"></span>
              <span className="josh-eye"></span>
            </div>
            <div className="josh-mouth"></div>
          </div>
        </div>
      </div>

      <div className="josh-control-group">
        <span className="josh-label">Spring Pitch: {frequency}Hz</span>
        <input 
          type="range" 
          min="200" 
          max="800" 
          value={frequency} 
          onChange={handleSliderChange}
          onMouseUp={resetSquish}
          onTouchEnd={resetSquish}
          className="josh-slider"
        />
      </div>
    </div>
  );
};


// --- WIDGET 3: Brittany Chiang (Monospace Terminal Sandbox) ---
const BrittanyWidget = () => {
  const [activeTab, setActiveTab] = useState('about');
  
  const files = {
    about: [
      "// file: about.js",
      "const developer = {",
      "  name: 'Brittany Chiang',",
      "  role: 'Software Engineer',",
      "  mission: 'Build pixel-perfect, accessible products',",
      "  loves: ['clean markup', 'monospace code', 'subtle glows']",
      "};"
    ],
    skills: [
      "// file: skills.json",
      "{",
      "  \"languages\": [\"JavaScript (ES6+)\", \"TypeScript\", \"HTML/CSS\"],",
      "  \"frameworks\": [\"React\", \"Next.js\", \"Gatsby\", \"Node.js\"],",
      "  \"designTools\": [\"Figma\", \"Illustrator\"]",
      "}"
    ],
    projects: [
      "// file: featured_projects.sql",
      "SELECT name, description, stars FROM github_repos",
      "WHERE owner = 'bchiang7'",
      "ORDER BY stars DESC LIMIT 3;",
      "",
      "-- 1. v4-portfolio (6k+ stars, dark-theme)",
      "-- 2. halcyon-theme (VS Code color theme)",
      "-- 3. spotify-profile (personal dashboard)"
    ]
  };

  return (
    <div className="visual-widget widget-brittany">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="term-dot term-close"></span>
          <span className="term-dot term-minimize"></span>
          <span className="term-dot term-expand"></span>
        </div>
        <div className="terminal-title">brittanychiang.sh - zsh</div>
      </div>
      
      <div className="terminal-tabs">
        {Object.keys(files).map(tab => (
          <button 
            key={tab} 
            className={`terminal-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}.{tab === 'projects' ? 'sql' : tab === 'skills' ? 'json' : 'js'}
          </button>
        ))}
      </div>

      <div className="terminal-body">
        <div className="terminal-lines">
          {files[activeTab].map((line, idx) => (
            <div key={idx} className="terminal-line">
              <span className="line-num">{String(idx + 1).padStart(2, '0')}</span>
              <span className="line-text">{line}</span>
            </div>
          ))}
          <div className="terminal-line active-cursor">
            <span className="line-num">{String(files[activeTab].length + 1).padStart(2, '0')}</span>
            <span className="terminal-cursor">█</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- WIDGET 4: Lee Robinson (Radical Typography & Minimal Reader) ---
const LeeWidget = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [progress, setProgress] = useState(30);

  const posts = [
    { title: 'Designing Developer Tools', readTime: '5 min read', likes: 142 },
    { title: 'Next.js 15: The Complete Guide', readTime: '8 min read', likes: 310 },
    { title: 'The Future of Server Components', readTime: '6 min read', likes: 219 }
  ];

  return (
    <div className={`visual-widget widget-lee ${darkMode ? 'lee-dark' : 'lee-light'}`}>
      <div className="lee-toolbar">
        <button onClick={() => setDarkMode(!darkMode)} className="lee-tool-btn">
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <div className="lee-font-size-controls">
          <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="lee-font-btn">A-</button>
          <span className="lee-font-val">{fontSize}px</span>
          <button onClick={() => setFontSize(Math.min(24, fontSize + 2))} className="lee-font-btn">A+</button>
        </div>
      </div>

      <div className="lee-reading-bar" style={{ width: `${progress}%` }}></div>

      <div className="lee-container" style={{ fontSize: `${fontSize}px` }}>
        <h4 className="lee-widget-heading">Featured Writing</h4>
        <div className="lee-posts">
          {posts.map((post, idx) => (
            <div 
              key={idx} 
              className="lee-post-row" 
              onClick={() => setProgress(Math.min(100, Math.floor(Math.random() * 60) + 40))}
            >
              <span className="lee-post-title">{post.title}</span>
              <div className="lee-post-meta">
                <span>{post.readTime}</span>
                <span className="lee-post-dot">·</span>
                <span>{post.likes} ♥</span>
              </div>
            </div>
          ))}
        </div>
        <p className="lee-footnote">Click any post to simulate reading progress.</p>
      </div>
    </div>
  );
};


// --- WIDGET 5: Daniel Spatzek (Swiss Typographic Grid & Parallax) ---
const DanielWidget = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div 
      className="visual-widget widget-daniel" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="daniel-grid-bg">
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
      </div>

      {/* Layered Typographic Posters with relative translation (Parallax) */}
      <div 
        className="daniel-layer layer-back"
        style={{ transform: `translate(${coords.x * -15}px, ${coords.y * -15}px)` }}
      >
        <span className="daniel-huge-text">SWISS</span>
      </div>

      <div 
        className="daniel-layer layer-mid"
        style={{ transform: `translate(${coords.x * 25}px, ${coords.y * 25}px)` }}
      >
        <span className="daniel-grid-num">05</span>
        <span className="daniel-label-sub">GRID SYSTEM</span>
      </div>

      <div 
        className="daniel-layer layer-front"
        style={{ transform: `translate(${coords.x * 45}px, ${coords.y * 45}px)` }}
      >
        <div className="daniel-bold-bar"></div>
        <span className="daniel-main-title">SPATZEK</span>
      </div>
      
      <p className="widget-instructions font-swiss">Move mouse across grid for dimensional layout shifts</p>
    </div>
  );
};


// --- WIDGET 6: Tobias van Schneider (Artistic Collages & Annotations) ---
const TobiasWidget = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Spotify Brand', color: '#ffcf56', top: '10%', left: '10%', rot: '-6deg', zIndex: 1, type: 'work' },
    { id: 2, title: 'Semplice Builder', color: '#b5461b', top: '25%', left: '45%', rot: '8deg', zIndex: 2, type: 'product' },
    { id: 3, title: 'A Self-Taught Story', color: '#2c2c2c', top: '45%', left: '20%', rot: '-3deg', zIndex: 3, type: 'note' }
  ]);
  
  const [activeDoodle, setActiveDoodle] = useState(false);

  const bringToFront = (id) => {
    setCards(prevCards => {
      const maxZ = Math.max(...prevCards.map(c => c.zIndex));
      return prevCards.map(c => {
        if (c.id === id) {
          return { ...c, zIndex: maxZ + 1 };
        }
        return c;
      });
    });
  };

  return (
    <div className="visual-widget widget-tobias">
      <div className="tobias-toolbar">
        <button 
          onClick={() => setActiveDoodle(!activeDoodle)} 
          className={`tobias-btn ${activeDoodle ? 'active' : ''}`}
        >
          ✏️ {activeDoodle ? 'Hide Annotations' : 'Show Annotations'}
        </button>
      </div>

      <div className="tobias-canvas">
        {cards.map(card => (
          <div 
            key={card.id}
            className="tobias-card-item"
            style={{
              backgroundColor: card.color,
              top: card.top,
              left: card.left,
              transform: `rotate(${card.rot})`,
              zIndex: card.zIndex
            }}
            onClick={() => bringToFront(card.id)}
          >
            <div className="tobias-card-inner">
              <span className="card-cat">{card.type.toUpperCase()}</span>
              <h3>{card.title}</h3>
              <p className="card-click">Click to stack</p>
            </div>
          </div>
        ))}

        {activeDoodle && (
          <svg className="tobias-doodles" viewBox="0 0 400 300">
            <path d="M 60 70 Q 150 20 280 90" fill="none" stroke="#b5461b" strokeWidth="3" strokeDasharray="5" />
            <text x="180" y="45" fill="#b5461b" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              Side Projects!
            </text>
            <circle cx="280" cy="90" r="4" fill="#b5461b" />
          </svg>
        )}
      </div>
    </div>
  );
};


// --- WIDGET 7: Bruno Simon (Playable 2D Toy Car Physics) ---
const BrunoWidget = () => {
  const canvasRef = useRef(null);
  const [controls, setControls] = useState({ up: false, down: false, left: false, right: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set sizing
    canvas.width = 400;
    canvas.height = 300;

    // Simulation variables
    let car = {
      x: 200,
      y: 150,
      angle: 0,
      speed: 0,
      maxSpeed: 4.5,
      acceleration: 0.15,
      friction: 0.05,
      turnSpeed: 0.05
    };

    // Obstacles
    let obstacles = [
      { x: 100, y: 80, r: 24, color: '#ff7cc9', hits: 0 },
      { x: 300, y: 100, r: 18, color: '#7cf7ff', hits: 0 },
      { x: 130, y: 220, r: 20, color: '#ffb703', hits: 0 },
      { x: 280, y: 230, r: 22, color: '#6ec6ca', hits: 0 }
    ];

    // Local copy of controls to access in loop
    const keys = { up: false, down: false, left: false, right: false };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') keys.up = true;
      if (e.key === 'ArrowDown' || e.key === 's') keys.down = true;
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
      // Prevent browser scroll when driving
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') keys.up = false;
      if (e.key === 'ArrowDown' || e.key === 's') keys.down = false;
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId;

    const updatePhysics = () => {
      // Acceleration & Friction
      if (keys.up) {
        car.speed = Math.min(car.maxSpeed, car.speed + car.acceleration);
      } else if (keys.down) {
        car.speed = Math.max(-car.maxSpeed / 2, car.speed - car.acceleration);
      } else {
        if (car.speed > 0) car.speed = Math.max(0, car.speed - car.friction);
        if (car.speed < 0) car.speed = Math.min(0, car.speed + car.friction);
      }

      // Steering
      if (Math.abs(car.speed) > 0.1) {
        const dir = car.speed > 0 ? 1 : -1;
        if (keys.left) car.angle -= car.turnSpeed * dir;
        if (keys.right) car.angle += car.turnSpeed * dir;
      }

      // Update positions
      car.x += Math.cos(car.angle) * car.speed;
      car.y += Math.sin(car.angle) * car.speed;

      // Screen boundary checks
      if (car.x < 15) { car.x = 15; car.speed *= -0.4; }
      if (car.x > canvas.width - 15) { car.x = canvas.width - 15; car.speed *= -0.4; }
      if (car.y < 15) { car.y = 15; car.speed *= -0.4; }
      if (car.y > canvas.height - 15) { car.y = canvas.height - 15; car.speed *= -0.4; }

      // Obstacle collisions
      obstacles.forEach(obs => {
        const dx = car.x - obs.x;
        const dy = car.y - obs.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = obs.r + 12; // 12 is roughly half size of car
        
        if (dist < minDist) {
          // Bounce car back
          car.speed *= -0.5;
          const forceX = (dx / dist) * 2;
          const forceY = (dy / dist) * 2;
          car.x += forceX * 3;
          car.y += forceY * 3;
          
          // Move obstacle slightly on impact
          obs.x -= forceX * 4;
          obs.y -= forceY * 4;
          obs.hits += 1;
        }

        // Keep obstacle inside canvas
        if (obs.x < obs.r) obs.x = obs.r;
        if (obs.x > canvas.width - obs.r) obs.x = canvas.width - obs.r;
        if (obs.y < obs.r) obs.y = obs.r;
        if (obs.y > canvas.height - obs.r) obs.y = canvas.height - obs.r;
      });
    };

    const draw = () => {
      // Clear background
      ctx.fillStyle = '#05060f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid tracks
      ctx.strokeStyle = 'rgba(124, 247, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Obstacles
      obstacles.forEach(obs => {
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.r, 0, Math.PI * 2);
        ctx.fillStyle = obs.color;
        ctx.shadowColor = obs.color;
        ctx.shadowBlur = obs.hits > 0 ? Math.min(20, obs.hits * 3) : 5;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        
        // Draw details inside obstacle
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.r * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw Car
      ctx.save();
      ctx.translate(car.x, car.y);
      ctx.rotate(car.angle);
      
      // Car Body
      ctx.fillStyle = '#ff7cc9';
      ctx.shadowColor = '#ff7cc9';
      ctx.shadowBlur = 10;
      ctx.fillRect(-16, -9, 32, 18);
      ctx.shadowBlur = 0; // reset

      // Wheels
      ctx.fillStyle = '#12163a';
      ctx.fillRect(-12, -11, 8, 2);
      ctx.fillRect(4, -11, 8, 2);
      ctx.fillRect(-12, 9, 8, 2);
      ctx.fillRect(4, 9, 8, 2);

      // Cabin window
      ctx.fillStyle = '#7cf7ff';
      ctx.fillRect(-6, -6, 16, 12);
      ctx.fillStyle = '#05060f';
      ctx.fillRect(-2, -4, 10, 8);

      ctx.restore();
    };

    const loop = () => {
      updatePhysics();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="visual-widget widget-bruno">
      <div className="canvas-header">
        <span className="canvas-badge">Three.js Inspired 2D Sandbox</span>
        <span className="canvas-arrows">Use WASD / Arrow Keys to Drive</span>
      </div>
      <canvas ref={canvasRef} className="bruno-canvas-element" />
    </div>
  );
};


// --- ORCHESTRATOR COMPONENT ---
const InteractiveVisual = ({ id }) => {
  switch (id) {
    case 'lynn':
      return <LynnWidget />;
    case 'josh':
      return <JoshWidget />;
    case 'brittany':
      return <BrittanyWidget />;
    case 'lee':
      return <LeeWidget />;
    case 'daniel':
      return <DanielWidget />;
    case 'tobias':
      return <TobiasWidget />;
    case 'bruno':
      return <BrunoWidget />;
    default:
      return <div className="visual-widget">Visual Demonstration</div>;
  }
};

export default InteractiveVisual;
