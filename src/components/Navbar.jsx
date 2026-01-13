import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.title}>
        Cesar Estevez Peralta
      </NavLink>

      <div className={styles.menu}>
        <ul className={styles.menuItems}>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/stockapi">Stock Market</NavLink></li>
          <li><NavLink to="/resume">Resume</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </div>

      {/* Hamburger for mobile */}
      <div
        className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Backdrop overlay */}
      {menuOpen && (
        <div className={styles.backdrop} onClick={closeMenu} />
      )}

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <NavLink onClick={closeMenu} to="/about">About</NavLink>
        <NavLink onClick={closeMenu} to="/projects">Projects</NavLink>
        <NavLink onClick={closeMenu} to="/stockapi">Stock Market</NavLink>
        <NavLink onClick={closeMenu} to="/resume">Resume</NavLink>
        <NavLink onClick={closeMenu} to="/contact">Contact</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
