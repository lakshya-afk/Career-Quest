import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import AIChatbot from './components/AIChatbot';
import ParamedicSimulation from './components/ParamedicSimulation';
import './App.css';

function App() {
  const backgroundRef = useRef();
  const [activeSimulation, setActiveSimulation] = useState(null);

  const openSimulation = (careerType) => {
    setActiveSimulation(careerType);
  };

  const closeSimulation = () => {
    setActiveSimulation(null);
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    const currentRef = backgroundRef.current;
    currentRef?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x4f46e5, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true }),
    ];

    const cubes = [];
    for (let i = 0; i < 20; i++) {
      const cube = new THREE.Mesh(geometry, materials[i % materials.length]);
      cube.position.x = (Math.random() - 0.5) * 20;
      cube.position.y = (Math.random() - 0.5) * 20;
      cube.position.z = (Math.random() - 0.5) * 20;
      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;
      scene.add(cube);
      cubes.push(cube);
    }

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.005 + index * 0.001;
        cube.rotation.y += 0.005 + index * 0.001;
        cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentRef && renderer.domElement) {
        currentRef.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const careers = [
    {
      title: "Paramedic",
      description: "Emergency response protocols, patient assessment, and life-saving decision making",
      icon: "🚑",
      tasks: ["Triage patients", "Administer first aid", "Emergency protocols"],
      duration: "3-4 minutes",
      difficulty: "Intermediate"
    },
    {
      title: "Product Designer",
      description: "Wireframing, user research, and design thinking processes",
      icon: "🎨",
      tasks: ["Create wireframes", "User journey mapping", "Design critique"],
      duration: "4-5 minutes",
      difficulty: "Beginner"
    },
    {
      title: "Retail Manager",
      description: "Store operations, inventory management, and customer service",
      icon: "🏪",
      tasks: ["Planogram setup", "Inventory tracking", "Team coordination"],
      duration: "3-4 minutes",
      difficulty: "Beginner"
    },
    {
      title: "Lab Technician",
      description: "Laboratory safety protocols, sample analysis, and quality control",
      icon: "🔬",
      tasks: ["Safety procedures", "Sample testing", "Equipment calibration"],
      duration: "4-5 minutes",
      difficulty: "Intermediate"
    },
    {
      title: "Chef",
      description: "Kitchen management, food preparation, and culinary techniques",
      icon: "👨‍🍳",
      tasks: ["Menu planning", "Food safety", "Kitchen workflow"],
      duration: "3-4 minutes",
      difficulty: "Beginner"
    },
    {
      title: "Software Developer",
      description: "Code debugging, system architecture, and problem-solving",
      icon: "💻",
      tasks: ["Debug code", "Design patterns", "Code review"],
      duration: "5-6 minutes",
      difficulty: "Advanced"
    }
  ];

  return (
    <div className="App">
      <div ref={backgroundRef} className="three-background"></div>
      
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            3D Micro-Simulators
            <span className="subtitle">Career Micro-Experiences</span>
          </h1>
          <p className="hero-description">
            Experience real career tasks through interactive 3D simulations. 
            Make decisions, get feedback, and explore different professions 
            in just 2-5 minutes per experience.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">6+</span>
              <span className="stat-label">Career Paths</span>
            </div>
            <div className="stat">
              <span className="stat-number">2-5min</span>
              <span className="stat-label">Per Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">WebGL</span>
              <span className="stat-label">Browser-Based</span>
            </div>
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <h2>Why Choose 3D Micro-Simulators?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick & Focused</h3>
              <p>Each simulation takes only 2-5 minutes, perfect for exploring multiple careers efficiently.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Real-World Tasks</h3>
              <p>Experience authentic day-in-the-life scenarios with meaningful decision points.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Any Device</h3>
              <p>Runs on normal laptops and browsers - no special hardware required.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Performance Feedback</h3>
              <p>Get instant scoring and exportable resume snippets to showcase your skills.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="careers-section">
        <div className="container">
          <h2>Explore Career Simulations</h2>
          <div className="careers-grid">
            {careers.map((career, index) => (
              <div key={index} className="career-card">
                <div className="career-icon">{career.icon}</div>
                <h3>{career.title}</h3>
                <p>{career.description}</p>
                <div className="career-tasks">
                  <h4>Key Tasks:</h4>
                  <ul>
                    {career.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </div>
                <div className="career-meta">
                  <span className="duration">⏱️ {career.duration}</span>
                  <span className={`difficulty ${career.difficulty.toLowerCase()}`}>
                    {career.difficulty}
                  </span>
                </div>
                <button 
                  className="start-simulation-btn"
                  onClick={() => openSimulation(career.title.toLowerCase())}
                >
                  Start Simulation
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Explore Your Future Career?</h2>
          <p>Start with any simulation and discover which career path excites you most.</p>
          <button className="cta-button">Begin Your Journey</button>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 3D Micro-Simulators. Empowering career exploration through immersive technology.</p>
        </div>
      </footer>

      <AIChatbot />

      {/* Simulation Modals */}
      <ParamedicSimulation 
        isOpen={activeSimulation === 'paramedic'} 
        onClose={closeSimulation} 
      />
    </div>
  );
}

export default App;
