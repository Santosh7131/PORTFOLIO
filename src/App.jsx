import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-scroll';
import { useForm } from 'react-hook-form';
import './App.css';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.5rem;
  background: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  z-index: 100;
  transition: all 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
`;

const StyledLink = styled(Link)`
  position: relative;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--accent);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const Section = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  scroll-margin-top: 100px;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid var(--accent);
  color: var(--accent);
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: var(--accent);
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition: all 0.5s ease;
    z-index: -1;
  }
  
  &:hover {
    color: var(--bg-primary);
    &:before {
      width: 200%;
      height: 200%;
    }
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 1400px;
  padding: 2rem;
`;

const ProjectCard = styled.div`
  background: rgba(31, 31, 31, 0.6);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transform: translateY(0);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.7);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
  background: rgba(31, 31, 31, 0.6);
  padding: 3rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
`;

const projects = [
  {
    title: "SRM Lift Optimization",
    description: "This project optimizes lift allocation in buildings by using a zone-based, greedy algorithm that assigns passengers to three lifts based on their destination floors and lift capacities. The system manages a single queue efficiently, ensuring constant travel time between floors while prioritizing passengers who have been waiting the longest.",
    tech: ["React", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    title: "Sentiment Analysis",
    description: "This sentiment analysis app demonstrates DAA concepts using a hash table for fast word counting, quicksort for keyword ranking, and a weighted scoring algorithm for sentiment calculation. Efficient and real-world ready, it showcases core algorithmic techniques.",
    tech: ["TypeScript", "React", "Algorithms"],
    link: "https://sentiment-analysis-ten-iota.vercel.app"
  },
  {
    title: "Random DSA Problems",
    description: "This repository is dedicated to solving a variety of random Design and Analysis of Algorithms (DAA) problems that I encounter. It serves as a collection of solutions and approaches for classic and challenging DSA questions, helping me strengthen my problem-solving and algorithmic skills.",
    tech: ["C", "Algorithms", "DAA"],
    link: "https://github.com/Santosh7131/DAA-C"
  }
];

const technologies = [
  "JavaScript",
  "HTML",
  "CSS",
  "Python",
  "React",
  "Node.js"
];

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="section-container">
      <Nav className={scrolled ? 'nav-scrolled' : ''}>
        <NavLinks>
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <StyledLink
              key={section}
              to={section}
              spy={true}
              smooth={true}
              duration={1000}
              offset={-80}
              ignoreCancelEvents={true}
              className="nav-link"
            >
              {section}
            </StyledLink>
          ))}
        </NavLinks>
      </Nav>

      <Section id="home" className="hero">
        <div className="hero-content">
          <span className="greeting">Hello, I'm</span>
          <h1>Santosh Kumaar</h1>
          <h2>Web Developer</h2>
          <p className="hero-description">
            Turning data into meaningful insights and impactful web experiences.
          </p>
          <Link to="projects" smooth={true} offset={-100} duration={500}>
            <Button>View My Work</Button>
          </Link>
        </div>
      </Section>

      <Section id="about">
        <div className="about-grid">
          <div className="profile-image">
            <img src="https://via.placeholder.com/400" alt="Profile" />
          </div>
          <div className="profile-content">
            <h2>About Me</h2>
            <p>
              I'm a passionate developer with a keen eye for creating beautiful,
              functional, and user-centered digital experiences. With a background
              in both design and development, I bring a unique perspective to every
              project.
            </p>
            <div className="tech-stack">
              <h3>Technologies I work with:</h3>
              <ul className="tech-list">
                {technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects">
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              className="project-card"
            >
              <span className="project-number">0{index + 1}</span>
              <h3>{project.title}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{project.description}</p>
              <div className="tech-stack">
                {project.tech.map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
              {project.link && project.link !== "#" && (
                <div style={{ marginTop: '1.5rem' }}>
                  <Button as="a" href={project.link} target="_blank" rel="noopener noreferrer">View Project</Button>
                </div>
              )}
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Section>

      <Section id="contact">
        <div className="coding-links">
          <h2>My Coding Profiles</h2>
          <div className="coding-links-table">
            <div className="coding-links-row">
              <div className="coding-links-cell coding-links-label">LeetCode</div>
              <div className="coding-links-cell"><a href="https://leetcode.com/u/SANDY_7131/" target="_blank" rel="noopener noreferrer">leetcode.com/u/SANDY_7131/</a></div>
            </div>
            <div className="coding-links-row">
              <div className="coding-links-cell coding-links-label">HackerRank</div>
              <div className="coding-links-cell"><a href="https://www.hackerrank.com/profile/sk5160" target="_blank" rel="noopener noreferrer">hackerrank.com/profile/sk5160</a></div>
            </div>
            <div className="coding-links-row">
              <div className="coding-links-cell coding-links-label">GitHub</div>
              <div className="coding-links-cell"><a href="https://github.com/Santosh7131" target="_blank" rel="noopener noreferrer">github.com/Santosh7131</a></div>
            </div>
            <div className="coding-links-row">
              <div className="coding-links-cell coding-links-label">DSA</div>
              <div className="coding-links-cell"><a href="https://github.com/Santosh7131/DAA-C" target="_blank" rel="noopener noreferrer">github.com/Santosh7131/DAA-C</a></div>
            </div>
          </div>
        </div>
      </Section>

      <footer>
        <p className="footer-text">Built with React & Emotion</p>
      </footer>
    </div>
  );
}
