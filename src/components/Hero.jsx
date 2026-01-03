import { useState, useEffect } from "react";
import styles from "../styles/Hero.module.css";

function Hero() {
    const [title, setTitle] = useState ("");
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
            <h1 className={styles.title}>{title}</h1>
        </section>
    );
}

export default Hero;