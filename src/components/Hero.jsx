import { useState, useEffect } from "react";
import styles from "../styles/Hero.module.css";
import profilePic from "../assets/profile-pic.jpeg";
import portfolioData from "../assets/portfolio.json";

function Hero() {
  const [title, setTitle] = useState("");
  const profiles = portfolioData.profiles;
  useEffect(() => {
    fetch(new URL("../assets/portfolio.json", import.meta.url))
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTitle(data.portfolio.title);
      });
  }, []);

  return (
     <section className={styles.hero}>
      {/* Text Content */}
      <div className={styles.heroContent}>
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.subtitle}>
          Software Engineer focused on enterprise systems, cloud integration,
          automation, and scalable web applications.
        </p>

        <div className={styles.cta}>
          <a href="#projects" className={styles.primaryBtn}>
            View Projects
          </a>
          <a href="#contact" className={styles.secondaryBtn}>
            Contact Me
          </a>
        </div>

        {/* Social links - LinkedIn and GitHub artifacts */}
        <div className={styles.socialLinks}>
          <a 
            href={profiles.networkLinkedIn.url} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className={styles.socialLink}
          >
            LinkedIn
          </a>
          <a 
            href={profiles.networkGitHub.url} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className={styles.socialLink}
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Profile Image */}
      <figure className={styles.aboutImageWrapper}>
        <img
          src={profilePic}
          alt="Portrait of Cesar Estevez"
          className={styles.aboutProfileImg}
        />
      </figure>
    </section>
  );
}

export default Hero;