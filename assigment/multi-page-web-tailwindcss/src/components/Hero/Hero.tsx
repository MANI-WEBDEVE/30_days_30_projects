import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroChildOne}>
            <img src="https://images.unsplash.com/photo-1731607352247-663df98aa547?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div className={styles.heroChildTwo}>
          <h1 className={styles.heroTitle}>Elevate Your <span>Vision</span></h1>
          <p className={styles.heroText}>
            Transforming ideas into stunning visuals. Our design expertise
            brings your brand to life, captivating audiences and driving
            success.
          </p>
        </div>
        <div className={styles.heroChildThree}>
            Designer and Developer
        </div>
      </div>
    </>
  );
};

export default Hero;
