import React, { useState, useRef, useEffect } from 'react';
import './ParamedicSimulation.css';

const ParamedicSimulation = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180); // 3 minute demo
  const [showAssessment, setShowAssessment] = useState(false);
  const [selectedActions, setSelectedActions] = useState([]);
  const [simulationPhase, setSimulationPhase] = useState('briefing'); // briefing, emergency, assessment
  const [patientVitals, setPatientVitals] = useState({
    heartRate: 95,
    bloodPressure: '120/80',
    respiration: 18,
    temperature: 98.6,
    oxygenSat: 98
  });
  
  const videoRef = useRef();
  const intervalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // Reset simulation state when opened
      setSimulationPhase('briefing');
      setSelectedActions([]);
      setShowAssessment(false);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      
      // Phase transitions based on time
      if (video.currentTime >= 15 && simulationPhase === 'briefing') {
        setSimulationPhase('emergency');
      }
      
      if (video.currentTime >= video.duration - 30 && simulationPhase === 'emergency') {
        setSimulationPhase('assessment');
        setShowAssessment(true);
      }
    };

    const updateDuration = () => {
      // Use actual video duration instead of hardcoded value
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [simulationPhase]);

  useEffect(() => {
    // Simulate changing patient vitals during emergency phase
    if (simulationPhase === 'emergency' && isPlaying) {
      const vitalInterval = setInterval(() => {
        setPatientVitals(prev => ({
          ...prev,
          heartRate: Math.floor(Math.random() * 20) + 110, // 110-130 elevated
          oxygenSat: Math.floor(Math.random() * 5) + 93, // 93-98 variable
        }));
      }, 3000);
      return () => clearInterval(vitalInterval);
    }
  }, [simulationPhase, isPlaying]);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const handleAction = (action) => {
    setSelectedActions(prev => [...prev, action]);
    
    // Show assessment phase after certain actions
    if (selectedActions.length >= 2) {
      setSimulationPhase('assessment');
      setShowAssessment(true);
    }
  };

  const emergencyActions = [
    { id: 'vitals', label: 'Check Vitals', critical: true },
    { id: 'airway', label: 'Secure Airway', critical: true },
    { id: 'oxygen', label: 'Administer O2', critical: false },
    { id: 'iv', label: 'Start IV Line', critical: false },
    { id: 'monitor', label: 'Attach Monitors', critical: true },
    { id: 'transport', label: 'Prepare Transport', critical: false }
  ];

  const getScore = () => {
    const criticalActions = emergencyActions.filter(a => a.critical);
    const completedCritical = selectedActions.filter(id => 
      criticalActions.some(a => a.id === id)
    );
    return Math.round((completedCritical.length / criticalActions.length) * 100);
  };

  if (!isOpen) return null;

  return (
    <div className="simulation-overlay">
      <div className="simulation-container">
        {/* Header with close button and simulation info */}
        <div className="simulation-header">
          <div className="simulation-title">
            <h2>🚑 Paramedic Emergency Response</h2>
            <span className="simulation-status">
              Phase: <strong>{simulationPhase.charAt(0).toUpperCase() + simulationPhase.slice(1)}</strong>
            </span>
          </div>
          <button className="close-simulation" onClick={onClose}>×</button>
        </div>

        <div className="simulation-content">
          {/* Full-screen Video Section */}
          <div className="video-section" onClick={handlePlay}>
            <div className="video-container">
              {/* Simulation Video Display */}
              <div className="simulation-video-wrapper">
                <video
                  ref={videoRef}
                  className="simulation-video"
                  width="100%"
                  height="100%"
                  preload="metadata"
                  muted
                  playsInline
                >
                  {/* UPDATE THIS PATH TO YOUR VIDEO FILE */}
                  <source src="/videos/paramedic-simulation.mp4" type="video/mp4" />
                  <source src="/videos/paramedic-simulation.webm" type="video/webm" />
                  {/* Fallback placeholder */}
                  <div className="video-fallback">
                    <h3>Video not supported</h3>
                    <p>Your browser doesn't support the video element.</p>
                  </div>
                </video>
              </div>

              {/* Assessment overlay only */}
              <div className="video-overlay">
                {showAssessment && (
                  <div className="assessment-overlay">
                    <div className="assessment-results">
                      <h3>📊 Performance Assessment</h3>
                      <div className="score">Score: {getScore()}%</div>
                      <div className="actions-taken">
                        <h4>Actions Completed:</h4>
                        <ul>
                          {selectedActions.map((actionId, index) => {
                            const action = emergencyActions.find(a => a.id === actionId);
                            return (
                              <li key={index} className={action?.critical ? 'critical' : ''}>
                                {action?.label} {action?.critical ? '(Critical)' : ''}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Emergency Actions Panel */}
              {simulationPhase === 'emergency' && (
                <div className="actions-panel">
                  <h3>🔧 Emergency Protocols</h3>
                  <div className="action-buttons">
                    {emergencyActions.map((action) => (
                      <button
                        key={action.id}
                        className={`action-btn ${selectedActions.includes(action.id) ? 'completed' : ''} ${action.critical ? 'critical' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent video click
                          handleAction(action.id);
                        }}
                        disabled={selectedActions.includes(action.id)}
                      >
                        {selectedActions.includes(action.id) ? '✅' : '⚡'} {action.label}
                        {action.critical && <span className="critical-badge">Critical</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParamedicSimulation;