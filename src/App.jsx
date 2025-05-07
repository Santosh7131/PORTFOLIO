
import { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-scroll';
import { useForm } from 'react-hook-form';
import './App.css';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem;
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(5px);
  z-index: 100;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  color: #fff;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover { color: #64ffda; transform: scale(1.1); }
  &.nav-link-active { color: #64ffda; }
`;

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: transparent;
  border: 1px solid #64ffda;
  color: #64ffda;
  border-radius: 4px;
  cursor: pointer;
  &:hover { background: rgba(100, 255, 218, 0.1); }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const ProjectCard = styled.div`
  background: #1f1f1f;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
`;

const projects = [
  {
    title: "Project 1",
    description: "A full-stack web application",
    tech: ["React", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    title: "Project 2",
    description: "Mobile-first responsive design",
    tech: ["React", "CSS", "Firebase"],
    link: "#"
  },
  {
    title: "Project 3",
    description: "Real-time data visualization",
    tech: ["D3.js", "React", "WebSocket"],
    link: "#"
  }
];

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [activeSection, setActiveSection] = useState('home');

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
      root: null,
    });

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);
  const onSubmit = (data) => console.log(data);

  return (
    <div className="section-container">
      <Nav>
        <NavLinks>
          <StyledLink 
            to="home" 
            smooth={true} 
            spy={true}
            className={activeSection === 'home' ? 'nav-link-active' : ''}
          >
            Home
          </StyledLink>
          <StyledLink 
            to="about" 
            smooth={true} 
            spy={true}
            className={activeSection === 'about' ? 'nav-link-active' : ''}
          >
            About
          </StyledLink>
          <StyledLink 
            to="projects" 
            smooth={true} 
            spy={true}
            className={activeSection === 'projects' ? 'nav-link-active' : ''}
          >
            Projects
          </StyledLink>
          <StyledLink 
            to="contact" 
            smooth={true} 
            spy={true}
            className={activeSection === 'contact' ? 'nav-link-active' : ''}
          >
            Contact
          </StyledLink>
        </NavLinks>
      </Nav>

      <Section id="home" className="hero">
        <div className="hero-content">
          <h1>John Doe</h1>
          <p>Full-Stack Developer</p>
          <Link to="projects" smooth={true}>
            <Button>View Projects</Button>
          </Link>
        </div>
      </Section>

      <Section id="about" className="about">
        <div className="about-grid">
          <div className="profile-image">
            <img src="https://via.placeholder.com/300" alt="Profile" />
          </div>
          <div className="bio">
            <h2>About Me</h2>
            <p>I'm a passionate developer focused on creating beautiful and functional web applications. With expertise in modern web technologies, I bring ideas to life through clean code and intuitive design.</p>
          </div>
        </div>
      </Section>

      <Section id="projects">
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard key={index}>
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Get In Touch</h2>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
          />
          {errors.name && <span>{errors.name.message}</span>}
          
          <input
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="Email"
          />
          {errors.email && <span>{errors.email.message}</span>}
          
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Message"
            rows={5}
          />
          {errors.message && <span>{errors.message.message}</span>}
          
          <Button type="submit">Send Message</Button>
        </Form>
      </Section>

      <footer>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </footer>
    </div>
  );
}
