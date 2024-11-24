"use client"
import React from 'react'

const Footer = () => {
  return (
    <>
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-normal">Design</h1>
            <p className="text-sm md:text-base mt-2">
              Developed By <span className="font-bold tracking-[0.5rem] ml-2">INAM</span>
            </p>
          </div>
          <div className="text-sm md:text-base tracking-[0.4rem] md:tracking-[0.6rem]">
            <p>Copyright &copy; 2023</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer
