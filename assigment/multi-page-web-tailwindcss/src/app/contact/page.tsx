import React from "react";
import styles from "./Contact.module.css";
const page = () => {
  return (
    <>
      <section className={styles.contactpage}>
        <div className={styles.contactHeading}>
          <h1>Contact</h1>
        </div>
        <div className={styles.contactForm}>
          <input type="text"  placeholder="Enter Your Name"/>
          <input type="email"  placeholder="Enter Your Email"/>
          <input type="text" placeholder="Enter Your Message" />
          <div className={styles.contactButton}>
            <button>Submit</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
