import React from 'react'

import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <>
      <section className={styles.footer}>
        <div className={styles.footerText}>
          <h1>Design</h1>
          <p>Developed By <span>INAM</span></p>
        </div>
        <div className={styles.footerText}>
          <p>Copyright &copy; 2023</p>
        </div>
      </section>
    </>
  )
}

export default Footer
