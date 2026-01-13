import styles from "../styles/Project.module.css";

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Landing Page",
      description: "A responsive landing page showcasing Colorado's outdoor adventures with mountain landscapes, hiking trails, and wildlife photography. Features embedded YouTube videos and smooth navigation for both laptop and mobile devices.",
      link: "https://github.com/CesarJoel04/Landing-Page"
    },
    {
      id: 2,
      title: "Inventory Management",
      description: "Full-stack CRUD application built with Spring Boot, Spring MVC, MySQL, and Thymeleaf. Implements complete product inventory management with create, read, update, and delete operations.",
      link: "https://github.com/CesarJoel04/Inventory-Management"
    },
    {
      id: 3,
      title: "Moffat Bay Lodge",
      description: "Full-stack web application for a lodge booking system. Built with React frontend and Node.js backend, featuring MySQL database integration. Collaborative team project implementing user reservations and lodge management.",
      link: "https://github.com/CesarJoel04/Moffat-Bay"
    },
    {
      id: 4,
      title: "Authentication System",
      description: "Secure user registration, authentication, and authorization system using Spring Security, Spring Boot, and MySQL. Implements role-based access control, password encryption, and protected routes with Thymeleaf templates.",
      link: "https://github.com/CesarJoel04/Login_Page"
    }
  ];

  return (
    <section className={styles.projects}>
      <h1>Projects</h1>
      <p>Explore my portfolio of web development projects showcasing full-stack capabilities</p>
      
      <section className={styles.projectsContainer}>
        <h2 className={styles.projectsTitle}>Featured Projects</h2>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.projectCard}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                View on GitHub →
              </a>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Projects;
