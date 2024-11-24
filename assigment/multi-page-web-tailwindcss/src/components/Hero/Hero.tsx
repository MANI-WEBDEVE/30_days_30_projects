import React from "react";

const Hero = () => {
  return (
    <div className="grid  grid-rows-1   justify-center h-screen w-full 
      xl:grid-cols-3
      lg:grid-cols-3 
      md:grid-cols-1 md:h-auto  md:mt-5  md:flex md:justify-center md:items-center
      sm:my-4 sm:mx-2.5 grid-cols-1">
      
      <div className="h-full w-full  md:w-full flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1731607352247-663df98aa547?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D" 
          alt="Hero Image"
          className="md:h-[80%] md:w-[66%] h-[70%] w-[50%]  rounded-[20px] object-cover object-center  "
        />
      </div>
      
      <div className=" w-full flex flex-col mx-auto px-2 text-center gap-2
     
        xl:w-[150%] 
        lg:w-[130%] 
        md:order-1 md:w-full   md:text-center
        sm:p-4">
        <h1 className="text-[4rem] px-2 font-black
          xl:text-[5rem]
          lg:text-[5rem]
          md:text-[5rem] 
          sm:text-[4rem]">
          Elevate Your
          <span className="text-[4rem] font-thin
            xl:text-[5rem]
            lg:text-[4rem]
            md:text-[2.5rem]
            sm:text-[2rem]">
            Vision
          </span>
        </h1>
        <p className="text-xl
          lg:text-base
          md:text-lg
          sm:text-base">
          Transforming ideas into stunning visuals. Our design expertise
          brings your brand to life, captivating audiences and driving
          success.
        </p>
      </div>
      
      {/* <div className="rotate-[56deg] text-xl font-black uppercase tracking-[10px]
       z hidden md:block">
        Designer and Developer
      </div> */}
    </div>
  );
};

export default Hero;
