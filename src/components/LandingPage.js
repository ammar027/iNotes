import React, { useState, useEffect } from 'react';
import '../css/LandingPage.css'; // Custom styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faSync, faShareAlt } from "@fortawesome/free-solid-svg-icons";

// Import images
import heroImage1 from '../assets/SmilingManwithLaptop.png';
import heroImage2 from '../assets/Casuallifemanwithtablet.png';

const messages = [
  'Ready to Take Control of Your Notes?',
  'Organize your ideas with ease',
  'Your notes, wherever you go'
];

const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150); // Adjust speed dynamically

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const scrollListener = window.addEventListener('scroll', handleScroll);
    const mouseMoveListener = window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('mousemove', mouseMoveListener);
    };
  }, []);

  useEffect(() => {
    let typingTimer;

    const handleTyping = () => {
      const currentFullMessage = messages[messageIndex];
      if (isDeleting) {
        setCurrentMessage(prev => prev.slice(0, -1));
        setTypingSpeed(prev => (prev < 100 ? 50 : prev - 10));
      } else {
        setCurrentMessage(prev => currentFullMessage.slice(0, prev.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentMessage === currentFullMessage) {
        setTimeout(() => setIsDeleting(true), 2000); // Delay before starting to delete
      } else if (isDeleting && currentMessage === '') {
        setIsDeleting(false);
        setMessageIndex(prev => (prev + 1) % messages.length); // Loop through messages
        setTypingSpeed(500); // Pause before typing starts again
      }
    };

    typingTimer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [currentMessage, isDeleting, messageIndex]);

  return (
    <div className="landing-page">
      <header className="header" style={{ transform: `translateY(${scrollPosition * 0.5}px)` }}>
        <div className="header-content">
          <div className="text-block">
            <h1 className="title">
              {currentMessage}<span className="blinking-cursor">|</span>
            </h1>
            <p className="description">Organize your thoughts and ideas with iNotes, built for flexibility and ease.</p>
            <a href="/signup" className="cta-button">Get Started Now</a>
          </div>
          <div className="image-block">
            <img src={heroImage1} style={{ transform: `translateX(${mousePosition.x * -0.03}px)`} } alt="Smiling Man with Laptop" className="hero-image hero-image-1" />
          </div>
        </div>
      </header>

      <section className="content" id="explore" >
        <div className="image-block">
          <img src={heroImage2} alt="Young Man with Tablet" className="hero-image hero-image-2" />
        </div>
        <div className="explore-text">
          <h2>Explore iNotes</h2>
          <p>iNotes offers a comprehensive set of tools to help you manage and organize your notes seamlessly. With features like cross-device synchronization, real-time collaboration, and flexible note organization, iNotes ensures that your thoughts are always at your fingertips.</p>
          <p>Whether you're at work, on the go, or relaxing at home, iNotes is your personal note-keeping assistant. Join thousands of users who are streamlining their productivity with iNotes today.</p>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose iNotes?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="icon"><FontAwesomeIcon icon={faRocket} /></div>
            <h3>Fast and Reliable</h3>
            <p>Experience lightning-fast performance and reliability with iNotes, ensuring you can access your notes whenever you need them.</p>
          </div>
          <div className="feature-item">
            <div className="icon"><FontAwesomeIcon icon={faSync} /></div>
            <h3>Seamless Synchronization</h3>
            <p>Keep your notes synchronized across all your devices effortlessly. Changes made on one device reflect instantly on others.</p>
          </div>
          <div className="feature-item">
            <div className="icon"><FontAwesomeIcon icon={faShareAlt} /></div>
            <h3>Easy Sharing</h3>
            <p>Share your notes with colleagues and friends with a single click. Collaborate in real-time and stay connected.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 iNotes. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
