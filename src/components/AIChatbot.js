import React, { useState, useRef, useEffect } from 'react';
import './AIChatbot.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI Career Mentor. I'm here to help you explore careers, understand our simulations, and guide your professional journey. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mentorResponses = {
    greeting: [
      "Hello! I'm excited to help you explore your career path. What interests you most?",
      "Hi there! Ready to discover some amazing career opportunities? Let's chat!",
      "Welcome! I'm here to be your career guide. What would you like to know?"
    ],
    paramedic: [
      "Paramedics are healthcare heroes! They provide emergency medical care, make split-second decisions, and save lives. The simulation teaches you triage, emergency protocols, and patient assessment. Would you like to know about the educational requirements?",
      "Being a paramedic requires quick thinking and compassion. You'll learn emergency response, medical procedures, and how to work under pressure. The field offers great job security and the satisfaction of helping others."
    ],
    designer: [
      "Product design is perfect for creative problem-solvers! You'll learn user research, wireframing, and design thinking. Our simulation covers the design process from concept to prototype. Are you interested in UX or visual design specifically?",
      "Designers shape how people interact with products and services. You'll develop skills in creativity, empathy, and technical tools. The career offers flexibility and the chance to impact millions of users."
    ],
    retail: [
      "Retail management teaches valuable leadership and business skills! You'll learn inventory management, team coordination, and customer service. Our simulation covers planograms, staff scheduling, and sales strategies.",
      "Retail managers are business leaders who drive sales and manage teams. You'll develop skills in operations, people management, and financial analysis. It's a great pathway to executive roles."
    ],
    lab: [
      "Lab technicians are essential to healthcare and research! You'll learn safety protocols, equipment operation, and quality control. Our simulation teaches proper procedures and attention to detail.",
      "Working in a lab means contributing to scientific discoveries and patient care. You'll develop analytical skills, precision, and technical expertise. The field offers opportunities in healthcare, research, and industry."
    ],
    chef: [
      "Culinary arts combine creativity with technical skill! You'll learn menu planning, food safety, and kitchen management. Our simulation covers workflow optimization and team coordination.",
      "Chefs are artists and business managers rolled into one. You'll develop creativity, leadership, and business skills. The field offers opportunities from restaurants to food media and entrepreneurship."
    ],
    developer: [
      "Software development is perfect for logical thinkers and problem-solvers! You'll learn programming, system design, and debugging. Our simulation covers real-world coding challenges and best practices.",
      "Developers build the digital world around us. You'll develop logical thinking, continuous learning habits, and technical skills. The field offers excellent salary potential and remote work opportunities."
    ],
    simulation: [
      "Our 3D simulations are designed to give you authentic career experiences in just 2-5 minutes! Each one includes real tasks, decision points, and performance feedback.",
      "The simulations use WebGL technology to run in any browser. You'll get hands-on experience with career-specific tasks and receive a performance score you can share with employers.",
      "Each simulation is carefully designed with industry professionals to ensure authenticity. You'll experience real challenges and see if a career truly fits your interests and skills."
    ],
    education: [
      "Great question about education! Each career has different requirements. Some need degrees, others value certifications or hands-on experience. I can provide specific guidance based on the career you're interested in.",
      "Education paths vary widely! Some careers like software development welcome self-taught professionals, while others like paramedics require specific certifications. What career are you considering?"
    ],
    salary: [
      "Salary ranges vary by location, experience, and specialization. I can provide general ranges, but remember that passion and fit are just as important as compensation. Which career's earning potential interests you?",
      "Compensation is important, but also consider job satisfaction, work-life balance, and growth opportunities. Each of our featured careers offers different financial and personal rewards."
    ],
    help: [
      "I'm here to help with career guidance, simulation questions, and professional advice! You can ask me about:\n\n• Specific careers and their requirements\n• How our simulations work\n• Education and training paths\n• Job market insights\n• Skills development\n\nWhat would you like to explore?"
    ],
    default: [
      "That's an interesting question! While I focus on career guidance and our simulations, I'm always learning. Could you tell me more about what specific career information you're looking for?",
      "I'd love to help you with that! My expertise is in career guidance and our 3D simulations. Is there a particular profession or career question I can assist you with?",
      "Thanks for asking! I specialize in career mentorship and simulation guidance. What career path are you most curious about?"
    ]
  };

  const getAIResponse = (message) => {
    const text = message.toLowerCase();
    
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return mentorResponses.greeting[Math.floor(Math.random() * mentorResponses.greeting.length)];
    }
    
    if (text.includes('paramedic') || text.includes('emergency') || text.includes('medical')) {
      return mentorResponses.paramedic[Math.floor(Math.random() * mentorResponses.paramedic.length)];
    }
    
    if (text.includes('design') || text.includes('ux') || text.includes('ui') || text.includes('wireframe')) {
      return mentorResponses.designer[Math.floor(Math.random() * mentorResponses.designer.length)];
    }
    
    if (text.includes('retail') || text.includes('manager') || text.includes('store')) {
      return mentorResponses.retail[Math.floor(Math.random() * mentorResponses.retail.length)];
    }
    
    if (text.includes('lab') || text.includes('technician') || text.includes('science') || text.includes('research')) {
      return mentorResponses.lab[Math.floor(Math.random() * mentorResponses.lab.length)];
    }
    
    if (text.includes('chef') || text.includes('cook') || text.includes('culinary') || text.includes('kitchen')) {
      return mentorResponses.chef[Math.floor(Math.random() * mentorResponses.chef.length)];
    }
    
    if (text.includes('developer') || text.includes('programming') || text.includes('coding') || text.includes('software')) {
      return mentorResponses.developer[Math.floor(Math.random() * mentorResponses.developer.length)];
    }
    
    if (text.includes('simulation') || text.includes('how does') || text.includes('webgl') || text.includes('experience')) {
      return mentorResponses.simulation[Math.floor(Math.random() * mentorResponses.simulation.length)];
    }
    
    if (text.includes('education') || text.includes('degree') || text.includes('school') || text.includes('study')) {
      return mentorResponses.education[Math.floor(Math.random() * mentorResponses.education.length)];
    }
    
    if (text.includes('salary') || text.includes('money') || text.includes('pay') || text.includes('earn')) {
      return mentorResponses.salary[Math.floor(Math.random() * mentorResponses.salary.length)];
    }
    
    if (text.includes('help') || text.includes('what can you') || text.includes('guide')) {
      return mentorResponses.help[0];
    }
    
    return mentorResponses.default[Math.floor(Math.random() * mentorResponses.default.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getAIResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What careers are available?",
    "How do simulations work?",
    "Tell me about paramedic career",
    "What education do I need?",
    "Help me choose a career"
  ];

  return (
    <div className="ai-chatbot">
      <div className={`chat-container ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="mentor-info">
            <div className="mentor-avatar">🤖</div>
            <div className="mentor-details">
              <h4>AI Career Mentor</h4>
              <span className="status">Online</span>
            </div>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.sender === 'bot' && <div className="message-avatar">🤖</div>}
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot typing">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="quick-questions">
            <p>Quick questions to get started:</p>
            <div className="question-buttons">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-question-btn"
                  onClick={() => {
                    setInputValue(question);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chat-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about careers, simulations, or guidance..."
            maxLength={500}
          />
          <button onClick={handleSendMessage} disabled={!inputValue.trim()}>
            ➤
          </button>
        </div>
      </div>

      <button
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '×' : '💬'}
        {!isOpen && <span className="chat-badge">Ask AI Mentor</span>}
      </button>
    </div>
  );
};

export default AIChatbot;
