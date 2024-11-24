"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="flex justify-between items-center px-10 my-6">
        <div  className="text-4xl font-bold">
          <Link href={"/"}>
            Desi<span>gn</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="block md:hidden cursor-pointer z-50" onClick={toggleMenu}>
          {isMenuOpen ? <RiCloseLine size={30} /> : <RiMenu3Line size={30} />}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex gap-5">
            <li>
              <Link href="/about" className="hover:text-gray-600 transition-colors text-xl font-bold">About</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-gray-600 transition-colors text-xl font-bold">Blog</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-600 transition-colors text-xl font-bold">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <div className="flex flex-col pt-20 px-6">
            <ul className="flex flex-col gap-6">
              <li onClick={toggleMenu}>
                <Link href="/about" className="text-2xl font-bold cursor-pointer hover:text-gray-600 transition-colors ">About</Link>
              </li>
              <li onClick={toggleMenu}>
                <Link href="/blog" className="text-2xl font-bold cursor-pointer hover:text-gray-600 transition-colors ">Blog</Link>
              </li>
              <li onClick={toggleMenu}>
                <Link href="/contact" className="text-2xl font-bold cursor-pointer hover:text-gray-600 transition-colors  " >Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/10 md:hidden -z-[10]"
            onClick={toggleMenu}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;
