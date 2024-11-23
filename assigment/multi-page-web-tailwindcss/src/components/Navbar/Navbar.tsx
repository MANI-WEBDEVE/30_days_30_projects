"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import styles from "./Navbar.module.css"
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={toggleMenu}>
          <Link href={"/"}>Desi<span>gn</span></Link>
        </div>
        
        <div className={styles.menuIcon} onClick={toggleMenu}>
          {isMenuOpen ? <RiCloseLine size={30} /> : <RiMenu3Line size={30} />}
        </div>

        <div className={`${styles.navlinksContainer} ${isMenuOpen ? styles.active : ''}`}>
          <ul className={styles.navlinks}>
            <li onClick={toggleMenu}><Link href="/about">About</Link></li>
            <li onClick={toggleMenu}><Link href="/blog">Blog</Link></li>
            <li onClick={toggleMenu}><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
