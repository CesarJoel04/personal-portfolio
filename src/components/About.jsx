import styles from "../styles/About.module.css";
import profilePic from "../assets/profile-pic.jpeg";
import portfolioData from "../assets/portfolio.json";

function About() {
  const technicalSkills = portfolioData.technicalSkills;
  const skills = [
    ...technicalSkills.programmingLanguages,
    ...technicalSkills.frameworksAndLibraries,
    ...technicalSkills.platformsAndTools,
    ...technicalSkills.databases
  ];

   return (
    <section className={styles.aboutSection} id="about">
      <main className={styles.aboutContainer}>

        <figure className={styles.aboutImageWrapper}>
          <img
            src={profilePic}
            alt="Portrait of Cesar Estevez"
            className={styles.aboutProfileImg}
          />
        </figure>

        <article className={styles.aboutContent}>
          <header>
            <h2 className={styles.aboutTitle}>About Me</h2>
            <h4 className={styles.aboutSubtitle}>
              Enterprise-Focused Software Developer
            </h4>
          </header>

          <p className={styles.aboutDescription}>
            I am a software developer with a strong interest in building reliable,
            scalable solutions for enterprise environments. My work focuses on
            developing and supporting systems that prioritize stability,
            performance, and long-term maintainability while aligning with
            business and operational needs.
          </p>

          <section className={styles.aboutSectionBlock}>
            <header>
              <h3 className={styles.sectionTitle}>Personal Life</h3>
            </header>
            <p>
              Outside of work, I enjoy continuous learning and staying curious
              about how technology supports everyday systems. I value structure,
              problem-solving, and personal growth, and I bring that mindset into
              everything I build.
            </p>
          </section>

          <section className={styles.aboutSectionBlock}>
            <header>
              <h3 className={styles.sectionTitle}>College Career</h3>
            </header>
            <p>
              I earned a Bachelor of Science in Software Development, where I
              developed a strong foundation in programming, databases, software
              architecture, and system design. My academic projects emphasized
              full-stack development, APIs, and data-driven applications.
            </p>
          </section>

          <section className={styles.aboutSectionBlock}>
            <header>
              <h3 className={styles.sectionTitle}>Work Career</h3>
            </header>
            <p>
              I have professional experience in enterprise IT and software
              environments, supporting and developing applications used in
              production systems. My work includes collaboration with
              cross-functional teams, system integrations, automation, and
              maintaining solutions that support business-critical operations.
            </p>
          </section>

          <section className={styles.aboutSkills} aria-label="Technical skills">
            <ul className={styles.skillList}>
              {skills.map((skill, index) => (
                <li key={index} className={styles.skillTag}>{skill}</li>
              ))}
            </ul>
          </section>
        </article>
      </main>
    </section>
  );
}

export default About;
