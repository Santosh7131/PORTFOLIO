
import { useState, useEffect } from 'react';
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
    title: "Project One",
    description: "A full-stack web application built with React and Node.js",
    tech: ["React", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    title: "Project Two",
    description: "An e-commerce platform with real-time updates",
    tech: ["Next.js", "Firebase", "Stripe"],
    link: "#"
  },
  {
    title: "Project Three",
    description: "A mobile-first responsive dashboard",
    tech: ["React", "Material-UI", "Chart.js"],
    link: "#"
  }
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0.5,
    });

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
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
              smooth={true}
              spy={true}
              className={activeSection === section ? 'nav-link-active' : ''}
            >
              {section}
            </StyledLink>
          ))}
        </NavLinks>
      </Nav>

      <Section id="home" className="hero">
        <div className="hero-content">
          <span className="greeting">Hello, I'm</span>
          <h1>John Doe</h1>
          <h2>Full-Stack Developer</h2>
          <p className="hero-description">
            I build exceptional digital experiences that live on the internet
          </p>
          <Link to="projects" smooth={true}>
            <Button>View My Work</Button>
          </Link>
        </div>
      </Section>

      <Section id="about">
        <div className="about-grid">
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
                <li>JavaScript (ES6+)</li>
                <li>React</li>
                <li>Node.js</li>
                <li>Python</li>
                <li>TypeScript</li>
                <li>GraphQL</li>
              </ul>
            </div>
          </div>
          <div className="profile-image">
            <img src="https://via.placeholder.com/400" alt="Profile" />
          </div>
        </div>
      </Section>

      <Section id="projects">
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              className="project-card"
              style={{"--card-index": index}}
            >
              <span className="project-number">0{index + 1}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.tech.map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
              <Button as="a" href={project.link}>View Project</Button>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Section>

      <Section id="contact">
        <Form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <h2>Get In Touch</h2>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="form-input"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
          
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="Email"
            className="form-input"
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
          
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Message"
            rows={5}
            className="form-input"
          />
          {errors.message && <span className="error">{errors.message.message}</span>}
          
          <Button type="submit">Send Message</Button>
        </Form>
      </Section>

      <footer>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
        <p className="footer-text">Built with React & Emotion</p>
      </footer>
    </div>
  );
}
