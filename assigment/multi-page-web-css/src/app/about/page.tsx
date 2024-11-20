"use client";
import React from "react";
import styles from "./about.module.css";
import Image from "next/image";
const page = () => {
  return (
    <>
      <section className={styles.aboutpage}>
        <div className={styles.aboutTextContainer}>
          <h1 className={styles.aboutTitle}>About</h1>
          <p className={styles.aboutText}>
            Web design is the art and science of creating visually appealing and
            functional websites. It encompasses various elements including
            layout, color theory, typography, and user experience (UX) design.
            Modern web design focuses on creating responsive, accessible, and
            user-friendly interfaces that work seamlessly across all devices.
          </p>
          <p className={styles.aboutText}>
            Key principles of effective web design include: Visual hierarchy
            Color harmony Responsive layouts Intuitive navigation Fast loading
            times Accessibility
          </p>
       
        </div>
        <div className={styles.aboutImage}>
          <Image
            height={500}
            width={500}
            src="https://images.unsplash.com/photo-1651833826115-7530e72ce504?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="design-image"
          />
        </div>
      </section>
    </>
  );
};

export default page;
